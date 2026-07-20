import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import CarsTable from "@/components/admin/CarsTable";
import type { Car } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminCarsPage() {
  const supabase = createClient();
  const { data: cars } = await supabase
    .from("cars")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl normal-case tracking-normal mb-1">Cars</h1>
          <p className="text-gray text-sm">Manage your showroom inventory.</p>
        </div>
        <Link href="/admin/cars/new" className="btn btn-red">+ Add New Car</Link>
      </div>
      <CarsTable cars={(cars ?? []) as Car[]} />
    </div>
  );
}
