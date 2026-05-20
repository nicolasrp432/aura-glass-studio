import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const mode = process.argv[2] || "send";
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env");
  process.exit(1);
}

const payload = {
  name: "Smoke Test",
  email: "test@example.com",
  subject: "Reserva",
  message: "Mensaje de prueba para validar Resend y el trigger.",
};

if (mode === "insert") {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { error } = await supabase.from("messages").insert(payload);

  if (error) {
    console.error("Insert failed:", error.message);
    process.exit(1);
  }

  console.log("Inserted test message into messages.");
  console.log("Check Supabase logs for send-contact-email and your inbox for the email.");
  process.exit(0);
}

const response = await fetch(`${supabaseUrl}/functions/v1/send-contact-email`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${supabaseKey}`,
    apikey: supabaseKey,
  },
  body: JSON.stringify(payload),
});

const text = await response.text();
console.log(`Status: ${response.status}`);
console.log(text);

process.exit(response.ok ? 0 : 1);
