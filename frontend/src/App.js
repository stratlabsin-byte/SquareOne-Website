import React, { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

// Pages
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ServicesPage from "@/pages/ServicesPage";
import IndustriesPage from "@/pages/IndustriesPage";
import WhySquareOnePage from "@/pages/WhySquareOnePage";
import InsightsPage from "@/pages/InsightsPage";
import BlogPostPage from "@/pages/BlogPostPage";
import CareersPage from "@/pages/CareersPage";
import ContactPage from "@/pages/ContactPage";
import AdminPage from "@/pages/AdminPage";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// API
import { seedData } from "@/services/api";

function App() {
  useEffect(() => {
    // Seed initial data on first load
    seedData().catch(console.error);
  }, []);

  return (
    <div className="App min-h-screen flex flex-col">
      <BrowserRouter>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/why-squareone" element={<WhySquareOnePage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/insights/:slug" element={<BlogPostPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
