const points = [
  { num: "01", title: "Verified Vehicles", desc: "Every car is inspected before listing — no hidden faults, no surprises." },
  { num: "02", title: "Import Expertise", desc: "Direct sourcing from Japan & UK auctions for genuine imported vehicles." },
  { num: "03", title: "Bank Finance Help", desc: "We guide you through financing options from major Pakistani banks." },
  { num: "04", title: "Fair Trade-Ins", desc: "Honest valuations when you sell or exchange your current vehicle." },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-black text-white py-24">
      <div className="wrap">
        <div className="mb-10">
          <h2 className="text-[28px] md:text-4xl text-white">Why Choose Pak Motors</h2>
          <p className="text-gray-light max-w-[480px] mt-2.5 text-[15px]">
            More than a dealership — a team that treats every deal like it&apos;s their own car.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-2.5">
          {points.map((p) => (
            <div key={p.num} className="pt-6 border-t-2 border-white/15">
              <span className="font-mono text-red-light text-[13px] mb-3.5 block">{p.num}</span>
              <h4 className="text-white text-[17px] mb-2.5">{p.title}</h4>
              <p className="text-gray-light text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
