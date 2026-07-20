import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Car } from "@/lib/types";
import CarCard from "./CarCard";

export default async function FeaturedInventory() {
  const supabase = createClient();
  const { data: cars } = await supabase
    .from("cars")
    .select("*")
    .eq("is_available", true)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(6);

  const list = (cars ?? []) as Car[];

  return (
    <section id="inventory" className="py-24">
      <div className="wrap">
        <div className="flex justify-between items-end gap-5 flex-wrap mb-9">
          <div>
            <h2 className="text-[28px] md:text-4xl">Featured Inventory</h2>
            <p className="text-gray max-w-[480px] mt-2.5 text-[15px]">
              A snapshot of what&apos;s currently available in our showroom.
            </p>
          </div>
          <Link href="/cars" className="font-bold text-[13px] uppercase tracking-wider border-b-2 border-red pb-1">
            See All Cars
          </Link>
        </div>

        {list.length === 0 ? (
          <div className="border border-line rounded-xl p-10 text-center text-gray text-sm">
            No cars listed yet. Once your Supabase database is connected and
            seeded, listings will appear here automatically.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
