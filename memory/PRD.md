# SquareOne Services - Corporate Website PRD

## Original Problem Statement
Create a premium, dynamic, interactive, and visually striking corporate website for SquareOne Services and Consulting Private Limited - an Integrated Business Consulting Firm targeting Startups and SMEs.

## User Personas
1. **Startup Founders** - Looking for business foundation services, compliance advisory, and growth support
2. **SME Business Owners** - Need integrated HR, legal, and technology solutions
3. **HR Managers** - Seeking HR outsourcing, talent acquisition, payroll services
4. **Job Seekers** - Looking for career opportunities in consulting
5. **Admin Users** - Website administrators managing content, jobs, and leads

## Core Requirements
- Premium corporate design with Navy (#0B1F3B) / Gold (#C9A227) color scheme
- Modern, dynamic website with smooth animations and micro-interactions
- Lead generation through contact forms and consultation booking
- Content management for blog/insights
- Career portal with job applications
- Email notifications for form submissions (Resend integration)
- Secure admin authentication

## Architecture
- **Frontend**: React with Tailwind CSS, Shadcn/UI components
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Email**: Resend API for notifications
- **Auth**: JWT-based authentication with bcrypt password hashing

## What's Been Implemented (February 2026)

### Pages Completed (10 total)
1. **Home** - Hero section, services overview, stats counters, testimonials carousel, CTA
2. **About Us** - Company story, mission/vision, core values, leadership team
3. **Services** - 4 service categories with expandable accordion sections
4. **Industries** - 8 industry sectors served
5. **Why SquareOne** - Value propositions, differentiators, commitment section
6. **Insights/Blog** - Dynamic CMS with search and category filtering
7. **Careers** - Job listings with application functionality
8. **Contact** - Contact form with service dropdown, FAQ section
9. **Login** - Admin authentication with Sign In / Sign Up tabs
10. **Admin Dashboard** - Blog management, Job management, Testimonials, Leads

### Features Implemented
- ✅ Sticky navigation with scroll-aware styling
- ✅ Animated counters (Years, Clients, Projects, Team)
- ✅ Testimonials carousel with auto-rotation
- ✅ Service dropdown in contact form
- ✅ Job application with email notifications
- ✅ Blog CMS with publish/draft status
- ✅ Newsletter subscription
- ✅ Responsive mobile design
- ✅ Google Analytics structure ready (replace GA_MEASUREMENT_ID)
- ✅ JWT authentication for admin panel
- ✅ Protected admin routes
- ✅ SEO meta tags and Open Graph tags

### API Endpoints
**Public:**
- `/api/contacts` - Lead capture
- `/api/blog` - Blog posts (GET)
- `/api/jobs` - Job listings (GET)
- `/api/applications` - Job applications (POST)
- `/api/testimonials` - Testimonials (GET)
- `/api/stats` - Site statistics
- `/api/newsletter` - Newsletter subscriptions

**Protected (Admin):**
- `/api/auth/register` - Admin registration
- `/api/auth/login` - Admin login
- `/api/auth/me` - Current user info
- `/api/auth/verify` - Token verification
- `/api/blog` - Blog CRUD (POST, PUT, DELETE)
- `/api/jobs` - Job CRUD (POST, PUT, DELETE)
- `/api/testimonials` - Testimonial management

### Admin Credentials
- Email: admin@squareone.in
- Password: admin123

## Prioritized Backlog

### P0 (Critical) - Done ✅
- [x] Core pages and navigation
- [x] Contact form with email notifications
- [x] Job listings and applications
- [x] Blog CMS
- [x] JWT authentication for admin panel
- [x] Google Analytics structure

### P1 (High Priority) - Next Phase
- [ ] Add Google Analytics tracking ID
- [ ] Role-based access control (admin vs editor)
- [ ] Image upload for blog posts and testimonials
- [ ] Resume upload for job applications
- [ ] SEO meta tags for dynamic pages (blog posts)

### P2 (Medium Priority)
- [ ] Multi-language support
- [ ] Advanced search with filters
- [ ] Related posts in blog
- [ ] Job alerts subscription
- [ ] Social sharing for blog posts
- [ ] Password reset functionality

### P3 (Nice to Have)
- [ ] Live chat widget
- [ ] Client portal
- [ ] Case studies section
- [ ] Team member profiles
- [ ] Event calendar

## Next Action Items
1. Add your Google Analytics tracking ID in `/app/frontend/public/index.html` (replace GA_MEASUREMENT_ID)
2. Update testimonials with real client content via admin panel
3. Add actual job listings via admin panel
4. Create blog content for SEO
5. Consider implementing role-based access for multiple admin users
