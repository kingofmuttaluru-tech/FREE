
import React, { useState } from 'react';
import { Search, Filter, Info, ShoppingCart } from 'lucide-react';
import { LAB_TESTS } from '../constants';
import { TestCategory } from '../types';

const Tests: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Object.values(TestCategory);

  const filteredTests = LAB_TESTS.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? test.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-blue-700 text-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Diagnostic Test Catalogue</h1>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">Browse our comprehensive list of individual tests with transparent pricing.</p>
          
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search tests (e.g., CBC, HbA1c, Vitamin D...)" 
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-800 focus:ring-4 focus:ring-blue-500 outline-none shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filter */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h3 className="font-bold flex items-center mb-4">
              <Filter className="w-4 h-4 mr-2" /> Categories
            </h3>
            <div className="space-y-2">
              <button 
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedCategory ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                All Tests
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h4 className="font-bold text-blue-800 text-sm mb-2">Need Help?</h4>
            <p className="text-xs text-blue-600 mb-4">Speak with our lab advisor for assistance with test selection.</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-xs font-bold">Call Advisor</button>
          </div>
        </div>

        {/* Test Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTests.length > 0 ? filteredTests.map(test => (
              <div key={test.id} className="bg-white rounded-2xl p-6 border shadow-sm flex flex-col hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-2 py-0.5 rounded">
                    {test.category}
                  </span>
                  <p className="text-lg font-bold text-gray-900">₹{test.price}</p>
                </div>
                <h3 className="font-bold text-gray-800 mb-1 leading-tight">{test.name}</h3>
                <p className="text-xs text-gray-500 mb-4 flex-grow">{test.description}</p>
                
                <div className="bg-gray-50 p-3 rounded-xl mb-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Parameters Covered</p>
                  <div className="flex flex-wrap gap-2">
                    {test.parameters.slice(0, 3).map((p, i) => (
                      <span key={i} className="text-[10px] bg-white border px-2 py-0.5 rounded-full text-gray-600">{p}</span>
                    ))}
                    {test.parameters.length > 3 && <span className="text-[10px] text-blue-500 font-medium">+{test.parameters.length - 3} more</span>}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-grow bg-blue-600 text-white py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                  </button>
                  <button className="p-2 border rounded-xl hover:bg-gray-50 text-gray-400">
                    <Info className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-400">No tests found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tests;
