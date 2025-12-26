
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Share2, Printer, ChevronLeft, CheckCircle } from 'lucide-react';
import { MOCK_REPORTS } from '../constants';

const ReportDetail: React.FC = () => {
  const { id } = useParams();
  const report = MOCK_REPORTS.find(r => r.id === id);

  if (!report) return <div className="p-20 text-center">Report not found</div>;

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 mb-6 flex justify-between items-center no-print">
        <Link to="/history" className="flex items-center text-blue-600 font-bold text-sm">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to History
        </Link>
        <div className="flex space-x-2">
          <button onClick={handlePrint} className="flex items-center bg-white border px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50">
            <Printer className="w-4 h-4 mr-2" /> Print
          </button>
          <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" /> Download PDF
          </button>
        </div>
      </div>

      <div className="max-w-[210mm] mx-auto bg-white shadow-2xl p-[15mm] min-h-[297mm] printable-area border">
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-blue-600 pb-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <span className="font-black text-2xl">FB</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-blue-800">FREE BALU</h1>
              <p className="text-[10px] text-green-600 font-black tracking-[0.2em] uppercase">Diagnostic Centre</p>
              <p className="text-[9px] text-gray-400 mt-1">NABL Accredited • ISO 9001:2015</p>
            </div>
          </div>
          <div className="text-right text-[10px] text-gray-500">
            <p>123 Medical Square, Hi-Tech City</p>
            <p>Hyderabad, Telangana - 500081</p>
            <p>Phone: +91 98765 43210</p>
            <p>Email: labs@freebalu.com</p>
          </div>
        </div>

        {/* Patient Info */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-12 bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
          <div className="space-y-2">
            <div className="flex justify-between text-xs"><span className="text-gray-400 font-bold uppercase tracking-wider">Patient Name:</span> <span className="font-black">{report.patientInfo.name}</span></div>
            <div className="flex justify-between text-xs"><span className="text-gray-400 font-bold uppercase tracking-wider">Age / Gender:</span> <span className="font-black">{report.patientInfo.age} / {report.patientInfo.gender}</span></div>
            <div className="flex justify-between text-xs"><span className="text-gray-400 font-bold uppercase tracking-wider">Patient ID:</span> <span className="font-black">{report.patientInfo.id}</span></div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs"><span className="text-gray-400 font-bold uppercase tracking-wider">Collection Date:</span> <span className="font-black">{report.date} | 08:30 AM</span></div>
            <div className="flex justify-between text-xs"><span className="text-gray-400 font-bold uppercase tracking-wider">Report Date:</span> <span className="font-black">{report.date} | 04:45 PM</span></div>
            <div className="flex justify-between text-xs"><span className="text-gray-400 font-bold uppercase tracking-wider">Referred By:</span> <span className="font-black">{report.patientInfo.referredBy}</span></div>
          </div>
        </div>

        {/* Results Table */}
        <div className="mb-12">
          <h2 className="text-center font-black text-blue-800 text-lg mb-6 underline decoration-blue-200 underline-offset-8">DEPARTMENT OF HEMATOLOGY</h2>
          <h3 className="font-black text-sm mb-4 bg-blue-50 p-2 border-l-4 border-blue-600">{report.testName}</h3>
          
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest text-left">
                <th className="py-3 px-2">Parameter</th>
                <th className="py-3 px-2">Result</th>
                <th className="py-3 px-2">Unit</th>
                <th className="py-3 px-2">Reference Range</th>
                <th className="py-3 px-2 text-center">Flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {report.results?.map((res, idx) => (
                <tr key={idx} className={res.status !== 'Normal' ? 'bg-red-50/30' : ''}>
                  <td className="py-4 px-2 font-bold text-gray-800">{res.parameter}</td>
                  <td className={`py-4 px-2 font-black text-lg ${res.status !== 'Normal' ? 'text-red-600' : 'text-gray-900'}`}>{res.value}</td>
                  <td className="py-4 px-2 text-gray-500 font-medium">{res.unit}</td>
                  <td className="py-4 px-2 text-gray-400 italic text-xs">{res.range}</td>
                  <td className="py-4 px-2 text-center">
                    {res.status === 'High' && <span className="text-red-600 font-black text-lg">↑</span>}
                    {res.status === 'Low' && <span className="text-red-600 font-black text-lg">↓</span>}
                    {res.status === 'Normal' && <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Methodology */}
        <div className="text-[9px] text-gray-400 mb-20">
          <p className="font-bold mb-1">METHODOLOGY:</p>
          <p>Complete Blood Count (CBC) is performed using 5-Part Hematology Cell Counter through Flow Cytometry and Impedance methods. Abnormal values are cross-checked with manual microscopy.</p>
        </div>

        {/* Signatures */}
        <div className="flex justify-between items-end border-t pt-10">
          <div className="text-center">
            <div className="w-32 h-12 bg-gray-50 mb-2 mx-auto flex items-center justify-center italic text-gray-300">Digital Sign</div>
            <p className="text-[10px] font-black uppercase">Dr. M. Sridhar</p>
            <p className="text-[8px] text-gray-400">MD Pathologist (Reg: 40291)</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-white border p-1 rounded-xl mx-auto flex items-center justify-center">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${report.id}`} alt="QR Code" className="w-full h-full" />
            </div>
            <p className="text-[8px] text-gray-400 mt-2">Scan to verify report authenticity</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-12 bg-gray-50 mb-2 mx-auto flex items-center justify-center italic text-gray-300">Digital Sign</div>
            <p className="text-[10px] font-black uppercase">Technical Manager</p>
            <p className="text-[8px] text-gray-400">B.Sc MLT (Quality Manager)</p>
          </div>
        </div>

        <div className="mt-12 text-[8px] text-gray-400 text-center border-t pt-4 italic">
          <p>*** End of Report ***</p>
          <p>This is a computer-generated report and does not require a physical signature. Results are for clinical correlation by a medical professional only.</p>
        </div>
      </div>
      
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0; padding: 0; }
          .printable-area { 
            box-shadow: none !important; 
            border: none !important; 
            width: 100% !important; 
            max-width: none !important; 
            margin: 0 !important;
            padding: 10mm !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ReportDetail;
