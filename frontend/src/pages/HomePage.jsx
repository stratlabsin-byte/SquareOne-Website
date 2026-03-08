import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  TrendingUp,
  Monitor,
  Layers,
  Target,
  GraduationCap,
  Laptop,
  HeartPulse,
  Factory,
  ShoppingBag,
  Briefcase,
  Calendar,
  User,
  ChevronDown,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getStats, getTestimonials, getBlogPosts } from "@/services/api";
import useInView from "@/hooks/useInView";
import useCountUp from "@/hooks/useCountUp";

const heroKeywords = ["Talent", "Strategy", "Technology", "Growth"];

const HomePage = () => {
  const [stats, setStats] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState(0);
  const [testimonialProgress, setTestimonialProgress] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, testimonialsData, postsData] = await Promise.all([
          getStats(),
          getTestimonials(),
          getBlogPosts(true),
        ]);
        setStats(statsData);
        setTestimonials(testimonialsData);
        setBlogPosts(postsData.slice(0, 3));
      } catch {
        // Backend not running — use fallback data silently
        setStats({ years_experience: 10, clients_served: 500, projects_completed: 1200, team_members: 75 });
        setTestimonials([
          { id: 1, name: "Rajesh Kumar", position: "CEO", company: "TechStart India", content: "ADVISERVE transformed our HR operations. Their strategic approach to talent acquisition helped us scale from 20 to 200 employees in just 18 months.", rating: 5, avatar: "" },
          { id: 2, name: "Priya Sharma", position: "Director of Operations", company: "GreenLeaf Exports", content: "The payroll and compliance management services have been exceptional. We no longer worry about regulatory changes — ADVISERVE handles it all seamlessly.", rating: 5, avatar: "" },
          { id: 3, name: "Amit Patel", position: "Founder", company: "DigitalEdge Solutions", content: "Their IT staffing solutions are unmatched. Every candidate they placed exceeded our expectations and contributed to our growth from day one.", rating: 5, avatar: "" },
        ]);
      }
    };
    fetchData();
  }, []);

  // Typewriter keyword cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeyword((prev) => (prev + 1) % heroKeywords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate testimonials with progress bar
  useEffect(() => {
    if (testimonials.length <= 1) return;
    setTestimonialProgress(0);
    const progressInterval = setInterval(() => {
      setTestimonialProgress((prev) => Math.min(prev + 2, 100));
    }, 100);
    const rotateInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      setTestimonialProgress(0);
    }, 5000);
    return () => { clearInterval(progressInterval); clearInterval(rotateInterval); };
  }, [testimonials.length, currentTestimonial]);

  const services = [
    {
      icon: Users,
      title: "Talent & HR Solutions",
      description: "End-to-end recruitment, HR outsourcing and workforce management services.",
    },
    {
      icon: GraduationCap,
      title: "Corporate Training",
      description: "Leadership development, professional skills training and workforce capability programs.",
    },
    {
      icon: TrendingUp,
      title: "Business & Legal Consulting",
      description: "Strategic advisory, compliance guidance, corporate structuring and legal documentation support.",
    },
    {
      icon: Monitor,
      title: "Technology & IT Services",
      description: "Digital transformation, software development and IT consulting services.",
    },
  ];

  const differentiators = [
    {
      icon: Layers,
      title: "Integrated Consulting Expertise",
      description: "One partner for HR, legal, business, and IT needs under a single strategic framework.",
    },
    {
      icon: Users,
      title: "Industry Experienced Professionals",
      description: "Seasoned consultants with deep domain expertise across multiple industries.",
    },
    {
      icon: Target,
      title: "Client-Focused Approach",
      description: "Every engagement is designed to deliver tangible, measurable business impact.",
    },
    {
      icon: Monitor,
      title: "Technology Driven Solutions",
      description: "Leveraging modern tools and platforms to drive efficiency and digital transformation.",
    },
    {
      icon: TrendingUp,
      title: "Scalable Business Support",
      description: "Flexible solutions that grow with your business from startup to established enterprise.",
    },
  ];

  const processSteps = [
    { step: "01", title: "Understand Client Needs", description: "We assess your business model, challenges, and operational landscape." },
    { step: "02", title: "Design Strategic Solutions", description: "A structured roadmap with priorities, owners, and clear implementation sequence." },
    { step: "03", title: "Implement Structured Processes", description: "Hands-on deployment with ongoing stakeholder alignment and progress tracking." },
    { step: "04", title: "Deliver Measurable Results", description: "Measurable outcomes, refinement cycles, and continuous improvement." },
  ];

  const industries = [
    { icon: Laptop, title: "Technology", bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop" },
    { icon: HeartPulse, title: "Healthcare", bgImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop" },
    { icon: Factory, title: "Manufacturing", bgImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop" },
    { icon: GraduationCap, title: "Education", bgImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop" },
    { icon: ShoppingBag, title: "Retail", bgImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop" },
    { icon: Briefcase, title: "Professional Services", bgImage: "https://images.unsplash.com/photo-1507679799987-c73b4a14b23e?w=400&h=300&fit=crop" },
  ];

  const placeholderPosts = [
    {
      id: "1",
      title: "5 Key Strategies for SME Growth in 2025",
      slug: "sme-growth-strategies-2025",
      excerpt: "Discover the essential strategies that successful SMEs are implementing to drive sustainable growth.",
      category: "Business Strategy",
      author: "ADVISERVE Team",
      image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Navigating HR Compliance in India",
      slug: "hr-compliance-india-guide",
      excerpt: "Understanding and managing HR compliance requirements is crucial for every business operating in India.",
      category: "HR Solutions",
      author: "ADVISERVE Team",
      image_url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Digital Transformation for SMEs",
      slug: "digital-transformation-sme",
      excerpt: "Learn how small and medium enterprises can leverage technology to streamline operations and boost productivity.",
      category: "Technology",
      author: "ADVISERVE Team",
      image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      created_at: new Date().toISOString(),
    },
  ];

  const displayBlogPosts = blogPosts.length > 0 ? blogPosts : placeholderPosts;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const { isInView: servicesInView, ref: servicesRef } = useInView();
  const { isInView: whyInView, ref: whyRef } = useInView();
  const { isInView: processInView, ref: processRef } = useInView();
  const { isInView: aboutInView, ref: aboutRef } = useInView();
  const { isInView: industriesInView, ref: industriesRef } = useInView();
  const { isInView: heroInView, ref: heroRef } = useInView(0.1);

  const projectsCount = useCountUp(stats?.projects_completed || 1200, 2000, heroInView);

  return (
    <div data-testid="home-page" className="premium-grid">
      {/* 1. Hero Section */}
      <section ref={heroRef} data-testid="hero-section" className="relative overflow-hidden bg-[#07162E] pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="absolute inset-0 premium-overlay" />
        {/* Decorative blurred gold circle */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#C9A227]/10 blur-[120px] pointer-events-none" />
        {/* Dot-grid texture overlay */}
        <div className="absolute inset-0 dot-grid-pattern-light pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-5 inline-flex items-center rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#E5C558]">
                Trusted Advisory for SMEs and Growth-Stage Firms
              </p>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Empowering Businesses with{" "}
                <span className="relative inline-block">
                  <span key={currentKeyword} className="text-[#E5C558] inline-block animate-fade-in-up">
                    {heroKeywords[currentKeyword]}
                  </span>
                  <span className="typewriter-cursor ml-1" />
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                Adviserve Talent and Consulting provides integrated HR, corporate training, business advisory, legal consulting and technology services designed to help organizations grow and succeed.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to="/contact">
                  <Button data-testid="hero-cta-primary" className="h-12 rounded-md bg-[#C9A227] px-7 font-semibold text-[#0F2D3C] hover:bg-[#d8b648] shadow-[0_0_25px_rgba(201,162,39,0.3)]">
                    Schedule Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button
                    data-testid="hero-cta-secondary"
                    variant="outline"
                    className="h-12 rounded-md border border-white/40 bg-white/5 px-7 font-semibold text-white hover:bg-white/10"
                  >
                    Explore Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&h=1100&fit=crop"
                alt="Corporate head office tower"
                loading="lazy"
                className="h-[560px] w-full rounded-2xl object-cover shadow-[0_36px_70px_-22px_rgba(0,0,0,0.55)]"
              />
              {/* Floating stats card with glass effect + animate-float */}
              <div className="absolute -left-5 bottom-6 glass-card-dark rounded-xl px-6 py-5 animate-float">
                <p className="text-xs uppercase tracking-[0.15em] text-slate-300">Client Programs Delivered</p>
                <p className="mt-1 text-3xl font-bold text-[#E5C558] counter-animate">
                  {projectsCount}+ <span className="text-base font-normal text-slate-400">engagements</span>
                </p>
              </div>
            </div>
          </div>
          {/* Scroll indicator */}
          <div className="mt-16 flex justify-center">
            <ChevronDown className="h-6 w-6 text-[#C9A227]/60 animate-bounce" />
          </div>
        </div>
      </section>

      {/* 2. Trust / Client Strip — Marquee */}
      <section className="border-y border-slate-200 bg-white py-10 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400 mb-6">
            Trusted by growing organizations across industries
          </p>
        </div>
        <div className="relative group">
          <div className="animate-marquee flex w-max gap-x-12 group-hover:[animation-play-state:paused]">
            {[...Array(2)].map((_, setIndex) =>
              ["Technology", "Healthcare", "Manufacturing", "Retail", "Education", "Financial Services", "Logistics", "Real Estate"].map((name) => (
                <div key={`${setIndex}-${name}`} className="flex items-center justify-center h-12 px-8 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 font-semibold whitespace-nowrap hover:border-[#C9A227]/30 hover:text-[#0F2D3C] transition-colors">
                  {name}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 3. About ADVISERVE */}
      <section
        ref={aboutRef}
        data-testid="about-section"
        className="relative section-padding bg-white"
      >
        <div className="absolute inset-0 dot-grid-pattern pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className={`relative transition-all duration-700 ${aboutInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              {/* Gold offset accent border */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-[#C9A227]/20 pointer-events-none" />
              <img
                src="https://images.unsplash.com/photo-1758691736975-9f7f643d178e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3Jwb3JhdGUlMjBvZmZpY2UlMjB0ZWFtJTIwbWVldGluZyUyMGRpdmVyc2UlMjBwcm9mZXNzaW9uYWx8ZW58MHx8fHwxNzcxMTc5MjIyfDA&ixlib=rb-4.1.0&q=85"
                alt="Diverse Team Meeting"
                loading="lazy"
                className="relative rounded-2xl shadow-xl"
              />
            </div>
            <div className={`transition-all duration-700 delay-200 ${aboutInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B7932B]">Who We Are</p>
              <h2 className="mt-4 text-3xl font-bold text-[#0F2D3C] sm:text-4xl font-['Montserrat']">
                About ADVISERVE
              </h2>
              <p className="mt-5 text-slate-600 leading-relaxed">
                Adviserve Talent and Consulting Private Limited is a multidisciplinary consulting firm delivering integrated solutions across talent acquisition, corporate training, business advisory, legal consulting and technology services.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                We help organizations simplify complexity, optimize operations and unlock sustainable growth.
              </p>
              <Link to="/about">
                <Button className="mt-8 bg-[#C9A227] hover:bg-[#b08d1f] text-white font-semibold px-8 py-3 rounded transition-shadow hover:shadow-lg">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services Grid */}
      <section
        ref={servicesRef}
        data-testid="services-section"
        className="section-padding bg-[#F7F8FA]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B7932B]">Our Services</p>
            <h2 className="mt-4 text-3xl font-bold text-[#0F2D3C] sm:text-4xl font-['Montserrat']">
              Strategic functions built for disciplined growth.
            </h2>
            <p className="mt-4 text-slate-600">
              We combine deep advisory with practical execution support so leadership teams can move faster with less operational risk.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={service.title}
                data-testid={`service-card-${index}`}
                className={`group overflow-hidden border border-slate-200 bg-white shadow-sm card-3d-hover gold-left-border ${
                  servicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 80}ms`, transition: "opacity 0.5s, transform 0.5s" }}
              >
                <CardContent className="p-8">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0F2D3C]/8 text-[#0F2D3C] transition-all group-hover:bg-[#C9A227]/20 group-hover:text-[#A07D13] group-hover:shadow-[0_0_20px_rgba(201,162,39,0.15)]">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-[#0F2D3C] group-hover:text-[#A07D13] font-['Montserrat']">
                    {service.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                  <Link
                    to="/services"
                    className="inline-flex items-center text-sm font-semibold text-[#A07D13] transition-transform group-hover:translate-x-1"
                  >
                    Learn More <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why ADVISERVE - 6 Icon Blocks */}
      <section
        ref={whyRef}
        data-testid="why-section"
        className="section-padding bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B7932B]">Why ADVISERVE</p>
            <h2 className="mt-4 text-3xl font-bold text-[#0F2D3C] sm:text-4xl font-['Montserrat']">
              The ADVISERVE Advantage
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-slate-600">
              We bring enterprise-grade operating standards to growth-stage businesses without adding unnecessary complexity.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((item, index) => (
              <div
                key={item.title}
                data-testid={`why-item-${index}`}
                className={`p-8 bg-[#F7F8FA] rounded-xl border border-slate-200 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${
                  whyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="w-14 h-14 rounded-lg bg-[#0F2D3C]/10 flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/10 group-hover:shadow-[0_0_30px_rgba(201,162,39,0.15)] transition-all duration-300">
                  <item.icon className="w-7 h-7 text-[#0F2D3C] group-hover:text-[#C9A227] group-hover:rotate-6 group-hover:scale-110 transition-all duration-300" />
                </div>
                <h3 className="text-xl font-bold text-[#0F2D3C] mb-3 font-['Montserrat']">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Our Approach - Horizontal Timeline */}
      <section
        ref={processRef}
        data-testid="process-section"
        className="relative section-padding bg-[#081A35]"
      >
        <div className="absolute inset-0 dot-grid-pattern-light pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E5C558]">Our Approach</p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl font-['Montserrat']">
              A clear process from understanding to results.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Every program follows a predictable framework, giving founders and leadership teams full visibility.
            </p>
          </div>

          <div className="relative grid gap-7 md:grid-cols-2 lg:grid-cols-4">
            {/* Animated connecting line */}
            <div className={`absolute top-7 left-[12.5%] right-[12.5%] h-0.5 bg-[#C9A227]/30 hidden lg:block ${processInView ? "animate-draw-line" : "scale-x-0"}`} style={{ transformOrigin: "left" }} />
            {processSteps.map((step, index) => (
              <div
                key={step.step}
                data-testid={`process-step-${index}`}
                className={`relative text-center transition-all duration-500 ${
                  processInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative z-10 mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A227] text-lg font-bold text-[#0F2D3C] shadow-lg">
                  {step.step}
                  {/* Pulsing ring */}
                  {processInView && (
                    <span
                      className="absolute inset-0 rounded-full border-2 border-[#C9A227] animate-ping opacity-20"
                      style={{ animationDelay: `${index * 300}ms`, animationDuration: "2s" }}
                    />
                  )}
                </div>
                <h3 className="mb-2 text-xl font-bold text-white font-['Montserrat']">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Industries Grid */}
      <section
        ref={industriesRef}
        data-testid="industries-section"
        className="section-padding bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B7932B]">Industries We Serve</p>
            <h2 className="mt-4 text-3xl font-bold text-[#0F2D3C] sm:text-4xl font-['Montserrat']">
              Expertise Across Key Sectors
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, index) => (
              <Link
                key={industry.title}
                to="/industries"
                data-testid={`home-industry-${index}`}
                className={`relative overflow-hidden rounded-xl h-44 group ${
                  industriesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 60}ms`, transition: "opacity 0.5s, transform 0.5s" }}
              >
                {/* Background image */}
                <img
                  src={industry.bgImage}
                  alt={industry.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#0F2D3C]/70 group-hover:bg-[#0F2D3C]/50 transition-colors duration-300" />
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
                  <industry.icon className="w-8 h-8 text-[#C9A227] mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-semibold text-white text-center">{industry.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Latest Insights / Blog */}
      <section data-testid="blog-section" className="section-padding bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B7932B]">Latest Insights</p>
              <h2 className="mt-4 text-3xl font-bold text-[#0F2D3C] sm:text-4xl font-['Montserrat']">
                From Our Knowledge Hub
              </h2>
            </div>
            <Link to="/insights" className="hidden md:inline-flex items-center text-sm font-semibold text-[#A07D13] hover:text-[#0F2D3C] transition-colors">
              View All Articles <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayBlogPosts.map((post, index) => (
              <Card
                key={post.id}
                data-testid={`home-blog-${index}`}
                className="bg-white border-none shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group card-hover"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image_url || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop"}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2D3C]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#C9A227] text-white text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3 space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post.created_at)}
                    </span>
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F2D3C] mb-2 line-clamp-2 group-hover:text-[#C9A227] transition-colors font-['Montserrat']">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                  <Link
                    to={`/insights/${post.slug}`}
                    className="inline-flex items-center text-[#C9A227] font-medium text-sm"
                  >
                    Read More <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10 md:hidden">
            <Link to="/insights">
              <Button variant="outline" className="border-[#0F2D3C] text-[#0F2D3C] hover:bg-[#0F2D3C] hover:text-white">
                View All Articles <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Testimonials */}
      {testimonials.length > 0 && (
        <section data-testid="testimonials-section" className="section-padding bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B7932B]">Client Perspective</p>
            <h2 className="mt-4 mb-12 text-3xl font-bold text-[#0F2D3C] sm:text-4xl font-['Montserrat']">
              What Our Clients Say
            </h2>

            <div className="relative min-h-[320px]">
              {/* Decorative large quote mark */}
              <Quote className="absolute -top-4 left-4 w-28 h-28 text-[#C9A227]/10 -rotate-12 pointer-events-none" />
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  data-testid={`testimonial-${index}`}
                  className={`transition-all duration-500 ${
                    index === currentTestimonial
                      ? "opacity-100 translate-x-0 relative"
                      : "opacity-0 absolute inset-0 translate-x-10 pointer-events-none"
                  }`}
                >
                  <div className="rounded-xl border border-slate-200 bg-[#F7F8FA] p-8 shadow-lg md:p-12">
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-[#C9A227]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="mb-8 text-lg italic text-slate-700 md:text-xl">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center justify-center">
                      <img
                        src={testimonial.image_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop"}
                        alt={testimonial.client_name}
                        className="w-14 h-14 rounded-full object-cover mr-4 ring-2 ring-[#C9A227]/20"
                      />
                      <div className="text-left">
                        <p className="font-bold text-[#0F2D3C]">{testimonial.client_name}</p>
                        <p className="text-gray-500 text-sm">{testimonial.position}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots + progress bar */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((t, index) => (
                <button
                  key={index}
                  onClick={() => { setCurrentTestimonial(index); setTestimonialProgress(0); }}
                  data-testid={`testimonial-dot-${index}`}
                  aria-label={`Go to testimonial from ${t.client_name}`}
                  className={`relative h-3 rounded-full transition-all overflow-hidden ${
                    index === currentTestimonial ? "bg-[#C9A227]/30 w-10" : "bg-gray-300 hover:bg-gray-400 w-3"
                  }`}
                >
                  {index === currentTestimonial && (
                    <span
                      className="absolute inset-y-0 left-0 bg-[#C9A227] rounded-full transition-all duration-100"
                      style={{ width: `${testimonialProgress}%` }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. CTA */}
      <section data-testid="cta-section" className="relative bg-[#081A35]">
        {/* Wave divider at top */}
        <div className="wave-divider-top-navy" />
        <div className="absolute inset-0 dot-grid-pattern-light pointer-events-none" />
        <div className="relative section-padding">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl font-['Montserrat']">
              Let's Build a Stronger Business Together
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-300">
              Schedule a consultation with our experts today.
            </p>
            <Link to="/contact">
              <Button
                data-testid="cta-schedule-btn"
                className="h-12 rounded-md bg-[#C9A227] px-10 text-base font-semibold text-[#0F2D3C] hover:bg-[#d8b648] shadow-[0_0_30px_rgba(201,162,39,0.3)] hover:shadow-[0_0_40px_rgba(201,162,39,0.4)] transition-shadow"
              >
                Schedule Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
