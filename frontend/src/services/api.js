import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance
const apiClient = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==================== CONTACTS ====================
export const createContact = async (contactData) => {
  const response = await apiClient.post("/contacts", contactData);
  return response.data;
};

export const getContacts = async () => {
  const response = await apiClient.get("/contacts");
  return response.data;
};

// ==================== BLOG ====================
export const getBlogPosts = async (publishedOnly = true) => {
  const response = await apiClient.get(`/blog?published_only=${publishedOnly}`);
  return response.data;
};

export const getBlogPost = async (postId) => {
  const response = await apiClient.get(`/blog/${postId}`);
  return response.data;
};

export const getBlogPostBySlug = async (slug) => {
  const response = await apiClient.get(`/blog/slug/${slug}`);
  return response.data;
};

export const createBlogPost = async (postData) => {
  const response = await apiClient.post("/blog", postData);
  return response.data;
};

export const updateBlogPost = async (postId, postData) => {
  const response = await apiClient.put(`/blog/${postId}`, postData);
  return response.data;
};

export const deleteBlogPost = async (postId) => {
  const response = await apiClient.delete(`/blog/${postId}`);
  return response.data;
};

// ==================== JOBS ====================
export const getJobs = async (activeOnly = true) => {
  const response = await apiClient.get(`/jobs?active_only=${activeOnly}`);
  return response.data;
};

export const getJob = async (jobId) => {
  const response = await apiClient.get(`/jobs/${jobId}`);
  return response.data;
};

export const createJob = async (jobData) => {
  const response = await apiClient.post("/jobs", jobData);
  return response.data;
};

export const updateJob = async (jobId, jobData) => {
  const response = await apiClient.put(`/jobs/${jobId}`, jobData);
  return response.data;
};

export const deleteJob = async (jobId) => {
  const response = await apiClient.delete(`/jobs/${jobId}`);
  return response.data;
};

// ==================== JOB APPLICATIONS ====================
export const createJobApplication = async (applicationData) => {
  const response = await apiClient.post("/applications", applicationData);
  return response.data;
};

export const getApplications = async (jobId = null) => {
  const url = jobId ? `/applications?job_id=${jobId}` : "/applications";
  const response = await apiClient.get(url);
  return response.data;
};

// ==================== TESTIMONIALS ====================
export const getTestimonials = async (activeOnly = true) => {
  const response = await apiClient.get(`/testimonials?active_only=${activeOnly}`);
  return response.data;
};

export const createTestimonial = async (testimonialData) => {
  const response = await apiClient.post("/testimonials", testimonialData);
  return response.data;
};

export const deleteTestimonial = async (testimonialId) => {
  const response = await apiClient.delete(`/testimonials/${testimonialId}`);
  return response.data;
};

// ==================== STATS ====================
export const getStats = async () => {
  const response = await apiClient.get("/stats");
  return response.data;
};

export const updateStats = async (statsData) => {
  const response = await apiClient.put("/stats", statsData);
  return response.data;
};

// ==================== NEWSLETTER ====================
export const subscribeNewsletter = async (email) => {
  const response = await apiClient.post("/newsletter", { email });
  return response.data;
};

export const getNewsletterSubscribers = async () => {
  const response = await apiClient.get("/newsletter/subscribers");
  return response.data;
};

export const deleteNewsletterSubscriber = async (subscriberId) => {
  const response = await apiClient.delete(`/newsletter/${subscriberId}`);
  return response.data;
};

// ==================== SITE SETTINGS ====================
export const getSiteSettings = async () => {
  const response = await apiClient.get("/settings");
  return response.data;
};

export const updateSiteSettings = async (settingsData) => {
  const response = await apiClient.put("/settings", settingsData);
  return response.data;
};

// ==================== SEED ====================
export const seedData = async () => {
  const response = await apiClient.post("/seed");
  return response.data;
};

export default apiClient;
