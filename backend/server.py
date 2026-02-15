from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import resend
import jwt
from passlib.context import CryptContext

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', 'onboarding@resend.dev')

# JWT Configuration
JWT_SECRET = os.environ.get('JWT_SECRET', 'squareone-secret-key-change-in-production-2024')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Security
security = HTTPBearer()

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ==================== AUTH HELPERS ====================

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = decode_token(token)
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")
    
    user = await db.admin_users.find_one({"id": user_id}, {"_id": 0, "password": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

# ==================== AUTH MODELS ====================

class AdminUserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str

class AdminUserLogin(BaseModel):
    email: EmailStr
    password: str

class AdminUser(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    name: str
    password: str
    role: str = "admin"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

# ==================== MODELS ====================

# Contact/Lead Models
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str = ""
    company: str = ""
    service_interest: str = ""
    message: str

class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = ""
    company: str = ""
    service_interest: str = ""
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"

# Blog/Insights Models
class BlogPostCreate(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    category: str
    author: str
    image_url: str = ""
    published: bool = False

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    author: Optional[str] = None
    image_url: Optional[str] = None
    published: Optional[bool] = None

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    excerpt: str
    content: str
    category: str
    author: str
    image_url: str = ""
    published: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Career/Job Models
class JobCreate(BaseModel):
    title: str
    department: str
    location: str
    type: str  # full-time, part-time, contract
    description: str
    requirements: List[str]
    benefits: List[str] = []
    salary_range: str = ""
    active: bool = True

class JobUpdate(BaseModel):
    title: Optional[str] = None
    department: Optional[str] = None
    location: Optional[str] = None
    type: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[List[str]] = None
    benefits: Optional[List[str]] = None
    salary_range: Optional[str] = None
    active: Optional[bool] = None

class Job(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    department: str
    location: str
    type: str
    description: str
    requirements: List[str]
    benefits: List[str] = []
    salary_range: str = ""
    active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class JobApplicationCreate(BaseModel):
    job_id: str
    name: str
    email: EmailStr
    phone: str
    resume_url: str = ""
    cover_letter: str = ""
    linkedin_url: str = ""

class JobApplication(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    job_id: str
    job_title: str = ""
    name: str
    email: str
    phone: str
    resume_url: str = ""
    cover_letter: str = ""
    linkedin_url: str = ""
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Testimonial Models
class TestimonialCreate(BaseModel):
    client_name: str
    company: str
    position: str
    quote: str
    image_url: str = ""
    rating: int = 5
    active: bool = True

class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    company: str
    position: str
    quote: str
    image_url: str = ""
    rating: int = 5
    active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Stats Model
class StatsUpdate(BaseModel):
    years_experience: int = 10
    clients_served: int = 500
    projects_completed: int = 1000
    team_members: int = 50

class Stats(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = "main_stats"
    years_experience: int = 10
    clients_served: int = 500
    projects_completed: int = 1000
    team_members: int = 50

# Newsletter Model
class NewsletterSubscribe(BaseModel):
    email: EmailStr

class NewsletterSubscription(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    subscribed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    active: bool = True

# ==================== EMAIL HELPER ====================

async def send_notification_email(subject: str, html_content: str):
    """Send email notification using Resend"""
    if not resend.api_key:
        logger.warning("Resend API key not configured, skipping email")
        return None
    
    params = {
        "from": SENDER_EMAIL,
        "to": [NOTIFICATION_EMAIL],
        "subject": subject,
        "html": html_content
    }
    
    try:
        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email sent successfully: {email.get('id')}")
        return email
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return None

# ==================== ROUTES ====================

@api_router.get("/")
async def root():
    return {"message": "SquareOne Services API"}

# ==================== CONTACT ROUTES ====================

@api_router.post("/contacts", response_model=Contact)
async def create_contact(input: ContactCreate):
    contact = Contact(**input.model_dump())
    doc = contact.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contacts.insert_one(doc)
    
    # Send email notification
    html_content = f"""
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> {contact.name}</p>
    <p><strong>Email:</strong> {contact.email}</p>
    <p><strong>Phone:</strong> {contact.phone}</p>
    <p><strong>Company:</strong> {contact.company}</p>
    <p><strong>Service Interest:</strong> {contact.service_interest}</p>
    <p><strong>Message:</strong></p>
    <p>{contact.message}</p>
    """
    await send_notification_email(
        f"New Lead: {contact.name} - {contact.service_interest}",
        html_content
    )
    
    return contact

@api_router.get("/contacts", response_model=List[Contact])
async def get_contacts():
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    for c in contacts:
        if isinstance(c.get('created_at'), str):
            c['created_at'] = datetime.fromisoformat(c['created_at'])
    return contacts

# ==================== BLOG ROUTES ====================

@api_router.post("/blog", response_model=BlogPost)
async def create_blog_post(input: BlogPostCreate):
    post = BlogPost(**input.model_dump())
    doc = post.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    
    await db.blog_posts.insert_one(doc)
    return post

@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts(published_only: bool = True):
    query = {"published": True} if published_only else {}
    posts = await db.blog_posts.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    for p in posts:
        if isinstance(p.get('created_at'), str):
            p['created_at'] = datetime.fromisoformat(p['created_at'])
        if isinstance(p.get('updated_at'), str):
            p['updated_at'] = datetime.fromisoformat(p['updated_at'])
    return posts

@api_router.get("/blog/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str):
    post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    if isinstance(post.get('created_at'), str):
        post['created_at'] = datetime.fromisoformat(post['created_at'])
    if isinstance(post.get('updated_at'), str):
        post['updated_at'] = datetime.fromisoformat(post['updated_at'])
    return post

@api_router.get("/blog/slug/{slug}", response_model=BlogPost)
async def get_blog_post_by_slug(slug: str):
    post = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    if isinstance(post.get('created_at'), str):
        post['created_at'] = datetime.fromisoformat(post['created_at'])
    if isinstance(post.get('updated_at'), str):
        post['updated_at'] = datetime.fromisoformat(post['updated_at'])
    return post

@api_router.put("/blog/{post_id}", response_model=BlogPost)
async def update_blog_post(post_id: str, input: BlogPostUpdate):
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    update_data['updated_at'] = datetime.now(timezone.utc).isoformat()
    
    result = await db.blog_posts.update_one(
        {"id": post_id},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    return await get_blog_post(post_id)

@api_router.delete("/blog/{post_id}")
async def delete_blog_post(post_id: str):
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return {"message": "Blog post deleted"}

# ==================== JOB ROUTES ====================

@api_router.post("/jobs", response_model=Job)
async def create_job(input: JobCreate):
    job = Job(**input.model_dump())
    doc = job.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.jobs.insert_one(doc)
    return job

@api_router.get("/jobs", response_model=List[Job])
async def get_jobs(active_only: bool = True):
    query = {"active": True} if active_only else {}
    jobs = await db.jobs.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    for j in jobs:
        if isinstance(j.get('created_at'), str):
            j['created_at'] = datetime.fromisoformat(j['created_at'])
    return jobs

@api_router.get("/jobs/{job_id}", response_model=Job)
async def get_job(job_id: str):
    job = await db.jobs.find_one({"id": job_id}, {"_id": 0})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if isinstance(job.get('created_at'), str):
        job['created_at'] = datetime.fromisoformat(job['created_at'])
    return job

@api_router.put("/jobs/{job_id}", response_model=Job)
async def update_job(job_id: str, input: JobUpdate):
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    
    result = await db.jobs.update_one(
        {"id": job_id},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Job not found")
    
    return await get_job(job_id)

@api_router.delete("/jobs/{job_id}")
async def delete_job(job_id: str):
    result = await db.jobs.delete_one({"id": job_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Job not found")
    return {"message": "Job deleted"}

# ==================== JOB APPLICATION ROUTES ====================

@api_router.post("/applications", response_model=JobApplication)
async def create_job_application(input: JobApplicationCreate):
    # Get job title
    job = await db.jobs.find_one({"id": input.job_id}, {"_id": 0})
    job_title = job.get('title', 'Unknown Position') if job else 'Unknown Position'
    
    application = JobApplication(**input.model_dump(), job_title=job_title)
    doc = application.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.job_applications.insert_one(doc)
    
    # Send email notification
    html_content = f"""
    <h2>New Job Application</h2>
    <p><strong>Position:</strong> {job_title}</p>
    <p><strong>Name:</strong> {application.name}</p>
    <p><strong>Email:</strong> {application.email}</p>
    <p><strong>Phone:</strong> {application.phone}</p>
    <p><strong>LinkedIn:</strong> {application.linkedin_url}</p>
    <p><strong>Cover Letter:</strong></p>
    <p>{application.cover_letter}</p>
    """
    await send_notification_email(
        f"New Application: {application.name} for {job_title}",
        html_content
    )
    
    return application

@api_router.get("/applications", response_model=List[JobApplication])
async def get_applications(job_id: Optional[str] = None):
    query = {"job_id": job_id} if job_id else {}
    applications = await db.job_applications.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for a in applications:
        if isinstance(a.get('created_at'), str):
            a['created_at'] = datetime.fromisoformat(a['created_at'])
    return applications

# ==================== TESTIMONIAL ROUTES ====================

@api_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(input: TestimonialCreate):
    testimonial = Testimonial(**input.model_dump())
    doc = testimonial.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.testimonials.insert_one(doc)
    return testimonial

@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials(active_only: bool = True):
    query = {"active": True} if active_only else {}
    testimonials = await db.testimonials.find(query, {"_id": 0}).to_list(100)
    for t in testimonials:
        if isinstance(t.get('created_at'), str):
            t['created_at'] = datetime.fromisoformat(t['created_at'])
    return testimonials

@api_router.delete("/testimonials/{testimonial_id}")
async def delete_testimonial(testimonial_id: str):
    result = await db.testimonials.delete_one({"id": testimonial_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"message": "Testimonial deleted"}

# ==================== STATS ROUTES ====================

@api_router.get("/stats", response_model=Stats)
async def get_stats():
    stats = await db.stats.find_one({"id": "main_stats"}, {"_id": 0})
    if not stats:
        # Return default stats if not set
        return Stats()
    return stats

@api_router.put("/stats", response_model=Stats)
async def update_stats(input: StatsUpdate):
    stats = Stats(**input.model_dump())
    doc = stats.model_dump()
    
    await db.stats.update_one(
        {"id": "main_stats"},
        {"$set": doc},
        upsert=True
    )
    return stats

# ==================== NEWSLETTER ROUTES ====================

@api_router.post("/newsletter", response_model=NewsletterSubscription)
async def subscribe_newsletter(input: NewsletterSubscribe):
    # Check if already subscribed
    existing = await db.newsletter.find_one({"email": input.email}, {"_id": 0})
    if existing:
        return existing
    
    subscription = NewsletterSubscription(email=input.email)
    doc = subscription.model_dump()
    doc['subscribed_at'] = doc['subscribed_at'].isoformat()
    
    await db.newsletter.insert_one(doc)
    return subscription

# ==================== SEED DATA ====================

@api_router.post("/seed")
async def seed_data():
    """Seed initial data for the website"""
    
    # Seed testimonials
    testimonials_data = [
        {
            "client_name": "Rajesh Kumar",
            "company": "TechStart Solutions",
            "position": "Founder & CEO",
            "quote": "SquareOne transformed our startup's operations. Their integrated approach to business consulting helped us scale from 5 to 50 employees in just 18 months.",
            "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
            "rating": 5
        },
        {
            "client_name": "Priya Sharma",
            "company": "GreenLeaf Industries",
            "position": "Managing Director",
            "quote": "The HR solutions and compliance advisory from SquareOne gave us peace of mind. They truly understand the challenges SMEs face in India.",
            "image_url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
            "rating": 5
        },
        {
            "client_name": "Amit Patel",
            "company": "Innovate Digital",
            "position": "CTO",
            "quote": "Their IT consulting and digital transformation services helped us modernize our entire tech stack. Exceptional expertise and professional delivery.",
            "image_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
            "rating": 5
        }
    ]
    
    for t in testimonials_data:
        existing = await db.testimonials.find_one({"client_name": t["client_name"]}, {"_id": 0})
        if not existing:
            testimonial = Testimonial(**t)
            doc = testimonial.model_dump()
            doc['created_at'] = doc['created_at'].isoformat()
            await db.testimonials.insert_one(doc)
    
    # Seed stats
    await db.stats.update_one(
        {"id": "main_stats"},
        {"$set": {
            "id": "main_stats",
            "years_experience": 10,
            "clients_served": 500,
            "projects_completed": 1200,
            "team_members": 75
        }},
        upsert=True
    )
    
    # Seed sample jobs
    jobs_data = [
        {
            "title": "Senior Business Consultant",
            "department": "Consulting",
            "location": "Mumbai, India",
            "type": "full-time",
            "description": "Lead strategic consulting engagements for SME clients across various industries. Drive business transformation initiatives and deliver measurable results.",
            "requirements": [
                "MBA from a reputed institution",
                "5+ years of management consulting experience",
                "Strong analytical and problem-solving skills",
                "Excellent communication and presentation abilities",
                "Experience with SME clients preferred"
            ],
            "benefits": [
                "Competitive salary with performance bonus",
                "Health insurance for family",
                "Professional development opportunities",
                "Flexible work arrangements"
            ],
            "salary_range": "₹15-25 LPA"
        },
        {
            "title": "HR Solutions Manager",
            "department": "HR Services",
            "location": "Bangalore, India",
            "type": "full-time",
            "description": "Manage HR outsourcing engagements and develop talent acquisition strategies for our clients. Build and maintain strong client relationships.",
            "requirements": [
                "Bachelor's degree in HR or related field",
                "3+ years of HR consulting experience",
                "Knowledge of Indian labor laws and compliance",
                "Strong interpersonal skills",
                "Experience with HRMS systems"
            ],
            "benefits": [
                "Competitive compensation",
                "Medical coverage",
                "Learning & development budget",
                "Work from home flexibility"
            ],
            "salary_range": "₹10-18 LPA"
        }
    ]
    
    for j in jobs_data:
        existing = await db.jobs.find_one({"title": j["title"]}, {"_id": 0})
        if not existing:
            job = Job(**j)
            doc = job.model_dump()
            doc['created_at'] = doc['created_at'].isoformat()
            await db.jobs.insert_one(doc)
    
    # Seed sample blog posts
    blog_data = [
        {
            "title": "5 Key Strategies for SME Growth in 2024",
            "slug": "sme-growth-strategies-2024",
            "excerpt": "Discover the essential strategies that successful SMEs are implementing to drive sustainable growth in today's competitive landscape.",
            "content": """
<h2>Introduction</h2>
<p>In today's rapidly evolving business landscape, SMEs face unique challenges and opportunities. Here are five proven strategies that can help your business thrive.</p>

<h3>1. Digital Transformation</h3>
<p>Embrace technology to streamline operations, improve customer experience, and gain competitive advantage.</p>

<h3>2. Strategic Partnerships</h3>
<p>Form alliances with complementary businesses to expand your market reach and capabilities.</p>

<h3>3. Talent Development</h3>
<p>Invest in your team's skills and capabilities to build a strong foundation for growth.</p>

<h3>4. Customer-Centric Approach</h3>
<p>Put your customers at the center of every decision to build lasting relationships.</p>

<h3>5. Financial Planning</h3>
<p>Maintain robust financial management practices to ensure sustainable growth.</p>
            """,
            "category": "Business Strategy",
            "author": "SquareOne Team",
            "image_url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
            "published": True
        },
        {
            "title": "Navigating HR Compliance in India: A Complete Guide",
            "slug": "hr-compliance-india-guide",
            "excerpt": "Understanding and managing HR compliance requirements is crucial for every business operating in India. Here's what you need to know.",
            "content": """
<h2>Understanding HR Compliance</h2>
<p>HR compliance in India involves adhering to various labor laws, statutory requirements, and industry regulations.</p>

<h3>Key Areas of Compliance</h3>
<ul>
<li>Provident Fund (PF) and ESIC</li>
<li>Gratuity and Leave Management</li>
<li>Minimum Wages Act</li>
<li>Sexual Harassment Prevention</li>
<li>Equal Remuneration</li>
</ul>

<h3>Best Practices</h3>
<p>Regular audits, proper documentation, and staying updated with regulatory changes are essential for maintaining compliance.</p>
            """,
            "category": "HR Solutions",
            "author": "SquareOne Team",
            "image_url": "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
            "published": True
        }
    ]
    
    for b in blog_data:
        existing = await db.blog_posts.find_one({"slug": b["slug"]}, {"_id": 0})
        if not existing:
            post = BlogPost(**b)
            doc = post.model_dump()
            doc['created_at'] = doc['created_at'].isoformat()
            doc['updated_at'] = doc['updated_at'].isoformat()
            await db.blog_posts.insert_one(doc)
    
    return {"message": "Seed data created successfully"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
