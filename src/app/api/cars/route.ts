import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/cars — public list with optional filters
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const supabase = createClient();

  let query = supabase.from("cars").select("*").eq("is_available", true);

  const brand = searchParams.get("brand");
  const city = searchParams.get("city");
  const category = searchParams.get("category");
  const maxPrice = searchParams.get("maxPrice");
  const q = searchParams.get("q");

  if (brand) query = query.eq("brand", brand);
  if (city) query = query.eq("city", city);
  if (category) query = query.eq("category", category);
  if (maxPrice) query = query.lte("price", Number(maxPrice));
  if (q) query = query.ilike("title", `%${q}%`);

  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ cars: data });
}

// POST /api/cars — admin only, creates a new listing
export async function POST(request: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profileData } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  const profile = profileData as { role: string } | null;
  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { data, error } = await supabase
    .from("cars")
    .insert({ ...body, created_by: user.id })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ car: data }, { status: 201 });
}
