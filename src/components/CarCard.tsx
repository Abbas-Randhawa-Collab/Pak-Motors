import Link from "next/link";
import type { Car } from "@/lib/types";
import { formatPKR, formatKm } from "@/lib/utils";

const gradients = [
  "from-[#1c1c1f] to-[#3d3d42]",
  "from-[#2a0a0e] to-[#4a1319]",
  "from-[#101014] to-[#26262b]",
  "from-[#1a1a1d] to-[#33333a]",
  "from-[#08080a] to-[#2e2e33]",
];

export default function CarCard({ car, index = 0 }: { car: Car; index?: number }) {
  const grad = gradients[index % gradients.length];

  return (
    <Link
      href={`/cars/${car.id}`}
      className="block bg-white rounded-xl overflow-hidden border border-line transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      <div
        className={`h-[190px] relative bg-cover bg-center bg-gradient-to-br ${grad}`}
        style={car.image_url ? { backgroundImage: `url(${car.image_url})` } : undefined}
      >
        {car.tag && (
          <div className="absolute top-3 left-3">
            <span className="plate plate-dark">{car.tag}</span>
          </div>
        )}
        <div className="absolute top-3 right-3 w-[34px] h-[34px] bg-white/90 rounded-full flex items-center justify-center text-[15px]">
          ♡
        </div>
      </div>
      <div className="p-[18px]">
        <h4 className="font-display text-base normal-case tracking-normal mb-1">{car.title}</h4>
        <div className="flex gap-3.5 text-gray text-xs my-2.5 flex-wrap font-mono">
          <span>{car.year}</span>
          <span>·</span>
          <span>{formatKm(car.mileage_km)}</span>
          <span>·</span>
          <span>{car.fuel_type}</span>
          <span>·</span>
          <span>{car.transmission}</span>
        </div>
        <div className="flex justify-between items-center border-t border-line pt-3.5">
          <div>
            <div className="font-mono font-bold text-red text-[17px]">{formatPKR(car.price)}</div>
            <div className="text-xs text-gray">{car.city}</div>
          </div>
          <div className="w-[38px] h-[38px] bg-black rounded-full text-white flex items-center justify-center text-[15px]">
            📞
          </div>
        </div>
      </div>
    </Link>
  );
}
