import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createContact, getSiteSettings } from "@/services/api";
import { toast } from "sonner";

const ContactPage = () => {
  const [siteSettings, setSiteSettings] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service_interest: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSiteSettings();
        setSiteSettings(data);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };
    fetchSettings();
  }, []);

  const services = [
    "Business Foundation Services",
    "Workforce & HR Solutions",
    "Growth & Capability Development",
    "Technology & Digital Services",
    "General Inquiry"
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (value) => {
    setFormData({ ...formData, service_interest: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await createContact(formData);
      setSubmitted(true);
      toast.success("Message sent successfully! We'll get back to you soon.");
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: siteSettings.email || "info@adviserve.in",
      link: `mailto:${siteSettings.email || "info@adviserve.in"}`
    },
    {
      icon: Phone,
      title: "Call Us",
      details: siteSettings.phone || "+91 123 456 7890",
      link: `tel:${(siteSettings.phone || "+91 123 456 7890").replace(/\s/g, '')}`
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: siteSettings.city || "Mumbai, Maharashtra, India"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon - Fri: 9:00 AM - 6:00 PM"
    }
  ];

  const defaultMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1645000000000!5m2!1sen!2sin";

  if (submitted) {
    return (
      <div data-testid="contact-success" className="min-h-screen flex items-center justify-center bg-[#F8F9FA] pt-20">
        <div className="text-center max-w-lg mx-auto px-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-[#0B1F3B] font-['Montserrat'] mb-4">
            Thank You!
          </h1>
          <p className="text-gray-600 mb-8">
            Your message has been received. Our team will review your inquiry and get back 
            to you within 24-48 business hours.
          </p>
          <Button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                service_interest: "",
                message: ""
              });
            }}
            className="bg-[#0B1F3B] hover:bg-[#1a3b66] text-white"
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="contact-page">
      {/* Hero Section */}
      <section className="pt-32 pb-20 gradient-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-[#C9A227]/20 text-[#C9A227] text-sm font-medium rounded-full mb-6">
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-['Montserrat'] mb-6">
              Let's Start a Conversation
            </h1>
            <p className="text-xl text-gray-300">
              Ready to transform your business? Our team is here to help you navigate 
              your growth journey. Reach out and let's discuss how we can work together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-[#0B1F3B] font-['Montserrat'] mb-8">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div
                    key={item.title}
                    data-testid={`contact-info-${index}`}
                    className="flex items-start"
                  >
                    <div className="w-12 h-12 bg-[#C9A227]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#C9A227]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0B1F3B] font-['Montserrat']">
                        {item.title}
                      </h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-gray-600 hover:text-[#C9A227] transition-colors"
                        >
                          {item.details}
                        </a>
                      ) : (
                        <p className="text-gray-600">{item.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Map */}
              <div className="mt-8 rounded-lg overflow-hidden shadow-md h-52">
                <iframe
                  src={siteSettings.map_embed_url || defaultMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-[#0B1F3B] font-['Montserrat'] mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        data-testid="contact-name"
                        placeholder="John Doe"
                        className="mt-1 border-gray-200 focus:border-[#C9A227]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        data-testid="contact-email"
                        placeholder="john@company.com"
                        className="mt-1 border-gray-200 focus:border-[#C9A227]"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        data-testid="contact-phone"
                        placeholder="+91 98765 43210"
                        className="mt-1 border-gray-200 focus:border-[#C9A227]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        data-testid="contact-company"
                        placeholder="Your Company"
                        className="mt-1 border-gray-200 focus:border-[#C9A227]"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="service_interest">Service of Interest</Label>
                    <Select onValueChange={handleServiceChange} value={formData.service_interest}>
                      <SelectTrigger data-testid="contact-service" className="mt-1 border-gray-200 focus:border-[#C9A227]">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      data-testid="contact-message"
                      placeholder="Tell us about your business needs..."
                      className="mt-1 border-gray-200 focus:border-[#C9A227]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    data-testid="contact-submit"
                    className="w-full bg-[#C9A227] hover:bg-[#b08d1f] text-white font-semibold py-6 text-lg transition-all"
                  >
                    {submitting ? "Sending..." : "Send Message"}
                    <Send className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1F3B] font-['Montserrat'] mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-6">
            <div className="bg-[#F8F9FA] p-6 rounded-lg">
              <h3 className="font-semibold text-[#0B1F3B] font-['Montserrat'] mb-2">
                How quickly can you start working with us?
              </h3>
              <p className="text-gray-600">
                We can typically begin engagement within 1-2 weeks of the initial consultation, 
                depending on the scope of services required.
              </p>
            </div>
            <div className="bg-[#F8F9FA] p-6 rounded-lg">
              <h3 className="font-semibold text-[#0B1F3B] font-['Montserrat'] mb-2">
                Do you work with startups or only established companies?
              </h3>
              <p className="text-gray-600">
                We work with businesses at all stages - from early-stage startups to established 
                SMEs. Our solutions are tailored to match your current stage and growth objectives.
              </p>
            </div>
            <div className="bg-[#F8F9FA] p-6 rounded-lg">
              <h3 className="font-semibold text-[#0B1F3B] font-['Montserrat'] mb-2">
                What is your pricing model?
              </h3>
              <p className="text-gray-600">
                We offer flexible pricing models including project-based, retainer, and 
                subscription options. Contact us for a customized proposal based on your needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
