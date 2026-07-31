// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// @ts-ignore
const env = (key: string) => Deno.env.get(key);

const resendApiKey = env("RESEND_API_KEY");
const resendFrom = env("RESEND_FROM") || "ManiPedi Web <info@manipedibellezaintegral.es>";
const notifyTo = env("CONTACT_NOTIFICATION_EMAIL") || "manipedilasarenas18@gmail.com";
/** Secreto compartido con el trigger de la base de datos. Si está definido, se exige. */
const webhookSecret = env("CONTACT_WEBHOOK_SECRET");
/** Orígenes autorizados a invocar la función desde el navegador. */
const allowedOrigins = (env("ALLOWED_ORIGINS") ||
  "https://manipedilasarenas.com,https://www.manipedilasarenas.com,http://localhost:8080")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const FIELD_LIMITS = { name: 80, email: 120, subject: 120, message: 2000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Límite básico de peticiones por IP dentro de la misma instancia de la función. */
const RATE_LIMIT = { max: 5, windowMs: 60_000 };
const requestLog = new Map<string, number[]>();

const isRateLimited = (ip: string) => {
    const now = Date.now();
    const hits = (requestLog.get(ip) || []).filter((time) => now - time < RATE_LIMIT.windowMs);
    hits.push(now);
    requestLog.set(ip, hits);

    // Evita que el mapa crezca sin control en instancias de larga duración.
    if (requestLog.size > 500) {
        for (const [key, times] of requestLog) {
            if (times.every((time) => now - time >= RATE_LIMIT.windowMs)) requestLog.delete(key);
        }
    }

    return hits.length > RATE_LIMIT.max;
};

const corsHeaders = (origin: string | null) => ({
    "Access-Control-Allow-Origin": origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-webhook-secret",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
});

/** Escapa el contenido antes de incrustarlo en el HTML del email. */
const escapeHtml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

const clean = (value: unknown, max: number) =>
    typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";

const json = (body: unknown, status: number, origin: string | null) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
    });

// @ts-ignore
serve(async (req: any) => {
    const origin = req.headers.get("origin");

    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders(origin), status: 200 });
    }

    if (req.method !== "POST") {
        return json({ error: "Method not allowed" }, 405, origin);
    }

    // Peticiones desde un navegador: solo desde los orígenes autorizados.
    // El trigger de la base de datos llama sin cabecera Origin.
    if (origin && !allowedOrigins.includes(origin)) {
        return json({ error: "Origin not allowed" }, 403, origin);
    }

    if (webhookSecret && req.headers.get("x-webhook-secret") !== webhookSecret) {
        return json({ error: "Unauthorized" }, 401, origin);
    }

    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        req.headers.get("cf-connecting-ip") ||
        "unknown";

    if (isRateLimited(ip)) {
        return json({ error: "Too many requests" }, 429, origin);
    }

    try {
        if (!resendApiKey) {
            console.error("send-contact-email: RESEND_API_KEY no configurada");
            return json({ error: "Email service not configured" }, 500, origin);
        }

        const data = await req.json();
        const source = data?.type === "INSERT" && data?.record ? data.record : data;

        const name = clean(source?.name, FIELD_LIMITS.name);
        const email = clean(source?.email, FIELD_LIMITS.email);
        const subject = clean(source?.subject, FIELD_LIMITS.subject) || "Reserva";
        const message = clean(source?.message, FIELD_LIMITS.message);

        if (!EMAIL_PATTERN.test(email) || !message) {
            return json({ error: "Datos de contacto no válidos" }, 400, origin);
        }

        // No registramos el contenido del mensaje ni los datos de la persona (minimización).
        console.log("send-contact-email: enviando notificación", { hasName: Boolean(name) });

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
                from: resendFrom,
                to: [notifyTo],
                reply_to: email,
                subject: `Nuevo mensaje de Contacto: ${subject}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                        <h2 style="color: #D4AF37;">Nuevo Mensaje desde la Web</h2>
                        <hr />
                        <p><b>Nombre:</b> ${escapeHtml(name)}</p>
                        <p><b>Email:</b> ${escapeHtml(email)}</p>
                        <p><b>Asunto:</b> ${escapeHtml(subject)}</p>
                        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
                            <p><b>Mensaje:</b></p>
                            <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
                        </div>
                        <footer style="margin-top: 20px; font-size: 12px; color: #888;">
                            Este mensaje fue enviado desde el formulario de contacto de ManiPedi Las Arenas.
                            Contiene datos personales: trátalo conforme a la política de privacidad.
                        </footer>
                    </div>
                `,
            }),
        });

        if (!res.ok) {
            // El cuerpo de error de Resend puede incluir la dirección de destino: no se propaga.
            console.error("send-contact-email: error de Resend", { status: res.status });
            return json({ error: "No se pudo enviar la notificación" }, 502, origin);
        }

        return json({ ok: true }, 200, origin);
    } catch (error: any) {
        console.error("send-contact-email: error inesperado", { name: error?.name });
        return json({ error: "Solicitud no válida" }, 400, origin);
    }
});
