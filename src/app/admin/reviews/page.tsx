import { createClient } from "@/lib/supabase/server";
import ReviewsTable from "@/components/admin/ReviewsTable";
import type { Review } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const supabase = createClient();
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl normal-case tracking-normal mb-1">Reviews</h1>
      <p className="text-gray text-sm mb-6">Approve reviews before they appear on the public site.</p>
      <ReviewsTable reviews={(reviews ?? []) as Review[]} />
    </div>
  );
}
