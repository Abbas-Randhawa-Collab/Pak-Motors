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

  return { ok: true as const };
}

// PUT /api/reviews/[id] — admin only, e.g. { is_approved: true }
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const auth = await requireAdmin(supabase);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });

  const body = await request.json();
  const { data, error } = await supabase
    .from("reviews")
    .update(body)
    .eq("id", params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ review: data });
}

// DELETE /api/reviews/[id] — admin only
export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const auth = await requireAdmin(supabase);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });

  const { error } = await supabase.from("reviews").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
