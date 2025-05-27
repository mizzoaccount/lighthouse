/*'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ChevronRight, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      email: '',
      password: '',
    };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        await login(formData.email, formData.password);
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/account';
        }, 2000);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes('Invalid credentials')) {
            setErrors(prev => ({
              ...prev,
              email: 'Invalid email or password',
              password: 'Invalid email or password'
            }));
          } else {
            alert(error.message);
          }
        } else {
          alert('An unknown error occurred');
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-white min-h-screen">
  
      {/* Login Form *
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
                Login Successful
              </h2>
              <p className="text-gray-600 mb-6">
                Redirecting to your personal dashboard...
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#f4b500] hover:bg-[#d4a017] text-black font-bold py-3 rounded-full"
              >
                Continue to Dashboard
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
                  Member Login
                </h2>
                <p className="text-gray-600">
                  Access your exclusive account and benefits
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field *
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
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f4b500] focus:border-transparent`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Password Field *
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f4b500] focus:border-transparent`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me & Forgot Password *
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#f4b500] focus:ring-[#f4b500] border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="/auth/forgot-password" className="font-medium text-[#f4b500] hover:text-[#d4a017]">
                      Forgot password?
                    </a>
                  </div>
                </div>

                {/* Submit Button *
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
                      Authenticating...
                    </>
                  ) : (
                    <>
                      Sign In <ChevronRight size={18} />
                    </>
                  )}
                </motion.button>

                {/* Registration Link *
                <div className="text-center text-sm text-gray-600">
                  Not a member yet?{" "}
                  <a href="/auth/register" className="font-medium text-[#f4b500] hover:text-[#d4a017]">
                    Create account
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

export default LoginPage;*/

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiUser, FiLock } from "react-icons/fi";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        await login(formData.email, formData.password);
        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/account";
        }, 2000);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes("Invalid credentials")) {
            setErrors((prev) => ({
              ...prev,
              email: "Invalid email or password",
              password: "Invalid email or password",
            }));
          } else {
            alert(error.message);
          }
        } else {
          alert("An unknown error occurred");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20 md:pt-0">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, type: "spring" }}
      >
        <div className="absolute top-20 left-10 w-40 h-40 bg-red-500 rounded-full mix-blend-screen blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-white rounded-full mix-blend-screen blur-3xl opacity-20" />
      </motion.div>

      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Main Content Container - Swapped sides */}
      <div className="relative z-20 container mx-auto px-4 py-8 md:py-16 flex flex-col lg:flex-row-reverse items-center justify-between gap-12 lg:gap-8">
        {/* Ministry Message Side - Desktop Only (now on right) */}
        <motion.div
          className="hidden lg:block lg:w-1/2 relative pl-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="overflow-hidden">
            <motion.h1
              className="text-5xl lg:text-6xl font-bold mb-6"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Welcome Back
              </span>
              <br />
              <span className="text-black mt-2 inline-block">Beloved One</span>
            </motion.h1>
          </div>

          <motion.p
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Reconnect with your spiritual community and continue your journey of faith.
          </motion.p>

          <div className="space-y-6">
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-blue-600 mt-1">
                <FiArrowRight className="text-2xl" />
              </div>
              <div>
                <h3 className="text-black text-lg font-medium mb-1">Personal Growth</h3>
                <p className="text-gray-600">Access your saved devotionals and prayer journals</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-blue-600 mt-1">
                <FiArrowRight className="text-2xl" />
              </div>
              <div>
                <h3 className="text-black text-lg font-medium mb-1">Community Access</h3>
                <p className="text-gray-600">Rejoin your prayer groups and ministry circles</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <div className="text-blue-600 mt-1">
                <FiArrowRight className="text-2xl" />
              </div>
              <div>
                <h3 className="text-black text-lg font-medium mb-1">Continue Learning</h3>
                <p className="text-gray-600">Pick up where you left off in your spiritual courses</p>
              </div>
            </motion.div>
          </div>

          {/* Verse of the Day */}
          <motion.div
            className="bg-white/30 backdrop-blur-sm p-6 mt-12 rounded-2xl border border-gray-100"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <p className="text-blue-400 text-sm mb-2">Today's Encouragement</p>
            <p className="text-black italic">"Come to me, all who labor and are heavy laden, and I will give you rest."</p>
            <p className="text-gray-600 text-sm mt-2">Matthew 11:28</p>
          </motion.div>
        </motion.div>

        {/* Login Form (now on left) */}
        <motion.div
          className="w-full lg:w-1/2 bg-white/30 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-gray-100 shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl font-bold mb-2 text-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome Back
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Sign in to continue your spiritual journey
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-white/50 border border-gray-100 text-black rounded-lg block w-full pl-10 p-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent ${errors.email ? "border-red-500" : ""}`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`bg-white/50 border border-gray-100 text-black rounded-lg block w-full pl-10 p-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent ${errors.password ? "border-red-500" : ""}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FiArrowRight className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FiArrowRight className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-100 rounded bg-white/50"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                Remember me
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-500 transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign In <FiArrowRight size={18} />
                  </>
                )}
              </button>
            </motion.div>
          </form>

          <motion.div
            className="mt-6 text-center text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-blue-600 hover:underline font-medium">
              Create one now
            </Link>
          </motion.div>

          {/* Social Login Options */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/30 text-gray-600">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <motion.button
                type="button"
                className="w-full bg-white/50 border border-gray-100 text-black rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>GitHub</span>
              </motion.button>
              <motion.button
                type="button"
                className="w-full bg-white/50 border border-gray-100 text-black rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                  />
                </svg>
                <span>Twitter</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Additional floating crosses */}
      <motion.div
        className="absolute top-1/4 left-10 opacity-20 hidden lg:block"
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <div className="text-4xl">✝</div>
      </motion.div>
      <motion.div
        className="absolute bottom-1/4 right-10 opacity-20 hidden lg:block"
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      >
        <div className="text-4xl">✝</div>
      </motion.div>
    </section>
  );
}