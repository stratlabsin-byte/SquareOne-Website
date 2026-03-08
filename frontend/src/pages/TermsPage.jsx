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
      } catch {
        // Backend not available — use defaults
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const defaultTerms = `
    <h2>Terms of Service</h2>
    <p><strong>Effective Date:</strong> March 2026</p>
    <p>Welcome to the website of Adviserve Talent and Consulting Private Limited ("Adviserve", "we", "our", or "us"). By accessing or using this website, you agree to comply with and be bound by the following Terms of Service.</p>

    <h3>1. Acceptance of Terms</h3>
    <p>By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our website.</p>

    <h3>2. Services</h3>
    <p>Adviserve Talent and Consulting Private Limited provides talent and HR solutions, corporate training, business consulting, legal consulting, and technology and IT services to organizations across India.</p>

    <h3>3. Intellectual Property</h3>
    <p>All content on this website, including text, graphics, logos, images, and software, is the property of Adviserve Talent and Consulting Private Limited and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.</p>

    <h3>4. User Conduct</h3>
    <p>You agree not to use this website for any unlawful purpose or in any way that could damage, disable, or impair the website's functionality. You must not attempt to gain unauthorized access to any part of the website or its related systems.</p>

    <h3>5. Disclaimer of Warranties</h3>
    <p>This website and its content are provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the accuracy, reliability, or availability of the website or its content.</p>

    <h3>6. Limitation of Liability</h3>
    <p>Adviserve shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our website or services.</p>

    <h3>7. Third-Party Links</h3>
    <p>Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of any external sites.</p>

    <h3>8. Modifications</h3>
    <p>We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on this page. Your continued use of the website constitutes acceptance of the updated terms.</p>

    <h3>9. Governing Law</h3>
    <p>These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.</p>

    <h3>10. Contact</h3>
    <p>For any questions regarding these terms, please contact us at <a href="mailto:info@adviserve.org.in">info@adviserve.org.in</a></p>
  `;

  return (
    <div data-testid="terms-page" className="pt-24 pb-16">
      {/* Hero */}
      <section className="py-16 bg-[#0F2D3C]">
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
              className="prose prose-lg max-w-none prose-headings:font-['Montserrat'] prose-headings:text-[#0F2D3C] prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600"
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
