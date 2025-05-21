"use client"
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';

const perspectives = [
  {
    id: 1,
    title: "The Power of Prayer",
    excerpt: "Discover how consistent prayer can transform your spiritual life and ministry impact.",
    icon: "🙏",
  },
  {
    id: 2,
    title: "Faith in Action",
    excerpt: "Exploring what it means to live out your faith in practical ways every day.",
    icon: "👣",
  },
  {
    id: 3,
    title: "The Joy of Giving",
    excerpt: "How generosity opens doors to spiritual blessings and kingdom impact.",
    icon: "💝",
  },
  {
    id: 4,
    title: "Walking in Love",
    excerpt: "Lessons from 1 Corinthians 13 on demonstrating Christ's love to others.",
    icon: "❤️",
  },
];

const Perspectives = () => {
  return (
    <section id="perspectives" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Fresh Reflections" 
          subtitle="Devotionals & Perspectives" 
          center
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {perspectives.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Perspectives;