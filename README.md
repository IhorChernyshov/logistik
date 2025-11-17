# Infinity Logistik & Verpackung

Angular landing page for Infinity Logistik & Verpackung company with contact form and backend email integration.

## 🚀 Features

- **Modern Angular 20+** with standalone components
- **Signal-based API** (input/output)
- **BEM methodology** for CSS
- **Reactive Forms** with validation
- **Backend integration** with Express + Nodemailer
- **SMTP email** sending via Gmail
- **Responsive design** with adaptive values
- **Scroll animations** with FadeIn and ScrollAnimate directives
- **SEO optimized** with meta tags and structured data
- **Placeholder images** from Unsplash (ready to replace)
- **7 sections**: Hero, Why Choose Us, Direct Employer, Career Development, Testimonials, Contact Form, Contact Details

## 📋 Prerequisites

- Node.js 18+ and npm
- Gmail account with App Password (for SMTP)

## 🛠️ Installation

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment variables**

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` and add your SMTP credentials:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
RECIPIENT_EMAIL=recipient@example.com
```

**For Gmail:**
- Enable 2-factor authentication
- Generate App Password: https://support.google.com/accounts/answer/185833
- Use the generated password in `SMTP_PASS`

## 🚀 Running the Application

### Development Mode (Frontend + Backend)

Run both Angular dev server and Express backend:
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:4200
- Backend: http://localhost:3000

### Run Separately

**Frontend only:**
```bash
npm start
```

**Backend only:**
```bash
npm run start:server
```

## 🏗️ Build for Production

```bash
npm run build
```

Build output will be in the `dist/` directory.

## 📁 Project Structure

```
logistik/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── button/
│   │   │   ├── numbered-card/
│   │   │   ├── icon-feature/
│   │   │   ├── job-card/
│   │   │   ├── testimonial-card/
│   │   │   ├── contact-info-card/
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   └── sections/        # Page sections
│   │   ├── pages/
│   │   │   └── home/            # Home page
│   │   └── app.routes.ts        # Routing configuration
│   └── assets/
│       └── style/               # Global styles and SCSS
├── server/                      # Backend (Express + Nodemailer)
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   └── index.js
├── .env                         # Environment variables (not in git)
├── .env.example                 # Environment template
├── proxy.conf.json              # Angular proxy config
└── package.json                 # Dependencies and scripts
```

## 🎨 Components

### UI Components
- **ButtonComponent** - 3 modifiers (primary, outline, white)
- **NumberedCardComponent** - Cards with large numbers
- **IconFeatureComponent** - Icon + title + description
- **JobCardComponent** - Dark blue job cards with photos
- **TestimonialCardComponent** - Light testimonial cards
- **ContactInfoCardComponent** - Email/location with copy button

### Layout Components
- **HeaderComponent** - Sticky navigation + CTA
- **FooterComponent** - 5 columns + copyright

### Section Components
- **HeroSectionComponent** - Full-screen hero with background
- **WhyChooseUsComponent** - 4 numbered reason cards
- **DirectEmployerComponent** - 3 features + warehouse photo
- **CareerDevelopmentComponent** - 4 job cards grid
- **TestimonialsComponent** - Large photo + 4 testimonials
- **ContactFormComponent** - Form with validation
- **ContactDetailsComponent** - Email + address cards

## 📧 Contact Form

The contact form:
- **Frontend validation**: Name (2-50 chars), Email, Message (10-500 chars)
- **Backend validation**: Email format, required fields
- **SMTP sending** via Nodemailer
- **Success/error messages** in German
- **Character count** in error messages

## 🎨 Animations

All sections include smooth animations:
- **FadeIn**: Hero section content fades in on page load
- **ScrollAnimate**: Section headers and content animate when scrolling into view
- Built with existing Angular directives (FadeInDirective, ScrollAnimateDirective)

## 📸 Images

The project includes placeholder images from Unsplash and UI Avatars:
- **Hero background**: Warehouse with truck
- **Job cards**: 4 professional logistics photos
- **Testimonials**: Team photo + 4 generated avatars
- **Warehouse photo**: Interior facility shot

**To replace with your own images**, see [IMAGES.md](IMAGES.md) for detailed instructions.

## 🔍 SEO

Fully optimized for search engines:
- **Meta tags**: Title, description, keywords
- **Open Graph**: Facebook, LinkedIn sharing
- **Twitter Cards**: Twitter sharing preview
- **Structured Data**: JSON-LD for Google rich results
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Alt texts**: All images include descriptive alt attributes

## 🔧 Technologies

**Frontend:**
- Angular 20.3
- TypeScript 5.9
- RxJS 7.8
- SCSS with BEM

**Backend:**
- Express 4.18
- Nodemailer 6.9
- dotenv 16.0
- CORS

**Dev Tools:**
- Angular CLI
- Concurrently
- Prettier

## 📝 Code Style

- **BEM methodology** for CSS classes
- **Signal-based API**: `input()` and `output()` instead of decorators
- **Standalone components**: No NgModules
- **Adaptive values**: `adaptiveValue()` mixins at the end of classes
- **Use `@use`** instead of `@import` in SCSS
- **Comments** in English for functions and signals

## 🚨 Important Notes

1. **Never commit `.env`** - it contains sensitive SMTP credentials
2. **Update `.env.example`** if you add new environment variables
3. **Test contact form** before deploying to production
4. **Gmail SMTP limits**: ~500 emails/day for free accounts

## 📄 License

Private project for Infinity Logistik & Verpackung GmbH

## 👨‍💻 Author

Created with Claude Code following CLAUDE.md instructions
