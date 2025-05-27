/*"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, ChevronRight, Check } from "lucide-react";
import { registerUser } from "@/utils/api";
import { useRouter } from 'next/navigation';


const RegisterPage = () => {
  const router = useRouter(); 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }

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
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
        await registerUser({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        });
        setSuccess(true);
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: ""
        });
      } catch (error) {
        if (error instanceof Error) {
          // Handle specific error messages
          if (error.message.includes('User already exists')) {
            setErrors(prev => ({
              ...prev,
              email: error.message
            }));
          } else {
            // Show a generic error message
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

      {/* Registration Form *
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
                Welcome to Imani Homes and Imports
              </h2>
              <p className="text-gray-600 mb-6">
                Your account has been successfully created. Check your email to verify your account.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#f4b500] hover:bg-[#d4a017] text-black font-bold py-3 rounded-full"
                onClick={() => router.push('/auth/login')} // 👈 Navigate to /login
              >
                Continue to Login
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
                  Create Your Account
                </h2>
                <p className="text-gray-600">
                  Join our exclusive community in just a few steps
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields *
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f4b500] focus:border-transparent`}
                        placeholder="John"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f4b500] focus:border-transparent`}
                        placeholder="Doe"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                </div>

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
                  <p className="mt-2 text-xs text-gray-500">
                    Must be at least 8 characters
                  </p>
                </div>

                {/* Confirm Password Field *
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-10 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f4b500] focus:border-transparent`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Terms Checkbox *
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="focus:ring-[#f4b500] h-4 w-4 text-[#f4b500] border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-gray-700">
                      I agree to the{" "}
                      <a href="#" className="text-[#f4b500] hover:text-[#d4a017]">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-[#f4b500] hover:text-[#d4a017]">
                        Privacy Policy
                      </a>
                    </label>
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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account <ChevronRight size={18} />
                    </>
                  )}
                </motion.button>

                {/* Login Link *
                <div className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <a href="/auth/login" className="font-medium text-[#f4b500] hover:text-[#d4a017]">
                    Sign in
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

export default RegisterPage;*/
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, ChevronRight, Check } from "lucide-react";
import { registerUser } from "@/utils/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }

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
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
        await registerUser({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
        setSuccess(true);
        // Redirect to login page
        router.push("/auth/login");
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes("User already exists")) {
            setErrors((prev) => ({
              ...prev,
              email: error.message,
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
      <div className="relative z-20 container mx-auto px-4 py-8 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
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
                Join Our
              </span>
              <br />
              <span className="text-black mt-2 inline-block">Spiritual Family</span>
            </motion.h1>
          </div>

          <motion.p
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Become part of a community dedicated to spiritual growth and divine purpose.
          </motion.p>

          <div className="space-y-6">
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-blue-600 mt-1">
                <User className="text-2xl" />
              </div>
              <div>
                <h3 className="text-black text-lg font-medium mb-1">Exclusive Content</h3>
                <p className="text-gray-600">Access to members-only teachings and resources</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-blue-600 mt-1">
                <User className="text-2xl" />
              </div>
              <div>
                <h3 className="text-black text-lg font-medium mb-1">Event Invitations</h3>
                <p className="text-gray-600">Get notified about our upcoming spiritual gatherings</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <div className="text-blue-600 mt-1">
                <User className="text-2xl" />
              </div>
              <div>
                <h3 className="text-black text-lg font-medium mb-1">Prayer Support</h3>
                <p className="text-gray-600">Join our prayer network and receive spiritual covering</p>
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
            <p className="text-black italic">"But to all who did receive him, who believed in his name, he gave the right to become children of God..."</p>
            <p className="text-gray-600 text-sm mt-2">John 1:12</p>
          </motion.div>
        </motion.div>

        {/* Registration Form (now on left) */}
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
            Create Account
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Join our ministry community today
          </motion.p>

          {errors.email && (
            <motion.div
              className="bg-red-100 border border-red-400 text-red-700 p-4 mb-6 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {errors.email}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-600 mb-2">
                  First Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`bg-white/50 border border-gray-100 text-black rounded-lg block w-full pl-10 p-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent ${errors.firstName ? "border-red-500" : ""}`}
                    placeholder="John"
                    required
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-600 mb-2">
                  Last Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`bg-white/50 border border-gray-100 text-black rounded-lg block w-full pl-10 p-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent ${errors.lastName ? "border-red-500" : ""}`}
                    placeholder="Doe"
                    required
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                )}
              </motion.div>
            </div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-white/50 border border-gray-100 text-black rounded-lg block w-full pl-10 p-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent ${errors.email ? "border-red-500" : ""}`}
                  placeholder="your@email.com"
                  required
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
              transition={{ delay: 0.9 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
                Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`bg-white/50 border border-gray-100 text-black rounded-lg block w-full pl-10 p-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent ${errors.password ? "border-red-500" : ""}`}
                  placeholder="••••••••"
                  required
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
              <p className="mt-2 text-xs text-gray-600">
                Must be at least 8 characters
              </p>
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`bg-white/50 border border-gray-100 text-black rounded-lg block w-full pl-10 p-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent ${errors.confirmPassword ? "border-red-500" : ""}`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </motion.div>

            {/* Terms Checkbox */}
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-100 rounded bg-white/50"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account <ChevronRight size={18} />
                  </>
                )}
              </button>
            </motion.div>

            {/* Login Link */}
            <motion.div
              className="mt-6 text-center text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-blue-600 hover:underline">
                Sign in
              </Link>
            </motion.div>
          </form>
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