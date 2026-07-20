import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { createClient } from "@/lib/supabase/server";
import type { Car } from "@/lib/types";
import { formatPKR, formatKm } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: car } = await supabase
    .from("cars")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!car) notFound();
  const c = car as Car;

  return (
    <>
      <Header />
      <main className="pt-[110px] pb-24 min-h-screen">
        <div className="wrap grid lg:grid-cols-[1.3fr_1fr] gap-12">
          <div>
            <div
              className="h-[340px] rounded-2xl bg-cover bg-center bg-gradient-to-br from-[#1c1c1f] to-[#3d3d42] mb-6"
              style={c.image_url ? { backgroundImage: `url(${c.image_url})` } : undefined}
            />
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              {c.tag && <span className="plate">{c.tag}</span>}
              <span className="text-xs uppercase tracking-wider text-gray font-semibold">
                {c.category}
              </span>
            </div>
            <h1 className="text-[28px] md:text-[36px] normal-case tracking-normal mb-4">{c.title}</h1>
            <div className="font-mono font-bold text-red text-2xl mb-6">{formatPKR(c.price)}</div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                ["Year", c.year],
                ["Mileage", formatKm(c.mileage_km)],
                ["Fuel", c.fuel_type],
                ["Transmission", c.transmission],
                ["City", c.city],
                ["Category", c.category],
              ].map(([label, val]) => (
                <div key={label as string} className="border border-line rounded-lg p-3.5">
                  <div className="text-[10px] uppercase tracking-wider text-gray font-bold mb-1">{label}</div>
                  <div className="text-sm font-semibold">{val}</div>
                </div>
              ))}
            </div>

            {c.description && (
              <div>
                <h3 className="text-lg mb-3 normal-case tracking-normal">Description</h3>
                <p className="text-[14.5px] text-gray leading-relaxed">{c.description}</p>
              </div>
            )}
          </div>

          <div>
            <div className="border border-line rounded-2xl p-7 sticky top-[100px]">
              <h3 className="text-lg mb-1 normal-case tracking-normal">Interested in this car?</h3>
              <p className="text-sm text-gray mb-5">
                Send your details and we&apos;ll get back to you shortly.
              </p>
              <ContactForm defaultType="buy" carId={c.id} />
              <div className="flex gap-3 mt-5 pt-5 border-t border-line">
                <a href="tel:03005019149" className="btn btn-block-outline flex-1 justify-center">
                  📞 Call
                </a>
                <a
                  href="https://wa.me/923005019149"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-block-outline flex-1 justify-center"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
