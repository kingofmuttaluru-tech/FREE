
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  CreditCard, 
  Activity, 
  Truck, 
  AlertCircle,
  Search,
  CheckCircle,
  MoreVertical,
  FlaskConical,
  Edit3,
  FileText,
  Download,
  Eye,
  Filter
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'queue' | 'reports'>('queue');

  const processingQueue = [
    { sid: 'SID-9821', name: 'Balu Kumar', test: 'CBC / CBP', status: 'In Lab', time: '2h ago' },
    { sid: 'SID-9823', name: 'John Doe', test: 'Vitamin D', status: 'In Lab', time: '3h ago' },
    { sid: 'SID-9824', name: 'Anjali S.', test: 'Lipid Profile', status: 'In Lab', time: '4h ago' },
  ];

  const publishedReports = [
    { sid: 'SID-9810', name: 'Ravi Teja', test: 'Thyroid Profile', date: 'Today, 10:20 AM', id: 'rep1' },
    { sid: 'SID-9805', name: 'Sita Ram', test: 'Full Body Wellness', date: 'Yesterday', id: 'rep1' },
    { sid: 'SID-9799', name: 'Priya K.', test: 'HbA1c', date: 'Yesterday', id: 'rep1' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Admin Portal</h1>
            <p className="text-gray-500 font-medium">Manage clinical operations and authorize reports</p>
          </div>
          <div className="flex items-center space-x-2 bg-white p-3 rounded-2xl border shadow-sm">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-black text-gray-700 uppercase tracking-widest">System: SECURE</span>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Revenue (Today)', value: '₹42,350', icon: CreditCard, color: 'blue' },
            { label: 'Pending Results', value: '18', icon: FlaskConical, color: 'orange' },
            { label: 'Samples Collected', value: '24', icon: Truck, color: 'green' },
            { label: 'Reports Published', value: '152', icon: FileText, color: 'purple' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border shadow-sm">
              <stat.icon className={`w-8 h-8 text-${stat.color}-500 mb-4`} />
              <p className="text-2xl font-black">{stat.value}</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[2.5rem] border shadow-sm overflow-hidden">
              {/* Tab Header */}
              <div className="flex border-b">
                <button 
                  onClick={() => setActiveTab('queue')}
                  className={`flex-1 py-6 text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'queue' ? 'text-blue-600 border-b-4 border-blue-600 bg-blue-50/30' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Processing Queue ({processingQueue.length})
                </button>
                <button 
                  onClick={() => setActiveTab('reports')}
                  className={`flex-1 py-6 text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'reports' ? 'text-blue-600 border-b-4 border-blue-600 bg-blue-50/30' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Published Reports
                </button>
              </div>

              {/* Filter Bar */}
              <div className="p-6 bg-gray-50/50 border-b flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Search SID or Name..." className="w-full pl-10 pr-4 py-2 border rounded-xl text-xs outline-none focus:ring-4 focus:ring-blue-500/10 font-bold" />
                </div>
                <button className="flex items-center space-x-2 text-xs font-bold text-gray-500 hover:text-blue-600">
                  <Filter className="w-4 h-4" />
                  <span>Advanced Filters</span>
                </button>
              </div>

              {/* Table Content */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b">
                      <th className="px-8 py-4">Patient Info</th>
                      <th className="px-6 py-4">Test Profile</th>
                      <th className="px-6 py-4">{activeTab === 'queue' ? 'Received' : 'Published On'}</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm">
                    {activeTab === 'queue' ? (
                      processingQueue.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-8 py-5">
                            <p className="font-black text-gray-900">{row.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">{row.sid}</p>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-gray-700 font-bold">{row.test}</span>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-xs font-bold text-gray-500">{row.time}</span>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <Link 
                              to={`/admin/enter-results/${row.sid}`}
                              className="inline-flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/10"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Enter Values</span>
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      publishedReports.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-8 py-5">
                            <p className="font-black text-gray-900">{row.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">{row.sid}</p>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-gray-700 font-bold">{row.test}</span>
                          </td>
                          <td className="px-6 py-5 text-xs font-bold text-gray-500">
                            {row.date}
                          </td>
                          <td className="px-6 py-5 text-right flex justify-end space-x-2">
                            <Link to={`/reports/${row.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="View Report">
                              <Eye className="w-5 h-5" />
                            </Link>
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all" title="Download PDF">
                              <Download className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-300 hover:text-gray-600 rounded-lg">
                              <MoreVertical className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
              <h3 className="text-lg font-black mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl text-left border border-white/10 transition-all group">
                  <p className="text-xs font-black uppercase tracking-widest text-blue-400 group-hover:text-white">Verify QC</p>
                  <p className="text-[10px] text-slate-400 font-medium">Daily calibration check</p>
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl text-left border border-white/10 transition-all group">
                  <p className="text-xs font-black uppercase tracking-widest text-purple-400 group-hover:text-white">Sample Logistics</p>
                  <p className="text-[10px] text-slate-400 font-medium">Track phlebotomist routes</p>
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border shadow-sm">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Staff Performance</h4>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-black text-xs">SK</div>
                    <span className="text-xs font-bold">Suresh K.</span>
                  </div>
                  <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded">12 Pickups</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-black text-xs">AR</div>
                    <span className="text-xs font-bold">Anil R.</span>
                  </div>
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded">8 Pickups</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
