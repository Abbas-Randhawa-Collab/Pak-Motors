import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function SellPage() {
  return (
    <>
      <Header />
      <main className="pt-[110px] pb-24 min-h-screen">
        <div className="wrap max-w-[640px]">
          <div className="mb-8">
            <h1 className="text-[28px] md:text-4xl">Sell Your Car</h1>
            <p className="text-gray text-[15px] mt-2.5">
              Tell us about your vehicle — Nasir or Ali Sultan will reach out
              with a fair, honest offer, usually within the week.
            </p>
          </div>
          <div className="border border-line rounded-2xl p-7">
            <ContactForm defaultType="sell" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
