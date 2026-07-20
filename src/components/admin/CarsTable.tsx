"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Car } from "@/lib/types";
import { formatPKR } from "@/lib/utils";

export default function CarsTable({ cars }: { cars: Car[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Delete this listing? This cannot be undone.")) return;
    setDeletingId(id);
    const res = await fetch(`/api/cars/${id}`, { method: "DELETE" });
    setDeletingId(null);
    if (res.ok) router.refresh();
    else alert("Failed to delete car.");
  }

  if (cars.length === 0) {
    return (
      <div className="bg-white border border-line rounded-xl p-10 text-center text-gray text-sm">
        No cars yet. Click &quot;Add New Car&quot; to create your first listing.
      </div>
    );
  }

  return (
    <div className="bg-white border border-line rounded-xl overflow-x-auto">
      <table className="w-full text-sm min-w-[720px]">
        <thead>
          <tr className="text-left border-b border-line text-xs uppercase tracking-wider text-gray">
            <th className="px-5 py-3.5">Car</th>
            <th className="px-5 py-3.5">Price</th>
            <th className="px-5 py-3.5">City</th>
            <th className="px-5 py-3.5">Status</th>
            <th className="px-5 py-3.5"></th>
          </tr>
        </thead>
        <tbody>
          {cars.map((c) => (
            <tr key={c.id} className="border-b border-line last:border-0">
              <td className="px-5 py-3.5">
                <div className="font-semibold">{c.title}</div>
                <div className="text-xs text-gray">{c.year} · {c.brand}</div>
              </td>
              <td className="px-5 py-3.5 font-mono text-red font-semibold">{formatPKR(c.price)}</td>
              <td className="px-5 py-3.5">{c.city}</td>
              <td className="px-5 py-3.5">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${c.is_available ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                  {c.is_available ? "Available" : "Hidden"}
                </span>
                {c.is_featured && (
                  <span className="ml-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-red/10 text-red">Featured</span>
                )}
              </td>
              <td className="px-5 py-3.5">
                <div className="flex gap-3 justify-end">
                  <Link href={`/admin/cars/${c.id}/edit`} className="text-xs font-bold uppercase text-black hover:text-red">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(c.id)}
                    disabled={deletingId === c.id}
                    className="text-xs font-bold uppercase text-red"
                  >
                    {deletingId === c.id ? "..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
