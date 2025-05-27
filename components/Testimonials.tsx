"use client"
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import TestimonialCard from '../ui/TestimonialCard';

const testimonials = [
  {
    id: 1,
    quote: "The Thompson Bible Workshop transformed how I study and teach God's Word. I'm now equipped to lead my congregation with confidence.",
    name: "Pastor John Mwangi",
    role: "Church Leader, Nairobi",
    image: "/images/testimonials/pastor.jpg",
  },
  {
    id: 2,
    quote: "Through Lighthouse Outreaches, my family received both spiritual nourishment and practical help during a difficult time. God is using this ministry mightily.",
    name: "Esther Wambui",
    role: "Community Member, Kisumu",
    image: "/images/testimonials/woman.jpg",
  },
  {
    id: 3,
    quote: "As a youth leader, the materials from Kahawa Media have been invaluable in engaging our young people with relevant, biblical content.",
    name: "David Omondi",
    role: "Youth Leader, Mombasa",
    image: "/images/testimonials/youth.jpg",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Impact Stories" 
          subtitle="What People Are Saying" 
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;