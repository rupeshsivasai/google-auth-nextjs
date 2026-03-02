"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    document.title = "Profile";
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-[#0b0b0f] text-white">
        <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800 bg-[#111118] px-8 py-6">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-600 border-t-white"></div>
          <div className="text-sm text-zinc-400">Loading...</div>
        </div>
    </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0b0b0f] text-white">

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(99,102,241,0.15),transparent_60%)]" />

      <div className="relative w-[380px] rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">

        {/* Avatar + Google logo */}
        <div className="mb-6 flex justify-center">
          <div className="relative h-20 w-20">
            {/* Avatar */}
            <Image
              src={session.user?.image || "/avatar.png"}
              alt="Profile avatar"
              fill
              className="rounded-full object-cover ring-2 ring-white/10"
            />

            {/* Google badge */}
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/5 shadow-md">
              <Image
                src="/google.svg"
                alt="Google logo"
                width={14}
                height={14}
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <h1 className="text-center text-xl font-semibold">
          {session.user?.name || "User"}
        </h1>
        {/* Email */}
        <p className="mt-1 text-center text-sm text-zinc-400">
          {session.user?.email || ""}
        </p>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-white/10" />

        {/* Action */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="
            w-full rounded-xl border border-white/10
            bg-white/10 py-2.5 text-sm font-medium
            transition hover:bg-white/15 hover:border-white/20
          "
        >
          Sign out
        </button>

      </div>
    </div>
  );
}
