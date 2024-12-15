import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">About JOB PORTAL X</h3>
            <p className="text-gray-400">
              JobPortalX connects job seekers with top companies, offering opportunities for career growth and success.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/jobs" className="text-gray-400 hover:text-white">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Connected</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter to get the latest job updates.
            </p>
            <form>
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-l-lg text-gray-900"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-primary-foreground"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} JOBPORTALX. All rights reserved.</p>
          <p>
            Made with perfection by <Link href="#" className="text-primary hover:underline">Asef Ahmed</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
