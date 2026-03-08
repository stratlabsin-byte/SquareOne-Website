import React from "react";
import { Link } from "react-router-dom";
import {
  Laptop, ShoppingBag, HeartPulse, Factory,
  GraduationCap, Briefcase, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const IndustriesPage = () => {
  const industries = [
    {
      icon: Laptop,
      title: "Technology & IT",
      description: "Supporting tech startups and IT companies with talent acquisition, compliance, and scalable solutions for rapid growth.",
      clients: "150+ Clients"
    },
    {
      icon: HeartPulse,
      title: "Healthcare",
      description: "Specialized solutions for healthcare providers ensuring regulatory compliance, talent management, and operational efficiency.",
      clients: "35+ Clients"
    },
    {
      icon: Factory,
      title: "Manufacturing",
      description: "Supporting manufacturing SMEs with workforce solutions, compliance, and technology implementation for Industry 4.0.",
      clients: "60+ Clients"
    },
    {
      icon: GraduationCap,
      title: "Education & EdTech",
      description: "Supporting educational institutions and EdTech startups with talent, technology, and growth advisory services.",
      clients: "55+ Clients"
    },
    {
      icon: ShoppingBag,
      title: "Retail & E-commerce",
      description: "End-to-end solutions for retail businesses from workforce management to digital transformation and supply chain optimization.",
      clients: "80+ Clients"
    },
    {
      icon: Briefcase,
      title: "Professional Services",
      description: "Comprehensive support for professional services firms with compliance, HR, technology solutions, and strategic growth advisory.",
      clients: "30+ Clients"
    }
  ];

  return (
    <div data-testid="industries-page">
      {/* Hero Section */}
      <section className="pt-32 pb-20 gradient-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <section className="section-padding bg-[#F5F7F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <Card
                key={industry.title}
                data-testid={`industry-card-${index}`}
                className="bg-white border-none shadow-sm hover:shadow-xl transition-all duration-300 group card-hover overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-lg bg-[#0F2D3C]/10 flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/10 transition-colors">
                    <industry.icon className="w-7 h-7 text-[#0F2D3C] group-hover:text-[#C9A227] transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F2D3C] font-['Montserrat'] mb-3">
                    {industry.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {industry.description}
                  </p>
                  <span className="text-[#C9A227] font-semibold text-sm">
                    {industry.clients}
                  </span>
                </CardContent>
              </Card>
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
      <section className="section-padding gradient-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Montserrat'] mb-6">
            Don't See Your Industry?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Our expertise extends beyond these sectors. Contact us to discuss how we can help your business.
          </p>
          <Link to="/contact">
            <Button
              data-testid="industries-cta-btn"
              className="bg-[#C9A227] hover:bg-[#b08d1f] text-white font-semibold px-10 py-6 text-lg rounded transition-all hover:shadow-xl"
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
