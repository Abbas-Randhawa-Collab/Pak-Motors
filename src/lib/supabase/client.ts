// Browser-side Supabase client — use inside Client Components ("use client").
//
// Intentionally untyped (no <Database> generic): the app-level types in
// ./types.ts are applied manually via explicit casts (e.g. `as Car`,
// `as Car[]`) at every call site instead. This avoids a recurring
// TypeScript issue where mismatches between a hand-written Database type
// and whatever @supabase/supabase-js version npm resolves cause query
// builder methods (select/insert/update) to silently infer as `never` and
// fail the production build. See src/lib/types.ts for the shapes used in
// those casts.
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
