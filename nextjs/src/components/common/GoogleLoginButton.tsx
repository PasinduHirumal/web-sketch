"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import useAuthStore from "@/lib/authStore";
import { getHomePathByRole } from "@/lib/roles";
import { API_URL } from "@/lib/axiosInstance";

let isFetchingSession = false;

interface GoogleLoginButtonProps {
  tabIndex?: number;
}

function GoogleLoginButtonInner({ tabIndex }: GoogleLoginButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  useEffect(() => {
    const googleAuth = searchParams.get("google_auth");

    if (googleAuth === "success") {
      if (isFetchingSession) return;
      isFetchingSession = true;

      const fetchGoogleSession = async () => {
        try {
          const res = await useAuthStore.getState().refresh();
          if (res && res.user) {
            toast.success(res.message || "Logged in with Google successfully!");
            router.replace(getHomePathByRole(res.user.role));
          } else {
            toast.error("Google session retrieval failed.");
            router.replace("/login");
          }
        } catch (err: any) {
          toast.error(err.message || "An error occurred during Google authentication.");
          router.replace("/login");
        } finally {
          isFetchingSession = false;
        }
      };
      fetchGoogleSession();
    } else if (googleAuth === "error") {
      const message = searchParams.get("message") || "Google authentication failed";
      toast.error(decodeURIComponent(message));
      router.replace(pathname);
    }
  }, [searchParams, router, pathname]);

  return (
    <>
      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-[10px] uppercase">
          <span className="bg-white px-2 text-slate-400 font-light">Or continue with</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        tabIndex={tabIndex}
        className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer hover:border-blue-500"
      >
        <FcGoogle size={16} />
        <span>Sign in with Google</span>
      </button>
    </>
  );
}

export default function GoogleLoginButton({ tabIndex }: GoogleLoginButtonProps) {
  return (
    <Suspense fallback={
      <div className="w-full h-10 bg-slate-100 animate-pulse rounded-lg mt-2" />
    }>
      <GoogleLoginButtonInner tabIndex={tabIndex} />
    </Suspense>
  );
}
