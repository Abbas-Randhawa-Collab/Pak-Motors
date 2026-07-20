import { createClient } from "@/lib/supabase/server";
import InquiriesTable from "@/components/admin/InquiriesTable";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const supabase = createClient();
  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("*, cars(title)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl normal-case tracking-normal mb-1">Inquiries</h1>
      <p className="text-gray text-sm mb-6">
        Messages submitted from the contact form, sell form, and car pages.
      </p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <InquiriesTable inquiries={(inquiries ?? []) as any} />
    </div>
  );
}
