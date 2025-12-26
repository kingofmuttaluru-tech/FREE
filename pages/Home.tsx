
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, ShieldCheck, Clock, Home as HomeIcon, Smartphone, Sparkles, AlertCircle, Microscope, Heart } from 'lucide-react';
import { HEALTH_PACKAGES } from '../constants';
import { getTestRecommendations } from '../services/geminiService';

const Home: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [recommendations, setRecommendations] = useState<{test: string, reason: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAiConsult = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    const results = await getTestRecommendations(symptoms);
    setRecommendations(results);
    setLoading(false);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white overflow-hidden py-16 md:py-24">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFFFFF" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-46.5C87.4,-33.8,89.9,-18.6,89.1,-3.5C88.2,11.5,83.9,26.4,76.5,39.6C69,52.8,58.4,64.2,45.4,72.6C32.4,81,16.2,86.4,0.1,86.2C-16,86,-31.9,80.1,-45.6,72.1C-59.2,64.1,-70.6,53.8,-78.3,41.4C-86,29,-89.9,14.5,-89.8,0.1C-89.6,-14.3,-85.4,-28.6,-77.7,-41.2C-70.1,-53.8,-59,-64.7,-46,-72.5C-33,-80.4,-16.5,-85.1,-0.4,-84.3C15.7,-83.5,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/30 text-blue-100 text-[10px] font-black uppercase tracking-widest">
                Trusted Reports. Caring Hands.
              </div>
              <h1 className="text-4xl md:text-7xl font-black leading-tight tracking-tighter">
                Accurate Tests. <br />Honest Care.
              </h1>
              <p className="text-lg text-blue-100 max-w-lg font-medium">
                India's fastest growing diagnostic chain. Get clinical grade reports delivered to your mobile within 24 hours.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/book" className="bg-white text-blue-800 px-10 py-4 rounded-3xl font-black hover:bg-blue-50 transition-all flex items-center shadow-2xl shadow-blue-900/40">
                  Book a Test <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/tests" className="bg-transparent border-2 border-white/30 text-white px-10 py-4 rounded-3xl font-black hover:bg-white/10 transition-all backdrop-blur-sm">
                  Catalogue
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2 w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl text-gray-800">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-2xl">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-black text-lg">AI Smart Assist</h3>
                  <p className="text-xs text-gray-500">Free medical test guidance</p>
                </div>
              </div>
              <div className="space-y-4">
                <textarea 
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="E.g., 'Feeling very weak and have joint pain'..."
                  className="w-full h-28 p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/10 outline-none resize-none transition-all"
                />
                <button 
                  onClick={handleAiConsult}
                  disabled={loading}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center space-x-2"
                >
                  {loading ? 'Analyzing symptoms...' : 'Check Recommended Tests'}
                </button>

                {recommendations.length > 0 && (
                  <div className="mt-4 p-5 bg-blue-50 rounded-2xl border border-blue-100 space-y-4">
                    <h4 className="text-[10px] font-black text-blue-800 uppercase flex items-center tracking-widest">
                      <AlertCircle className="w-3 h-3 mr-1.5" /> Clinical Suggestions
                    </h4>
                    {recommendations.map((rec, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-blue-100 shadow-sm">
                        <p className="text-sm font-black text-gray-800">{rec.test}</p>
                        <p className="text-[11px] text-gray-500 leading-relaxed mt-1">{rec.reason}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-50 p-4 rounded-2xl"><ShieldCheck className="w-8 h-8 text-blue-600" /></div>
            <div><p className="font-black text-sm">NABL Quality</p><p className="text-xs text-gray-500 uppercase font-bold">Standard Lab</p></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-green-50 p-4 rounded-2xl"><Clock className="w-8 h-8 text-green-600" /></div>
            <div><p className="font-black text-sm">24hr Reports</p><p className="text-xs text-gray-500 uppercase font-bold">Fast Delivery</p></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-orange-50 p-4 rounded-2xl"><HomeIcon className="w-8 h-8 text-orange-600" /></div>
            <div><p className="font-black text-sm">Free Home Collection</p><p className="text-xs text-gray-500 uppercase font-bold">Safe & Easy</p></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-purple-50 p-4 rounded-2xl"><Smartphone className="w-8 h-8 text-purple-600" /></div>
            <div><p className="font-black text-sm">Smart Tracking</p><p className="text-xs text-gray-500 uppercase font-bold">Live Status</p></div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">Health Packages</h2>
              <p className="text-gray-500 mt-2 font-medium">Preventive screenings for your entire family.</p>
            </div>
            <Link to="/tests" className="text-blue-600 font-black text-sm uppercase tracking-widest hover:underline hidden md:block">All Tests</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HEALTH_PACKAGES.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-[2rem] p-8 border shadow-sm transition-all hover:shadow-2xl relative overflow-hidden flex flex-col group">
                {pkg.isPopular && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest">
                    Best Seller
                  </div>
                )}
                <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight">{pkg.name}</h3>
                <p className="text-xs text-gray-400 font-bold uppercase mb-6">{pkg.testsIncluded.length} Parameters Covered</p>
                
                <div className="mb-8">
                  <p className="text-xs text-gray-300 line-through font-bold">₹{pkg.originalPrice}</p>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-4xl font-black text-blue-600">₹{pkg.price}</p>
                    <span className="text-xs text-green-600 font-black">-{Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8 flex-grow">
                  {pkg.testsIncluded.map((test, i) => (
                    <div key={i} className="flex items-center text-xs font-bold text-gray-600">
                      <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                      {test}
                    </div>
                  ))}
                </div>
                
                <Link to="/book" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-center group-hover:bg-blue-600 transition-colors">
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// CheckCircle import was missing
import { CheckCircle as CheckCircleIcon } from 'lucide-react';
const CheckCircle = CheckCircleIcon;

export default Home;
