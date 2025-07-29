"use server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseUrl = process.env.SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_KEY!; // service_role

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function keepSupabaseAlive() {
  const uuid = crypto.randomUUID();
  const email = `dummy_${uuid}@example.com`;

  // 1. 建立帳戶
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password: uuid,
    email_confirm: true,
  });
  if (error) throw error;

  // 2. 立即刪除帳戶
  await supabase.auth.admin.deleteUser(data.user.id);

  console.log("✅ Supabase keep-alive ping sent");
}

keepSupabaseAlive().catch((err) => {
  console.error("[keep-alive] failed:", err);
  process.exit(1);
});
