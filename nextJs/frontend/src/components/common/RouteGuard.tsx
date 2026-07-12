"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuthStore from "@/lib/authStore";
import { isAdmin, isSuperAdmin } from "@/lib/roles";

interface RouteGuardProps {
  children: React.ReactNode;
}

export default function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const user = useAuthStore((s) => s.user);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted || !isHydrated) return;

    const isAdminRoute = pathname.startsWith("/admin");
    const isAuthRoute = ["/login", "/register", "/forgot-password", "/reset-password"].includes(pathname);

    if (isAdminRoute) {
      if (!user) {
        router.replace("/login");
      } else if (!isAdmin(user.role) && !isSuperAdmin(user.role)) {
        router.replace("/");
      }
    } else if (isAuthRoute) {
      if (user) {
        router.replace("/");
      }
    }
  }, [user, isHydrated, pathname, router, mounted]);

  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthRoute = ["/login", "/register", "/forgot-password", "/reset-password"].includes(pathname);

  // Render a full-page loading spinner while Zustand is hydrating or not mounted yet (only for guarded routes)
  if ((isAdminRoute || isAuthRoute) && (!mounted || !isHydrated)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  // Prevent flash of guarded content before effect redirects
  if (isAdminRoute && (!user || (!isAdmin(user.role) && !isSuperAdmin(user.role)))) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (isAuthRoute && user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
