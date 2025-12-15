import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-white/80 backdrop-blur-md border-b border-gray-100' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center cursor-pointer group">
          <img 
            src="/Glaido Horizontal Black.png" 
            alt="Glaido" 
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="/blog" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Blog</a>
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Pricing</a>
          <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">FAQ</a>
          <a href="#about" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">About</a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="text-sm font-medium hover:opacity-70">Login</a>
          <button className="bg-brand-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-brand-lime hover:text-brand-black transition-colors duration-300">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-5 md:hidden flex flex-col gap-4 shadow-xl">
          <a href="/blog" className="text-base font-medium py-2">Blog</a>
          <a href="#pricing" className="text-base font-medium py-2">Pricing</a>
          <a href="#faq" className="text-base font-medium py-2">FAQ</a>
          <button className="bg-brand-black text-white w-full py-3 rounded-lg font-medium">
            Get Started
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;