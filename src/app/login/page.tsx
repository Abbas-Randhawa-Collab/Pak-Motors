"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push(searchParams.get("next") || "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
      <h1 className="text-xl normal-case tracking-normal mb-1">Admin Login</h1>
      <p className="text-sm text-gray mb-6">Sign in to manage inventory and inquiries.</p>

      <label className="block text-xs font-bold uppercase tracking-wider text-gray mb-1.5">Email</label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 border border-line rounded-md text-sm mb-4"
      />

      <label className="block text-xs font-bold uppercase tracking-wider text-gray mb-1.5">Password</label>
      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-3 border border-line rounded-md text-sm mb-5"
      />

      {error && <p className="text-red text-xs mb-4">{error}</p>}

      <button type="submit" disabled={loading} className="btn btn-red w-full justify-center">
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-5">
      <div className="w-full max-w-[400px]">
        <Link href="/" className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-10 h-10 bg-red rounded-md flex items-center justify-center text-white font-display font-bold text-lg -skew-x-6">
            PM
          </div>
          <span className="text-white font-display text-xl">
            PAK <span className="text-red">MOTORS</span>
          </span>
        </Link>

        <Suspense
          fallback={
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-sm text-gray text-center">
              Loading...
            </div>
          }
        >
          <LoginForm />
        </Suspense>

        <p className="text-center text-gray-light text-xs mt-6">
          Accounts are created via Supabase — ask an existing admin to invite
          you, or sign up then have an admin promote your role in the
          database.
        </p>
      </div>
    </div>
  );
}
