/**
 * Site Configuration
 * This file contains all the configurable settings for the website
 * Modify these values to customize your site
 */

export const siteConfig = {
  // Basic Site Information
  name: "RNBA",
  title: "Regional National Business Association",
  description: "Empowering businesses and professionals through networking, advocacy, and growth opportunities",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  
  // Organization Details
  organization: {
    name: "Regional National Business Association",
    shortName: "RNBA",
    logo: "/logo.png",
    favicon: "/favicon.ico",
    address: "123 Business Avenue, City, State 12345",
    email: "info@rnba.org",
    phone: "+1 (555) 123-4567",
    socialMedia: {
      facebook: "https://facebook.com/rnba",
      twitter: "https://twitter.com/rnba",
      linkedin: "https://linkedin.com/company/rnba",
      instagram: "https://instagram.com/rnba",
      youtube: "https://youtube.com/rnba"
    }
  },

  // Navigation Configuration
  navigation: {
    main: [
      { name: "Home", href: "/", public: true },
      { name: "About", href: "/about", public: true },
      { name: "Events", href: "/events", public: true },
      { name: "Membership", href: "/membership", public: true },
      { name: "Sponsors", href: "/sponsors", public: true },
      { name: "Resources", href: "/resources", public: true },
      { name: "Contact", href: "/contact", public: true }
    ],
    member: [
      { name: "Dashboard", href: "/member/dashboard", icon: "dashboard" },
      { name: "Profile", href: "/member/profile", icon: "user" },
      { name: "Files", href: "/member/files", icon: "folder" },
      { name: "Events", href: "/member/events", icon: "calendar" },
      { name: "Directory", href: "/member/directory", icon: "users" }
    ],
    footer: [
      {
        title: "About",
        links: [
          { name: "Mission", href: "/about#mission" },
          { name: "Vision", href: "/about#vision" },
          { name: "Team", href: "/about/team" },
          { name: "Board", href: "/about/board" }
        ]
      },
      {
        title: "Programs",
        links: [
          { name: "Events", href: "/events" },
          { name: "Networking", href: "/programs/networking" },
          { name: "Training", href: "/programs/training" },
          { name: "Advocacy", href: "/programs/advocacy" }
        ]
      },
      {
        title: "Membership",
        links: [
          { name: "Join Now", href: "/membership/join" },
          { name: "Benefits", href: "/membership#benefits" },
          { name: "Levels", href: "/membership#levels" },
          { name: "FAQs", href: "/membership/faq" }
        ]
      },
      {
        title: "Connect",
        links: [
          { name: "Contact Us", href: "/contact" },
          { name: "Newsletter", href: "/newsletter" },
          { name: "Careers", href: "/careers" },
          { name: "Partner", href: "/partnership" }
        ]
      }
    ]
  },

  // Membership Configuration
  membership: {
    levels: [
      {
        id: "basic",
        name: "Basic Member",
        price: 99,
        period: "year",
        features: [
          "Access to member directory",
          "Attend monthly meetings",
          "Newsletter subscription",
          "Member badge",
          "Basic support"
        ],
        color: "blue"
      },
      {
        id: "professional",
        name: "Professional",
        price: 199,
        period: "year",
        features: [
          "All Basic features",
          "Priority event registration",
          "Exclusive workshops",
          "Business listing",
          "Networking app access",
          "Priority support"
        ],
        color: "purple",
        popular: true
      },
      {
        id: "corporate",
        name: "Corporate",
        price: 499,
        period: "year",
        features: [
          "All Professional features",
          "5 member accounts",
          "Premium business listing",
          "Speaking opportunities",
          "Sponsor recognition",
          "Dedicated account manager"
        ],
        color: "gold"
      }
    ],
    benefits: [
      "Professional networking opportunities",
      "Access to exclusive events and workshops",
      "Business development resources",
      "Industry advocacy and representation",
      "Member-only discounts and perks",
      "Leadership development programs"
    ]
  },

  // Event Configuration
  events: {
    categories: [
      { id: "networking", name: "Networking", color: "blue" },
      { id: "workshop", name: "Workshop", color: "green" },
      { id: "conference", name: "Conference", color: "purple" },
      { id: "social", name: "Social", color: "pink" },
      { id: "training", name: "Training", color: "orange" }
    ],
    registrationRequired: true,
    allowGuestRegistration: true,
    maxGuestsPerMember: 2
  },

  // Sponsorship Configuration
  sponsorship: {
    levels: [
      {
        id: "platinum",
        name: "Platinum Sponsor",
        price: 10000,
        benefits: [
          "Premier logo placement",
          "Speaking opportunities",
          "Exhibition booth",
          "Full page ads",
          "VIP event access"
        ]
      },
      {
        id: "gold",
        name: "Gold Sponsor",
        price: 5000,
        benefits: [
          "Logo on all materials",
          "Half page ads",
          "Exhibition space",
          "Event tickets"
        ]
      },
      {
        id: "silver",
        name: "Silver Sponsor",
        price: 2500,
        benefits: [
          "Logo on website",
          "Quarter page ads",
          "Event recognition"
        ]
      },
      {
        id: "bronze",
        name: "Bronze Sponsor",
        price: 1000,
        benefits: [
          "Website listing",
          "Newsletter mention"
        ]
      }
    ]
  },

  // Feature Flags
  features: {
    enableRegistration: true,
    enableMembership: true,
    enableEvents: true,
    enableSponsorship: true,
    enableNewsletter: true,
    enableBlog: false,
    enableForum: false,
    enableChat: false,
    enablePayments: true,
    maintenanceMode: false
  },

  // SEO Configuration
  seo: {
    defaultTitle: "RNBA - Regional National Business Association",
    titleTemplate: "%s | RNBA",
    defaultDescription: "Join RNBA to connect with business leaders, access exclusive resources, and grow your professional network.",
    keywords: [
      "business association",
      "networking",
      "professional development",
      "business community",
      "entrepreneurship"
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      site_name: "RNBA"
    },
    twitter: {
      cardType: "summary_large_image",
      handle: "@rnba"
    }
  },

  // Theme Configuration
  theme: {
    colors: {
      primary: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
        950: "#172554"
      },
      secondary: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a"
      },
      accent: "#10b981",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6"
    },
    fonts: {
      sans: ["Inter", "system-ui", "sans-serif"],
      serif: ["Georgia", "serif"],
      mono: ["Menlo", "monospace"]
    }
  },

  // Security Configuration
  security: {
    requireEmailVerification: true,
    passwordMinLength: 8,
    passwordRequireNumbers: true,
    passwordRequireSpecialChars: true,
    passwordRequireUppercase: true,
    maxLoginAttempts: 5,
    lockoutDuration: 900, // 15 minutes in seconds
    sessionTimeout: 86400, // 24 hours in seconds
    enableTwoFactor: false,
    enableRecaptcha: true,
    recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  },

  // File Upload Configuration
  fileUpload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB in bytes
    maxFiles: 10,
    allowedFileTypes: [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain",
      "text/csv"
    ],
    storageBucket: "member-files"
  },

  // Email Configuration
  email: {
    from: {
      name: "RNBA",
      email: "noreply@rnba.org"
    },
    templates: {
      welcome: "d-welcome-template-id",
      passwordReset: "d-password-reset-template-id",
      eventRegistration: "d-event-registration-template-id",
      membershipRenewal: "d-membership-renewal-template-id"
    }
  },

  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
    timeout: 30000, // 30 seconds
    retryAttempts: 3
  },

  // Analytics Configuration
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    enableTracking: true,
    trackingEvents: [
      "page_view",
      "sign_up",
      "login",
      "membership_purchase",
      "event_registration"
    ]
  },

  // Payment Configuration
  payment: {
    provider: "stripe", // stripe, paypal, square
    currency: "USD",
    taxRate: 0.08, // 8%
    stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
  },

  // Localization
  localization: {
    defaultLocale: "en-US",
    supportedLocales: ["en-US", "es-ES"],
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    timezone: "America/New_York"
  }
};

export default siteConfig;
