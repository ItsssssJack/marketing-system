import React from 'react';

const testimonials = [
  {
    quote: "I respond to emails while walking my dog now. Sounds ridiculous but it's genuinely changed how I work.",
    name: "Jack Roberts",
    role: "Founder",
    company: "Teddy AI",
    image: "https://picsum.photos/100/100?random=1"
  },
  {
    quote: "Managing my coding work and developer communities meant constant typing. Glaido's speed gives me hours back every week.",
    name: "Jannis Moore",
    role: "Founder",
    company: "Integraticus",
    image: "https://picsum.photos/100/100?random=2"
  },
  {
    quote: "Consistent voice input across every app instead of relying on spotty built-in features is exactly what I needed.",
    name: "Dave Ebbelaar",
    role: "Founder",
    company: "Datalumina",
    image: "https://picsum.photos/100/100?random=3"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-brand-gray border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">How people got their time back</h2>
          <p className="text-lg text-gray-600">See how professionals are using Glaido daily.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
              <p className="text-lg font-medium text-gray-800 mb-8 leading-relaxed">
                “{t.quote}”
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <div className="font-bold text-brand-black">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}, {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;