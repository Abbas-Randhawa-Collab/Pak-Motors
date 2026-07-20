import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminOverviewPage() {
  const supabase = createClient();

  const [{ count: carCount }, { count: availableCount }, { count: inquiryCount }, { count: newInquiryCount }, { count: pendingReviewCount }] =
    await Promise.all([
      supabase.from("cars").select("*", { count: "exact", head: true }),
      supabase.from("cars").select("*", { count: "exact", head: true }).eq("is_available", true),
      supabase.from("inquiries").select("*", { count: "exact", head: true }),
      supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("reviews").select("*", { count: "exact", head: true }).eq("is_approved", false),
    ]);

  const stats = [
    { label: "Total Listings", value: carCount ?? 0, href: "/admin/cars" },
    { label: "Available Now", value: availableCount ?? 0, href: "/admin/cars" },
    { label: "Total Inquiries", value: inquiryCount ?? 0, href: "/admin/inquiries" },
    { label: "New Inquiries", value: newInquiryCount ?? 0, href: "/admin/inquiries" },
    { label: "Reviews Pending", value: pendingReviewCount ?? 0, href: "/admin/reviews" },
  ];

  return (
    <div>
      <h1 className="text-2xl normal-case tracking-normal mb-1">Dashboard</h1>
      <p className="text-gray text-sm mb-8">Overview of Pak Motors Bahawalpur.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white border border-line rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl font-display font-bold mb-1">{s.value}</div>
            <div className="text-sm text-gray">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap">
        <Link href="/admin/cars/new" className="btn btn-red">+ Add New Car</Link>
        <Link href="/admin/inquiries" className="btn btn-block-outline">View Inquiries</Link>
      </div>
    </div>
  );
}
