import React, { useState, useEffect } from "react";
import { getSiteSettings } from "@/services/api";

const PrivacyPage = () => {
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

  const defaultPrivacy = `
    <h2>Privacy Policy</h2>
    <p><strong>Last Updated:</strong> February 2025</p>
    <h3>1. Information We Collect</h3>
    <p>We collect information you provide directly to us, such as when you fill out a contact form, apply for a job, or subscribe to our newsletter.</p>
    <h3>2. How We Use Your Information</h3>
    <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to send you promotional communications.</p>
    <h3>3. Information Sharing</h3>
    <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
    <h3>4. Data Security</h3>
    <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
    <h3>5. Contact Us</h3>
    <p>If you have any questions about this Privacy Policy, please contact us at info@squareone.in</p>
  `;

  return (
    <div data-testid="privacy-page" className="pt-24 pb-16">
      {/* Hero */}
      <section className="py-16 bg-[#0B1F3B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-['Montserrat']">
            Privacy Policy
          </h1>
          <p className="text-gray-300 mt-2">
            How we handle and protect your information
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
                __html: settings?.privacy_policy || defaultPrivacy 
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
