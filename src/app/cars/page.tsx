import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { createClient } from "@/lib/supabase/server";
import type { Car } from "@/lib/types";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: {
    brand?: string;
    city?: string;
    category?: string;
    maxPrice?: string;
    q?: string;
  };
}

export default async function CarsPage({ searchParams }: Props) {
  const supabase = createClient();
  let query = supabase.from("cars").select("*").eq("is_available", true);

  if (searchParams.brand) query = query.eq("brand", searchParams.brand);
  if (searchParams.city) query = query.eq("city", searchParams.city);
  if (searchParams.category) query = query.eq("category", searchParams.category);
  if (searchParams.maxPrice) query = query.lte("price", Number(searchParams.maxPrice));
  if (searchParams.q) query = query.ilike("title", `%${searchParams.q}%`);

  const { data: cars } = await query.order("created_at", { ascending: false });
  const list = (cars ?? []) as Car[];

  const categories = ["Sedan", "SUV", "Hatchback", "Imported", "Luxury", "Van", "Truck"];

  return (
    <>
      <Header />
      <main className="pt-[110px] pb-24 min-h-screen">
        <div className="wrap">
          <div className="mb-8">
            <h1 className="text-[28px] md:text-4xl">All Inventory</h1>
            <p className="text-gray text-[15px] mt-2">
              {list.length} {list.length === 1 ? "car" : "cars"} available right now.
            </p>
          </div>

          <div className="flex gap-2.5 flex-wrap mb-9">
            <a href="/cars" className={`chip ${!searchParams.category ? "chip-active" : ""}`}>
              All
            </a>
            {categories.map((c) => (
              <a
                key={c}
                href={`/cars?category=${encodeURIComponent(c)}`}
                className={`chip ${searchParams.category === c ? "chip-active" : ""}`}
              >
                {c}
              </a>
            ))}
          </div>

          {list.length === 0 ? (
            <div className="border border-line rounded-xl p-14 text-center text-gray text-sm">
              No cars match these filters yet. Try clearing filters or check
              back soon.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
