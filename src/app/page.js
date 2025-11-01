'use client';

import { useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site.config';
import { 
  FiUsers, 
  FiCalendar, 
  FiAward, 
  FiTrendingUp,
  FiCheck,
  FiArrowRight,
  FiMail,
  FiPhone,
  FiMapPin
} from 'react-icons/fi';

export default function HomePage() {
  const [stats] = useState({
    members: 500,
    events: 24,
    partners: 50,
    years: 15
  });

  const features = [
    {
      icon: <FiUsers className="h-6 w-6" />,
      title: "Professional Networking",
      description: "Connect with business leaders and entrepreneurs in your region"
    },
    {
      icon: <FiCalendar className="h-6 w-6" />,
      title: "Exclusive Events",
      description: 'Access workshops, seminars, and networking events throughout the year'
    },
    {
      icon: <FiAward className="h-6 w-6" />,
      title: "Business Resources",
      description: 'Join us for our yearly general meeting to discuss the future of our community.'
    },
    {
      icon: <FiTrendingUp className="h-6 w-6" />,
      title: "Advocacy & Support",
      description: "Benefit from our advocacy efforts and business support programs"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Business Summit 2024",
      date: "March 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Grand Convention Center",
      category: "conference"
    },
    {
      id: 2,
      title: "Networking Mixer",
      date: "March 22, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Riverside Hotel",
      category: "networking"
    },
    {
      id: 3,
      title: "Digital Marketing Workshop",
      date: "March 28, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Business Innovation Hub",
      category: "workshop"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "CEO, Tech Innovations Inc.",
      content: "Joining RNBA was one of the best decisions for my business. The networking opportunities and resources have been invaluable.",
      avatar: "/avatars/avatar1.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Founder, Green Solutions Co.",
      content: "The support and mentorship I&apos;ve received through RNBA has helped me scale my business to new heights.",
      avatar: "/avatars/avatar2.jpg"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "Director, Marketing Pro Agency",
      content: "RNBA&apos;s events and workshops have kept me ahead of industry trends and connected with amazing professionals.",
      avatar: "/avatars/avatar3.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Welcome to {siteConfig.name}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              {siteConfig.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/membership/join"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-white text-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Become a Member
                <FiArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                View Events
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="fill-current text-slate-50" viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,48L60,42.7C120,37,240,27,360,26.7C480,27,600,37,720,40C840,43,960,37,1080,32C1200,27,1320,21,1380,18.7L1440,16L1440,48L1380,48C1320,48,1200,48,1080,48C960,48,840,48,720,48C600,48,480,48,360,48C240,48,120,48,60,48L0,48Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up">
              <div className="text-4xl font-bold text-blue-600">{stats.members}+</div>
              <div className="text-gray-600 mt-2">Active Members</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-blue-600">{stats.events}+</div>
              <div className="text-gray-600 mt-2">Annual Events</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-blue-600">{stats.partners}+</div>
              <div className="text-gray-600 mt-2">Business Partners</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold text-blue-600">{stats.years}+</div>
              <div className="text-gray-600 mt-2">Years of Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Join {siteConfig.organization.shortName}?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlock opportunities for growth, collaboration, and success with our comprehensive member benefits.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600">
              Join us for these exciting upcoming events and expand your network
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {upcomingEvents.map((event) => (
              <div 
                key={event.id} 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 group-hover:h-3 transition-all duration-300"></div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full mb-3">
                    {event.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-center">
                      <FiCalendar className="mr-2 h-4 w-4" />
                      {event.date}
                    </p>
                    <p className="flex items-center">
                      <FiMapPin className="mr-2 h-4 w-4" />
                      {event.location}
                    </p>
                  </div>
                  <Link 
                    href={`/events/${event.id}`}
                    className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Learn More
                    <FiArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link 
              href="/events"
              className="inline-flex items-center px-6 py-3 text-lg font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              View All Events
              <FiArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Membership CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Grow Your Business?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Join our community of successful business leaders and unlock exclusive benefits today.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              {siteConfig.membership.levels.map((level) => (
                <div 
                  key={level.id}
                  className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 ${
                    level.popular ? 'ring-2 ring-white ring-offset-4 ring-offset-blue-600' : ''
                  }`}
                >
                  {level.popular && (
                    <span className="bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  )}
                  <h3 className="text-2xl font-bold mt-4 mb-2">{level.name}</h3>
                  <div className="text-3xl font-bold mb-4">
                    ${level.price}
                    <span className="text-lg font-normal">/{level.period}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {level.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <FiCheck className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href="/membership#levels"
                    className="block w-full py-2 px-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
                  >
                    Learn More
                  </Link>
                </div>
              ))}
            </div>
            <Link 
              href="/membership"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg bg-white text-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View All Membership Options
              <FiArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Members Say
            </h2>
            <p className="text-xl text-gray-600">
              Hear from successful business leaders in our community
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-xl shadow-lg border border-slate-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-white text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Connected
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest updates, events, and business insights.
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-300"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-sm text-blue-200">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600">
              We&apos;re here to help you succeed
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPhone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">{siteConfig.organization.phone}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">{siteConfig.organization.email}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">{siteConfig.organization.address}</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/contact"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Contact Us Today
              <FiArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}
