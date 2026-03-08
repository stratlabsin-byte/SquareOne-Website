import React from "react";
import { Link } from "react-router-dom";
import {
  Layers, Users, Target, Clock, Shield, TrendingUp,
  CheckCircle, ArrowRight, Award, Zap, Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useInView from "@/hooks/useInView";
import useCountUp from "@/hooks/useCountUp";

const WhyAdviservePage = () => {
  const { isInView: advantagesInView, ref: advantagesRef } = useInView();
  const { isInView: statsInView, ref: statsRef } = useInView(0.3);
  const { isInView: commitInView, ref: commitRef } = useInView();
  const { isInView: testimonialsInView, ref: testimonialsRef } = useInView();

  const yearsCount = useCountUp(10, 2000, statsInView);
  const clientsCount = useCountUp(500, 2000, statsInView);
  const retentionCount = useCountUp(95, 2000, statsInView);

  const advantages = [
    {
      icon: Layers,
      title: "Integrated Approach",
      description: "One partner for HR, Legal, Business, and IT needs. No more juggling multiple vendors or dealing with fragmented solutions."
    },
    {
      icon: Users,
      title: "SME Focused",
      description: "We understand the unique challenges of startups and SMEs. Our solutions are designed for growing businesses, not scaled-down enterprise offerings."
    },
    {
      icon: Target,
      title: "Result Oriented",
      description: "We focus on measurable outcomes and ROI. Every engagement is designed to deliver tangible business impact."
    },
    {
      icon: Clock,
      title: "Quick Turnaround",
      description: "Fast implementation without compromising quality. We know time is critical for growing businesses."
    },
    {
      icon: Shield,
      title: "Compliance First",
      description: "Stay ahead of regulatory requirements with our proactive compliance monitoring and advisory services."
    },
    {
      icon: TrendingUp,
      title: "Scalable Solutions",
      description: "Our solutions grow with your business. Start small and scale up as your needs evolve."
    }
  ];

  const differentiators = [
    {
      title: "10+ Years",
      subtitle: "Industry Experience",
      description: "A decade of serving startups and SMEs across diverse sectors"
    },
    {
      title: "500+",
      subtitle: "Satisfied Clients",
      description: "Trusted by businesses ranging from early-stage startups to established SMEs"
    },
    {
      title: "95%",
      subtitle: "Client Retention",
      description: "Our clients stay with us because we deliver consistent value"
    },
    {
      title: "24/7",
      subtitle: "Support Available",
      description: "Round-the-clock support for critical business needs"
    }
  ];

  const testimonialHighlights = [
    {
      quote: "ADVISERVE helped us set up compliant HR processes that scaled with our growth from 10 to 200 employees.",
      author: "Tech Startup Founder"
    },
    {
      quote: "Their integrated approach saved us significant time and cost compared to working with multiple consultants.",
      author: "Manufacturing SME Owner"
    },
    {
      quote: "The team's deep understanding of SME challenges made all the difference in our transformation journey.",
      author: "Retail Chain Director"
    }
  ];

  return (
    <div data-testid="why-adviserve-page">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 gradient-navy overflow-hidden">
        <div className="absolute inset-0 dot-grid-pattern-light pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-[#C9A227]/20 text-[#C9A227] text-sm font-medium rounded-full mb-6">
              Why ADVISERVE
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-['Montserrat'] mb-6">
              The ADVISERVE Advantage
            </h1>
            <p className="text-xl text-gray-300">
              Discover why hundreds of startups and SMEs choose ADVISERVE as their strategic
              partner for business growth and transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section ref={advantagesRef} className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="section-label text-xs font-semibold uppercase tracking-[0.18em] text-[#B7932B] mb-4">What Sets Us Apart</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2D3C] font-['Montserrat'] mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our unique combination of expertise, approach, and commitment delivers
              unmatched value for growing businesses.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((item, index) => (
              <div
                key={item.title}
                data-testid={`advantage-${index}`}
                className={`p-8 bg-[#F5F7F8] rounded-xl border border-slate-200 card-3d-hover group ${
                  advantagesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transition: "opacity 0.5s, transform 0.5s", transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-lg bg-[#0F2D3C]/10 flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/10 group-hover:shadow-[0_0_30px_rgba(201,162,39,0.15)] transition-all duration-300">
                  <item.icon className="w-7 h-7 text-[#0F2D3C] group-hover:text-[#C9A227] group-hover:scale-110 transition-all duration-300" />
                </div>
                <h3 className="text-xl font-bold text-[#0F2D3C] font-['Montserrat'] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section ref={statsRef} className="relative section-padding bg-[#0F2D3C] overflow-hidden">
        <div className="wave-divider-top-navy" />
        <div className="absolute inset-0 dot-grid-pattern-light pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div data-testid="differentiator-0" className="text-center p-6">
              <p className="text-4xl sm:text-5xl font-bold text-[#C9A227] font-['Montserrat'] mb-2 counter-animate">
                {yearsCount}+
              </p>
              <p className="text-white font-semibold mb-2">Years Experience</p>
              <p className="text-gray-400 text-sm">A decade of serving startups and SMEs across diverse sectors</p>
            </div>
            <div data-testid="differentiator-1" className="text-center p-6">
              <p className="text-4xl sm:text-5xl font-bold text-[#C9A227] font-['Montserrat'] mb-2 counter-animate">
                {clientsCount}+
              </p>
              <p className="text-white font-semibold mb-2">Satisfied Clients</p>
              <p className="text-gray-400 text-sm">Trusted by businesses ranging from early-stage startups to established SMEs</p>
            </div>
            <div data-testid="differentiator-2" className="text-center p-6">
              <p className="text-4xl sm:text-5xl font-bold text-[#C9A227] font-['Montserrat'] mb-2 counter-animate">
                {retentionCount}%
              </p>
              <p className="text-white font-semibold mb-2">Client Retention</p>
              <p className="text-gray-400 text-sm">Our clients stay with us because we deliver consistent value</p>
            </div>
            <div data-testid="differentiator-3" className="text-center p-6">
              <p className="text-4xl sm:text-5xl font-bold text-[#C9A227] font-['Montserrat'] mb-2">
                24/7
              </p>
              <p className="text-white font-semibold mb-2">Support Available</p>
              <p className="text-gray-400 text-sm">Round-the-clock support for critical business needs</p>
            </div>
          </div>
        </div>
        <div className="wave-divider-bottom" />
      </section>

      {/* Our Commitment */}
      <section ref={commitRef} className="section-padding bg-[#F5F7F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`relative transition-all duration-700 ${commitInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-xl border-2 border-[#C9A227]/20 pointer-events-none" />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=500&fit=crop"
                alt="Team Commitment"
                className="relative rounded-xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#C9A227] p-6 rounded-xl text-white shadow-lg animate-float">
                <Award className="w-10 h-10 mb-2" />
                <p className="font-semibold">Excellence Award</p>
                <p className="text-sm opacity-80">SME Consulting 2023</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2D3C] font-['Montserrat'] mb-6">
                Our Commitment to You
              </h2>
              <p className="text-gray-600 mb-8">
                When you partner with ADVISERVE, you're not just getting a service provider –
                you're gaining a committed partner invested in your success.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#C9A227] mr-4 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#0F2D3C] font-['Montserrat']">
                      Dedicated Account Manager
                    </h4>
                    <p className="text-gray-500 text-sm">
                      A single point of contact who understands your business intimately
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#C9A227] mr-4 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#0F2D3C] font-['Montserrat']">
                      Transparent Pricing
                    </h4>
                    <p className="text-gray-500 text-sm">
                      No hidden fees or surprise charges. Clear, upfront pricing always.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#C9A227] mr-4 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#0F2D3C] font-['Montserrat']">
                      Regular Business Reviews
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Quarterly reviews to align our services with your evolving needs
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#C9A227] mr-4 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#0F2D3C] font-['Montserrat']">
                      Satisfaction Guarantee
                    </h4>
                    <p className="text-gray-500 text-sm">
                      We stand behind our work with a 100% satisfaction guarantee
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Highlights */}
      <section ref={testimonialsRef} className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2D3C] font-['Montserrat'] mb-4">
              Voices of Our Clients
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonialHighlights.map((item, index) => (
              <div
                key={index}
                data-testid={`testimonial-highlight-${index}`}
                className={`bg-[#F5F7F8] p-8 rounded-xl relative border-l-4 border-[#C9A227]/30 hover:shadow-lg transition-all duration-300 ${
                  testimonialsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Quote className="absolute top-4 right-4 w-12 h-12 text-[#C9A227]/10 -rotate-12" />
                <p className="text-gray-600 italic mb-6 relative z-10">
                  {item.quote}
                </p>
                <p className="text-[#0F2D3C] font-semibold font-['Montserrat']">
                  — {item.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative section-padding gradient-navy overflow-hidden">
        <div className="absolute inset-0 dot-grid-pattern-light pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Zap className="w-16 h-16 text-[#C9A227] mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Montserrat'] mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join hundreds of successful businesses that have chosen ADVISERVE as their growth partner.
          </p>
          <Link to="/contact">
            <Button
              data-testid="why-cta-btn"
              className="bg-[#C9A227] hover:bg-[#b08d1f] text-white font-semibold px-10 py-6 text-lg rounded transition-all shadow-[0_0_30px_rgba(201,162,39,0.3)] hover:shadow-[0_0_40px_rgba(201,162,39,0.4)]"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WhyAdviservePage;
