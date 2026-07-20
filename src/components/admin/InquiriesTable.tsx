"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Inquiry, InquiryStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type Row = Inquiry & { cars?: { title: string } | null };

const statusOptions: InquiryStatus[] = ["new", "contacted", "closed"];

export default function InquiriesTable({ inquiries }: { inquiries: Row[] }) {
  const router = useRouter();

  return (
    <div className="bg-white border border-line rounded-xl overflow-x-auto">
      <table className="w-full text-sm min-w-[760px]">
        <thead>
          <tr className="text-left border-b border-line text-xs uppercase tracking-wider text-gray">
            <th className="px-5 py-3.5">Name</th>
            <th className="px-5 py-3.5">Phone</th>
            <th className="px-5 py-3.5">Type</th>
            <th className="px-5 py-3.5">Car</th>
            <th className="px-5 py-3.5">Received</th>
            <th className="px-5 py-3.5">Status</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((i) => (
            <tr key={i.id} className="border-b border-line last:border-0 align-top">
              <td className="px-5 py-3.5 font-semibold">{i.full_name}</td>
              <td className="px-5 py-3.5">
                <a href={`tel:${i.phone}`} className="text-black hover:text-red">{i.phone}</a>
              </td>
              <td className="px-5 py-3.5 capitalize">{i.inquiry_type}</td>
              <td className="px-5 py-3.5">{i.cars?.title ?? "—"}</td>
              <td className="px-5 py-3.5 text-gray">{formatDate(i.created_at)}</td>
              <td className="px-5 py-3.5">
                <StatusSelect id={i.id} initial={i.status} onDone={() => router.refresh()} />
              </td>
            </tr>
          ))}
          {inquiries.length === 0 && (
            <tr>
              <td colSpan={6} className="px-5 py-10 text-center text-gray">
                No inquiries yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function StatusSelect({ id, initial, onDone }: { id: string; initial: InquiryStatus; onDone: () => void }) {
  const [value, setValue] = useState(initial);
  const [saving, setSaving] = useState(false);

  async function handleChange(next: InquiryStatus) {
    setValue(next);
    setSaving(true);
    // Uses the generic inquiries row update through a PATCH-style PUT on the
    // dedicated endpoint would be added the same way as /api/cars/[id];
    // kept minimal here since inquiries only need status changes.
    await fetch(`/api/inquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    }).catch(() => {});
    setSaving(false);
    onDone();
  }

  return (
    <select
      value={value}
      disabled={saving}
      onChange={(e) => handleChange(e.target.value as InquiryStatus)}
      className="border border-line rounded-md text-xs px-2 py-1.5 font-semibold uppercase"
    >
      {statusOptions.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
