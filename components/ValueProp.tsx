import React from 'react';
import { Clock, Globe, ShieldCheck, CheckCircle2 } from 'lucide-react';

const ValueProp: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center p-2 bg-brand-lime/20 rounded-full mb-6">
            <Clock size={20} className="text-black" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-brand-black">
            Finish your work in <br/>
            <span className="bg-brand-lime px-2 leading-normal box-decoration-clone">1/5th the time</span>
          </h2>
          <p className="text-xl text-gray-600">
            Trusted by developers and professionals. Works everywhere, GDPR compliant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Feature 1 */}
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-black text-brand-lime flex items-center justify-center mb-2">
              <Clock size={24} />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">Finish emails in 3 minutes</h3>
            <p className="text-gray-600 leading-relaxed">
              That 15-minute email response? Do it in 3 minutes. Your voice is 5x faster than typing.
            </p>
            <ul className="space-y-2 mt-2">
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 size={16} className="text-brand-lime fill-black" /> Removes filler words
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 size={16} className="text-brand-lime fill-black" /> Perfect punctuation
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-black text-brand-lime flex items-center justify-center mb-2">
              <Globe size={24} />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">Speak your native language</h3>
            <p className="text-gray-600 leading-relaxed">
              100+ languages supported. Work how you think, not how software dictates. Automatic language detection included.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {['English', 'Spanish', 'French', 'Mandarin', 'German'].map(lang => (
                <span key={lang} className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">{lang}</span>
              ))}
              <span className="text-xs px-2 py-1 text-gray-400">+95 more</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-black text-brand-lime flex items-center justify-center mb-2">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">GDPR Compliant</h3>
            <p className="text-gray-600 leading-relaxed">
              Full control over your data. Transparent handling. Optional local processing for maximum privacy.
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-xs font-mono text-gray-500">
                Status: <span className="text-green-600 font-bold">Encrypted</span><br/>
                Server: <span className="text-gray-800">EU-West</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProp;