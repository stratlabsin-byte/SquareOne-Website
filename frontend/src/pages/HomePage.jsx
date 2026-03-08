import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Users,
  TrendingUp,
  Monitor,
  CheckCircle2,
  ShieldCheck,
  Landmark,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getStats, getTestimonials } from "@/services/api";

// Counter Animation Hook
const useCountUp = (end, duration = 2000, startOnView = true) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
    }
  }, [startOnView]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime;
    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    requestAnimationFrame(animateCount);
  }, [end, duration, hasStarted]);

  useEffect(() => {
    if (!startOnView) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  return { count, ref };
};

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
  const [statsLoaded, setStatsLoaded] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, testimonialsData] = await Promise.all([
          getStats(),
          getTestimonials()
        ]);
        setStats(statsData);
        setStatsLoaded(true);
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Fall back to defaults so the page still renders
        setStats({ years_experience: 10, clients_served: 500, projects_completed: 1200, team_members: 75 });
        setStatsLoaded(true);
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
      icon: Building2,
      title: "Business Foundation",
      description: "Corporate structuring, legal documentation, and compliance advisory for resilient operating foundations.",
    },
    {
      icon: Users,
      title: "Workforce & HR",
      description: "Talent strategy, HR operations, payroll and compliance systems designed for controlled scaling.",
    },
    {
      icon: TrendingUp,
      title: "Growth & Capability",
      description: "Leadership development, operating rhythm design, and growth programs with measurable outcomes.",
    },
    {
      icon: Monitor,
      title: "Technology & Digital",
      description: "Pragmatic technology consulting, digital implementation, and process automation for efficiency.",
    }
  ];

  const differentiators = [
    {
      icon: ShieldCheck,
      title: "Governance-First Execution",
      description: "Every engagement is structured around compliance, controls, and long-term operational confidence."
    },
    {
      icon: Landmark,
      title: "Integrated Advisory",
      description: "Business, HR, legal and technology guidance coordinated under one strategic framework."
    },
    {
      icon: BarChart3,
      title: "Measured Outcomes",
      description: "Clear milestones, reporting cadence, and practical KPIs aligned to your growth targets."
    }
  ];

  const processSteps = [
    { step: "01", title: "Discovery", description: "We assess your business model, risks, and operational bottlenecks." },
    { step: "02", title: "Blueprint", description: "A structured roadmap with priorities, owners, and implementation sequence." },
    { step: "03", title: "Execution", description: "Hands-on deployment support with ongoing stakeholder alignment." },
    { step: "04", title: "Optimization", description: "Refinement cycles to improve efficiency, resilience, and profitability." }
  ];

  const { isInView: servicesInView, ref: servicesRef } = useInView();
  const { isInView: whyInView, ref: whyRef } = useInView();
  const { isInView: processInView, ref: processRef } = useInView();
  const { isInView: statsInView, ref: statsRef } = useInView();

  const yearsCounter = useCountUp(statsLoaded ? stats.years_experience : 0, 2000);
  const clientsCounter = useCountUp(statsLoaded ? stats.clients_served : 0, 2000);
  const projectsCounter = useCountUp(statsLoaded ? stats.projects_completed : 0, 2000);
  const teamCounter = useCountUp(statsLoaded ? stats.team_members : 0, 2000);

  return (
    <div data-testid="home-page" className="premium-grid">
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
                    Schedule Executive Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button
                    data-testid="hero-cta-secondary"
                    variant="outline"
                    className="h-12 rounded-md border border-white/40 bg-white/5 px-7 font-semibold text-white hover:bg-white/10"
                  >
                    View Service Portfolio
                  </Button>
                </Link>
              </div>
              <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 text-sm">
                <div className="rounded-md border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">Multi-domain</p>
                  <p className="mt-1 text-slate-400">Advisory model</p>
                </div>
                <div className="rounded-md border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">Process-led</p>
                  <p className="mt-1 text-slate-400">Execution rigor</p>
                </div>
                <div className="rounded-md border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">Outcome-based</p>
                  <p className="mt-1 text-slate-400">Growth metrics</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&h=1100&fit=crop"
                alt="Corporate head office tower"
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

      <section className="border-y border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:px-6 lg:px-8">
          <span>Governance Advisory</span>
          <span>People Operations</span>
          <span>Digital Enablement</span>
          <span>SME Transformation</span>
          <span>Executive Coaching</span>
        </div>
      </section>

      <section
        ref={servicesRef}
        data-testid="services-section"
        className="section-padding bg-[#F7F8FA]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B7932B]">Core Capabilities</p>
            <h2 className="mt-4 text-3xl font-bold text-[#0B1F3B] sm:text-4xl">
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
                  <h3 className="mb-3 text-xl font-bold text-[#0B1F3B] group-hover:text-[#A07D13]">
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

      <section
        ref={whyRef}
        data-testid="why-section"
        className="section-padding bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B7932B]">Why ADVISERVE</p>
              <h2 className="mt-4 text-3xl font-bold text-[#0B1F3B] sm:text-4xl">
                Institutional discipline with entrepreneurial pace.
              </h2>
              <p className="mt-5 text-slate-600">
                We bring enterprise-grade operating standards to growth-stage businesses without adding unnecessary complexity.
              </p>
              <div className="mt-8 space-y-4">
                {differentiators.map((item, index) => (
                  <div
                    key={item.title}
                    data-testid={`why-item-${index}`}
                    className={`flex items-start rounded-xl border border-slate-200 p-5 transition-all duration-500 ${
                      whyInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="mr-4 rounded-md bg-[#0B1F3B]/10 p-2 text-[#0B1F3B]">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0B1F3B]">{item.title}</h4>
                      <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`relative transition-all duration-700 ${whyInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=500&fit=crop"
                alt="Team Collaboration"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 left-1/2 w-[92%] -translate-x-1/2 rounded-xl border border-[#0B1F3B]/10 bg-white p-6 shadow-2xl">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-2xl font-bold text-[#0B1F3B]">{stats ? `${stats.years_experience}+` : "—"} yrs</p>
                    <p className="text-slate-500">Consulting experience</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#0B1F3B]">{stats ? `${stats.clients_served}+` : "—"} clients</p>
                    <p className="text-slate-500">Across sectors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={processRef}
        data-testid="process-section"
        className="section-padding bg-[#081A35]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E5C558]">Engagement Model</p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              A clear process from assessment to acceleration.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Every program follows a predictable framework, giving founders and leadership teams full visibility.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <div
                  key={step.step}
                  data-testid={`process-step-${index}`}
                  className={`relative text-center transition-all duration-500 ${
                    processInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A227] text-lg font-bold text-[#0B1F3B] shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">
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

      <section
        ref={statsRef}
        data-testid="stats-section"
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            <div
              ref={yearsCounter.ref}
              className={`rounded-xl border border-slate-200 p-7 text-center transition-all duration-500 ${statsInView ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
            >
              <p className="counter-value text-4xl font-bold text-[#0B1F3B] sm:text-5xl">
                {yearsCounter.count}+
              </p>
              <p className="mt-2 text-slate-600">Years Experience</p>
            </div>
            <div
              ref={clientsCounter.ref}
              className={`rounded-xl border border-slate-200 p-7 text-center transition-all duration-500 delay-100 ${statsInView ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
            >
              <p className="counter-value text-4xl font-bold text-[#A07D13] sm:text-5xl">
                {clientsCounter.count}+
              </p>
              <p className="mt-2 text-slate-600">Clients Served</p>
            </div>
            <div
              ref={projectsCounter.ref}
              className={`rounded-xl border border-slate-200 p-7 text-center transition-all duration-500 delay-200 ${statsInView ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
            >
              <p className="counter-value text-4xl font-bold text-[#0B1F3B] sm:text-5xl">
                {projectsCounter.count}+
              </p>
              <p className="mt-2 text-slate-600">Projects Completed</p>
            </div>
            <div
              ref={teamCounter.ref}
              className={`rounded-xl border border-slate-200 p-7 text-center transition-all duration-500 delay-300 ${statsInView ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
            >
              <p className="counter-value text-4xl font-bold text-[#A07D13] sm:text-5xl">
                {teamCounter.count}+
              </p>
              <p className="mt-2 text-slate-600">Team Members</p>
            </div>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section data-testid="testimonials-section" className="section-padding bg-[#F7F8FA]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B7932B]">Client Perspective</p>
            <h2 className="mt-4 mb-12 text-3xl font-bold text-[#0B1F3B] sm:text-4xl">
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
                  <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-lg md:p-12">
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-[#C9A227]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
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
                        <p className="font-bold text-[#0B1F3B]">
                          {testimonial.client_name}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {testimonial.position}, {testimonial.company}
                        </p>
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
                    index === currentTestimonial
                      ? "bg-[#C9A227] w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section data-testid="cta-section" className="section-padding bg-[#081A35]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Ready to lead your next stage with confidence?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-300">
            Speak with our advisory team to design an operating model that supports both control and speed.
          </p>
          <Link to="/contact">
            <Button
              data-testid="cta-schedule-btn"
              className="h-12 rounded-md bg-[#C9A227] px-10 text-base font-semibold text-[#0B1F3B] hover:bg-[#d8b648]"
            >
              Book Strategic Session
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
