"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/admin", label: "Overview", icon: "📊" },
  { href: "/admin/cars", label: "Cars", icon: "🚗" },
  { href: "/admin/inquiries", label: "Inquiries", icon: "📥" },
  { href: "/admin/reviews", label: "Reviews", icon: "⭐" },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="w-full md:w-64 bg-black text-white md:min-h-screen flex md:flex-col">
      <div className="p-6 hidden md:block">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-red rounded-md flex items-center justify-center font-display font-bold text-sm -skew-x-6">
            PM
          </div>
          <span className="font-display text-base">
            PAK <span className="text-red">MOTORS</span>
          </span>
        </Link>
        <div className="text-[11px] text-gray-light mt-1 font-mono">ADMIN PANEL</div>
      </div>

      <nav className="flex md:flex-col flex-1 gap-1 p-3 overflow-x-auto md:overflow-visible">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap ${
                active ? "bg-red text-white" : "text-gray-light hover:bg-white/5"
              }`}
            >
              <span>{l.icon}</span> {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 hidden md:block">
        <div className="text-xs text-gray-light mb-3 truncate">{email}</div>
        <button
          onClick={handleLogout}
          className="w-full text-left text-sm font-semibold text-red-light hover:text-white"
        >
          Sign Out →
        </button>
      </div>
    </aside>
  );
}
