import React from "react";
import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { LogoIcon } from "@/components/Logo";

const Footer = () => {
  const services = [
    { name: "HR Consulting", path: "/services#talent-hr" },
    { name: "Corporate Training", path: "/services#corporate-training" },
    { name: "Business Consulting", path: "/services#business-consulting" },
    { name: "Legal Advisory", path: "/services#legal-consulting" },
    { name: "IT Services", path: "/services#technology-it" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Insights", path: "/insights" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  const legal = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/privacy" },
    { name: "Disclaimer", path: "/terms" },
  ];

  return (
    <footer data-testid="footer" className="bg-[#0B1F3B] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo + Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2.5 mb-6">
              <LogoIcon size={40} variant="light" />
              <div className="flex items-center">
                <span className="text-[17px] font-light tracking-[0.02em] text-[#D4B896]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  adiser
                </span>
                <svg viewBox="0 0 20 24" width="14" height="18" className="mx-[1px] mt-[1px]">
                  <circle cx="10" cy="5" r="2.5" fill="#5CE0C2" />
                  <circle cx="5" cy="13" r="2.5" fill="#5CE0C2" />
                  <circle cx="15" cy="13" r="2.5" fill="#5CE0C2" />
                  <circle cx="10" cy="21" r="2.5" fill="#5CE0C2" />
                </svg>
                <span className="text-[17px] font-light tracking-[0.02em] text-[#D4B896]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  e.
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering Startups and SMEs with integrated business solutions
              across HR, legal, technology, and strategic growth.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-linkedin"
                className="w-10 h-10 rounded bg-white/10 flex items-center justify-center hover:bg-[#C9A227] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-white font-semibold text-lg font-['Montserrat'] mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-gray-400 hover:text-[#C9A227] transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg font-['Montserrat'] mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#C9A227] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-white font-semibold text-lg font-['Montserrat'] mb-6">
              Legal
            </h3>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-[#C9A227] transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Adviserve Talent and Consulting Private Limited. All rights reserved.
            </p>
            <Link to="/login" className="text-gray-500 hover:text-gray-400 text-xs transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
