"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock, ChevronDown, ChevronUp, MessageCircle, HeartHandshake, Globe, Cross } from 'lucide-react';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';

const ContactPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const faqs = [
    {
      question: "How can I partner with your ministry?",
      answer: "We offer various partnership opportunities including prayer support, financial giving, and volunteer missions. Contact our partnerships team for more information."
    },
    {
      question: "What payment methods do you accept for donations?",
      answer: "We accept mobile money transfers (M-Pesa), credit/debit cards, and bank transfers. All donations are securely processed."
    },
    {
      question: "Do you offer mission trip opportunities?",
      answer: "Yes! We organize quarterly mission trips across East Africa. Requirements include completing our training program and a valid travel document."
    },
    {
      question: "How can I access your daily devotionals?",
      answer: "Devotionals are available through our mobile app, email newsletter, and WhatsApp channel. Sign up through our resources page."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic
  };

  return (
    <>
    <Navbar />
    <section id="contact" className="py-20 bg-gray-50">
      {/* Hero Section */}
<section className="relative py-32 bg-gradient-to-b from-blue-900 to-blue-700 text-white overflow-hidden mb-8">
  <div className="absolute inset-0 z-0">
    <Image
      src="/images/contact-hero-bg.jpg" 
      alt="Contact Background"
      fill
      className="object-cover opacity-20"
    />
  </div>
  <div className="container mx-auto px-4 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-3xl mx-auto text-center"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
      <p className="text-xl text-blue-100 mb-8">
        We'd love to hear from you! Reach out to us for any inquiries or to get involved.
      </p>
    </motion.div>
  </div>
</section>
      <div className="container mx-auto px-4">
 

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="How can we serve you today?"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info & FAQs */}
          <div className="space-y-8">
            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">General Inquiries</h4>
                    <a href="mailto:info@lighthouse.org" className="text-blue-600 hover:text-blue-800">
                      info@lighthouse.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Call Us</h4>
                    <div className="space-y-1">
                      <a href="tel:+254712345678" className="block text-blue-600 hover:text-blue-800">
                        +254 712 345 678 (Office)
                      </a>
                      <a href="tel:+254734567890" className="block text-blue-600 hover:text-blue-800">
                        +254 734 567 890 (Prayer Line)
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Visit Us</h4>
                    <p className="text-gray-600">Lighthouse Plaza</p>
                    <p className="text-gray-600">Nairobi, Kenya</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Office Hours</h4>
                    <p className="text-gray-600">Mon-Fri: 8:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Sat: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-0">
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="w-full flex justify-between items-center py-4"
                    >
                      <span className="text-left font-medium text-gray-800">{faq.question}</span>
                      {activeFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-blue-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-blue-600" />
                      )}
                    </button>
                    {activeFaq === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pb-4 text-gray-600"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Map & Social */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.808227583977!2d36.82116141523929!3d-1.2890715359790025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d7e2d5e9cb%3A0xfb0292344b5a0bc5!2sNairobi%20City%20Hall!5e0!3m2!1sen!2ske!4v1658152340917!5m2!1sen!2ske"
              className="w-full h-64 rounded-lg border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          <div className="bg-blue-600 text-white p-8 rounded-xl shadow-lg space-y-6">
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8" />
              <h3 className="text-2xl font-bold">Global Partnerships</h3>
            </div>
            <p className="text-blue-100">
              Join our international network of prayer warriors and ministry partners. 
              Subscribe to our monthly newsletter for updates and prayer requests.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2">
                <HeartHandshake className="h-5 w-5" />
                Become a Partner
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
         {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Cross className="h-12 w-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us in This Mission</h2>
            <p className="text-xl text-blue-100 mb-8">
              Whether through prayer, giving, or going, there's a place for you in this work.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-blue-700 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors">
                Partner With Us
              </button>
              <button className="border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-lg transition-colors">
                Share Your Story
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    <Footer />
    </>
  );
};

export default ContactPage;