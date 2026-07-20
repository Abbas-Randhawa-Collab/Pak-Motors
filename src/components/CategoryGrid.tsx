import Link from "next/link";

const categories = [
  { label: "Sedan", icon: "🚗", cat: "Sedan" },
  { label: "SUV", icon: "🚙", cat: "SUV" },
  { label: "Hatchback", icon: "🚘", cat: "Hatchback" },
  { label: "Imported", icon: "🚢", cat: "Imported" },
  { label: "Luxury", icon: "✨", cat: "Luxury" },
  { label: "Van", icon: "🚐", cat: "Van" },
  { label: "Truck", icon: "🚚", cat: "Truck" },
  { label: "All Cars", icon: "🔎", cat: "" },
];

export default function CategoryGrid() {
  return (
    <section id="categories" className="py-24">
      <div className="wrap">
        <div className="flex justify-between items-end gap-5 flex-wrap mb-12">
          <div>
            <h2 className="text-[28px] md:text-4xl">Browse by Category</h2>
            <p className="text-gray max-w-[480px] mt-2.5 text-[15px]">
              Find exactly the type of vehicle you&apos;re looking for.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c) => (
            <Link
              key={c.label}
              href={c.cat ? `/cars?category=${encodeURIComponent(c.cat)}` : "/cars"}
              className="bg-black rounded-xl p-6 relative overflow-hidden min-h-[150px] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div
                className="absolute -right-8 -top-8 w-[120px] h-[120px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(195,19,36,0.4), transparent 70%)" }}
              />
              <span className="text-[26px] relative z-10">{c.icon}</span>
              <div className="relative z-10">
                <h4 className="text-white text-base">{c.label}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
