
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Truck, 
  FlaskConical, 
  ClipboardCheck, 
  MapPin, 
  Phone, 
  Calendar,
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';
import { MOCK_BOOKINGS } from '../constants';

const Tracking: React.FC = () => {
  const { id } = useParams();
  const booking = MOCK_BOOKINGS.find(b => b.id === id);

  if (!booking) return <div className="p-20 text-center">Booking not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        <Link to="/dashboard" className="flex items-center text-blue-600 font-bold text-sm mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Link>

        <header className="bg-white p-8 rounded-[2.5rem] shadow-xl border mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">Active Tracking</span>
              <h1 className="text-3xl font-black text-gray-900 mt-2">{booking.id}</h1>
              <p className="text-gray-500 font-medium">{booking.testName}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 font-bold uppercase">Estimated Report</p>
              <p className="font-black text-blue-600">Today, 06:00 PM</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div className="bg-green-100 p-2 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-black">Current Status: {booking.status}</p>
              <p className="text-[10px] text-gray-400">Updated: Today at 10:45 AM</p>
            </div>
          </div>
        </header>

        {/* Vertical Timeline */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border relative overflow-hidden">
          <div className="space-y-12 relative">
            {booking.trackingHistory.map((step, idx) => (
              <div key={idx} className="flex space-x-6 relative group">
                {/* Connector Line */}
                {idx < booking.trackingHistory.length - 1 && (
                  <div className={`absolute left-[15px] top-[30px] bottom-[-50px] w-0.5 ${step.completed ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
                
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${step.completed ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-100 text-gray-300 border-2 border-gray-50'}`}>
                  {step.status === 'Confirmed' && <ClipboardCheck className="w-4 h-4" />}
                  {step.status === 'Sample Collected' && <Truck className="w-4 h-4" />}
                  {step.status === 'In Lab' && <FlaskConical className="w-4 h-4" />}
                  {step.status === 'Processing' && <Activity className="w-4 h-4" />}
                  {step.status === 'Report Ready' && <CheckCircle2 className="w-4 h-4" />}
                </div>

                <div className="flex-grow pt-1">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-black text-sm ${step.completed ? 'text-gray-900' : 'text-gray-300'}`}>{step.status}</h3>
                    <span className="text-[10px] text-gray-400 font-bold">{step.time}</span>
                  </div>
                  <p className={`text-xs mt-1 ${step.completed ? 'text-gray-500' : 'text-gray-200'}`}>
                    {step.status === 'Confirmed' && 'Your appointment has been booked successfully.'}
                    {step.status === 'Sample Collected' && 'Our phlebotomist collected your sample.'}
                    {step.status === 'In Lab' && 'Sample received and validated by our lab team.'}
                    {step.status === 'Processing' && 'Analzying parameters on high-end fully auto systems.'}
                    {step.status === 'Report Ready' && 'Your medical report is validated and ready for download.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collection Details */}
        <div className="mt-8 bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="font-black text-lg mb-6 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-400" /> Collection Details
            </h4>
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-xs text-blue-200 font-bold uppercase">Staff Assigned</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-black">Suresh Kumar</span>
                  <div className="bg-blue-400/20 p-2 rounded-xl">
                    <Phone className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-xs text-blue-200 font-bold uppercase mt-1">Location</span>
                <p className="text-sm font-black text-right max-w-[200px]">Plot 42, Silicon Valley Layout, Madhapur, Hyderabad</p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        </div>
      </div>
    </div>
  );
};

import { Activity } from 'lucide-react';
export default Tracking;
