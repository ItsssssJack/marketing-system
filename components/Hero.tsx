import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Zap, Keyboard, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-lime/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gray border border-gray-200 mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand-lime"></span>
            <span className="text-xs font-medium uppercase tracking-wide text-gray-600">Work at the speed of thought</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter text-brand-black leading-[0.9] mb-6 md:mb-8"
          >
            Write 5x faster <br className="hidden md:block" />
            <span className="relative inline-block">
              in every app
              <span className="absolute -bottom-2 left-0 right-0 h-4 bg-brand-lime/50 -z-10 -rotate-1 rounded-sm"></span>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-xl mb-10 leading-relaxed font-medium"
          >
            Speak naturally. Your words appear instantly. <br/>
            Save 20+ hours every month.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button className="w-full sm:w-auto px-8 py-4 bg-brand-lime text-brand-black font-semibold rounded-full hover:shadow-lg hover:shadow-brand-lime/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
              <Zap size={20} className="fill-current" />
              Try Glaido Free
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-brand-black font-semibold rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              See how it works
            </button>
          </motion.div>

          {/* Comparison Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-20 w-full max-w-4xl"
          >
            <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 md:p-8 shadow-2xl shadow-gray-200/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* Typing Side */}
                <div className="flex flex-col gap-4 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                  <div className="flex items-center justify-between text-sm font-medium text-gray-500 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Keyboard size={16}/> Typing</span>
                    <span>~40 WPM</span>
                  </div>
                  <div className="h-24 bg-gray-100 rounded-xl p-4 text-left text-gray-400 text-sm font-mono overflow-hidden">
                    Um, can you like send me that file when you get a chance maybe?
                  </div>
                  <div className="text-xs text-red-400 font-medium text-left">Too slow.</div>
                </div>

                {/* Voice Side */}
                <div className="flex flex-col gap-4 relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand-black text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg z-10">
                    5x FASTER
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold text-brand-black uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Mic size={16} className="text-brand-lime fill-brand-lime"/> Glaido Voice</span>
                    <span>200+ WPM</span>
                  </div>
                  <div className="h-24 bg-brand-lime/10 border border-brand-lime/20 rounded-xl p-4 text-left text-brand-black text-base font-medium flex items-center shadow-sm">
                    "Can you send me that file when you get a chance?"
                  </div>
                  <div className="flex gap-2 text-xs font-medium text-left text-gray-600">
                    <span className="flex items-center gap-1 text-green-600"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Auto-edited</span>
                    <span className="flex items-center gap-1 text-green-600"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Perfect grammar</span>
                  </div>
                </div>

              </div>
            </div>
            <p className="mt-6 text-sm text-gray-400">Trusted by developers & professionals at leading companies.</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;