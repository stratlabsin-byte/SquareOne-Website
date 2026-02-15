import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Users, TrendingUp, Monitor, CheckCircle, Play } from "lucide-react";
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
  const [stats, setStats] = useState({
    years_experience: 10,
    clients_served: 500,
    projects_completed: 1200,
    team_members: 75
  });
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
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
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
      description: "Corporate structuring, legal documentation, and compliance advisory for solid business foundations.",
      color: "#0B1F3B"
    },
    {
      icon: Users,
      title: "Workforce & HR",
      description: "Talent acquisition, HR outsourcing, payroll management, and compliance solutions.",
      color: "#C9A227"
    },
    {
      icon: TrendingUp,
      title: "Growth & Capability",
      description: "Corporate training, leadership programs, and SME advisory for sustainable growth.",
      color: "#0B1F3B"
    },
    {
      icon: Monitor,
      title: "Technology & Digital",
      description: "IT consulting, web & app development, and ERP/CRM implementation services.",
      color: "#C9A227"
    }
  ];

  const whyChooseUs = [
    { title: "Integrated Approach", description: "One partner for all business needs" },
    { title: "SME Focused", description: "Solutions tailored for growing businesses" },
    { title: "Expert Team", description: "Experienced professionals across domains" },
    { title: "Result Oriented", description: "Measurable outcomes and ROI focus" },
    { title: "Scalable Solutions", description: "Grow with your business needs" },
    { title: "Industry Insights", description: "Deep sector-specific knowledge" }
  ];

  const processSteps = [
    { step: 1, title: "Understand", description: "Deep dive into your business needs and challenges" },
    { step: 2, title: "Structure", description: "Design tailored solutions and strategic roadmap" },
    { step: 3, title: "Implement", description: "Execute with precision and continuous support" },
    { step: 4, title: "Scale", description: "Enable sustainable growth and optimization" }
  ];

  const { isInView: servicesInView, ref: servicesRef } = useInView();
  const { isInView: whyInView, ref: whyRef } = useInView();
  const { isInView: processInView, ref: processRef } = useInView();
  const { isInView: statsInView, ref: statsRef } = useInView();

  const yearsCounter = useCountUp(stats.years_experience, 2000);
  const clientsCounter = useCountUp(stats.clients_served, 2000);
  const projectsCounter = useCountUp(stats.projects_completed, 2000);
  const teamCounter = useCountUp(stats.team_members, 2000);

  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <section
        data-testid="hero-section"
        className="relative min-h-screen flex items-center gradient-navy overflow-hidden"
      >
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#C9A227]/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float delay-300" />
          <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-[#C9A227]/5 rounded-full blur-2xl animate-float delay-500" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <span className="inline-block px-4 py-2 bg-[#C9A227]/20 text-[#C9A227] text-sm font-medium rounded-full mb-6 animate-fade-in">
                One Strategic Partner for Growing Businesses
              </span>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 font-['Montserrat'] tracking-tight opacity-0-init animate-fade-in-up"
              >
                Building Strong Businesses from{" "}
                <span className="text-[#C9A227]">Square One</span>
              </h1>
              <p
                className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 opacity-0-init animate-fade-in-up delay-200"
              >
                Integrated HR, Legal, Business, and IT solutions designed for 
                growing enterprises. Transform your startup into a scalable success story.
              </p>
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0-init animate-fade-in-up delay-300"
              >
                <Link to="/contact">
                  <Button
                    data-testid="hero-cta-primary"
                    className="bg-[#C9A227] hover:bg-[#b08d1f] text-white font-semibold px-8 py-6 text-lg rounded transition-all hover:shadow-xl hover:scale-105"
                  >
                    Book a Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button
                    data-testid="hero-cta-secondary"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-[#0B1F3B] font-semibold px-8 py-6 text-lg rounded transition-all"
                  >
                    Explore Services
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden lg:block relative opacity-0-init animate-slide-right delay-400">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=700&fit=crop"
                  alt="Modern Corporate Building"
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#C9A227]/20 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-[#C9A227]" />
                    </div>
                    <div>
                      <p className="text-[#0B1F3B] font-bold text-2xl font-['Montserrat']">500+</p>
                      <p className="text-gray-500 text-sm">Clients Served</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section
        ref={servicesRef}
        data-testid="services-section"
        className="section-padding bg-[#F8F9FA]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#0B1F3B]/10 text-[#0B1F3B] text-sm font-medium rounded-full mb-4">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1F3B] font-['Montserrat'] mb-4">
              Comprehensive Business Solutions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From foundation to growth, we provide integrated solutions that empower 
              startups and SMEs to achieve their full potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={service.title}
                data-testid={`service-card-${index}`}
                className={`bg-white border-none shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group card-hover ${
                  servicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  borderTop: `4px solid ${service.color}`
                }}
              >
                <CardContent className="p-8">
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300"
                    style={{ backgroundColor: `${service.color}15` }}
                  >
                    <service.icon className="w-7 h-7" style={{ color: service.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1F3B] font-['Montserrat'] mb-3 group-hover:text-[#C9A227] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <Link
                    to="/services"
                    className="inline-flex items-center text-[#C9A227] font-medium text-sm group-hover:translate-x-2 transition-transform"
                  >
                    Learn More <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        ref={whyRef}
        data-testid="why-section"
        className="section-padding bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-[#C9A227]/10 text-[#C9A227] text-sm font-medium rounded-full mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1F3B] font-['Montserrat'] mb-6">
                Your Strategic Partner for Sustainable Growth
              </h2>
              <p className="text-gray-600 mb-8">
                We understand the unique challenges faced by startups and SMEs. Our integrated 
                approach ensures you have a single, reliable partner for all your business needs.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {whyChooseUs.map((item, index) => (
                  <div
                    key={item.title}
                    data-testid={`why-item-${index}`}
                    className={`flex items-start p-4 bg-[#F8F9FA] rounded-lg transition-all duration-500 ${
                      whyInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle className="w-5 h-5 text-[#C9A227] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[#0B1F3B] font-['Montserrat']">{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`relative transition-all duration-700 ${whyInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=500&fit=crop"
                alt="Team Collaboration"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#0B1F3B] p-6 rounded-lg shadow-xl text-white">
                <p className="text-3xl font-bold font-['Montserrat']">10+</p>
                <p className="text-gray-300 text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        ref={processRef}
        data-testid="process-section"
        className="section-padding gradient-navy"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white/10 text-[#C9A227] text-sm font-medium rounded-full mb-4">
              Our Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Montserrat'] mb-4">
              How We Work With You
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              A structured approach to transform your business challenges into opportunities for growth.
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#C9A227]/30 -translate-y-1/2" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div
                  key={step.step}
                  data-testid={`process-step-${index}`}
                  className={`relative text-center transition-all duration-500 ${
                    processInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative z-10 w-16 h-16 mx-auto mb-6 bg-[#C9A227] rounded-full flex items-center justify-center text-[#0B1F3B] font-bold text-2xl font-['Montserrat'] shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-white font-['Montserrat'] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        data-testid="stats-section"
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              ref={yearsCounter.ref}
              className={`text-center transition-all duration-500 ${statsInView ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
            >
              <p className="text-4xl sm:text-5xl font-bold text-[#0B1F3B] font-['Montserrat'] counter-value">
                {yearsCounter.count}+
              </p>
              <p className="text-gray-600 mt-2">Years Experience</p>
            </div>
            <div
              ref={clientsCounter.ref}
              className={`text-center transition-all duration-500 delay-100 ${statsInView ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
            >
              <p className="text-4xl sm:text-5xl font-bold text-[#C9A227] font-['Montserrat'] counter-value">
                {clientsCounter.count}+
              </p>
              <p className="text-gray-600 mt-2">Clients Served</p>
            </div>
            <div
              ref={projectsCounter.ref}
              className={`text-center transition-all duration-500 delay-200 ${statsInView ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
            >
              <p className="text-4xl sm:text-5xl font-bold text-[#0B1F3B] font-['Montserrat'] counter-value">
                {projectsCounter.count}+
              </p>
              <p className="text-gray-600 mt-2">Projects Completed</p>
            </div>
            <div
              ref={teamCounter.ref}
              className={`text-center transition-all duration-500 delay-300 ${statsInView ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
            >
              <p className="text-4xl sm:text-5xl font-bold text-[#C9A227] font-['Montserrat'] counter-value">
                {teamCounter.count}+
              </p>
              <p className="text-gray-600 mt-2">Team Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section data-testid="testimonials-section" className="section-padding bg-[#F8F9FA]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block px-4 py-2 bg-[#0B1F3B]/10 text-[#0B1F3B] text-sm font-medium rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1F3B] font-['Montserrat'] mb-12">
              What Our Clients Say
            </h2>

            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  data-testid={`testimonial-${index}`}
                  className={`transition-all duration-500 ${
                    index === currentTestimonial
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 absolute inset-0 translate-x-10"
                  }`}
                >
                  <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
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
                    <blockquote className="text-lg md:text-xl text-gray-700 italic mb-8">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center justify-center">
                      <img
                        src={testimonial.image_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop"}
                        alt={testimonial.client_name}
                        className="w-14 h-14 rounded-full object-cover mr-4"
                      />
                      <div className="text-left">
                        <p className="font-bold text-[#0B1F3B] font-['Montserrat']">
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

            {/* Dots Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  data-testid={`testimonial-dot-${index}`}
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

      {/* CTA Section */}
      <section data-testid="cta-section" className="section-padding gradient-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-['Montserrat'] mb-6">
            Ready to Build from Square One?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business challenges into growth opportunities.
          </p>
          <Link to="/contact">
            <Button
              data-testid="cta-schedule-btn"
              className="bg-[#C9A227] hover:bg-[#b08d1f] text-white font-semibold px-10 py-6 text-lg rounded transition-all hover:shadow-xl hover:scale-105"
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
