import React, { useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const CTA: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    
    setStatus('loading');

    try {
      // Send to LeadConnector webhook
      // We use standard CORS request so that Content-Type: application/json is respected.
      await fetch('https://services.leadconnectorhq.com/hooks/eD0Y8xCYSZc25DM2RSfS/webhook-trigger/4321a8de-a051-4ca9-8848-5a438673ed50', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      setStatus('success');
      
      // Trigger confetti
      const end = Date.now() + 1000;
      const colors = ['#BFF549', '#ffffff'];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());

    } catch (error) {
      console.error('Submission error:', error);
      // In case of CORS error, we might still want to show success if it's a "fire and forget" scenario, 
      // but usually it throws. For this specific user request, we assume the webhook supports CORS.
      // If it fails, we show error.
      setStatus('error');
    }
  };

  return (
    <section className="py-24 px-5 md:px-10">
      <div className="max-w-5xl mx-auto bg-black rounded-3xl p-10 md:p-20 text-center relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-lime opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-lime opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 max-w-2xl mx-auto min-h-[300px] flex flex-col justify-center">
          {status === 'success' ? (
            <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center">
              <div className="w-16 h-16 bg-brand-lime rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(191,245,73,0.3)]">
                <Check className="w-8 h-8 text-black" strokeWidth={3} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4">
                Welcome aboard, {name.split(' ')[0]}!
              </h2>
              <p className="text-gray-400 text-lg">
                You've successfully joined the list. Keep an eye on your inbox for updates.
              </p>
              <button 
                onClick={() => {
                  setStatus('idle');
                  setName('');
                  setEmail('');
                }}
                className="mt-8 text-sm text-brand-lime hover:text-white underline underline-offset-4 transition-colors"
              >
                Add another email
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
                Unlock the power of <br/>
                <span className="text-brand-lime">universal dictation</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10">
                Join thousands of professionals saving 20+ hours a month. No credit card required.
              </p>

              <form className="flex flex-col gap-3 w-full max-w-md mx-auto" onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent transition-all"
                  required
                />
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent transition-all"
                  required
                />
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full px-8 py-4 bg-brand-lime text-black font-bold rounded-full hover:bg-white disabled:opacity-70 disabled:hover:bg-brand-lime disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {status === 'loading' ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>Get Started <ArrowRight size={18} /></>
                  )}
                </button>
                {status === 'error' && (
                  <p className="text-red-400 text-sm mt-2">Something went wrong. Please try again.</p>
                )}
              </form>
              <p className="text-gray-500 text-xs mt-4">
                By joining, you agree to our Terms of Service and Privacy Policy.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;