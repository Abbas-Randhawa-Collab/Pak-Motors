import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // middleware.ts already redirects unauthenticated users to /login,
  // this is a defense-in-depth check for direct server-render access.
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-off px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl mb-3 normal-case tracking-normal">Access pending</h1>
          <p className="text-gray text-sm">
            Your account ({user.email}) is signed in but doesn&apos;t have
            admin access yet. Ask an existing admin to run:
          </p>
          <code className="block bg-black text-white text-xs rounded-md p-3 mt-4 text-left overflow-x-auto">
            update public.profiles set role = &apos;admin&apos; where id =
            &apos;{user.id}&apos;;
          </code>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-off">
      <AdminSidebar email={user.email ?? ""} />
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
