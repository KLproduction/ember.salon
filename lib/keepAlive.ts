"use server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export async function keepSupabaseAlive() {
  const supabaseUrl =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey =
    process.env.SUPABASE_SERVICE_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "Missing SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) environment variable.",
    );
  }

  if (!serviceKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_KEY (or SUPABASE_SERVICE_ROLE_KEY) environment variable.",
    );
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

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

