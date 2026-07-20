import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// POST /api/inquiries — anyone can submit (contact form, sell form, car page)
export async function POST(request: Request) {
  const supabase = createClient();
  const body = await request.json();

  if (!body.full_name || !body.phone) {
    return NextResponse.json({ error: "full_name and phone are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("inquiries")
    .insert({
      full_name: body.full_name,
      phone: body.phone,
      inquiry_type: body.inquiry_type || "buy",
      message: body.message || null,
      car_id: body.car_id || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ inquiry: data }, { status: 201 });
}

// GET /api/inquiries — admin only, list all inquiries
export async function GET() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("inquiries")
    .select("*, cars(title)")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ inquiries: data });
}
