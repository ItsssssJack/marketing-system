import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import ValueProp from './components/ValueProp';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-black selection:bg-brand-lime selection:text-brand-black">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Testimonials />
        <ValueProp />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}