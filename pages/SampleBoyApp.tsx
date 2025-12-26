
import React from 'react';
import { 
  Navigation, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Calendar,
  AlertCircle,
  Clock
} from 'lucide-react';

const SampleBoyApp: React.FC = () => {
  const pickups = [
    { id: 'p1', patient: 'Balu Kumar', address: 'Plot 42, Silicon Valley Layout, Madhapur', time: '08:00 AM', test: 'CBC', phone: '9876543210' },
    { id: 'p2', patient: 'Anjali Sharma', address: 'Flat 202, Skyline Apts, Gachibowli', time: '09:30 AM', test: 'Thyroid Profile', phone: '9876500112' },
    { id: 'p3', patient: 'Ravi Teja', address: 'Phase 3, Jubilee Hills, Road No. 36', time: '11:00 AM', test: 'Full Body Wellness', phone: '9123456789' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20 pt-6">
      <div className="max-w-md mx-auto px-4">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Partner Portal</h1>
            <p className="text-slate-400 text-xs flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Online & Receiving Pickups
            </p>
          </div>
          <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
            SB
          </div>
        </header>

        <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 mb-8 flex justify-between items-center">
          <div className="text-center flex-1 border-r border-slate-700">
            <p className="text-2xl font-black">3</p>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Pickups Today</p>
          </div>
          <div className="text-center flex-1">
            <p className="text-2xl font-black text-green-400">0</p>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Completed</p>
          </div>
        </div>

        <h2 className="text-sm font-bold uppercase text-slate-500 mb-4 tracking-widest">Today's Schedule</h2>
        
        <div className="space-y-4">
          {pickups.map(pickup => (
            <div key={pickup.id} className="bg-white text-slate-900 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded uppercase">
                      {pickup.test}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> {pickup.time}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{pickup.patient}</h3>
                </div>
                <div className="bg-slate-100 p-2 rounded-xl">
                  <Phone className="w-5 h-5 text-slate-600" />
                </div>
              </div>

              <div className="flex items-start space-x-3 mb-6">
                <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                <p className="text-sm text-slate-600 leading-snug">{pickup.address}</p>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pickup.address)}`)}
                  className="flex-1 bg-slate-900 text-white py-3 rounded-2xl text-sm font-bold flex items-center justify-center space-x-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Navigate</span>
                </button>
                <button className="flex-1 bg-green-600 text-white py-3 rounded-2xl text-sm font-bold flex items-center justify-center space-x-2 shadow-lg shadow-green-900/20">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Collected</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <p className="text-xs text-amber-200">Remember to label the samples immediately and maintain the cold chain (2-8°C).</p>
        </div>
      </div>
    </div>
  );
};

export default SampleBoyApp;
