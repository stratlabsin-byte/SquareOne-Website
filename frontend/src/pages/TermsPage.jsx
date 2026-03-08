import React, { useState, useEffect } from "react";
import { getSiteSettings } from "@/services/api";

const TermsPage = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSiteSettings();
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const defaultTerms = `
    <h2>Terms of Service</h2>
    <p><strong>Last Updated:</strong> February 2025</p>
    <h3>1. Acceptance of Terms</h3>
    <p>By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.</p>
    <h3>2. Services</h3>
    <p>ADVISERVE Services and Consulting provides business consulting, HR solutions, legal advisory, and technology services to startups and SMEs.</p>
    <h3>3. Intellectual Property</h3>
    <p>All content on this website, including text, graphics, logos, and images, is the property of ADVISERVE Services and is protected by copyright laws.</p>
    <h3>4. Limitation of Liability</h3>
    <p>ADVISERVE shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.</p>
    <h3>5. Governing Law</h3>
    <p>These terms shall be governed by and construed in accordance with the laws of India.</p>
    <h3>6. Contact</h3>
    <p>For any questions regarding these terms, please contact us at info@adviserve.in</p>
  `;

  return (
    <div data-testid="terms-page" className="pt-24 pb-16">
      {/* Hero */}
      <section className="py-16 bg-[#0B1F3B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-['Montserrat']">
            Terms of Service
          </h1>
          <p className="text-gray-300 mt-2">
            Terms and conditions for using our services
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ) : (
            <div
              className="prose prose-lg max-w-none prose-headings:font-['Montserrat'] prose-headings:text-[#0B1F3B] prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600"
              dangerouslySetInnerHTML={{ 
                __html: settings?.terms_of_service || defaultTerms 
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
