import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeNewsletter } from "@/services/api";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    try {
      await subscribeNewsletter(email);
      toast.success("Successfully subscribed to newsletter!");
      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Industries", path: "/industries" },
    { name: "Why ADVISERVE", path: "/why-adviserve" },
    { name: "Insights", path: "/insights" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    { name: "Business Foundation", path: "/services#business-foundation" },
    { name: "Workforce & HR", path: "/services#workforce-hr" },
    { name: "Growth & Capability", path: "/services#growth-capability" },
    { name: "Technology & Digital", path: "/services#technology-digital" },
  ];

  return (
    <footer data-testid="footer" className="bg-[#0B1F3B] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-[#C9A227] rounded flex items-center justify-center">
                <span className="text-[#0B1F3B] font-bold text-2xl font-['Montserrat']">A</span>
              </div>
              <div>
                <span className="text-white font-bold text-lg font-['Montserrat'] tracking-tight block">
                  ADVISERVE
                </span>
                <span className="text-gray-400 text-xs">Services & Consulting</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Building Strong Businesses with ADVISERVE. Integrated HR, Legal, Business,
              and IT solutions designed for growing enterprises.
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
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-twitter"
                className="w-10 h-10 rounded bg-white/10 flex items-center justify-center hover:bg-[#C9A227] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-facebook"
                className="w-10 h-10 rounded bg-white/10 flex items-center justify-center hover:bg-[#C9A227] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
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

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg font-['Montserrat'] mb-6">
              Our Services
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

          {/* Newsletter & Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg font-['Montserrat'] mb-6">
              Stay Updated
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for insights and updates.
            </p>
            <form onSubmit={handleSubscribe} className="mb-6">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="newsletter-email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 rounded-r-none focus:border-[#C9A227]"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  data-testid="newsletter-submit"
                  className="bg-[#C9A227] hover:bg-[#b08d1f] rounded-l-none px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
            
            <div className="space-y-3">
              <a
                href="mailto:info@adviserve.in"
                className="flex items-center text-gray-400 hover:text-[#C9A227] transition-colors text-sm"
              >
                <Mail className="w-4 h-4 mr-3" />
                info@adviserve.in
              </a>
              <a
                href="tel:+911234567890"
                className="flex items-center text-gray-400 hover:text-[#C9A227] transition-colors text-sm"
              >
                <Phone className="w-4 h-4 mr-3" />
                +91 123 456 7890
              </a>
              <div className="flex items-start text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} ADVISERVE Services and Consulting Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-[#C9A227] text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-[#C9A227] text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/login" className="text-gray-400 hover:text-[#C9A227] text-sm transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
