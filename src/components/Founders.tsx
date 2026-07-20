export default function Founders() {
  return (
    <section id="founders" className="bg-white py-24">
      <div className="wrap">
        <div className="mb-14">
          <h2 className="text-[28px] md:text-4xl">Meet the founders</h2>
          <p className="text-gray max-w-[480px] mt-2.5 text-[15px]">
            Two names Bahawalpur trusts for straightforward car deals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-14">
          <div className="border border-line rounded-2xl p-8">
            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center font-display text-xl mb-5">
              NC
            </div>
            <h3 className="text-xl mb-1">Nasir Chattha</h3>
            <div className="text-red text-xs font-mono tracking-wider mb-4">
              CO-FOUNDER · DIRECTOR OF OPERATIONS
            </div>
            <p className="text-[14.5px] text-gray leading-relaxed mb-5">
              Nasir Chattha brings over a decade of experience in vehicle
              sourcing and imports, ensuring every car at Pak Motors meets a
              strict standard of quality and documentation.
            </p>
            <div className="flex gap-4 text-sm font-semibold">
              <a href="tel:03005019149" className="text-black">📞 0300-5019149</a>
              <a href="https://wa.me/923005019149" target="_blank" rel="noreferrer" className="text-[#25D366]">
                WhatsApp
              </a>
            </div>
          </div>

          <div className="border border-line rounded-2xl p-8">
            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center font-display text-xl mb-5">
              AS
            </div>
            <h3 className="text-xl mb-1">Ali Sultan Chattha</h3>
            <div className="text-red text-xs font-mono tracking-wider mb-4">
              CO-FOUNDER · DIRECTOR OF SALES &amp; CUSTOMER RELATIONS
            </div>
            <p className="text-[14.5px] text-gray leading-relaxed mb-5">
              Ali Sultan Chattha is passionate about delivering premium
              customer service and quality vehicles, ensuring every customer
              enjoys a smooth, transparent buying experience.
            </p>
            <div className="flex gap-4 text-sm font-semibold">
              <a href="tel:03038293955" className="text-black">📞 0303-8293955</a>
              <a href="https://wa.me/923038293955" target="_blank" rel="noreferrer" className="text-[#25D366]">
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="bg-off rounded-2xl p-10 text-center">
          <span className="plate mb-5">OUR COMMITMENT</span>
          <p className="max-w-[640px] mx-auto text-lg leading-relaxed mt-4 italic">
            &quot;At Pak Motors Bahawalpur, we don&apos;t just sell cars — we
            build lasting relationships through trust, honesty, and
            exceptional customer service. Whether you&apos;re buying,
            selling, exchanging, or importing a vehicle, we are committed to
            helping you find the perfect car at the best value.&quot;
          </p>
          <div className="mt-5 text-xs font-mono tracking-wider text-gray">
            — NASIR CHATTHA &amp; ALI SULTAN CHATTHA
          </div>
        </div>
      </div>
    </section>
  );
}
