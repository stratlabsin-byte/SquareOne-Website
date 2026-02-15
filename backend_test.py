import requests
import sys
import json
from datetime import datetime

class SquareOneAPITester:
    def __init__(self, base_url="https://premium-bizpartner.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []
        self.auth_token = None

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None, auth_required=False):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        # Add auth header if required and token available
        if auth_required and self.auth_token:
            headers['Authorization'] = f'Bearer {self.auth_token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return True, response.json() if response.content else {}
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append({
                    'name': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:200]
                })
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                'name': name,
                'error': str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "", 200)

    def test_auth_endpoints(self):
        """Test authentication endpoints"""
        print("\n🔐 Testing Authentication Endpoints...")
        
        # Test registration with new user
        test_email = f"test_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com"
        register_data = {
            "email": test_email,
            "password": "testpass123",
            "name": "Test User"
        }
        
        success, register_response = self.run_test("Register New Admin", "POST", "auth/register", 200, register_data)
        if success and 'access_token' in register_response:
            print(f"   Registration successful, token received")
            test_token = register_response['access_token']
            test_user = register_response['user']
            
            # Test duplicate registration (should fail)
            self.run_test("Register Duplicate Email", "POST", "auth/register", 400, register_data)
            
            # Test login with created user
            login_data = {
                "email": test_email,
                "password": "testpass123"
            }
            success, login_response = self.run_test("Login Admin", "POST", "auth/login", 200, login_data)
            if success and 'access_token' in login_response:
                self.auth_token = login_response['access_token']
                print(f"   Login successful, token stored")
                
                # Test /auth/me endpoint
                success, me_response = self.run_test("Get Current User", "GET", "auth/me", 200, auth_required=True)
                if success:
                    print(f"   Current user: {me_response.get('email', 'Unknown')}")
                
                # Test token verification
                success, verify_response = self.run_test("Verify Token", "POST", "auth/verify", 200, auth_required=True)
                if success:
                    print(f"   Token verification successful")
            
            # Test login with wrong password
            wrong_login = {
                "email": test_email,
                "password": "wrongpassword"
            }
            self.run_test("Login Wrong Password", "POST", "auth/login", 401, wrong_login)
            
            # Test login with non-existent email
            nonexistent_login = {
                "email": "nonexistent@test.com",
                "password": "testpass123"
            }
            self.run_test("Login Non-existent User", "POST", "auth/login", 401, nonexistent_login)
        
        # Test existing admin login (admin@squareone.in / admin123)
        admin_login = {
            "email": "admin@squareone.in",
            "password": "admin123"
        }
        success, admin_response = self.run_test("Login Existing Admin", "POST", "auth/login", 200, admin_login)
        if success and 'access_token' in admin_response:
            self.auth_token = admin_response['access_token']
            print(f"   Admin login successful")
            
            # Test protected endpoint with admin token
            success, me_response = self.run_test("Get Admin User Info", "GET", "auth/me", 200, auth_required=True)
            if success:
                print(f"   Admin user: {me_response.get('email', 'Unknown')}")
        
        return success

    def test_stats_endpoints(self):
        """Test stats endpoints"""
        print("\n📊 Testing Stats Endpoints...")
        
        # Get stats
        success, stats = self.run_test("Get Stats", "GET", "stats", 200)
        if success:
            print(f"   Stats: {stats}")
        
        # Update stats
        new_stats = {
            "years_experience": 12,
            "clients_served": 600,
            "projects_completed": 1500,
            "team_members": 80
        }
        success, _ = self.run_test("Update Stats", "PUT", "stats", 200, new_stats)
        
        return success

    def test_testimonials_endpoints(self):
        """Test testimonials endpoints"""
        print("\n💬 Testing Testimonials Endpoints...")
        
        # Get testimonials
        success, testimonials = self.run_test("Get Testimonials", "GET", "testimonials", 200)
        if success:
            print(f"   Found {len(testimonials)} testimonials")
        
        # Create testimonial
        new_testimonial = {
            "client_name": "Test Client",
            "company": "Test Company",
            "position": "CEO",
            "quote": "Excellent service from SquareOne!",
            "rating": 5,
            "active": True
        }
        success, created = self.run_test("Create Testimonial", "POST", "testimonials", 200, new_testimonial)
        
        # Delete testimonial if created
        if success and 'id' in created:
            self.run_test("Delete Testimonial", "DELETE", f"testimonials/{created['id']}", 200)
        
        return success

    def test_blog_endpoints(self):
        """Test blog endpoints"""
        print("\n📝 Testing Blog Endpoints...")
        
        # Get published blog posts
        success, posts = self.run_test("Get Published Blog Posts", "GET", "blog", 200, params={"published_only": True})
        if success:
            print(f"   Found {len(posts)} published posts")
        
        # Get all blog posts
        success, all_posts = self.run_test("Get All Blog Posts", "GET", "blog", 200, params={"published_only": False})
        if success:
            print(f"   Found {len(all_posts)} total posts")
        
        # Create blog post
        new_post = {
            "title": "Test Blog Post",
            "slug": "test-blog-post",
            "excerpt": "This is a test blog post",
            "content": "<p>Test content</p>",
            "category": "Testing",
            "author": "Test Author",
            "published": False
        }
        success, created = self.run_test("Create Blog Post", "POST", "blog", 200, new_post)
        
        # Test get by ID and slug if created
        if success and 'id' in created:
            self.run_test("Get Blog Post by ID", "GET", f"blog/{created['id']}", 200)
            self.run_test("Get Blog Post by Slug", "GET", f"blog/slug/{created['slug']}", 200)
            
            # Update blog post
            update_data = {"title": "Updated Test Post", "published": True}
            self.run_test("Update Blog Post", "PUT", f"blog/{created['id']}", 200, update_data)
            
            # Delete blog post
            self.run_test("Delete Blog Post", "DELETE", f"blog/{created['id']}", 200)
        
        return success

    def test_jobs_endpoints(self):
        """Test jobs endpoints"""
        print("\n💼 Testing Jobs Endpoints...")
        
        # Get active jobs
        success, jobs = self.run_test("Get Active Jobs", "GET", "jobs", 200, params={"active_only": True})
        if success:
            print(f"   Found {len(jobs)} active jobs")
        
        # Get all jobs
        success, all_jobs = self.run_test("Get All Jobs", "GET", "jobs", 200, params={"active_only": False})
        if success:
            print(f"   Found {len(all_jobs)} total jobs")
        
        # Create job
        new_job = {
            "title": "Test Position",
            "department": "Testing",
            "location": "Test City",
            "type": "full-time",
            "description": "Test job description",
            "requirements": ["Test requirement 1", "Test requirement 2"],
            "benefits": ["Test benefit 1"],
            "salary_range": "₹10-15 LPA",
            "active": True
        }
        success, created = self.run_test("Create Job", "POST", "jobs", 200, new_job)
        
        # Test get by ID if created
        if success and 'id' in created:
            self.run_test("Get Job by ID", "GET", f"jobs/{created['id']}", 200)
            
            # Update job
            update_data = {"title": "Updated Test Position", "active": False}
            self.run_test("Update Job", "PUT", f"jobs/{created['id']}", 200, update_data)
            
            # Delete job
            self.run_test("Delete Job", "DELETE", f"jobs/{created['id']}", 200)
        
        return success

    def test_applications_endpoints(self):
        """Test job applications endpoints"""
        print("\n📋 Testing Job Applications Endpoints...")
        
        # Get applications
        success, applications = self.run_test("Get Applications", "GET", "applications", 200)
        if success:
            print(f"   Found {len(applications)} applications")
        
        # Create application (need a job first)
        # First create a temporary job
        temp_job = {
            "title": "Temp Job for Application Test",
            "department": "Testing",
            "location": "Test City",
            "type": "full-time",
            "description": "Temporary job for testing applications",
            "requirements": ["Test requirement"],
            "active": True
        }
        job_success, job_created = self.run_test("Create Temp Job for Application", "POST", "jobs", 200, temp_job)
        
        if job_success and 'id' in job_created:
            # Create application
            new_application = {
                "job_id": job_created['id'],
                "name": "Test Applicant",
                "email": "test@example.com",
                "phone": "+91 9876543210",
                "cover_letter": "Test cover letter",
                "linkedin_url": "https://linkedin.com/in/test"
            }
            success, created = self.run_test("Create Job Application", "POST", "applications", 200, new_application)
            
            # Clean up - delete temp job
            self.run_test("Delete Temp Job", "DELETE", f"jobs/{job_created['id']}", 200)
        
        return success

    def test_contacts_endpoints(self):
        """Test contacts endpoints"""
        print("\n📞 Testing Contacts Endpoints...")
        
        # Get contacts
        success, contacts = self.run_test("Get Contacts", "GET", "contacts", 200)
        if success:
            print(f"   Found {len(contacts)} contacts")
        
        # Create contact
        new_contact = {
            "name": "Test Contact",
            "email": "testcontact@example.com",
            "phone": "+91 9876543210",
            "company": "Test Company",
            "service_interest": "Business Foundation Services",
            "message": "Test inquiry message"
        }
        success, created = self.run_test("Create Contact", "POST", "contacts", 200, new_contact)
        
        return success

    def test_newsletter_endpoint(self):
        """Test newsletter subscription"""
        print("\n📧 Testing Newsletter Endpoint...")
        
        # Subscribe to newsletter
        newsletter_data = {"email": "testnewsletter@example.com"}
        success, _ = self.run_test("Subscribe Newsletter", "POST", "newsletter", 200, newsletter_data)
        
        return success

    def test_seed_endpoint(self):
        """Test seed data endpoint"""
        print("\n🌱 Testing Seed Endpoint...")
        
        success, _ = self.run_test("Seed Data", "POST", "seed", 200)
        
        return success

def main():
    print("🚀 Starting SquareOne API Testing...")
    print("=" * 60)
    
    tester = SquareOneAPITester()
    
    # Test all endpoints
    tester.test_root_endpoint()
    tester.test_auth_endpoints()  # Test authentication first
    tester.test_seed_endpoint()  # Ensure data is seeded
    tester.test_stats_endpoints()
    tester.test_testimonials_endpoints()
    tester.test_blog_endpoints()
    tester.test_jobs_endpoints()
    tester.test_applications_endpoints()
    tester.test_contacts_endpoints()
    tester.test_newsletter_endpoint()
    
    # Print results
    print("\n" + "=" * 60)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for test in tester.failed_tests:
            error_msg = test.get('error', f"Expected {test.get('expected')}, got {test.get('actual')}")
            print(f"   - {test['name']}: {error_msg}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"\n✅ Success Rate: {success_rate:.1f}%")
    
    return 0 if success_rate >= 80 else 1

if __name__ == "__main__":
    sys.exit(main())