"use client"
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';

const sermons = [
  {
    id: 1,
    title: "The Power of the Gospel",
    preacher: "Rev. Michael Thompson",
    date: "May 5, 2025",
    type: "video",
    url: "https://youtube.com/embed/example1",
  },
  {
    id: 2,
    title: "Walking in Faith",
    preacher: "Pastor Sarah Johnson",
    date: "April 28, 2025",
    type: "audio",
    url: "#",
  },
  {
    id: 3,
    title: "Kingdom Principles",
    preacher: "Dr. James Mwangi",
    date: "April 21, 2025",
    type: "pdf",
    url: "#",
  },
];

const Sermons = () => {
  return (
    <section id="sermons" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Word & Teaching" 
          subtitle="Sermons & Resources" 
          center
        />

        <div className="max-w-4xl mx-auto mb-12">
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl">
            <iframe
              className="w-full h-96"
              src="https://www.youtube.com/embed/example"
              title="Latest Sermon"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sermons.map((sermon, index) => (
            <motion.div
              key={sermon.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    {sermon.type === 'video' && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                    {sermon.type === 'audio' && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        />
                      </svg>
                    )}
                    {sermon.type === 'pdf' && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{sermon.title}</h3>
                    <p className="text-sm text-gray-600">{sermon.preacher}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{sermon.date}</span>
                  <a
                    href={sermon.url}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {sermon.type === 'video' ? 'Watch' : sermon.type === 'audio' ? 'Listen' : 'Download'}
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sermons;