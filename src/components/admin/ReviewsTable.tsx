"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Review } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function ReviewsTable({ reviews }: { reviews: Review[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function toggleApprove(id: string, is_approved: boolean) {
    setBusyId(id);
    await fetch(`/api/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_approved }),
    });
    setBusyId(null);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this review?")) return;
    setBusyId(id);
    await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    setBusyId(null);
    router.refresh();
  }

  if (reviews.length === 0) {
    return (
      <div className="bg-white border border-line rounded-xl p-10 text-center text-gray text-sm">
        No reviews yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {reviews.map((r) => (
        <div key={r.id} className="bg-white border border-line rounded-xl p-5">
          <div className="flex justify-between items-start gap-4 mb-2">
            <div>
              <b className="text-sm">{r.reviewer_name}</b>
              {r.reviewer_city && <span className="text-xs text-gray"> · {r.reviewer_city}</span>}
              <div className="text-red text-sm">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${r.is_approved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
              {r.is_approved ? "Approved" : "Pending"}
            </span>
          </div>
          <p className="text-sm text-gray mb-3">{r.comment}</p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray">{formatDate(r.created_at)}</span>
            <div className="flex gap-3">
              <button
                onClick={() => toggleApprove(r.id, !r.is_approved)}
                disabled={busyId === r.id}
                className="text-xs font-bold uppercase text-black hover:text-red"
              >
                {r.is_approved ? "Unapprove" : "Approve"}
              </button>
              <button
                onClick={() => handleDelete(r.id)}
                disabled={busyId === r.id}
                className="text-xs font-bold uppercase text-red"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
