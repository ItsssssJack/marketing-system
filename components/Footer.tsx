import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <img 
                src="/Glaido Horizontal Black.png" 
                alt="Glaido" 
                className="h-8 w-auto object-contain" 
              />
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Seamless voice-to-text in any application. One hotkey to speak instead of type.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">Features</a></li>
              <li><a href="#" className="hover:text-black">Pricing</a></li>
              <li><a href="#" className="hover:text-black">Download</a></li>
              <li><a href="/blog" className="hover:text-black">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">Terms of Service</a></li>
              <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black">GDPR</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">Twitter</a></li>
              <li><a href="#" className="hover:text-black">LinkedIn</a></li>
              <li><a href="#" className="hover:text-black">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-400">
            © Copyright 2025 Glaido. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-500">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;