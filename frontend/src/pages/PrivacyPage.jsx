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
      } catch {
        // Backend not available — use defaults
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const defaultPrivacy = `
    <h2>Privacy Policy</h2>
    <p><strong>Effective Date:</strong> March 2026</p>
    <p>Adviserve Talent and Consulting Private Limited ("Adviserve", "we", "our", or "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or use our services.</p>

    <h3>1. Information We Collect</h3>
    <p>We may collect the following types of information:</p>
    <ul>
      <li><strong>Personal Information:</strong> Name, email address, phone number, company name, and job title when you fill out a contact form, apply for a job, or subscribe to our newsletter.</li>
      <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, browser type, and device information.</li>
      <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to enhance your browsing experience.</li>
    </ul>

    <h3>2. How We Use Your Information</h3>
    <p>We use the information we collect to:</p>
    <ul>
      <li>Respond to inquiries and provide requested services</li>
      <li>Improve our website and services</li>
      <li>Send relevant updates, newsletters, and promotional communications (with your consent)</li>
      <li>Comply with legal obligations</li>
    </ul>

    <h3>3. Information Sharing</h3>
    <p>We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep your information confidential.</p>

    <h3>4. Data Security</h3>
    <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>

    <h3>5. Your Rights</h3>
    <p>You have the right to access, correct, or delete your personal data. You may also opt out of marketing communications at any time by contacting us.</p>

    <h3>6. Changes to This Policy</h3>
    <p>We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated effective date.</p>

    <h3>7. Contact Us</h3>
    <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@adviserve.org.in">info@adviserve.org.in</a></p>
  `;

  return (
    <div data-testid="privacy-page" className="pt-24 pb-16">
      {/* Hero */}
      <section className="py-16 bg-[#0F2D3C]">
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
              className="prose prose-lg max-w-none prose-headings:font-['Montserrat'] prose-headings:text-[#0F2D3C] prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600"
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
