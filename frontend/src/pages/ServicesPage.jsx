import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Building2, Users, TrendingUp, Monitor, ChevronDown, ChevronRight,
  FileText, Scale, Shield, UserPlus, Clock, CreditCard, GraduationCap,
  BarChart, Settings, Globe, Database, Smartphone, ArrowRight, Award, Target, Landmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useInView from "@/hooks/useInView";

const ServicesPage = () => {
  const location = useLocation();
  const [activeService, setActiveService] = useState(location.hash?.slice(1) || "talent-hr");

  const services = [
    {
      id: "talent-hr",
      shortName: "Talent & HR",
      icon: Users,
      title: "Talent & HR Solutions",
      description: "End-to-end human resource solutions including recruitment, HR outsourcing, payroll management, and compliance advisory to help organizations build and manage effective teams.",
      color: "#0F2D3C",
      subServices: [
        {
          icon: UserPlus,
          title: "Recruitment & Talent Acquisition",
          description: "Strategic recruitment solutions to attract and hire the best talent for your organization, from entry-level to executive positions."
        },
        {
          icon: Clock,
          title: "HR Outsourcing & Payroll Management",
          description: "Complete HR management and payroll processing services allowing you to focus on core business while we handle all HR functions efficiently."
        },
        {
          icon: CreditCard,
          title: "HR Compliance Advisory",
          description: "Expert guidance on labor law compliance, statutory requirements, and employee benefits administration with full transparency."
        }
      ]
    },
    {
      id: "corporate-training",
      shortName: "Corporate Training",
      icon: GraduationCap,
      title: "Corporate Training",
      description: "Structured training programs for leadership development, soft skills enhancement, employee productivity, and compliance awareness designed to improve workforce capability.",
      color: "#C9A227",
      subServices: [
        {
          icon: Award,
          title: "Leadership Development",
          description: "Executive coaching and management development programs to build a strong leadership pipeline for your organization."
        },
        {
          icon: BarChart,
          title: "Soft Skills & Productivity Training",
          description: "Professional skills training and employee productivity programs customized to your industry needs and organizational goals."
        },
        {
          icon: Target,
          title: "Compliance Training",
          description: "Regulatory and compliance awareness programs designed to ensure your workforce understands and follows industry standards."
        }
      ]
    },
    {
      id: "business-consulting",
      shortName: "Business Consulting",
      icon: TrendingUp,
      title: "Business Consulting",
      description: "Advisory services covering business strategy, startup guidance, operational optimization, and process improvement to support sustainable business growth.",
      color: "#0F2D3C",
      subServices: [
        {
          icon: Building2,
          title: "Business Strategy & Startup Advisory",
          description: "Expert guidance on business strategy, company registration, and organizational setup tailored to your growth plans."
        },
        {
          icon: BarChart,
          title: "Operational Optimization",
          description: "Process optimization, performance management, and efficiency improvements for scalable operations."
        },
        {
          icon: Settings,
          title: "Process Improvement",
          description: "Systematic identification and elimination of inefficiencies to streamline workflows and improve business outcomes."
        }
      ]
    },
    {
      id: "legal-consulting",
      shortName: "Legal Consulting",
      icon: Scale,
      title: "Legal Consulting",
      description: "Legal support services including corporate documentation, contract drafting and review, regulatory compliance advisory, and employment law guidance.",
      color: "#C9A227",
      subServices: [
        {
          icon: FileText,
          title: "Corporate Documentation & Contract Drafting",
          description: "Agreements, contracts, policies, and regulatory filings to protect your business interests and ensure legal compliance."
        },
        {
          icon: Shield,
          title: "Regulatory Compliance Advisory",
          description: "Navigate complex regulatory requirements with our compliance experts who ensure your business meets all statutory obligations."
        },
        {
          icon: Landmark,
          title: "Employment Law & Corporate Governance",
          description: "Employment law support, board advisory, governance frameworks, and risk management to build institutional confidence."
        }
      ]
    },
    {
      id: "technology-it",
      shortName: "Technology & IT",
      icon: Monitor,
      title: "Technology & IT Services",
      description: "Technology services including website development, custom software solutions, IT infrastructure consulting, and digital transformation to modernize business operations.",
      color: "#0F2D3C",
      subServices: [
        {
          icon: Globe,
          title: "Website & Custom Software Development",
          description: "Custom web applications, mobile apps, and digital solutions built with modern technologies for superior user experience."
        },
        {
          icon: Smartphone,
          title: "IT Infrastructure Consulting",
          description: "Strategic IT consulting to align technology investments with business goals and optimize your technology infrastructure."
        },
        {
          icon: Database,
          title: "Digital Transformation Services",
          description: "End-to-end digital transformation including ERP/CRM implementation and business process automation."
        }
      ]
    }
  ];

  return (
    <div data-testid="services-page">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 gradient-navy overflow-hidden">
        <div className="absolute inset-0 dot-grid-pattern-light pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    ? "bg-[#0F2D3C] text-white shadow-[0_0_15px_rgba(201,162,39,0.25)]"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <service.icon className="w-4 h-4 mr-2" />
                {service.shortName}
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
          className={`section-padding ${serviceIndex % 2 === 0 ? "bg-white" : "bg-[#F5F7F8]"}`}
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
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2D3C] font-['Montserrat'] mb-4">
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
                          <span className="font-semibold text-[#0F2D3C] font-['Montserrat'] text-left">
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
      <section className="relative section-padding gradient-navy overflow-hidden">
        <div className="absolute inset-0 dot-grid-pattern-light pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Montserrat'] mb-6">
            Need a Customized Solution?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Every business is unique. Let us design a tailored solution that fits your specific needs.
          </p>
          <Link to="/contact">
            <Button
              data-testid="services-cta-btn"
              className="bg-[#C9A227] hover:bg-[#b08d1f] text-white font-semibold px-10 py-6 text-lg rounded transition-all shadow-[0_0_30px_rgba(201,162,39,0.3)] hover:shadow-[0_0_40px_rgba(201,162,39,0.4)]"
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
