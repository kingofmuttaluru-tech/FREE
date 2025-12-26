
import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">FREE BALU Diagnostic Centre</h3>
            <p className="text-sm leading-relaxed">
              Providing high-quality diagnostic services with international standards (NABL equivalent) across India. Accurate tests, honest care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Full Body Checkups</a></li>
              <li><a href="#" className="hover:text-white">Blood Tests</a></li>
              <li><a href="#" className="hover:text-white">Home Collection</a></li>
              <li><a href="#" className="hover:text-white">Report Download</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Popular Tests</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">HbA1c</a></li>
              <li><a href="#" className="hover:text-white">Thyroid Profile</a></li>
              <li><a href="#" className="hover:text-white">Lipid Profile</a></li>
              <li><a href="#" className="hover:text-white">Liver Function Test</a></li>
              <li><a href="#" className="hover:text-white">Vitamin D</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5" />
                <span>123 Medical Square, Hi-Tech City, Hyderabad, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>support@freebalu.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} FREE BALU Diagnostic Centre. All rights reserved. Registered under Indian Medical Laws.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
