
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  FileText,
  ArrowUpDown,
  Eye,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight
} from 'lucide-react';
import { MOCK_REPORTS } from '../constants';
import { TestCategory } from '../types';

const History: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const categories = ['All', ...Object.values(TestCategory)];

  const getCategoryStyles = (category: TestCategory) => {
    switch (category) {
      case TestCategory.BLOOD: return 'bg-red-50 text-red-700 border-red-100';
      case TestCategory.BIOCHEMISTRY: return 'bg-blue-50 text-blue-700 border-blue-100';
      case TestCategory.HORMONES: return 'bg-purple-50 text-purple-700 border-purple-100';
      case TestCategory.VITAMINS: return 'bg-amber-50 text-amber-700 border-amber-100';
      case TestCategory.URINE: return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const filteredAndSortedReports = useMemo(() => {
    let result = [...MOCK_REPORTS];

    if (searchTerm) {
      result = result.filter(r => 
        r.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'All') {
      result = result.filter(r => r.category === categoryFilter);
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [searchTerm, categoryFilter, sortOrder]);

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-24">
      <div className="max-w-5xl mx-auto px-4">
        {/* Page Header */}
        <header className="mb-10">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <HistoryIcon className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Health Records</h1>
          </div>
          <p className="text-gray-500 font-medium ml-1">Secure access to your clinical reports and diagnostic history.</p>
        </header>

        {/* Action Bar */}
        <div className="bg-white p-5 rounded-[2.5rem] shadow-xl border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center transition-all hover:shadow-2xl hover:shadow-blue-500/5">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search by test name or Report ID..."
              className="w-full pl-14 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <select 
                className="w-full appearance-none px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] text-xs font-black uppercase tracking-widest outline-none cursor-pointer pr-12 focus:bg-white transition-all"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Filter className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            
            <button 
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              className="flex items-center space-x-3 px-6 py-4 bg-slate-900 text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:bg-blue-600 transition-all"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span className="hidden sm:inline">{sortOrder === 'newest' ? 'Newest' : 'Oldest'}</span>
            </button>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredAndSortedReports.length > 0 ? (
            filteredAndSortedReports.map((report) => {
              const hasAbnormal = report.results?.some(r => r.status !== 'Normal');
              
              return (
                <div 
                  key={report.id} 
                  className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row md:items-center justify-between transition-all hover:shadow-2xl hover:border-blue-100 group relative overflow-hidden"
                >
                  {/* Status Indicator Strip */}
                  <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${hasAbnormal ? 'bg-red-500' : 'bg-green-500'}`} />

                  <div className="flex items-center space-x-6 mb-6 md:mb-0">
                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-colors shadow-sm ${hasAbnormal ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                      {hasAbnormal ? <AlertCircle className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                          {report.testName}
                        </h3>
                        {hasAbnormal && (
                          <span className="flex items-center bg-red-100 text-red-700 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                            Action Needed
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center text-[11px] font-black mt-2 gap-y-2">
                        <span className="flex items-center text-gray-400 uppercase tracking-widest mr-4">
                          <Calendar className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> {report.date}
                        </span>
                        <span className="flex items-center text-gray-400 uppercase tracking-widest mr-4">
                          <Clock className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> 04:45 PM
                        </span>
                        <span className={`px-3 py-1 rounded-full border text-[9px] uppercase tracking-widest font-black ${getCategoryStyles(report.category)}`}>
                          {report.category}
                        </span>
                        <span className="ml-2 text-gray-300 font-bold uppercase tracking-widest">#{report.id}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Link 
                      to={`/reports/${report.id}`}
                      className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-1 transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Report</span>
                    </Link>
                    <button 
                      className="p-4 border border-gray-100 rounded-[1.5rem] text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm"
                      title="Download PDF"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <div className="hidden md:flex items-center justify-center p-4 text-gray-200">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-[3.5rem] border-2 border-dashed border-gray-100 py-32 text-center shadow-inner">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <File