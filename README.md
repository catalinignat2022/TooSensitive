# TooSensitive: RSD & Emotional Support

> A comprehensive WordPress website dedicated to supporting individuals with Rejection Sensitive Dysphoria (RSD)

## 🌟 Project Overview

TooSensitive is a mental health platform specifically designed to address the unique challenges of Rejection Sensitive Dysphoria. Our mission is to provide education, support, tools, and community for those navigating RSD.

### 🎯 Key Features

- **RSD Assessment Tool** - Interactive 10-question assessment with personalized results
- **Educational Resources** - Comprehensive RSD information and research
- **Coping Strategies** - Evidence-based techniques and tools
- **Community Support** - Safe space for sharing experiences and peer support
- **Professional Directory** - RSD-informed therapists and healthcare providers
- **Mobile App Preview** - Information about our upcoming companion app

## 📁 Project Structure

```
TooSensitive/
├── wordpress/                 # WordPress core files
├── toosensitive-theme/       # Custom WordPress theme
│   ├── style.css            # Main stylesheet
│   ├── functions.php        # Theme functionality
│   ├── index.php           # Default template
│   ├── homepage.php         # Homepage template
│   ├── page-assessment.php  # RSD Assessment page
│   ├── page-education.php   # Education page
│   ├── page-coping-strategies.php # Coping strategies
│   ├── page-community.php   # Community features
│   ├── page-app-preview.php # App preview
│   ├── page-about.php       # About page
│   ├── header.php          # Site header
│   ├── footer.php          # Site footer
│   ├── assets/             # CSS, JS, and images
│   └── includes/           # PHP includes and components
├── DEPLOYMENT-GUIDE.md      # Production deployment instructions
└── setup-wordpress.sh       # Automated setup script
```

## 🚀 Quick Start

### Prerequisites

- PHP 8.0+ (recommended 8.4+)
- MySQL 8.0+ or MariaDB 10.6+
- Web server (Apache/Nginx)
- WordPress 6.0+

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/toosensitive.git
   cd TooSensitive
   ```

2. **Set up database:**
   ```bash
   mysql -u root -p -e "CREATE DATABASE toosensitive_wp; CREATE USER 'ts_user'@'localhost' IDENTIFIED BY 'password'; GRANT ALL PRIVILEGES ON toosensitive_wp.* TO 'ts_user'@'localhost';"
   ```

3. **Configure WordPress:**
   - Copy `wp-config-sample.php` to `wp-config.php`
   - Update database credentials
   - Generate security keys at https://api.wordpress.org/secret-key/1.1/salt/

4. **Start development server:**
   ```bash
   cd wordpress
   php -S localhost:8000
   ```

5. **Complete WordPress installation:**
   - Visit `http://localhost:8000/wp-admin/install.php`
   - Follow the setup wizard
   - Activate the TooSensitive theme

## 🎨 Theme Features

### Custom Page Templates

- **Homepage** - Hero section, assessment preview, community highlights
- **RSD Assessment** - Interactive 10-question assessment with scoring
- **Education** - Comprehensive RSD information and resources
- **Coping Strategies** - Organized tools by category (mindset, emotional, social, physical)
- **Community** - Member stories, support resources, professional directory
- **App Preview** - Mobile app features and beta signup
- **About** - Team, mission, values, and contact information

### Built-in Functionality

- **Email Signup System** - Newsletter and updates collection
- **Assessment Processing** - AJAX-powered RSD assessment with results
- **Mobile Responsive** - Optimized for all device sizes
- **SEO Optimized** - Clean markup and meta tag support
- **Security Enhanced** - Multiple security measures implemented
### Custom Post Types

- **Testimonials** - Community member success stories
- **Resources** - Educational materials and research
- **Assessments** - RSD assessment results (private)

## 🔧 Technical Specifications

### WordPress Features
- Custom theme with 7 page templates
- Custom post types and fields
- AJAX form processing
- Email integration ready
- SEO and performance optimized
- Security hardened

### Frontend Technologies
- HTML5 semantic markup
- CSS3 with custom properties
- Vanilla JavaScript for interactions
- Responsive design (mobile-first)
- Progressive enhancement

### Backend Features
- PHP 8.4 compatible
- MySQL database integration
- WordPress REST API ready
- Custom admin dashboard
- Automated backups support

## 🛡️ Security Features

- Input sanitization and validation
- CSRF protection with nonces
- SQL injection prevention
- XSS protection
- Secure file permissions
- Security headers implementation
- XML-RPC disabled
- WordPress version hiding

## 📈 SEO & Performance

- Semantic HTML structure
- Meta tags and Open Graph
- XML sitemap ready
- Fast loading times
- Image optimization
- Caching support
- CDN ready
- Mobile-first indexing

## 🌐 Production Deployment

See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for complete production deployment instructions including:

- Hosting requirements
- Database setup
- File upload process
- SSL configuration
- Plugin recommendations
- Security hardening
- Performance optimization
- Backup strategies

## 📞 Support & Contact

- **Website:** https://toosensitive.org
- **Email:** support@toosensitive.org
- **Community:** Join our support forums
- **Developer:** technical@toosensitive.org

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
  - Complete 7-page website structure
  - RSD assessment tool
  - Community features
  - Production-ready deployment

---

**💙 Built with empathy for the RSD community**

This platform represents hope, understanding, and support for everyone navigating the challenges of Rejection Sensitive Dysphoria. Together, we can build a world where sensitivity is seen as a strength, not a weakness.