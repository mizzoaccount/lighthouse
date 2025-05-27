"use client"
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';

const Giving = () => {
  return (
    <section id="give" className="py-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Kingdom Investment" 
          subtitle="Partner With Us" 
          center
          light
        />

        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xl text-blue-100 mb-8">
            Your generous giving enables us to reach more people with the Gospel, 
            equip leaders, and transform communities through Christ's love.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button href="#" variant="secondary" size="lg">
              Give Now
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Bank Transfer
            </h3>
            <div className="space-y-2 text-blue-100">
              <p><span className="font-medium">Bank:</span> Kenya Commercial Bank</p>
              <p><span className="font-medium">Account Name:</span> Lighthouse Outreaches</p>
              <p><span className="font-medium">Account Number:</span> 1234567890</p>
              <p><span className="font-medium">Branch:</span> Nairobi West</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              M-Pesa
            </h3>
            <div className="space-y-2 text-blue-100">
              <p><span className="font-medium">Paybill:</span> 123456</p>
              <p><span className="font-medium">Account:</span> Donation</p>
              <p className="mt-4">Or send directly to:</p>
              <p><span className="font-medium">Phone:</span> +254 712 345 678</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Giving;