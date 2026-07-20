import Link from "next/link";

export default function SellCTA() {
  return (
    <section id="sell" className="py-24">
      <div className="wrap">
        <div className="bg-black rounded-2xl p-10 md:p-14 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h2 className="text-white text-2xl md:text-[32px] mb-3">
              Selling your car? Get a fair offer this week.
            </h2>
            <p className="text-gray-light max-w-[520px] text-[15px]">
              Share your vehicle photos and details — our team values it
              honestly and connects you with real, ready buyers.
            </p>
          </div>
          <Link href="/sell" className="btn btn-white whitespace-nowrap">
            Submit Your Car →
          </Link>
        </div>
      </div>
    </section>
  );
}
