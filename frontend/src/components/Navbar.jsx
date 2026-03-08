import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { LogoIcon } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  {
    name: "Services",
    path: "/services",
    dropdown: [
      { name: "Talent & HR Solutions", path: "/services#talent-hr" },
      { name: "Corporate Training", path: "/services#corporate-training" },
      { name: "Business Consulting", path: "/services#business-consulting" },
      { name: "Legal Consulting", path: "/services#legal-consulting" },
      { name: "Technology & IT Services", path: "/services#technology-it" },
    ]
  },
  { name: "Industries", path: "/industries" },
  { name: "Insights", path: "/insights" },
  { name: "Careers", path: "/careers" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Check if we're on a page with dark hero
  const isDarkHero = ["/", "/about", "/services", "/industries", "/insights", "/careers", "/contact"].includes(location.pathname) || location.pathname.startsWith("/insights/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };
  
  // Text color based on scroll and page
  const textColor = isScrolled ? "text-[#1A1F24]" : (isDarkHero ? "text-white" : "text-[#1A1F24]");
  const activeColor = "text-[#C9A227]";
  const logoTextColor = isScrolled ? "text-[#0F2D3C]" : (isDarkHero ? "text-white" : "text-[#0F2D3C]");

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-lg py-3 border-b border-[#C9A227]/10"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            data-testid="logo-link"
            className="flex items-center space-x-2.5"
          >
            <LogoIcon size={36} variant={isScrolled ? "dark" : (isDarkHero ? "light" : "dark")} />
            <div className="hidden sm:flex items-center">
              <span className={`text-[17px] font-light tracking-[0.02em] ${logoTextColor}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                adiser
              </span>
              <svg viewBox="0 0 20 24" width="14" height="18" className="mx-[1px] mt-[1px]">
                <circle cx="10" cy="5" r="2.5" fill="#5FE3CF" />
                <circle cx="5" cy="13" r="2.5" fill="#5FE3CF" />
                <circle cx="15" cy="13" r="2.5" fill="#5FE3CF" />
                <circle cx="10" cy="21" r="2.5" fill="#5FE3CF" />
              </svg>
              <span className={`text-[17px] font-light tracking-[0.02em] ${logoTextColor}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                e.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <button
                      data-testid={`nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                        isActive(link.path)
                          ? activeColor
                          : `${textColor} hover:text-[#C9A227]`
                      }`}
                    >
                      {link.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border-gray-100 shadow-lg animate-in fade-in-0 zoom-in-95 duration-200">
                    {link.dropdown.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link
                          to={item.path}
                          className="px-4 py-2 text-sm text-[#1A1F24] hover:text-[#0F2D3C] hover:bg-gray-50"
                        >
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  data-testid={`nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors underline-animation ${
                    isActive(link.path)
                      ? activeColor
                      : `${textColor} hover:text-[#C9A227]`
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#C9A227] rounded-full" />
                  )}
                </Link>
              )
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/contact">
              <Button
                data-testid="nav-contact-btn"
                className="bg-[#C9A227] hover:bg-[#b08d1f] text-white font-semibold px-6 py-2 rounded transition-all shadow-[0_0_15px_rgba(201,162,39,0.25)] hover:shadow-[0_0_25px_rgba(201,162,39,0.4)]"
              >
                Book Consultation
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  data-testid="mobile-menu-toggle"
                  className={isScrolled ? "text-[#0F2D3C]" : (isDarkHero ? "text-white" : "text-[#0F2D3C]")}
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-gray-100">
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2.5"
                    >
                      <LogoIcon size={36} variant="dark" />
                      <div className="flex items-center">
                        <span className="text-[17px] font-light tracking-[0.02em] text-[#0F2D3C]" style={{ fontFamily: "'Inter', sans-serif" }}>
                          adiser
                        </span>
                        <svg viewBox="0 0 20 24" width="14" height="18" className="mx-[1px] mt-[1px]">
                          <circle cx="10" cy="5" r="2.5" fill="#5FE3CF" />
                          <circle cx="5" cy="13" r="2.5" fill="#5FE3CF" />
                          <circle cx="15" cy="13" r="2.5" fill="#5FE3CF" />
                          <circle cx="10" cy="21" r="2.5" fill="#5FE3CF" />
                        </svg>
                        <span className="text-[17px] font-light tracking-[0.02em] text-[#0F2D3C]" style={{ fontFamily: "'Inter', sans-serif" }}>
                          e.
                        </span>
                      </div>
                    </Link>
                  </div>
                  <nav className="flex-1 p-6">
                    <ul className="space-y-4">
                      {navLinks.map((link) => (
                        <li key={link.name}>
                          <Link
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            data-testid={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                            className={`block py-2 text-base font-medium transition-colors ${
                              isActive(link.path)
                                ? "text-[#C9A227]"
                                : "text-[#1A1F24] hover:text-[#0F2D3C]"
                            }`}
                          >
                            {link.name}
                          </Link>
                          {link.dropdown && (
                            <ul className="ml-4 mt-2 space-y-2">
                              {link.dropdown.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-1 text-sm text-gray-500 hover:text-[#0F2D3C]"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div className="p-6 border-t border-gray-100">
                    <Link to="/contact" onClick={() => setIsOpen(false)}>
                      <Button
                        data-testid="mobile-contact-btn"
                        className="w-full bg-[#C9A227] hover:bg-[#b08d1f] text-white font-semibold py-3 rounded"
                      >
                        Book Consultation
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
