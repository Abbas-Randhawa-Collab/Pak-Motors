"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/#inventory", label: "Inventory" },
  { href: "/#categories", label: "Categories" },
  { href: "/#finance", label: "Finance" },
  { href: "/sell", label: "Sell Your Car" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-black/90 backdrop-blur-md border-b border-white/10">
      <nav className="wrap flex items-center justify-between h-[78px]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-[38px] h-[38px] bg-red rounded-md flex items-center justify-center text-white font-display font-bold text-lg -skew-x-6">
            PM
          </div>
          <div>
            <span className="text-white font-display text-[19px] tracking-wide">
              PAK <span className="text-red">MOTORS</span>
            </span>
            <span className="block text-gray-light text-[10px] tracking-[0.18em] font-mono mt-0.5">
              BAHAWALPUR
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white text-[13px] font-semibold uppercase tracking-wider relative py-1.5 group"
            >
              {l.label}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-red transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden lg:flex gap-2.5 items-center">
          <Link href="/login" className="btn btn-outline">
            Admin
          </Link>
          <a href="tel:03005019149" className="btn btn-red">
            Call Now
          </a>
        </div>

        <button
          className="lg:hidden text-white text-2xl bg-transparent border-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-black border-t border-white/10 px-5 pb-6 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-white text-sm font-semibold uppercase tracking-wider py-1">
              {l.label}
            </a>
          ))}
          <Link href="/login" className="btn btn-outline justify-center">
            Admin Login
          </Link>
          <a href="tel:03005019149" className="btn btn-red justify-center">
            Call Now
          </a>
        </div>
      )}
    </header>
  );
}
