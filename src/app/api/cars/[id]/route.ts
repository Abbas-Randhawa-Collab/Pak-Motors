import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin(supabase: ReturnType<typeof createClient>) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false as const, status: 401, message: "Unauthorized" };

  const { data: profileData } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  const profile = profileData as { role: string } | null;
  if (profile?.role !== "admin") return { ok: false as const, status: 403, message: "Forbidden" };

  return { ok: true as const, userId: user.id };
}

// GET /api/cars/[id] — public single car
export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data, error } = await supabase.from("cars").select("*").eq("id", params.id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json({ car: data });
}

// PUT /api/cars/[id] — admin only, update a listing
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const auth = await requireAdmin(supabase);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });

  const body = await request.json();
  const { data, error } = await supabase
    .from("cars")
    .update(body)
    .eq("id", params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ car: data });
}

// DELETE /api/cars/[id] — admin only
export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const auth = await requireAdmin(supabase);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });

  const { error } = await supabase.from("cars").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
