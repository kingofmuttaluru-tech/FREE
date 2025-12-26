
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Microscope, User, Menu, X, Heart, ClipboardList, History, ShieldCheck, Truck } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tests', path: '/tests' },
    { name: 'Reports', path: '/history' },
  ];

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Microscope className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-blue-800 leading-none tracking-tight">FREE BALU</span>
                <span className="text-[9px] text-green-600 font-black tracking-widest uppercase">Diagnostic Centre</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold transition-colors ${
                  location.pathname === link.path ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-6 w-px bg-gray-200 mx-2" />
            
            <Link to="/partner" className="text-gray-400 hover:text-blue-600"><Truck className="w-5 h-5" /></Link>
            <Link to="/admin" className="text-gray-400 hover:text-blue-600"><ShieldCheck className="w-5 h-5" /></Link>
            
            <Link
              to="/login"
              className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-2xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
            >
              <User className="w-4 h-4" />
              <span>Patient App</span>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b absolute w-full shadow-2xl z-50">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-3 text-base font-bold text-gray-700 hover:text-blue-600 border-b border-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 grid grid-cols-2 gap-2">
              <Link
                to="/admin"
                className="flex items-center justify-center p-3 text-sm font-bold text-slate-700 bg-gray-100 rounded-2xl"
                onClick={() => setIsOpen(false)}
              >
                <ShieldCheck className="w-4 h-4 mr-2" /> Admin
              </Link>
              <Link
                to="/partner"
                className="flex items-center justify-center p-3 text-sm font-bold text-slate-700 bg-gray-100 rounded-2xl"
                onClick={() => setIsOpen(false)}
              >
                <Truck className="w-4 h-4 mr-2" /> Partner
              </Link>
            </div>
            <Link
              to="/login"
              className="block w-full text-center py-4 bg-blue-600 text-white rounded-2xl font-bold mt-4 shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              Patient Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
