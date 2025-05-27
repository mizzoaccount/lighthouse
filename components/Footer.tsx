"use client"
import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {/* About Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">Lighthouse Outreaches</h3>
            <p className="text-blue-200 mb-4">
              Reaching the unreached with the love and truth of Jesus Christ through outreach, media, and ministry.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'youtube', 'instagram'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="bg-blue-800 w-10 h-10 rounded-full flex items-center justify-center"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {social === 'facebook' && (
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    )}
                    {social === 'youtube' && (
                      <path d="M21.582 6.186a2.506 2.506 0 0 0-1.768-1.768C18.254 4 12 4 12 4s-6.254 0-7.814.418c-.86.23-1.538.908-1.768 1.768C2 7.746 2 12 2 12s0 4.254.418 5.814c.23.86.908 1.538 1.768 1.768C5.746 20 12 20 12 20s6.254 0 7.814-.418c.86-.23 1.538-.908 1.768-1.768C22 16.254 22 12 22 12s0-4.254-.418-5.814zM9.955 15.568V8.432L15.818 12l-5.863 3.568z" />
                    )}
                    {social === 'instagram' && (
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    )}
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Events', 'Teachings', 'Give'].map((link) => (
                <li key={link}>
                  <Link href={`#${link.toLowerCase()}`} className="text-blue-200 hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministries Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">Ministries</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#thompson" className="text-blue-200 hover:text-white transition-colors">
                  Thompson Bible Workshop
                </Link>
              </li>
              <li>
                <Link href="#kahawa" className="text-blue-200 hover:text-white transition-colors">
                  Kahawa Media
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="not-italic text-blue-200 space-y-2">
              <p>info@lighthouseoutreaches.org</p>
              <p>+254 712 345 678</p>
              <p>Nairobi, Kenya</p>
            </address>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-8 text-center text-blue-300">
          <p>&copy; {currentYear} Lighthouse Outreaches. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;