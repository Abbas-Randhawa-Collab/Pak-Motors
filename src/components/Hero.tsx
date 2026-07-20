import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-black-2 to-black flex items-center pt-[78px] overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 75% 20%, rgba(195,19,36,0.35), transparent 55%)",
        }}
      />
      <div className="wrap relative z-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center w-full">
        <div>
          <div className="flex items-center gap-2.5 text-red-light font-mono text-xs tracking-[0.22em] mb-5">
            <span className="w-6 h-0.5 bg-red-light" />
            BAHAWALPUR&apos;S TRUSTED DEALERSHIP
          </div>
          <h1 className="text-white text-[40px] md:text-[56px] lg:text-[68px] leading-[1.02] mb-6">
            BUY, SELL &amp; <em className="not-italic text-red">IMPORT</em>
            <br />
            YOUR NEXT CAR
          </h1>
          <p className="text-gray-light text-[16.5px] max-w-[480px] leading-relaxed mb-8">
            Trusted local and Japan/UK-imported vehicles, transparent pricing,
            and bank finance assistance — all in one showroom, run by Nasir
            Chattha and Ali Sultan Chattha.
          </p>
          <div className="flex gap-3.5 flex-wrap mb-12">
            <a href="#inventory" className="btn btn-red">Browse Inventory →</a>
            <a href="/sell" className="btn btn-outline">Sell Your Car</a>
          </div>
          <div className="flex gap-9 flex-wrap">
            <div>
              <b className="block text-white font-display text-3xl">500+</b>
              <span className="text-gray-light text-[11.5px] tracking-wider uppercase">Cars Sold</span>
            </div>
            <div>
              <b className="block text-white font-display text-3xl">12+</b>
              <span className="text-gray-light text-[11.5px] tracking-wider uppercase">Years Trusted</span>
            </div>
            <div>
              <b className="block text-white font-display text-3xl">4.8★</b>
              <span className="text-gray-light text-[11.5px] tracking-wider uppercase">Customer Rating</span>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative h-[520px]">
            <div className="absolute top-5 right-0 w-[280px] z-20 bg-white rounded-xl p-4 shadow-2xl animate-floaty">
              <div className="h-[120px] rounded-md mb-3 bg-gradient-to-br from-[#2a0a0e] to-[#4a1319]" />
              <h4 className="font-display text-[15px] mb-1">Honda Civic Turbo Oriel</h4>
              <div className="text-red font-mono font-bold text-[15px]">PKR 78.5 Lac</div>
            </div>
            <div
              className="absolute bottom-8 left-0 w-[230px] z-10 bg-black text-white rounded-xl p-4 shadow-2xl animate-floaty"
              style={{ animationDelay: "1.4s" }}
            >
              <div className="h-[120px] rounded-md mb-3 bg-gradient-to-br from-[#1c1c1f] to-[#3d3d42]" />
              <h4 className="font-display text-[15px] mb-1">Toyota Land Cruiser V8</h4>
              <div className="text-red-light font-mono font-bold text-[15px]">PKR 2.65 Crore</div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap relative z-20 -mb-[46px] mt-10">
        <SearchBar />
      </div>
    </section>
  );
}
