import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Building2, Users, TrendingUp, Monitor, ChevronDown, ChevronRight,
  FileText, Scale, Shield, UserPlus, Clock, CreditCard, GraduationCap,
  BarChart, Settings, Globe, Database, Smartphone, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ServicesPage = () => {
  const location = useLocation();
  const [activeService, setActiveService] = useState(location.hash?.slice(1) || "business-foundation");

  const services = [
    {
      id: "business-foundation",
      icon: Building2,
      title: "Business Foundation Services",
      description: "Build a solid legal and operational foundation for your business with our comprehensive structuring and compliance services.",
      color: "#0B1F3B",
      subServices: [
        {
          icon: FileText,
          title: "Corporate Structuring",
          description: "Expert guidance on choosing the right business structure, company registration, and organizational setup tailored to your growth plans."
        },
        {
          icon: Scale,
          title: "Legal Documentation",
          description: "Comprehensive legal documentation including agreements, contracts, policies, and regulatory filings to protect your business interests."
        },
        {
          icon: Shield,
          title: "Compliance Advisory",
          description: "Navigate complex regulatory requirements with our compliance experts who ensure your business meets all statutory obligations."
        }
      ]
    },
    {
      id: "workforce-hr",
      icon: Users,
      title: "Workforce & HR Solutions",
      description: "End-to-end human resource solutions to build, manage, and retain top talent while ensuring full compliance with labor laws.",
      color: "#C9A227",
      subServices: [
        {
          icon: UserPlus,
          title: "Talent Acquisition",
          description: "Strategic recruitment solutions to attract and hire the best talent for your organization, from entry-level to executive positions."
        },
        {
          icon: Clock,
          title: "HR Outsourcing",
          description: "Complete HR management services allowing you to focus on core business while we handle all HR functions efficiently."
        },
        {
          icon: CreditCard,
          title: "Payroll & Compliance",
          description: "Accurate payroll processing, statutory compliance, and employee benefits administration with zero errors and full transparency."
        }
      ]
    },
    {
      id: "growth-capability",
      icon: TrendingUp,
      title: "Growth & Capability Development",
      description: "Accelerate your business growth with strategic advisory and capability building programs designed for SMEs.",
      color: "#0B1F3B",
      subServices: [
        {
          icon: GraduationCap,
          title: "Corporate Training",
          description: "Customized training programs to upskill your workforce in leadership, technical skills, and professional development."
        },
        {
          icon: BarChart,
          title: "Leadership Programs",
          description: "Executive coaching and leadership development programs to build a strong management pipeline for your organization."
        },
        {
          icon: Settings,
          title: "SME Advisory",
          description: "Strategic consulting for SMEs covering business planning, market expansion, operational efficiency, and funding strategies."
        }
      ]
    },
    {
      id: "technology-digital",
      icon: Monitor,
      title: "Technology & Digital Services",
      description: "Transform your business with cutting-edge technology solutions from IT infrastructure to digital transformation.",
      color: "#C9A227",
      subServices: [
        {
          icon: Globe,
          title: "IT Consulting",
          description: "Strategic IT consulting to align technology investments with business goals and optimize your technology infrastructure."
        },
        {
          icon: Smartphone,
          title: "Web & App Development",
          description: "Custom web applications, mobile apps, and digital solutions built with modern technologies for superior user experience."
        },
        {
          icon: Database,
          title: "ERP / CRM Implementation",
          description: "End-to-end implementation of enterprise resource planning and customer relationship management systems for operational excellence."
        }
      ]
    }
  ];

  return (
    <div data-testid="services-page">
      {/* Hero Section */}
      <section className="pt-32 pb-20 gradient-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-[#C9A227]/20 text-[#C9A227] text-sm font-medium rounded-full mb-6">
              Our Services
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-['Montserrat'] mb-6">
              Comprehensive Solutions for Business Excellence
            </h1>
            <p className="text-xl text-gray-300">
              From foundation to growth, we provide integrated solutions that address every 
              aspect of your business needs under one roof.
            </p>
          </div>
        </div>
      </section>

      {/* Services Navigation */}
      <section className="sticky top-[72px] z-40 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-4 space-x-4 scrollbar-hide">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  setActiveService(service.id);
                  document.getElementById(service.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                data-testid={`service-nav-${service.id}`}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeService === service.id
                    ? "bg-[#0B1F3B] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <service.icon className="w-4 h-4 mr-2" />
                {service.title.split(" ").slice(0, 2).join(" ")}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Detail Sections */}
      {services.map((service, serviceIndex) => (
        <section
          key={service.id}
          id={service.id}
          data-testid={`service-section-${service.id}`}
          className={`section-padding ${serviceIndex % 2 === 0 ? "bg-white" : "bg-[#F8F9FA]"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Service Overview */}
              <div className={serviceIndex % 2 === 1 ? "lg:order-2" : ""}>
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <service.icon className="w-8 h-8" style={{ color: service.color }} />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1F3B] font-['Montserrat'] mb-4">
                  {service.title}
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  {service.description}
                </p>
                <Link to="/contact">
                  <Button
                    data-testid={`service-cta-${service.id}`}
                    className="bg-[#C9A227] hover:bg-[#b08d1f] text-white font-semibold px-8 py-3 rounded transition-all"
                  >
                    Inquire Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* Sub-Services Accordion */}
              <div className={serviceIndex % 2 === 1 ? "lg:order-1" : ""}>
                <Accordion type="single" collapsible className="space-y-4">
                  {service.subServices.map((subService, index) => (
                    <AccordionItem
                      key={index}
                      value={`${service.id}-${index}`}
                      data-testid={`subservice-${service.id}-${index}`}
                      className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex items-center">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                            style={{ backgroundColor: `${service.color}10` }}
                          >
                            <subService.icon className="w-5 h-5" style={{ color: service.color }} />
                          </div>
                          <span className="font-semibold text-[#0B1F3B] font-['Montserrat'] text-left">
                            {subService.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-gray-600 pl-14">
                          {subService.description}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="section-padding gradient-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Montserrat'] mb-6">
            Need a Customized Solution?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Every business is unique. Let us design a tailored solution that fits your specific needs.
          </p>
          <Link to="/contact">
            <Button
              data-testid="services-cta-btn"
              className="bg-[#C9A227] hover:bg-[#b08d1f] text-white font-semibold px-10 py-6 text-lg rounded transition-all hover:shadow-xl"
            >
              Request Custom Proposal
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
