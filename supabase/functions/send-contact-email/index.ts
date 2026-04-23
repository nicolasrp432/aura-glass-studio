// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// @ts-ignore
const resendApiKey = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface EmailPayload {
    name: string;
    email: string;
    subject: string;
    message: string;
}

// @ts-ignore
serve(async (req: any) => {
    // Manejo de CORS explícito
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders, status: 200 });
    }

    try {
        const data = await req.json();
        let payload: EmailPayload;

        if (data.type === "INSERT" && data.record) {
            payload = {
                name: data.record.name,
                email: data.record.email,
                subject: data.record.subject || "Reserva",
                message: data.record.message,
            };
        } else {
            payload = data;
        }

        if (!payload.email || !payload.message) {
            throw new Error("Faltan campos obligatorios");
        }

        const { name, email, subject, message } = payload;

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
                from: "ManiPedi Web <notificaciones@manipedibellezaintegral.es>",
                to: ["manipedilasarenas18@gmail.com"],
                reply_to: email,
                subject: `Nuevo mensaje de Contacto: ${subject}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                        <h2 style="color: #D4AF37;">Nuevo Mensaje desde la Web</h2>
                        <hr />
                        <p><b>Nombre:</b> ${name}</p>
                        <p><b>Email:</b> ${email}</p>
                        <p><b>Asunto:</b> ${subject}</p>
                        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
                            <p><b>Mensaje:</b></p>
                            <p>${message}</p>
                        </div>
                        <footer style="margin-top: 20px; font-size: 12px; color: #888;">
                            Este mensaje fue enviado desde el formulario de contacto de ManiPedi Las Arenas.
                        </footer>
                    </div>
                `
            }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            return new Response(JSON.stringify({ error: errorText }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 });
        }

        const responseData = await res.json();
        return new Response(JSON.stringify(responseData), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 });
    }
});
