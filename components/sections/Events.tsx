"use client"
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import EventCard from '../ui/EventCard';

const events = [
  {
    id: 1,
    title: "Thompson Bible Workshop",
    date: "June 15-17, 2025",
    location: "Kisumu, Kenya",
    description: "A 3-day intensive workshop on biblical interpretation and teaching methods.",
    image: "/images/events/bible-workshop.jpg",
  },
  {
    id: 2,
    title: "Community Outreach",
    date: "July 5, 2025",
    location: "Nairobi Slums",
    description: "Sharing the Gospel and providing basic necessities to underserved communities.",
    image: "/images/events/outreach.jpg",
  },
  {
    id: 3,
    title: "Leadership Conference",
    date: "August 20-22, 2025",
    location: "Mombasa, Kenya",
    description: "Equipping church leaders with practical ministry skills.",
    image: "/images/events/conference.jpg",
  },
];

const pastEvents = [
  {
    id: 4,
    title: "Youth Camp 2024",
    date: "December 2024",
    location: "Nakuru, Kenya",
    image: "/images/events/youth-camp.jpg",
  },
  {
    id: 5,
    title: "Medical Mission",
    date: "October 2024",
    location: "Eldoret, Kenya",
    image: "/images/events/medical.jpg",
  },
  {
    id: 6,
    title: "Pastors' Retreat",
    date: "July 2024",
    location: "Naivasha, Kenya",
    image: "/images/events/retreat.jpg",
  },
];

const Events = () => {
  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Ministry Events" 
          subtitle="Join Us in Ministry" 
          center
        />

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Upcoming Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Past Events</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-lg shadow-md"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <div>
                    <h4 className="text-white font-bold">{event.title}</h4>
                    <p className="text-blue-200 text-sm">{event.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;