import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
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
  { name: "About Us", path: "/about" },
  { 
    name: "Services", 
    path: "/services",
    dropdown: [
      { name: "Business Foundation", path: "/services#business-foundation" },
      { name: "Workforce & HR", path: "/services#workforce-hr" },
      { name: "Growth & Capability", path: "/services#growth-capability" },
      { name: "Technology & Digital", path: "/services#technology-digital" },
    ]
  },
  { name: "Industries", path: "/industries" },
  { name: "Why SquareOne", path: "/why-squareone" },
  { name: "Insights", path: "/insights" },
  { name: "Careers", path: "/careers" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Check if we're on a page with dark hero
  const isDarkHero = ["/", "/about", "/services", "/industries", "/why-squareone", "/insights", "/careers", "/contact"].includes(location.pathname) || location.pathname.startsWith("/insights/");

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
  const textColor = isScrolled ? "text-[#2E2E2E]" : (isDarkHero ? "text-white" : "text-[#2E2E2E]");
  const activeColor = "text-[#C9A227]";
  const logoTextColor = isScrolled ? "text-[#0B1F3B]" : (isDarkHero ? "text-white" : "text-[#0B1F3B]");

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            data-testid="logo-link"
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-[#0B1F3B] rounded flex items-center justify-center">
              <span className="text-[#C9A227] font-bold text-xl font-['Montserrat']">S1</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-[#0B1F3B] font-bold text-lg font-['Montserrat'] tracking-tight">
                SquareOne
              </span>
              <span className="text-[#2E2E2E] text-xs block -mt-1">
                Services & Consulting
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
                          ? "text-[#C9A227]"
                          : "text-[#2E2E2E] hover:text-[#0B1F3B]"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border-gray-100 shadow-lg">
                    {link.dropdown.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link
                          to={item.path}
                          className="px-4 py-2 text-sm text-[#2E2E2E] hover:text-[#0B1F3B] hover:bg-gray-50"
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
                  className={`px-4 py-2 text-sm font-medium transition-colors underline-animation ${
                    isActive(link.path)
                      ? "text-[#C9A227]"
                      : "text-[#2E2E2E] hover:text-[#0B1F3B]"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/contact">
              <Button
                data-testid="nav-contact-btn"
                className="bg-[#C9A227] hover:bg-[#b08d1f] text-white font-semibold px-6 py-2 rounded transition-all hover:shadow-lg"
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
                  className="text-[#0B1F3B]"
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
                      className="flex items-center space-x-2"
                    >
                      <div className="w-10 h-10 bg-[#0B1F3B] rounded flex items-center justify-center">
                        <span className="text-[#C9A227] font-bold text-xl font-['Montserrat']">S1</span>
                      </div>
                      <span className="text-[#0B1F3B] font-bold text-lg font-['Montserrat']">
                        SquareOne
                      </span>
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
                                : "text-[#2E2E2E] hover:text-[#0B1F3B]"
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
                                    className="block py-1 text-sm text-gray-500 hover:text-[#0B1F3B]"
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
