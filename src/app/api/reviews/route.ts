import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/reviews — public, approved reviews only
export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ reviews: data });
}

// POST /api/reviews — anyone can submit; goes in as unapproved (pending moderation)
export async function POST(request: Request) {
  const supabase = createClient();
  const body = await request.json();

  if (!body.reviewer_name || !body.comment || !body.rating) {
    return NextResponse.json({ error: "reviewer_name, rating and comment are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("reviews")
    .insert({
      reviewer_name: body.reviewer_name,
      reviewer_city: body.reviewer_city || null,
      rating: body.rating,
      comment: body.comment,
      is_approved: false,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ review: data }, { status: 201 });
}
