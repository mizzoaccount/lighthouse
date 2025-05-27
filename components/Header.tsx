"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User, ChevronDown, ChevronUp } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Devotions", href: "/devotions" },
    { name: "Sermons", href: "/sermons" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "Patners", href: "/patners" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed w-full z-50 ${
        scrolled ? "bg-white/90 backdrop-blur-sm shadow-sm py-3" : "bg-white/90 backdrop-blur-sm py-4"
      } transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
            >
              Lighthouse
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-2 py-1.5 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {link.href === pathname && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-50 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 font-medium">{link.name}</span>
                  {link.href === pathname && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600"
                      layoutId="underline"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4"
            >
              <Link
                href="#give"
                className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-5 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-blue-100 transition-all"
              >
                Give 
              </Link>
            </motion.div>
                <Link href="/account" className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
              <User className="w-5 h-5 text-blue-600 hover:text-white" />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <ChevronUp className="w-6 h-6 text-gray-600" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg font-medium ${
                      pathname === link.href
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="#give"
                  className="block mt-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-3 rounded-lg font-medium text-center shadow-lg"
                >
                  Donate
                </Link>
                <Link
                  href="/account"
                  className="flex items-center justify-center gap-2 mt-4 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <User className="w-5 h-5" />
                  <span>Account</span>
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;