# SquareOne Services - Corporate Website PRD

## Original Problem Statement
Create a premium, dynamic, interactive, and visually striking corporate website for SquareOne Services and Consulting Private Limited - an Integrated Business Consulting Firm targeting Startups and SMEs.

## User Personas
1. **Startup Founders** - Looking for business foundation services, compliance advisory, and growth support
2. **SME Business Owners** - Need integrated HR, legal, and technology solutions
3. **HR Managers** - Seeking HR outsourcing, talent acquisition, payroll services
4. **Job Seekers** - Looking for career opportunities in consulting

## Core Requirements
- Premium corporate design with Navy (#0B1F3B) / Gold (#C9A227) color scheme
- Modern, dynamic website with smooth animations and micro-interactions
- Lead generation through contact forms and consultation booking
- Content management for blog/insights
- Career portal with job applications
- Email notifications for form submissions (Resend integration)

## Architecture
- **Frontend**: React with Tailwind CSS, Shadcn/UI components
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Email**: Resend API for notifications

## What's Been Implemented (February 2026)

### Pages Completed
1. **Home** - Hero section, services overview, why choose us, process timeline, stats counters, testimonials carousel, CTA
2. **About Us** - Company story, mission/vision, core values, leadership team
3. **Services** - 4 service categories with expandable accordion sections
4. **Industries** - 8 industry sectors served
5. **Why SquareOne** - Value propositions, differentiators, commitment section
6. **Insights/Blog** - Dynamic CMS with search and category filtering
7. **Careers** - Job listings with application functionality
8. **Contact** - Contact form with service dropdown, FAQ section
9. **Admin Dashboard** - Blog management, Job management, Testimonials, Leads

### Features Implemented
- ✅ Sticky navigation with scroll-aware styling
- ✅ Animated counters (Years, Clients, Projects, Team)
- ✅ Testimonials carousel with auto-rotation
- ✅ Service dropdown in contact form
- ✅ Job application with email notifications
- ✅ Blog CMS with publish/draft status
- ✅ Newsletter subscription
- ✅ Responsive mobile design
- ✅ Google Analytics structure ready

### API Endpoints
- `/api/contacts` - Lead capture
- `/api/blog` - Blog post CRUD
- `/api/jobs` - Job listing CRUD
- `/api/applications` - Job applications
- `/api/testimonials` - Testimonial management
- `/api/stats` - Site statistics
- `/api/newsletter` - Newsletter subscriptions

## Prioritized Backlog

### P0 (Critical) - Done
- [x] Core pages and navigation
- [x] Contact form with email notifications
- [x] Job listings and applications
- [x] Blog CMS

### P1 (High Priority) - Next Phase
- [ ] Add authentication for admin panel
- [ ] Image upload for blog posts
- [ ] Resume upload for job applications
- [ ] Google Analytics tracking ID configuration
- [ ] SEO meta tags for all pages

### P2 (Medium Priority)
- [ ] Multi-language support
- [ ] Advanced search with filters
- [ ] Related posts in blog
- [ ] Job alerts subscription
- [ ] Social sharing for blog posts

### P3 (Nice to Have)
- [ ] Live chat widget
- [ ] Client portal
- [ ] Case studies section
- [ ] Team member profiles
- [ ] Event calendar

## Next Action Items
1. Configure Google Analytics tracking ID
2. Add authentication to admin panel
3. Implement image upload functionality
4. Add SEO meta tags optimization
5. Set up email templates for different notification types
