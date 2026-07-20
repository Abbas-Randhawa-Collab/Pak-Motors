import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CarForm from "@/components/admin/CarForm";
import type { Car } from "@/lib/types";

export default async function EditCarPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data } = await supabase.from("cars").select("*").eq("id", params.id).single();
  const car = data as Car | null;
  if (!car) notFound();

  return (
    <div>
      <h1 className="text-2xl normal-case tracking-normal mb-1">Edit Car</h1>
      <p className="text-gray text-sm mb-6">Update details for &quot;{car.title}&quot;.</p>
      <CarForm car={car} />
    </div>
  );
}
