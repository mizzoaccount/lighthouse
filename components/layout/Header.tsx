"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'The Perspectives', href: '#perspectives' },
    { name: 'Thompson Bible Workshop', href: '#thompson' },
    { name: 'Kahawa Media', href: '#kahawa' },
    { name: 'Events', href: '#events' },
    { name: 'Sermons', href: '#sermons' },
    { name: 'Give', href: '#give' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-blue-800">Lighthouse Outreaches</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navItems.slice(0, 4).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Button href="#give" variant="primary">
              Kingdom Investment
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 space-y-4 pb-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-2 py-1 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button href="#give" variant="primary" className="w-full mt-2">
              Kingdom Investment
            </Button>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;