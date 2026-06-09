import { useEffect } from "react";
import { Route, useLocation, Navigate } from "react-router-dom";
import useAuthStore from "./lib/authStore";
import { isAdmin, isSuperAdmin } from "./lib/roles";

// common
import AppToast from "./common/AppToast";
import ScrollToTop from "./common/ScrollToTop";
import ScrollToTopButton from "./common/ScrollToTopButton";
import AnimatedRoutes from "./common/AnimatedRoutes";

// layouts
import MainLayout from "./layouts/MainLayout";
import FullPageLayout from "./layouts/FullPageLayout";
import AdminLayout from "./layouts/AdminLayout";
import PageWithNavbar from "./layouts/PageWithNavbar";

import NotFound from "./pages/NotFound";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Home from "./pages/home/Home";

// Auth
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";

export default function App() {
  const user = useAuthStore((s) => s.user);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const location = useLocation();

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans transition-colors duration-300">
      <AppToast />
      <ScrollToTop />

      <AnimatedRoutes location={location}>
        {/* MAIN SITE LAYOUT */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route element={<PageWithNavbar />}>
        </Route>

        {/* FULL SCREEN PAGES */}
        <Route element={<FullPageLayout />}>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" replace />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ADMIN FULL SCREEN LAYOUT */}
        <Route element={
          !user ? <Navigate to="/login" replace /> :
            (isAdmin(user?.role) || isSuperAdmin(user?.role)) ? <FullPageLayout /> :
              <Navigate to="/" replace />
        }>

        </Route>

        {/* ADMIN LAYOUT */}
        <Route element={
          !user ? <Navigate to="/login" replace /> :
            (isAdmin(user?.role) || isSuperAdmin(user?.role)) ? <AdminLayout /> :
              <Navigate to="/" replace />
        }>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/*" element={<NotFound />} />
        </Route>
      </AnimatedRoutes>

      <ScrollToTopButton />
    </div>
  );
}
