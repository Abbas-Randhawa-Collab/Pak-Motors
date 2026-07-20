import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-[110px] pb-24 min-h-screen">
        <div className="wrap">
          <div className="mb-12">
            <h1 className="text-[28px] md:text-4xl">Visit or contact us</h1>
            <p className="text-gray text-[15px] mt-2.5">
              Talk to Nasir or Ali Sultan directly, or send us your details
              and we&apos;ll call you back.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-5 mb-6">
                <div className="flex gap-4 border-b border-line pb-5">
                  <div className="text-xl">📍</div>
                  <div>
                    <b className="block text-sm">Showroom Address</b>
                    <span className="text-sm text-gray">Pak Motors, Bahawalpur, Punjab, Pakistan</span>
                  </div>
                </div>
                <div className="flex gap-4 border-b border-line pb-5">
                  <div className="text-xl">📞</div>
                  <div>
                    <b className="block text-sm">Nasir Chattha</b>
                    <span className="text-sm text-gray">0300-5019149</span>
                  </div>
                </div>
                <div className="flex gap-4 border-b border-line pb-5">
                  <div className="text-xl">📞</div>
                  <div>
                    <b className="block text-sm">Ali Sultan Chattha</b>
                    <span className="text-sm text-gray">0303-8293955</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-xl">🕐</div>
                  <div>
                    <b className="block text-sm">Showroom Hours</b>
                    <span className="text-sm text-gray">Daily · 10:00 AM – 9:00 PM</span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-line h-[280px]">
                <iframe
                  src="https://maps.google.com/maps?q=Bahawalpur%2C%20Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
            <div className="border border-line rounded-2xl p-7 h-fit">
              <ContactForm defaultType="buy" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
