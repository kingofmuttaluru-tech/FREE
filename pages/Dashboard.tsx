
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardList, 
  FileText, 
  Clock, 
  TrendingUp, 
  Download, 
  ChevronRight,
  User as UserIcon,
  Calendar,
  Activity
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_BOOKINGS } from '../constants';

const mockHealthData = [
  { name: 'Jan', hb: 13.5, sugar: 110 },
  { name: 'Feb', hb: 13.8, sugar: 105 },
  { name: 'Mar', hb: 13.2, sugar: 120 },
  { name: 'Apr', hb: 13.6, sugar: 98 },
  { name: 'May', hb: 13.9, sugar: 102 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white font-black text-3xl shadow-2xl shadow-blue-500/30">
              BK
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Hello, Balu Kumar</h1>
              <p className="text-gray-500 font-medium">FB-ID: 102938 • <span className="text-blue-600">Verified Patient</span></p>
            </div>
          </div>
          <Link to="/book" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-slate-800 transition-all text-center">
            New Booking
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Tracking', value: '1', icon: Activity, color: 'blue', link: `/tracking/${MOCK_BOOKINGS[0].id}` },
                { label: 'My Reports', value: '12', icon: FileText, color: 'green', link: '/history' },
                { label: 'Family', value: '3', icon: UserIcon, color: 'orange', link: '#' },
                { label: 'Packages', value: '5', icon: ClipboardList, color: 'purple', link: '/tests' },
              ].map((stat, i) => (
                <Link key={i} to={stat.link} className="bg-white p-6 rounded-[2rem] border shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all group">
                  <stat.icon className={`w-8 h-8 text-${stat.color}-500 mb-4 group-hover:scale-110 transition-transform`} />
                  <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                </Link>
              ))}
            </div>

            {/* Health Trend Chart */}
            <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-black text-gray-900 flex items-center text-xl">
                  <TrendingUp className="w-6 h-6 mr-3 text-blue-600" /> Vital History
                </h3>
                <select className="text-xs font-bold bg-gray-50 border rounded-xl px-4 py-2 outline-none">
                  <option>Hemoglobin (g/dL)</option>
                  <option>Blood Sugar (FBS)</option>
                </select>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockHealthData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} fontWeight="bold" />
                    <YAxis fontSize={10} axisLine={false} tickLine={false} fontWeight="bold" />
                    <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="hb" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" strokeWidth={4} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Live Tracking Widget */}
            <div className="bg-white rounded-[2.5rem] border shadow-sm overflow-hidden">
              <div className="p-8 border-b flex justify-between items-center bg-gray-50/50">
                <h3 className="font-black text-gray-900 text-xl">Active Bookings</h3>
                <Link to={`/tracking/${MOCK_BOOKINGS[0].id}`} className="text-blue-600 text-sm font-black uppercase tracking-widest hover:underline">Track Live</Link>
              </div>
              <div className="p-8">
                {MOCK_BOOKINGS.map(booking => (
                  <div key={booking.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <div className="flex items-center space-x-6 mb-4 md:mb-0">
                      <div className="bg-blue-600 p-4 rounded-2xl text-white">
                        <Activity className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{booking.id}</p>
                        <h4 className="text-lg font-black text-gray-900">{booking.testName}</h4>
                        <p className="text-xs text-blue-600 font-bold">{booking.status} • Home Collection</p>
                      </div>
                    </div>
                    <Link 
                      to={`/tracking/${booking.id}`}
                      className="w-full md:w-auto px-8 py-3 bg-white border border-blue-600 text-blue-600 rounded-2xl text-sm font-black hover:bg-blue-600 hover:text-white transition-all text-center"
                    >
                      Track Order
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Tips & Banner */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-black mb-2 tracking-tight">Home Visit</h4>
                <p className="text-blue-100 text-sm font-medium leading-relaxed mb-6">Our phlebotomist Suresh is scheduled to visit tomorrow morning.</p>
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md mb-8 border border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-300">Slot Details</p>
                  <p className="font-black">20 May, 08:30 AM</p>
                </div>
                <button className="w-full bg-white text-blue-900 py-4 rounded-2xl font-black shadow-xl hover:bg-blue-50 transition-all">Manage Appointment</button>
              </div>
              <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border shadow-sm">
              <h4 className="text-xl font-black text-gray-900 mb-6">Daily Health Tips</h4>
              <div className="space-y-6">
                {[
                  { title: 'Morning Fasting', desc: 'Ensure 10-12 hours of fasting for accurate lipid profile tests.', icon: Clock, color: 'orange' },
                  { title: 'Hydration Strategy', desc: 'Drink ample water to keep veins clear for painless collection.', icon: Activity, color: 'blue' }
                ].map((tip, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className={`shrink-0 w-10 h-10 bg-${tip.color}-50 rounded-xl flex items-center justify-center`}>
                      <tip.icon className={`w-5 h-5 text-${tip.color}-600`} />
                    </div>
                    <div>
                      <h5 className="text-sm font-black text-gray-900">{tip.title}</h5>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed mt-1">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 text-blue-600 font-black text-xs uppercase tracking-widest hover:underline">See More Tips</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
