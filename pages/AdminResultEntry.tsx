
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Save, 
  CheckCircle2, 
  AlertTriangle,
  FlaskConical,
  Beaker,
  Stethoscope,
  Download,
  Eye,
  ArrowRight
} from 'lucide-react';
import { LAB_TESTS } from '../constants';

const AdminResultEntry: React.FC = () => {
  const { sid } = useParams();
  const navigate = useNavigate();
  
  const testProfile = LAB_TESTS[0]; // Assuming CBC for demo
  
  const [results, setResults] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (param: string, value: string) => {
    setResults(prev => ({ ...prev, [param]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call and PDF generation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-2xl border text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-green-500" />
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Report Published!</h2>
          <p className="text-gray-500 font-medium mb-10 leading-relaxed">
            Values for <span className="font-bold text-gray-800">{sid}</span> have been authorized. The report is now available for the patient.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <Link 
              to={`/reports/rep1`} 
              className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-3xl border border-blue-100 hover:bg-blue-600 hover:text-white transition-all group"
            >
              <Eye className="w-6 h-6 mb-2 text-blue-600 group-hover:text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest">View Report</span>
            </Link>
            <button className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-3xl border border-green-100 hover:bg-green-600 hover:text-white transition-all group">
              <Download className="w-6 h-6 mb-2 text-green-600 group-hover:text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest">Download PDF</span>
            </button>
          </div>

          <button 
            onClick={() => navigate('/admin')}
            className="w-full flex items-center justify-center space-x-2 text-gray-400 font-black text-xs uppercase tracking-widest hover:text-blue-600 transition-colors"
          >
            <span>Return to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <Link to="/admin" className="flex items-center text-blue-600 font-black text-xs uppercase tracking-widest group">
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Portal
          </Link>
          <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
            <Beaker className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-black text-blue-800 uppercase tracking-widest">Inputting Test Values</span>
          </div>
        </header>

        <div className="bg-white rounded-[2.5rem] shadow-xl border overflow-hidden">
          <div className="p-10 bg-slate-900 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <FlaskConical className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">SID: {sid}</p>
                <h1 className="text-3xl font-black tracking-tight">{testProfile.name}</h1>
                <p className="text-slate-400 font-medium flex items-center mt-1">
                   Patient: Balu Kumar • 28/M
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center space-x-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-2xl border border-green-500/20">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">Ready for Authorization</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-10">
            <div className="mb-10 flex items-center justify-between border-b pb-6">
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Clinical Entry</h2>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest text-right">Reference values based on <br/> NABL standard (India)</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-12 gap-4 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                <div className="col-span-4">Parameter</div>
                <div className="col-span-3">Result</div>
                <div className="col-span-2">Unit</div>
                <div className="col-span-3">Ref. Range</div>
              </div>

              {testProfile.parameters.map((param) => (
                <div key={param} className="grid grid-cols-12 gap-4 items-center bg-gray-50/50 p-4 rounded-2xl border border-transparent hover:border-blue-200 transition-all hover:bg-white group">
                  <div className="col-span-4 font-black text-gray-900 text-sm">
                    {param}
                  </div>
                  <div className="col-span-3">
                    <input 
                      required
                      type="text" 
                      placeholder="0.00"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-black text-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                      onChange={(e) => handleInputChange(param, e.target.value)}
                    />
                  </div>
                  <div className="col-span-2 text-[10px] font-bold text-gray-400 italic">
                    {param === 'Hemoglobin' ? 'g/dL' : param.includes('Count') ? 'cells/µL' : '%'}
                  </div>
                  <div className="col-span-3 text-[10px] font-black text-gray-400 uppercase bg-gray-100/50 px-3 py-1 rounded-lg">
                    {param === 'Hemoglobin' ? '13.0 - 17.0' : param === 'WBC Count' ? '4000 - 11000' : 'Normal'}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-blue-50 rounded-[2rem] border border-blue-100 flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border-2 border-blue-200 shadow-sm shrink-0">
                <Stethoscope className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-grow">
                <h4 className="font-black text-blue-900 text-sm mb-1 uppercase tracking-widest tracking-tight">Report Authorization</h4>
                <p className="text-xs text-blue-700 font-medium leading-relaxed">
                  The results will be digitally signed by Dr. M. Sridhar (MD Pathologist) and published to the patient app immediately.
                </p>
              </div>
              <div className="shrink-0 w-full md:w-auto">
                <button 
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-900/20 hover:bg-blue-600 transition-all flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Authorize & Publish</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminResultEntry;
