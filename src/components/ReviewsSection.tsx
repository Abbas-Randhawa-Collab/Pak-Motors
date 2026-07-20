import { createClient } from "@/lib/supabase/server";
import type { Review } from "@/lib/types";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function ReviewsSection() {
  const supabase = createClient();
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false })
    .limit(6);

  const list = (reviews ?? []) as Review[];

  return (
    <section id="reviews" className="bg-white py-24">
      <div className="wrap">
        <div className="mb-12">
          <h2 className="text-[28px] md:text-4xl">What our customers say</h2>
          <p className="text-gray max-w-[480px] mt-2.5 text-[15px]">
            Real feedback from buyers and sellers across Bahawalpur and beyond.
          </p>
        </div>

        {list.length === 0 ? (
          <p className="text-gray text-sm">No reviews yet — be the first to share your experience.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {list.map((r) => (
              <div key={r.id} className="border border-line rounded-xl p-6">
                <div className="text-red mb-3">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                <p className="text-[14.5px] leading-relaxed mb-5">{r.comment}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                    {initials(r.reviewer_name)}
                  </div>
                  <div>
                    <b className="block text-sm">{r.reviewer_name}</b>
                    <span className="text-xs text-gray">{r.reviewer_city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
