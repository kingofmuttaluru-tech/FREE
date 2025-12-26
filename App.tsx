
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tests from './pages/Tests';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import BookingFlow from './pages/BookingFlow';
import AdminDashboard from './pages/AdminDashboard';
import SampleBoyApp from './pages/SampleBoyApp';
import ReportDetail from './pages/ReportDetail';
import Tracking from './pages/Tracking';
import AdminResultEntry from './pages/AdminResultEntry';

const About = () => (
  <div className="min-h-screen p-8 max-w-4xl mx-auto space-y-8">
    <h1 className="text-4xl font-black text-blue-800 tracking-tight">About FREE BALU</h1>
    <div className="prose prose-blue lg:prose-xl">
      <p className="text-gray-600 leading-relaxed font-medium">
        FREE BALU Diagnostic Centre is a world-class laboratory facility dedicated to providing accurate, reliable, and affordable diagnostic services. Inspired by the best practices of global leaders, we use fully automated machinery and NABL-grade protocols to ensure every report is a step towards better health.
      </p>
    </div>
  </div>
);

const Login = () => (
  <div className="min-h-[80vh] flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-white rounded-[3rem] p-12 shadow-2xl border">
      <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Login to App</h2>
      <p className="text-gray-500 font-medium mb-10">Access your medical history instantly.</p>
      <div className="space-y-6">
        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mobile Number</label>
          <input type="tel" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold" placeholder="+91 XXXXX XXXXX" />
        </div>
        <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
          Get OTP
        </button>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/book" element={<BookingFlow />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/reports/:id" element={<ReportDetail />} />
            <Route path="/tracking/:id" element={<Tracking />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/enter-results/:sid" element={<AdminResultEntry />} />
            <Route path="/partner" element={<SampleBoyApp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
