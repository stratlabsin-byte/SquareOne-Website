import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogPosts } from "@/services/api";

const InsightsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogPosts(true);
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const categories = ["all", ...new Set(posts.map(post => post.category))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Placeholder posts for when database is empty
  const placeholderPosts = [
    {
      id: "1",
      title: "5 Key Strategies for SME Growth in 2024",
      slug: "sme-growth-strategies-2024",
      excerpt: "Discover the essential strategies that successful SMEs are implementing to drive sustainable growth in today's competitive landscape.",
      category: "Business Strategy",
      author: "ADVISERVE Team",
      image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      created_at: new Date().toISOString()
    },
    {
      id: "2",
      title: "Navigating HR Compliance in India",
      slug: "hr-compliance-india-guide",
      excerpt: "Understanding and managing HR compliance requirements is crucial for every business operating in India.",
      category: "HR Solutions",
      author: "ADVISERVE Team",
      image_url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
      created_at: new Date().toISOString()
    },
    {
      id: "3",
      title: "Digital Transformation for SMEs",
      slug: "digital-transformation-sme",
      excerpt: "Learn how small and medium enterprises can leverage technology to streamline operations and boost productivity.",
      category: "Technology",
      author: "ADVISERVE Team",
      image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      created_at: new Date().toISOString()
    }
  ];

  const displayPosts = filteredPosts.length > 0 ? filteredPosts : placeholderPosts;

  return (
    <div data-testid="insights-page">
      {/* Hero Section */}
      <section className="pt-32 pb-20 gradient-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-[#C9A227]/20 text-[#C9A227] text-sm font-medium rounded-full mb-6">
              Insights & Resources
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-['Montserrat'] mb-6">
              Knowledge Hub for Growing Businesses
            </h1>
            <p className="text-xl text-gray-300">
              Expert insights, industry trends, and practical guides to help your business 
              navigate challenges and seize opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="search-input"
                className="pl-10 border-gray-200 focus:border-[#C9A227]"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`category-${category}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? "bg-[#0B1F3B] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category === "all" ? "All Categories" : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-white overflow-hidden">
                  <div className="h-48 skeleton" />
                  <CardContent className="p-6">
                    <div className="h-4 w-20 skeleton mb-3" />
                    <div className="h-6 w-full skeleton mb-2" />
                    <div className="h-4 w-full skeleton mb-4" />
                    <div className="h-4 w-32 skeleton" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {displayPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayPosts.map((post, index) => (
                    <Card
                      key={post.id}
                      data-testid={`blog-post-${index}`}
                      className="bg-white border-none shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group card-hover"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image_url || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop"}
                          alt={post.title}
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
                        <h3 className="text-xl font-bold text-[#0B1F3B] font-['Montserrat'] mb-3 line-clamp-2 group-hover:text-[#C9A227] transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                        <Link
                          to={`/insights/${post.slug}`}
                          className="inline-flex items-center text-[#C9A227] font-medium text-sm group-hover:translate-x-2 transition-transform"
                        >
                          Read More <ArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                    variant="outline"
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1F3B] font-['Montserrat'] mb-4">
            Stay Informed
          </h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter for the latest insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              data-testid="newsletter-email-insights"
              className="flex-1 border-gray-200 focus:border-[#C9A227]"
            />
            <Button
              data-testid="newsletter-subscribe-btn"
              className="bg-[#C9A227] hover:bg-[#b08d1f] text-white font-semibold px-8"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InsightsPage;
