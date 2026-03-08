import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Briefcase, ArrowRight, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getJobs, createJobApplication } from "@/services/api";
import { toast } from "sonner";

const CareersPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin_url: "",
    cover_letter: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const applyFormRef = useRef(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs(true);
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Auto-scroll to application form when isApplying is set
  useEffect(() => {
    if (isApplying && applyFormRef.current) {
      applyFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isApplying]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;

    setSubmitting(true);
    try {
      await createJobApplication({
        job_id: selectedJob.id,
        ...formData
      });
      toast.success("Application submitted successfully!");
      setIsApplying(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        linkedin_url: "",
        cover_letter: ""
      });
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const benefits = [
    "Competitive salary and performance bonuses",
    "Health insurance for you and your family",
    "Professional development opportunities",
    "Flexible work arrangements",
    "Collaborative and inclusive culture",
    "Growth-oriented career paths"
  ];

  // Placeholder jobs when database is empty
  const placeholderJobs = [
    {
      id: "placeholder-1",
      title: "Senior Business Consultant",
      department: "Consulting",
      location: "Mumbai, India",
      type: "full-time",
      description: "Lead strategic consulting engagements for SME clients across various industries.",
      requirements: ["MBA from reputed institution", "5+ years consulting experience", "Strong analytical skills"],
      salary_range: "₹15-25 LPA"
    },
    {
      id: "placeholder-2",
      title: "HR Solutions Manager",
      department: "HR Services",
      location: "Bangalore, India",
      type: "full-time",
      description: "Manage HR outsourcing engagements and develop talent acquisition strategies.",
      requirements: ["Bachelor's in HR", "3+ years HR consulting", "Knowledge of labor laws"],
      salary_range: "₹10-18 LPA"
    }
  ];

  const displayJobs = jobs.length > 0 ? jobs : placeholderJobs;

  return (
    <div data-testid="careers-page">
      {/* Hero Section */}
      <section className="pt-32 pb-20 gradient-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-[#C9A227]/20 text-[#C9A227] text-sm font-medium rounded-full mb-6">
                Careers at ADVISERVE
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white font-['Montserrat'] mb-6">
                Build Your Career With Us
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Join a team of passionate professionals dedicated to helping businesses grow. 
                Discover opportunities that challenge and inspire.
              </p>
              <a href="#openings">
                <Button
                  data-testid="view-openings-btn"
                  className="bg-[#C9A227] hover:bg-[#b08d1f] text-white font-semibold px-8 py-3"
                >
                  View Open Positions
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                alt="Team Collaboration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2D3C] font-['Montserrat'] mb-6">
                Why Join ADVISERVE?
              </h2>
              <p className="text-gray-600 mb-8">
                At ADVISERVE, you'll work with diverse clients, tackle challenging problems,
                and grow alongside talented colleagues. We invest in our people because we
                believe they are our greatest asset.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-[#C9A227]/20 flex items-center justify-center mr-3">
                      <span className="w-2 h-2 bg-[#C9A227] rounded-full" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&h=500&fit=crop"
                alt="Office Culture"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="section-padding bg-[#F5F7F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2D3C] font-['Montserrat'] mb-4">
              Current Openings
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our open positions and find the right opportunity for your career.
            </p>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-white">
                  <CardContent className="p-6">
                    <div className="h-6 w-48 skeleton mb-2" />
                    <div className="h-4 w-full skeleton mb-4" />
                    <div className="h-4 w-32 skeleton" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : displayJobs.length > 0 ? (
            <div className="space-y-6">
              {displayJobs.map((job, index) => (
                <Card
                  key={job.id}
                  data-testid={`job-card-${index}`}
                  className="bg-white border-none shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-[#0F2D3C] font-['Montserrat']">
                            {job.title}
                          </h3>
                          <span className="px-3 py-1 bg-[#C9A227]/10 text-[#C9A227] text-xs font-medium rounded-full">
                            {job.department}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{job.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {job.type}
                          </span>
                          {job.salary_range && (
                            <span className="flex items-center">
                              <Briefcase className="w-4 h-4 mr-1" />
                              {job.salary_range}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setSelectedJob(job)}
                          data-testid={`view-job-${index}`}
                          className="border-[#0F2D3C] text-[#0F2D3C] hover:bg-[#0F2D3C] hover:text-white"
                        >
                          View Details
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedJob(job);
                            setIsApplying(true);
                          }}
                          data-testid={`apply-job-${index}`}
                          className="bg-[#C9A227] hover:bg-[#b08d1f] text-white"
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg mb-4">No open positions at the moment.</p>
              <p className="text-gray-600">
                Send your resume to{" "}
                <a href="mailto:careers@adviserve.org.in" className="text-[#C9A227] font-semibold">
                  careers@adviserve.org.in
                </a>{" "}
                and we'll reach out when suitable positions open up.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Job Details Dialog */}
      <Dialog open={!!selectedJob && !isApplying} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#0F2D3C] font-['Montserrat']">
              {selectedJob?.title}
            </DialogTitle>
            <DialogDescription className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center text-gray-500">
                <MapPin className="w-4 h-4 mr-1" />
                {selectedJob?.location}
              </span>
              <span className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {selectedJob?.type}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-6">
            <div>
              <h4 className="font-semibold text-[#0F2D3C] mb-2">About the Role</h4>
              <p className="text-gray-600">{selectedJob?.description}</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#0F2D3C] mb-2">Requirements</h4>
              <ul className="space-y-2">
                {selectedJob?.requirements?.map((req, i) => (
                  <li key={i} className="flex items-start text-gray-600">
                    <span className="w-2 h-2 bg-[#C9A227] rounded-full mt-2 mr-3" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            {selectedJob?.benefits?.length > 0 && (
              <div>
                <h4 className="font-semibold text-[#0F2D3C] mb-2">Benefits</h4>
                <ul className="space-y-2">
                  {selectedJob?.benefits?.map((benefit, i) => (
                    <li key={i} className="flex items-start text-gray-600">
                      <span className="w-2 h-2 bg-[#C9A227] rounded-full mt-2 mr-3" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {selectedJob?.salary_range && (
              <div>
                <h4 className="font-semibold text-[#0F2D3C] mb-2">Salary Range</h4>
                <p className="text-[#C9A227] font-semibold">{selectedJob.salary_range}</p>
              </div>
            )}
            <Button
              onClick={() => setIsApplying(true)}
              data-testid="apply-from-details"
              className="w-full bg-[#C9A227] hover:bg-[#b08d1f] text-white"
            >
              Apply for this Position
              <Send className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Inline Application Form */}
      {isApplying && selectedJob && (
        <section ref={applyFormRef} className="section-padding bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#F5F7F8] p-8 md:p-10 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#0F2D3C] font-['Montserrat']">
                  Apply for {selectedJob.title}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsApplying(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <form onSubmit={handleApply} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      data-testid="apply-name"
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
                      data-testid="apply-email"
                      className="mt-1 border-gray-200 focus:border-[#C9A227]"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      data-testid="apply-phone"
                      className="mt-1 border-gray-200 focus:border-[#C9A227]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin_url">LinkedIn Profile URL</Label>
                    <Input
                      id="linkedin_url"
                      name="linkedin_url"
                      value={formData.linkedin_url}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                      data-testid="apply-linkedin"
                      className="mt-1 border-gray-200 focus:border-[#C9A227]"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cover_letter">Cover Letter</Label>
                  <Textarea
                    id="cover_letter"
                    name="cover_letter"
                    value={formData.cover_letter}
                    onChange={handleInputChange}
                    placeholder="Tell us why you're interested in this role..."
                    rows={4}
                    data-testid="apply-cover-letter"
                    className="mt-1 border-gray-200 focus:border-[#C9A227]"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  data-testid="submit-application"
                  className="w-full bg-[#C9A227] hover:bg-[#b08d1f] text-white font-semibold py-3"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                  <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding gradient-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Montserrat'] mb-6">
            Don't See the Right Role?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            We're always looking for talented individuals. Send us your resume and we'll 
            keep you in mind for future opportunities.
          </p>
          <a href="mailto:careers@adviserve.org.in">
            <Button
              data-testid="careers-email-btn"
              className="bg-[#C9A227] hover:bg-[#b08d1f] text-white font-semibold px-10 py-6 text-lg rounded transition-all hover:shadow-xl"
            >
              Email Your Resume
              <Send className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
