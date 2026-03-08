import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug } from "@/services/api";

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getBlogPostBySlug(slug);
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
        // Set placeholder post for demo
        setPost({
          title: "Article Not Found",
          content: "<p>The requested article could not be found. Please check the URL or browse our other articles.</p>",
          author: "ADVISERVE Team",
          category: "General",
          created_at: new Date().toISOString(),
          image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop"
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-gray-200 rounded mb-4" />
            <div className="h-12 w-full bg-gray-200 rounded mb-4" />
            <div className="h-4 w-48 bg-gray-200 rounded mb-8" />
            <div className="h-64 w-full bg-gray-200 rounded mb-8" />
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="blog-post-page">
      {/* Hero */}
      <section className="pt-32 pb-12 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/insights"
            data-testid="back-to-insights"
            className="inline-flex items-center text-[#0B1F3B] hover:text-[#C9A227] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Insights
          </Link>
          <span className="inline-block px-3 py-1 bg-[#C9A227] text-white text-xs font-medium rounded-full mb-4">
            {post?.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F3B] font-['Montserrat'] mb-6">
            {post?.title}
          </h1>
          <div className="flex flex-wrap items-center text-gray-500 text-sm gap-4">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(post?.created_at)}
            </span>
            <span className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {post?.author}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              data-testid="share-btn"
              className="ml-auto"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post?.image_url && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-xl"
          />
        </div>
      )}

      {/* Content */}
      <article className="section-padding bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg max-w-none prose-headings:font-['Montserrat'] prose-headings:text-[#0B1F3B] prose-a:text-[#C9A227] prose-strong:text-[#0B1F3B]"
            dangerouslySetInnerHTML={{ __html: post?.content }}
          />
        </div>
      </article>

      {/* Author Section */}
      <section className="py-12 bg-[#F8F9FA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#0B1F3B] flex items-center justify-center text-white font-bold text-xl mr-4">
              {post?.author?.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-[#0B1F3B] font-['Montserrat']">
                Written by {post?.author}
              </p>
              <p className="text-gray-500 text-sm">
                ADVISERVE Services and Consulting
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Montserrat'] mb-4">
            Need Expert Guidance?
          </h2>
          <p className="text-gray-300 mb-8">
            Our team is ready to help you implement these strategies for your business.
          </p>
          <Link to="/contact">
            <Button
              data-testid="blog-cta-btn"
              className="bg-[#C9A227] hover:bg-[#b08d1f] text-white font-semibold px-8 py-3"
            >
              Schedule a Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
