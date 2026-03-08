import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  TrendingUp,
  Monitor,
  ShieldCheck,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getStats, getTestimonials, getBlogPosts } from "@/services/api";

// Intersection Observer Hook for animations
const useInView = (threshold = 0.2) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { isInView, ref };
};

const HomePage = () => {
  const [stats, setStats] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [blogPosts, setBlogPosts] = useState([]);

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
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setStats({ years_experience: 10, clients_served: 500, projects_completed: 1200, team_members: 75 });
      }
    };
    fetchData();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const services = [
    {
      icon: Users,
      title: "Talent & HR Solutions",
      description: "End-to-end HR solutions from talent acquisition to payroll compliance, designed for scaling businesses.",
    },
    {
      icon: GraduationCap,
      title: "Corporate Training",
      description: "Customized training and leadership development programs to upskill your workforce and build capability.",
    },
    {
      icon: TrendingUp,
      title: "Business Consulting",
      description: "Strategic advisory, corporate structuring, and growth consulting for SMEs and startups.",
    },
    {
      icon: Monitor,
      title: "Technology & IT Services",
      description: "IT consulting, web and app development, and digital transformation solutions for modern enterprises.",
    },
  ];

  const differentiators = [
    {
      icon: Layers,
      title: "Integrated Consulting",
      description: "One partner for HR, legal, business, and IT needs under a single strategic framework.",
    },
    {
      icon: Users,
      title: "Experienced Professionals",
      description: "Seasoned consultants with deep domain expertise across multiple industries.",
    },
    {
      icon: Target,
      title: "Business-Focused Solutions",
      description: "Every engagement is designed to deliver tangible, measurable business impact.",
    },
    {
      icon: Monitor,
      title: "Technology Driven",
      description: "Leveraging modern tools and platforms to drive efficiency and digital transformation.",
    },
    {
      icon: TrendingUp,
      title: "Scalable Engagement",
      description: "Flexible solutions that grow with your business from startup to established enterprise.",
    },
    {
      icon: ShieldCheck,
      title: "Strategic Advisory",
      description: "Governance-first approach ensuring compliance, controls, and long-term confidence.",
    },
  ];

  const processSteps = [
    { step: "01", title: "Understand", description: "We assess your business model, challenges, and operational landscape." },
    { step: "02", title: "Strategize", description: "A structured roadmap with priorities, owners, and clear implementation sequence." },
    { step: "03", title: "Implement", description: "Hands-on deployment with ongoing stakeholder alignment and progress tracking." },
    { step: "04", title: "Deliver Results", description: "Measurable outcomes, refinement cycles, and continuous improvement." },
  ];

  const industries = [
    { icon: Laptop, title: "Technology" },
    { icon: HeartPulse, title: "Healthcare" },
    { icon: Factory, title: "Manufacturing" },
    { icon: GraduationCap, title: "Education" },
    { icon: ShoppingBag, title: "Retail" },
    { icon: Briefcase, title: "Professional Services" },
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

  return (
    <div data-testid="home-page" className="premium-grid">
      {/* 1. Hero Section */}
      <section data-testid="hero-section" className="relative overflow-hidden bg-[#07162E] pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="absolute inset-0 premium-overlay" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-5 inline-flex items-center rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#E5C558]">
                Trusted Advisory for SMEs and Growth-Stage Firms
              </p>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Premium consulting that brings structure, clarity, and momentum.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                ADVISERVE partners with ambitious businesses to architect stronger operations across HR, legal,
                technology, and strategic growth.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to="/contact">
                  <Button data-testid="hero-cta-primary" className="h-12 rounded-md bg-[#C9A227] px-7 font-semibold text-[#0B1F3B] hover:bg-[#d8b648]">
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
              <div className="absolute -left-5 bottom-6 rounded-xl border border-[#C9A227]/35 bg-[#0B1F3B]/90 px-5 py-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.15em] text-slate-300">Client Programs Delivered</p>
                <p className="mt-1 text-2xl font-bold text-[#E5C558]">{stats ? `${stats.projects_completed}+` : "—"} engagements</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust / Client Strip */}
      <section className="border-y border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400 mb-6">
            Trusted by growing organizations across industries
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {["Technology", "Healthcare", "Manufacturing", "Retail", "Education"].map((name) => (
              <div key={name} className="flex items-center justify-center h-10 px-6 bg-slate-100 rounded text-sm text-slate-500 font-medium">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. About ADVISERVE */}
      <section
        ref={aboutRef}
        data-testid="about-section"
        className="section-padding bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className={`relative transition-all duration-700 ${aboutInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <img
                src="https://images.unsplash.com/photo-1758691736975-9f7f643d178e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3Jwb3JhdGUlMjBvZmZpY2UlMjB0ZWFtJTIwbWVldGluZyUyMGRpdmVyc2UlMjBwcm9mZXNzaW9uYWx8ZW58MHx8fHwxNzcxMTc5MjIyfDA&ixlib=rb-4.1.0&q=85"
                alt="Diverse Team Meeting"
                loading="lazy"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className={`transition-all duration-700 delay-200 ${aboutInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B7932B]">Who We Are</p>
              <h2 className="mt-4 text-3xl font-bold text-[#0B1F3B] sm:text-4xl font-['Montserrat']">
                About ADVISERVE
              </h2>
              <p className="mt-5 text-slate-600 leading-relaxed">
                ADVISERVE Services and Consulting empowers startups and SMEs with integrated
                business solutions across HR, legal, technology, and strategic growth. We serve
                as your single strategic partner, bringing together expertise across all critical
                business functions under one roof.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Since our founding, we have been committed to delivering practical, results-oriented
                consulting that helps businesses build strong foundations and scale with confidence.
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
            <h2 className="mt-4 text-3xl font-bold text-[#0B1F3B] sm:text-4xl font-['Montserrat']">
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
                className={`group overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  servicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <CardContent className="p-8">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-[#0B1F3B]/8 text-[#0B1F3B] transition-colors group-hover:bg-[#C9A227]/20 group-hover:text-[#A07D13]">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-[#0B1F3B] group-hover:text-[#A07D13] font-['Montserrat']">
                    {service.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                  <Link
                    to="/services"
                    className="inline-flex items-center text-sm font-semibold text-[#A07D13] transition-transform group-hover:translate-x-1"
                  >
                    Learn More <ArrowRight className="ml-1 w-4 h-4" />
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
            <h2 className="mt-4 text-3xl font-bold text-[#0B1F3B] sm:text-4xl font-['Montserrat']">
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
                <div className="w-14 h-14 rounded-lg bg-[#0B1F3B]/10 flex items-center justify-center mb-6 group-hover:bg-[#C9A227]/10 transition-colors">
                  <item.icon className="w-7 h-7 text-[#0B1F3B] group-hover:text-[#C9A227] transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F3B] mb-3 font-['Montserrat']">{item.title}</h3>
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
        className="section-padding bg-[#081A35]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {/* Connecting line */}
            <div className="absolute top-7 left-[12.5%] right-[12.5%] h-0.5 bg-[#C9A227]/30 hidden lg:block" />
            {processSteps.map((step, index) => (
              <div
                key={step.step}
                data-testid={`process-step-${index}`}
                className={`relative text-center transition-all duration-500 ${
                  processInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative z-10 mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A227] text-lg font-bold text-[#0B1F3B] shadow-lg">
                  {step.step}
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
            <h2 className="mt-4 text-3xl font-bold text-[#0B1F3B] sm:text-4xl font-['Montserrat']">
              Expertise Across Key Sectors
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {industries.map((industry, index) => (
              <Link
                key={industry.title}
                to="/industries"
                data-testid={`home-industry-${index}`}
                className={`flex flex-col items-center p-6 rounded-xl bg-[#F7F8FA] hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group ${
                  industriesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="w-16 h-16 rounded-full bg-[#0B1F3B]/10 flex items-center justify-center mb-4 group-hover:bg-[#C9A227]/10 transition-colors">
                  <industry.icon className="w-8 h-8 text-[#0B1F3B] group-hover:text-[#C9A227] transition-colors" />
                </div>
                <span className="text-sm font-semibold text-[#0B1F3B] text-center">{industry.title}</span>
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
              <h2 className="mt-4 text-3xl font-bold text-[#0B1F3B] sm:text-4xl font-['Montserrat']">
                From Our Knowledge Hub
              </h2>
            </div>
            <Link to="/insights" className="hidden md:inline-flex items-center text-sm font-semibold text-[#A07D13] hover:text-[#0B1F3B] transition-colors">
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
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
                  <h3 className="text-lg font-bold text-[#0B1F3B] mb-2 line-clamp-2 group-hover:text-[#C9A227] transition-colors font-['Montserrat']">
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
              <Button variant="outline" className="border-[#0B1F3B] text-[#0B1F3B] hover:bg-[#0B1F3B] hover:text-white">
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
            <h2 className="mt-4 mb-12 text-3xl font-bold text-[#0B1F3B] sm:text-4xl font-['Montserrat']">
              What Our Clients Say
            </h2>

            <div className="relative min-h-[320px]">
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
                        className="w-14 h-14 rounded-full object-cover mr-4"
                      />
                      <div className="text-left">
                        <p className="font-bold text-[#0B1F3B]">{testimonial.client_name}</p>
                        <p className="text-gray-500 text-sm">{testimonial.position}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((t, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  data-testid={`testimonial-dot-${index}`}
                  aria-label={`Go to testimonial from ${t.client_name}`}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? "bg-[#C9A227] w-8" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. CTA */}
      <section data-testid="cta-section" className="section-padding bg-[#081A35]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl font-['Montserrat']">
            Let's Build a Stronger Business Together
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-300">
            Speak with our advisory team to design an operating model that supports both control and speed.
          </p>
          <Link to="/contact">
            <Button
              data-testid="cta-schedule-btn"
              className="h-12 rounded-md bg-[#C9A227] px-10 text-base font-semibold text-[#0B1F3B] hover:bg-[#d8b648]"
            >
              Schedule Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
