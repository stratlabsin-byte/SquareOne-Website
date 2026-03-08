import React from "react";
import { Link } from "react-router-dom";
import { Target, Eye, Award, Users, Briefcase, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in everything we do, delivering high-quality solutions that exceed expectations."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe in the power of collaboration, working closely with clients as true partners in their success."
    },
    {
      icon: Award,
      title: "Integrity",
      description: "We operate with the highest standards of integrity, building trust through transparency and honesty."
    },
    {
      icon: Heart,
      title: "Client-Centric",
      description: "Our clients' success is our success. We put their needs at the center of everything we do."
    }
  ];

  const team = [
    {
      name: "Vikram Mehta",
      position: "Founder & Managing Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop",
      description: "20+ years of experience in business consulting and corporate strategy."
    },
    {
      name: "Anita Desai",
      position: "Director - HR Solutions",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop",
      description: "Expert in HR transformation with experience at Fortune 500 companies."
    },
    {
      name: "Rahul Sharma",
      position: "Director - Technology",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      description: "Technology leader with deep expertise in digital transformation."
    },
    {
      name: "Priya Kapoor",
      position: "Director - Legal & Compliance",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop",
      description: "Corporate law expert with extensive regulatory experience."
    }
  ];

  return (
    <div data-testid="about-page">
      {/* Hero Section */}
      <section className="pt-32 pb-20 gradient-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-[#C9A227]/20 text-[#C9A227] text-sm font-medium rounded-full mb-6">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-['Montserrat'] mb-6">
              Your Trusted Partner in Business Growth
            </h1>
            <p className="text-xl text-gray-300">
              Since 2014, ADVISERVE has been helping startups and SMEs build strong foundations
              and achieve sustainable growth through integrated business solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1F3B] font-['Montserrat'] mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                ADVISERVE Services and Consulting was founded with a simple yet powerful vision: 
                to be the single strategic partner that growing businesses need to navigate their 
                journey from inception to scale.
              </p>
              <p className="text-gray-600 mb-4">
                We recognized that startups and SMEs often struggle with multiple service providers 
                for different business needs - HR, legal, technology, and growth advisory. This 
                fragmented approach leads to inefficiencies, miscommunication, and missed opportunities.
              </p>
              <p className="text-gray-600">
                Our integrated approach brings together expertise across all critical business 
                functions under one roof, ensuring cohesive strategy and seamless execution for 
                our clients.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=500&fit=crop"
                alt="Team Meeting"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-[#0B1F3B] p-8 rounded-lg text-white">
                <p className="text-4xl font-bold font-['Montserrat']">2014</p>
                <p className="text-gray-300">Founded</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-padding bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-lg shadow-sm border-l-4 border-[#C9A227]">
              <div className="w-14 h-14 bg-[#C9A227]/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0B1F3B] font-['Montserrat'] mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600">
                To empower startups and SMEs with integrated business solutions that accelerate 
                growth, ensure compliance, and build sustainable competitive advantages. We aim 
                to be the catalyst that transforms ambitious ideas into thriving enterprises.
              </p>
            </div>
            <div className="bg-white p-10 rounded-lg shadow-sm border-l-4 border-[#0B1F3B]">
              <div className="w-14 h-14 bg-[#0B1F3B]/10 rounded-lg flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-[#0B1F3B]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0B1F3B] font-['Montserrat'] mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To be India's most trusted business consulting partner for growing enterprises, 
                known for our integrated approach, domain expertise, and unwavering commitment 
                to client success. We envision a future where every promising business has access 
                to world-class advisory support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1F3B] font-['Montserrat'] mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These values guide every interaction, decision, and solution we deliver.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                data-testid={`value-card-${index}`}
                className="text-center p-8 rounded-lg bg-[#F8F9FA] hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-[#C9A227]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-[#C9A227]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F3B] font-['Montserrat'] mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section data-testid="team-section" className="section-padding bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1F3B] font-['Montserrat'] mb-4">
              Leadership Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the experienced professionals driving ADVISERVE's mission forward.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={member.name}
                data-testid={`team-member-${index}`}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3B]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#0B1F3B] font-['Montserrat']">
                    {member.name}
                  </h3>
                  <p className="text-[#C9A227] text-sm font-medium mb-2">
                    {member.position}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Montserrat'] mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Let's discuss how ADVISERVE can become your strategic partner for growth.
          </p>
          <Link to="/contact">
            <Button
              data-testid="about-cta-btn"
              className="bg-[#C9A227] hover:bg-[#b08d1f] text-white font-semibold px-10 py-6 text-lg rounded transition-all hover:shadow-xl"
            >
              Get in Touch
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
