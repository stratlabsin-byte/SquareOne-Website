import React, { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "@/context/AuthContext";

// Pages
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ServicesPage from "@/pages/ServicesPage";
import IndustriesPage from "@/pages/IndustriesPage";
import WhyAdviservePage from "@/pages/WhyAdviservePage";
import InsightsPage from "@/pages/InsightsPage";
import BlogPostPage from "@/pages/BlogPostPage";
import CareersPage from "@/pages/CareersPage";
import ContactPage from "@/pages/ContactPage";
import AdminPage from "@/pages/AdminPage";
import LoginPage from "@/pages/LoginPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// API
import { seedData } from "@/services/api";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7F8]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#C9A227] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Layout component to conditionally show Navbar/Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavFooter = location.pathname === "/login";

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!hideNavFooter && <Footer />}
    </>
  );
};

// Floating Action Button - Phone/WhatsApp
const FloatingActionButton = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Hide on admin/login pages
  if (["/login", "/admin"].includes(location.pathname)) return null;

  return (
    <a
      href="tel:+911234567890"
      className={`fixed bottom-20 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#C9A227] text-white shadow-lg transition-all duration-500 hover:bg-[#b08d1f] hover:scale-110 group ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-75"
      }`}
      aria-label="Call us"
    >
      <Phone className="w-6 h-6" />
      {/* Pulsing ring */}
      <span className="absolute inset-0 rounded-full border-2 border-[#C9A227] animate-ping opacity-20 pointer-events-none" />
    </a>
  );
};

function AppContent() {
  useEffect(() => {
    // Seed initial data on first load (silently ignore if backend is not running)
    seedData().catch(() => {});
  }, []);

  return (
    <div className="App min-h-screen flex flex-col">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/why-adviserve" element={<WhyAdviservePage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/:slug" element={<BlogPostPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
      <FloatingActionButton />
      <Toaster position="top-right" richColors />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
