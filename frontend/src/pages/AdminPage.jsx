import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FileText, Briefcase, MessageSquare, Users, Plus, Edit, Trash2, 
  Settings, Mail, LogOut, User, BarChart3, Globe, Save, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost,
  getJobs, createJob, updateJob, deleteJob,
  getTestimonials, createTestimonial, deleteTestimonial,
  getContacts, getApplications, getStats, updateStats,
  getSiteSettings, updateSiteSettings, getNewsletterSubscribers, deleteNewsletterSubscriber
} from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Dashboard stats
  const [dashboardStats, setDashboardStats] = useState({
    totalContacts: 0,
    totalApplications: 0,
    totalPosts: 0,
    totalJobs: 0,
    totalSubscribers: 0
  });

  // Blog state
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [postForm, setPostForm] = useState({
    title: "", slug: "", excerpt: "", content: "", 
    category: "", author: "ADVISERVE Team", image_url: "", published: false
  });

  // Jobs state
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: "", department: "", location: "", type: "full-time",
    description: "", requirements: "", benefits: "", salary_range: "", active: true
  });

  // Testimonials state
  const [testimonials, setTestimonials] = useState([]);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    client_name: "", company: "", position: "", quote: "", 
    image_url: "", rating: 5, active: true
  });

  // Leads state
  const [contacts, setContacts] = useState([]);
  const [applications, setApplications] = useState([]);

  // Site Settings state
  const [siteSettings, setSiteSettings] = useState({});
  const [settingsLoading, setSettingsLoading] = useState(false);

  // Stats state
  const [stats, setStats] = useState({
    years_experience: 10,
    clients_served: 500,
    projects_completed: 1200,
    team_members: 75
  });

  // Newsletter state
  const [subscribers, setSubscribers] = useState([]);

  const [loading, setLoading] = useState(false);
  
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case "dashboard":
          const [contactsData, appsData, postsData, jobsData, subsData] = await Promise.all([
            getContacts(),
            getApplications(),
            getBlogPosts(false),
            getJobs(false),
            getNewsletterSubscribers().catch(() => [])
          ]);
          setDashboardStats({
            totalContacts: contactsData.length,
            totalApplications: appsData.length,
            totalPosts: postsData.length,
            totalJobs: jobsData.length,
            totalSubscribers: subsData.length
          });
          break;
        case "blog":
          const blogData = await getBlogPosts(false);
          setPosts(blogData);
          break;
        case "jobs":
          const jobsListData = await getJobs(false);
          setJobs(jobsListData);
          break;
        case "testimonials":
          const testimonialData = await getTestimonials(false);
          setTestimonials(testimonialData);
          break;
        case "leads":
          const [contactsList, appsList] = await Promise.all([
            getContacts(),
            getApplications()
          ]);
          setContacts(contactsList);
          setApplications(appsList);
          break;
        case "settings":
          const [settingsData, statsData] = await Promise.all([
            getSiteSettings(),
            getStats()
          ]);
          setSiteSettings(settingsData);
          setStats(statsData);
          break;
        case "newsletter":
          const subscribersList = await getNewsletterSubscribers();
          setSubscribers(subscribersList);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Blog handlers
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPost) {
        await updateBlogPost(editingPost.id, postForm);
        toast.success("Post updated successfully");
      } else {
        await createBlogPost(postForm);
        toast.success("Post created successfully");
      }
      setShowPostForm(false);
      setEditingPost(null);
      setPostForm({
        title: "", slug: "", excerpt: "", content: "", 
        category: "", author: "ADVISERVE Team", image_url: "", published: false
      });
      fetchData();
    } catch (error) {
      toast.error("Failed to save post");
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deleteBlogPost(id);
      toast.success("Post deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  // Job handlers
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    const jobData = {
      ...jobForm,
      requirements: jobForm.requirements.split('\n').filter(r => r.trim()),
      benefits: jobForm.benefits.split('\n').filter(b => b.trim())
    };
    try {
      if (editingJob) {
        await updateJob(editingJob.id, jobData);
        toast.success("Job updated successfully");
      } else {
        await createJob(jobData);
        toast.success("Job created successfully");
      }
      setShowJobForm(false);
      setEditingJob(null);
      setJobForm({
        title: "", department: "", location: "", type: "full-time",
        description: "", requirements: "", benefits: "", salary_range: "", active: true
      });
      fetchData();
    } catch (error) {
      toast.error("Failed to save job");
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await deleteJob(id);
      toast.success("Job deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  // Testimonial handlers
  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTestimonial(testimonialForm);
      toast.success("Testimonial added successfully");
      setShowTestimonialForm(false);
      setTestimonialForm({
        client_name: "", company: "", position: "", quote: "", 
        image_url: "", rating: 5, active: true
      });
      fetchData();
    } catch (error) {
      toast.error("Failed to add testimonial");
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      toast.success("Testimonial deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete testimonial");
    }
  };

  // Settings handlers
  const handleSaveSettings = async () => {
    setSettingsLoading(true);
    try {
      await updateSiteSettings(siteSettings);
      await updateStats(stats);
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setSettingsLoading(false);
    }
  };

  // Newsletter handlers
  const handleDeleteSubscriber = async (id) => {
    if (!window.confirm("Remove this subscriber?")) return;
    try {
      await deleteNewsletterSubscriber(id);
      toast.success("Subscriber removed");
      fetchData();
    } catch (error) {
      toast.error("Failed to remove subscriber");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  return (
    <div data-testid="admin-page" className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#0B1F3B] font-['Montserrat']">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your website content, settings, and leads
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm">
              <div className="w-8 h-8 rounded-full bg-[#0B1F3B] flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium">{user?.name || user?.email}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              data-testid="logout-btn"
              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white shadow-sm mb-8 flex-wrap h-auto p-1">
            <TabsTrigger value="dashboard" data-testid="tab-dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Overview
            </TabsTrigger>
            <TabsTrigger value="settings" data-testid="tab-settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" /> Site Settings
            </TabsTrigger>
            <TabsTrigger value="blog" data-testid="tab-blog" className="flex items-center gap-2">
              <FileText className="w-4 h-4" /> Blog
            </TabsTrigger>
            <TabsTrigger value="jobs" data-testid="tab-jobs" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Jobs
            </TabsTrigger>
            <TabsTrigger value="testimonials" data-testid="tab-testimonials" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Testimonials
            </TabsTrigger>
            <TabsTrigger value="leads" data-testid="tab-leads" className="flex items-center gap-2">
              <Users className="w-4 h-4" /> Leads
            </TabsTrigger>
            <TabsTrigger value="newsletter" data-testid="tab-newsletter" className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> Newsletter
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Contact Leads</p>
                      <p className="text-3xl font-bold text-[#0B1F3B]">{dashboardStats.totalContacts}</p>
                    </div>
                    <Users className="w-10 h-10 text-[#C9A227] opacity-50" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Job Applications</p>
                      <p className="text-3xl font-bold text-[#0B1F3B]">{dashboardStats.totalApplications}</p>
                    </div>
                    <Briefcase className="w-10 h-10 text-[#C9A227] opacity-50" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Blog Posts</p>
                      <p className="text-3xl font-bold text-[#0B1F3B]">{dashboardStats.totalPosts}</p>
                    </div>
                    <FileText className="w-10 h-10 text-[#C9A227] opacity-50" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Active Jobs</p>
                      <p className="text-3xl font-bold text-[#0B1F3B]">{dashboardStats.totalJobs}</p>
                    </div>
                    <Briefcase className="w-10 h-10 text-[#C9A227] opacity-50" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Subscribers</p>
                      <p className="text-3xl font-bold text-[#0B1F3B]">{dashboardStats.totalSubscribers}</p>
                    </div>
                    <Mail className="w-10 h-10 text-[#C9A227] opacity-50" />
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button onClick={() => setActiveTab("blog")} variant="outline" className="h-20 flex-col">
                    <Plus className="w-5 h-5 mb-2" />
                    New Blog Post
                  </Button>
                  <Button onClick={() => setActiveTab("jobs")} variant="outline" className="h-20 flex-col">
                    <Plus className="w-5 h-5 mb-2" />
                    New Job Listing
                  </Button>
                  <Button onClick={() => setActiveTab("testimonials")} variant="outline" className="h-20 flex-col">
                    <Plus className="w-5 h-5 mb-2" />
                    Add Testimonial
                  </Button>
                  <Button onClick={() => setActiveTab("settings")} variant="outline" className="h-20 flex-col">
                    <Settings className="w-5 h-5 mb-2" />
                    Site Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Site Settings Tab */}
          <TabsContent value="settings">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Company Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>Basic company details shown across the website</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Company Name</Label>
                    <Input
                      value={siteSettings.company_name || ""}
                      onChange={(e) => setSiteSettings({...siteSettings, company_name: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Tagline</Label>
                    <Input
                      value={siteSettings.tagline || ""}
                      onChange={(e) => setSiteSettings({...siteSettings, tagline: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Email</Label>
                      <Input
                        value={siteSettings.email || ""}
                        onChange={(e) => setSiteSettings({...siteSettings, email: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={siteSettings.phone || ""}
                        onChange={(e) => setSiteSettings({...siteSettings, phone: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input
                      value={siteSettings.address || ""}
                      onChange={(e) => setSiteSettings({...siteSettings, address: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>City, State, ZIP</Label>
                    <Input
                      value={siteSettings.city || ""}
                      onChange={(e) => setSiteSettings({...siteSettings, city: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Social & Map */}
              <Card>
                <CardHeader>
                  <CardTitle>Social Media & Map</CardTitle>
                  <CardDescription>Social links and Google Maps embed URL</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>LinkedIn URL</Label>
                    <Input
                      value={siteSettings.linkedin_url || ""}
                      onChange={(e) => setSiteSettings({...siteSettings, linkedin_url: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Twitter URL</Label>
                    <Input
                      value={siteSettings.twitter_url || ""}
                      onChange={(e) => setSiteSettings({...siteSettings, twitter_url: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Facebook URL</Label>
                    <Input
                      value={siteSettings.facebook_url || ""}
                      onChange={(e) => setSiteSettings({...siteSettings, facebook_url: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Google Maps Embed URL</Label>
                    <Input
                      value={siteSettings.map_embed_url || ""}
                      onChange={(e) => setSiteSettings({...siteSettings, map_embed_url: e.target.value})}
                      placeholder="https://www.google.com/maps/embed?pb=..."
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Go to Google Maps → Share → Embed a map → Copy the src URL</p>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Website Statistics</CardTitle>
                  <CardDescription>Numbers displayed on the homepage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Years of Experience</Label>
                      <Input
                        type="number"
                        value={stats.years_experience || 0}
                        onChange={(e) => setStats({...stats, years_experience: parseInt(e.target.value)})}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Clients Served</Label>
                      <Input
                        type="number"
                        value={stats.clients_served || 0}
                        onChange={(e) => setStats({...stats, clients_served: parseInt(e.target.value)})}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Projects Completed</Label>
                      <Input
                        type="number"
                        value={stats.projects_completed || 0}
                        onChange={(e) => setStats({...stats, projects_completed: parseInt(e.target.value)})}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Team Members</Label>
                      <Input
                        type="number"
                        value={stats.team_members || 0}
                        onChange={(e) => setStats({...stats, team_members: parseInt(e.target.value)})}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <Card>
                <CardHeader>
                  <CardTitle>Save Changes</CardTitle>
                  <CardDescription>Save all settings changes at once</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleSaveSettings} 
                    disabled={settingsLoading}
                    className="w-full bg-[#C9A227] hover:bg-[#b08d1f]"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {settingsLoading ? "Saving..." : "Save All Settings"}
                  </Button>
                </CardContent>
              </Card>

              {/* Privacy Policy */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Privacy Policy</CardTitle>
                  <CardDescription>HTML content for the privacy policy page</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={siteSettings.privacy_policy || ""}
                    onChange={(e) => setSiteSettings({...siteSettings, privacy_policy: e.target.value})}
                    rows={10}
                    className="font-mono text-sm"
                  />
                </CardContent>
              </Card>

              {/* Terms of Service */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Terms of Service</CardTitle>
                  <CardDescription>HTML content for the terms of service page</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={siteSettings.terms_of_service || ""}
                    onChange={(e) => setSiteSettings({...siteSettings, terms_of_service: e.target.value})}
                    rows={10}
                    className="font-mono text-sm"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Blog Posts</CardTitle>
                <Button
                  onClick={() => setShowPostForm(true)}
                  data-testid="add-post-btn"
                  className="bg-[#C9A227] hover:bg-[#b08d1f]"
                >
                  <Plus className="w-4 h-4 mr-2" /> New Post
                </Button>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8 text-gray-500">Loading...</div>
                ) : posts.length > 0 ? (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-[#0B1F3B]">{post.title}</h3>
                            {post.published ? (
                              <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
                                Published
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full">
                                Draft
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {post.category} • {formatDate(post.created_at)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingPost(post);
                              setPostForm(post);
                              setShowPostForm(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No blog posts yet. Create your first post!
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Job Listings</CardTitle>
                <Button
                  onClick={() => setShowJobForm(true)}
                  data-testid="add-job-btn"
                  className="bg-[#C9A227] hover:bg-[#b08d1f]"
                >
                  <Plus className="w-4 h-4 mr-2" /> New Job
                </Button>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8 text-gray-500">Loading...</div>
                ) : jobs.length > 0 ? (
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-[#0B1F3B]">{job.title}</h3>
                            {job.active ? (
                              <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
                                Active
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full">
                                Inactive
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {job.department} • {job.location} • {job.type}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingJob(job);
                              setJobForm({
                                ...job,
                                requirements: job.requirements?.join('\n') || '',
                                benefits: job.benefits?.join('\n') || ''
                              });
                              setShowJobForm(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteJob(job.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No job listings yet. Create your first job!
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Testimonials</CardTitle>
                <Button
                  onClick={() => setShowTestimonialForm(true)}
                  data-testid="add-testimonial-btn"
                  className="bg-[#C9A227] hover:bg-[#b08d1f]"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Testimonial
                </Button>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8 text-gray-500">Loading...</div>
                ) : testimonials.length > 0 ? (
                  <div className="space-y-4">
                    {testimonials.map((t) => (
                      <div
                        key={t.id}
                        className="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="italic text-gray-600 mb-2">"{t.quote}"</p>
                          <p className="font-semibold text-[#0B1F3B]">{t.client_name}</p>
                          <p className="text-sm text-gray-500">{t.position}, {t.company}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTestimonial(t.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No testimonials yet. Add your first one!
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Inquiries ({contacts.length})</CardTitle>
                </CardHeader>
                <CardContent className="max-h-[500px] overflow-y-auto">
                  {contacts.length > 0 ? (
                    <div className="space-y-4">
                      {contacts.map((contact) => (
                        <div key={contact.id} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-semibold text-[#0B1F3B]">{contact.name}</h4>
                            <span className="text-xs text-gray-500">{formatDate(contact.created_at)}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{contact.email}</p>
                          <p className="text-sm text-[#C9A227] font-medium mb-2">{contact.service_interest}</p>
                          <p className="text-sm text-gray-600">{contact.message}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No contact inquiries yet.
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Job Applications ({applications.length})</CardTitle>
                </CardHeader>
                <CardContent className="max-h-[500px] overflow-y-auto">
                  {applications.length > 0 ? (
                    <div className="space-y-4">
                      {applications.map((app) => (
                        <div key={app.id} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-semibold text-[#0B1F3B]">{app.name}</h4>
                            <span className="text-xs text-gray-500">{formatDate(app.created_at)}</span>
                          </div>
                          <p className="text-sm text-[#C9A227] font-medium mb-1">{app.job_title}</p>
                          <p className="text-sm text-gray-600">{app.email}</p>
                          <p className="text-sm text-gray-500">{app.phone}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No job applications yet.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Newsletter Tab */}
          <TabsContent value="newsletter">
            <Card>
              <CardHeader>
                <CardTitle>Newsletter Subscribers ({subscribers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8 text-gray-500">Loading...</div>
                ) : subscribers.length > 0 ? (
                  <div className="space-y-2">
                    {subscribers.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-[#0B1F3B]">{sub.email}</p>
                          <p className="text-xs text-gray-500">Subscribed: {formatDate(sub.subscribed_at)}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSubscriber(sub.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No newsletter subscribers yet.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Blog Post Form Dialog */}
        <Dialog open={showPostForm} onOpenChange={setShowPostForm}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? "Edit Blog Post" : "Create Blog Post"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Slug</Label>
                <Input
                  value={postForm.slug}
                  onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                  required
                  placeholder="url-friendly-slug"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Input
                    value={postForm.category}
                    onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Author</Label>
                  <Input
                    value={postForm.author}
                    onChange={(e) => setPostForm({ ...postForm, author: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label>Image URL</Label>
                <Input
                  value={postForm.image_url}
                  onChange={(e) => setPostForm({ ...postForm, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label>Excerpt</Label>
                <Textarea
                  value={postForm.excerpt}
                  onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                  required
                  rows={2}
                />
              </div>
              <div>
                <Label>Content (HTML)</Label>
                <Textarea
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  required
                  rows={8}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={postForm.published}
                  onCheckedChange={(checked) => setPostForm({ ...postForm, published: checked })}
                />
                <Label>Published</Label>
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => {
                  setShowPostForm(false);
                  setEditingPost(null);
                }}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#C9A227] hover:bg-[#b08d1f]">
                  {editingPost ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Job Form Dialog */}
        <Dialog open={showJobForm} onOpenChange={setShowJobForm}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingJob ? "Edit Job Listing" : "Create Job Listing"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleJobSubmit} className="space-y-4">
              <div>
                <Label>Job Title</Label>
                <Input
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Department</Label>
                  <Input
                    value={jobForm.department}
                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Type</Label>
                  <Input
                    value={jobForm.type}
                    onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                    required
                    placeholder="full-time, part-time, contract"
                  />
                </div>
                <div>
                  <Label>Salary Range</Label>
                  <Input
                    value={jobForm.salary_range}
                    onChange={(e) => setJobForm({ ...jobForm, salary_range: e.target.value })}
                    placeholder="₹10-15 LPA"
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  required
                  rows={3}
                />
              </div>
              <div>
                <Label>Requirements (one per line)</Label>
                <Textarea
                  value={jobForm.requirements}
                  onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                  required
                  rows={4}
                />
              </div>
              <div>
                <Label>Benefits (one per line)</Label>
                <Textarea
                  value={jobForm.benefits}
                  onChange={(e) => setJobForm({ ...jobForm, benefits: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={jobForm.active}
                  onCheckedChange={(checked) => setJobForm({ ...jobForm, active: checked })}
                />
                <Label>Active</Label>
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => {
                  setShowJobForm(false);
                  setEditingJob(null);
                }}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#C9A227] hover:bg-[#b08d1f]">
                  {editingJob ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Testimonial Form Dialog */}
        <Dialog open={showTestimonialForm} onOpenChange={setShowTestimonialForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Testimonial</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleTestimonialSubmit} className="space-y-4">
              <div>
                <Label>Client Name</Label>
                <Input
                  value={testimonialForm.client_name}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, client_name: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Company</Label>
                  <Input
                    value={testimonialForm.company}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Position</Label>
                  <Input
                    value={testimonialForm.position}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, position: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label>Quote</Label>
                <Textarea
                  value={testimonialForm.quote}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                  required
                  rows={3}
                />
              </div>
              <div>
                <Label>Image URL</Label>
                <Input
                  value={testimonialForm.image_url}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowTestimonialForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#C9A227] hover:bg-[#b08d1f]">
                  Add
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminPage;
