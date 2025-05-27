"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check, ArrowLeft, ChevronRight } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = () => {
    if (!email) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess(true);
        setEmail("");
      }, 1500);
    }
  };

  return (
    <div className="bg-white min-h-screen">

      {/* Password Reset Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-white p-8 rounded-xl shadow-lg border border-[#f4b500]/20"
            >
              <div className="mx-auto bg-[#f4b500]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <div className="bg-[#f4b500] text-white p-2 rounded-full">
                  <Check className="h-6 w-6" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Reset Email Sent
              </h2>
              <p className="text-gray-600 mb-6">
                We've sent instructions to your email for resetting your password
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#f4b500] hover:bg-[#d4a017] text-black font-bold py-3 rounded-full"
              >
                Back to Login
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Password Recovery
                </h2>
                <p className="text-gray-600">
                  Enter your email to receive reset instructions
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      className={`block w-full pl-10 pr-3 py-3 border ${
                        error ? "border-red-500" : "border-gray-300"
                      } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f4b500] focus:border-transparent`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full bg-[#f4b500] hover:bg-[#d4a017] text-black font-bold py-4 rounded-full flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Instructions...
                    </>
                  ) : (
                    <>
                      Reset Password <ChevronRight size={18} />
                    </>
                  )}
                </motion.button>

                {/* Back to Login */}
                <div className="text-center text-sm text-gray-600">
                  <a
                    href="#"
                    className="font-medium text-[#f4b500] hover:text-[#d4a017] inline-flex items-center"
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    Back to Login
                  </a>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </section>

    </div>
  );
};

export default ForgotPasswordPage;