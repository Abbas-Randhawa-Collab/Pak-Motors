import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16">
      <div className="wrap">
        <div className="grid md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-[38px] h-[38px] bg-red rounded-md flex items-center justify-center text-white font-display font-bold text-lg -skew-x-6">
                PM
              </div>
              <span className="font-display text-[19px] text-white">
                PAK <span className="text-red">MOTORS</span>
              </span>
            </div>
            <p className="text-[13.5px] leading-relaxed max-w-[260px] text-gray-light">
              Bahawalpur&apos;s dealership for buying, selling, exchanging and importing
              vehicles — run by Nasir Chattha and Ali Sultan Chattha.
            </p>
          </div>

          <div>
            <h5 className="text-white text-sm mb-4 font-display">Explore</h5>
            <ul className="space-y-2.5 text-sm text-gray-light">
              <li><a href="/#inventory" className="hover:text-white">Inventory</a></li>
              <li><a href="/#categories" className="hover:text-white">Categories</a></li>
              <li><a href="/#finance" className="hover:text-white">Finance Calculator</a></li>
              <li><Link href="/sell" className="hover:text-white">Sell Your Car</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-sm mb-4 font-display">Company</h5>
            <ul className="space-y-2.5 text-sm text-gray-light">
              <li><a href="/#founders" className="hover:text-white">About Us</a></li>
              <li><a href="/#reviews" className="hover:text-white">Reviews</a></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-sm mb-4 font-display">Contact</h5>
            <ul className="space-y-2.5 text-sm text-gray-light">
              <li><a href="tel:03005019149" className="hover:text-white">0300-5019149</a></li>
              <li><a href="tel:03038293955" className="hover:text-white">0303-8293955</a></li>
              <li>Bahawalpur, Punjab</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-2 py-6 text-xs text-gray-light">
          <span>© {new Date().getFullYear()} Pak Motors Bahawalpur. All rights reserved.</span>
          <span>Built with Next.js, Tailwind &amp; Supabase</span>
        </div>
      </div>
    </footer>
  );
}
