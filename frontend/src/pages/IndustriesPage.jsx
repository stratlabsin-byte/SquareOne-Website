import React from "react";
import { Link } from "react-router-dom";
import {
  Laptop, ShoppingBag, HeartPulse, Factory,
  GraduationCap, Briefcase, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useInView from "@/hooks/useInView";

const IndustriesPage = () => {
  const { isInView: gridInView, ref: gridRef } = useInView();

  const industries = [
    {
      icon: Laptop,
      title: "Technology & IT",
      description: "Supporting tech startups and IT companies with talent acquisition, compliance, and scalable solutions for rapid growth.",
      clients: "150+ Clients",
      bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop"
    },
    {
      icon: HeartPulse,
      title: "Healthcare",
      description: "Specialized solutions for healthcare providers ensuring regulatory compliance, talent management, and operational efficiency.",
      clients: "35+ Clients",
      bgImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop"
    },
    {
      icon: Factory,
      title: "Manufacturing",
      description: "Supporting manufacturing SMEs with workforce solutions, compliance, and technology implementation for Industry 4.0.",
      clients: "60+ Clients",
      bgImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
    },
    {
      icon: GraduationCap,
      title: "Education & EdTech",
      description: "Supporting educational institutions and EdTech startups with talent, technology, and growth advisory services.",
      clients: "55+ Clients",
      bgImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop"
    },
    {
      icon: ShoppingBag,
      title: "Retail & E-commerce",
      description: "End-to-end solutions for retail businesses from workforce management to digital transformation and supply chain optimization.",
      clients: "80+ Clients",
      bgImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
    },
    {
      icon: Briefcase,
      title: "Professional Services",
      description: "Comprehensive support for professional services firms with compliance, HR, technology solutions, and strategic growth advisory.",
      clients: "30+ Clients",
      bgImage: "https://images.unsplash.com/photo-1507679799987-c73b4a14b23e?w=600&h=400&fit=crop"
    }
  ];

  return (
    <div data-testid="industries-page">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 gradient-navy overflow-hidden">
        <div className="absolute inset-0 dot-grid-pattern-light pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-[#C9A227]/20 text-[#C9A227] text-sm font-medium rounded-full mb-6">
              Industries We Serve
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-['Montserrat'] mb-6">
              Deep Expertise Across Key Sectors
            </h1>
            <p className="text-xl text-gray-300">
              We bring sector-specific knowledge and tailored solutions to help businesses
              across diverse industries achieve their goals.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section ref={gridRef} className="section-padding bg-[#F5F7F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div
                key={industry.title}
                data-testid={`industry-card-${index}`}
                className={`relative overflow-hidden rounded-xl h-72 group cursor-pointer ${
                  gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transition: "opacity 0.5s, transform 0.5s", transitionDelay: `${index * 80}ms` }}
              >
                <img
                  src={industry.bgImage}
                  alt={industry.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2D3C] via-[#0F2D3C]/60 to-transparent group-hover:from-[#0F2D3C]/90 transition-colors duration-300" />
                <div className="relative z-10 flex flex-col justify-end h-full p-6">
                  <industry.icon className="w-8 h-8 text-[#C9A227] mb-3" />
                  <h3 className="text-xl font-bold text-white font-['Montserrat'] mb-2">
                    {industry.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                    {industry.description}
                  </p>
                  <span className="text-[#C9A227] font-semibold text-sm">
                    {industry.clients}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Expertise Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2D3C] font-['Montserrat'] mb-6">
                Why Industry Expertise Matters
              </h2>
              <p className="text-gray-600 mb-6">
                Every industry has unique challenges, regulations, and best practices. Our sector-specific 
                expertise ensures that the solutions we provide are not just generic frameworks, but 
                tailored strategies that address your specific industry dynamics.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#C9A227]/20 flex items-center justify-center mr-4 mt-0.5">
                    <span className="w-2 h-2 bg-[#C9A227] rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0F2D3C] font-['Montserrat']">
                      Regulatory Knowledge
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Deep understanding of industry-specific compliance requirements
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#C9A227]/20 flex items-center justify-center mr-4 mt-0.5">
                    <span className="w-2 h-2 bg-[#C9A227] rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0F2D3C] font-['Montserrat']">
                      Best Practices
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Proven methodologies adapted from successful implementations
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#C9A227]/20 flex items-center justify-center mr-4 mt-0.5">
                    <span className="w-2 h-2 bg-[#C9A227] rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0F2D3C] font-['Montserrat']">
                      Network Access
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Connections to industry-specific talent pools and partners
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=500&fit=crop"
                alt="Industry Expertise"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative section-padding gradient-navy overflow-hidden">
        <div className="absolute inset-0 dot-grid-pattern-light pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Montserrat'] mb-6">
            Don't See Your Industry?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Our expertise extends beyond these sectors. Contact us to discuss how we can help your business.
          </p>
          <Link to="/contact">
            <Button
              data-testid="industries-cta-btn"
              className="bg-[#C9A227] hover:bg-[#b08d1f] text-white font-semibold px-10 py-6 text-lg rounded transition-all shadow-[0_0_30px_rgba(201,162,39,0.3)] hover:shadow-[0_0_40px_rgba(201,162,39,0.4)]"
            >
              Discuss Your Industry
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default IndustriesPage;
