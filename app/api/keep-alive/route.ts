import { keepSupabaseAlive } from "@/lib/keepAlive";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const expectedSecret = process.env.KEEP_ALIVE_WEBHOOK_SECRET;

  if (!expectedSecret) {
    return NextResponse.json(
      { error: "Webhook secret is not configured." },
      { status: 500 },
    );
  }

  const authHeader = req.headers.get("authorization");
  const providedSecret = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (providedSecret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await keepSupabaseAlive();
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[keep-alive-webhook] failed:", error);
    return NextResponse.json(
      { error: "Failed to run keep-alive task." },
      { status: 500 },
    );
  }
}
