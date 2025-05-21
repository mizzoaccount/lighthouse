import Head from 'next/head';
import Header from '../components/layout/Header';
import Hero from '../components/sections/Hero';
import About from '@/components/sections/About';
import Perspectives from '@/components/sections/Perspectives';
import Events from '@/components/sections/Events';
import Testimonials from '@/components/sections/Testimonials';
import Gallery from '@/components/sections/Gallery';
import Sermons from '@/components/sections/Sermons';
import Giving from '@/components/sections/Giving';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import Ministries from '@/components/sections/Ministries';


export default function Home() {
  return (
    <>
      <Head>
        <title>Lighthouse Outreaches | Reaching the Unreached</title>
        <meta name="description" content="Touching lives with the truth of God's Word through outreach, media, and ministry." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />

       <main>
       <Hero />
        <About />
        <Perspectives />
        <Ministries />
        <Events />
        <Testimonials />
        <Gallery />
        <Sermons />
        <Giving />
        <Contact />
      </main>
      
      <Footer />
    </>
  );
}