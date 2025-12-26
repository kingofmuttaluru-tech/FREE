
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  MapPin, 
  Calendar, 
  Clock, 
  CreditCard, 
  ChevronRight, 
  Home as HomeIcon, 
  Building2,
  ChevronLeft
} from 'lucide-react';
import { LAB_TESTS } from '../constants';

const BookingFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    testId: '',
    collectionType: 'Home',
    address: '',
    date: '',
    timeSlot: '',
    paymentMethod: 'Cash on Collection'
  });

  const timeSlots = ["07:00 AM - 08:00 AM", "08:00 AM - 09:00 AM", "09:00 AM - 10:00 AM", "10:00 AM - 11:00 AM"];

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const selectedTest = LAB_TESTS.find(t => t.id === bookingData.testId);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-8">
      <div className="max-w-xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-8 px-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                {step > i ? <CheckCircle className="w-5 h-5" /> : i}
              </div>
              {i < 4 && <div className={`h-1 flex-1 mx-2 ${step > i ? 'bg-blue-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl border overflow-hidden transition-all duration-300">
          {step === 1 && (
            <div className="p-6 space-y-6">
              <h2 className="text-2xl font-bold">Select Test</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {LAB_TESTS.map(test => (
                  <button
                    key={test.id}
                    onClick={() => { setBookingData({ ...bookingData, testId: test.id }); nextStep(); }}
                    className={`w-full p-4 rounded-2xl border text-left flex justify-between items-center transition-all ${bookingData.testId === test.id ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500' : 'hover:border-gray-300'}`}
                  >
                    <div>
                      <p className="font-bold text-gray-900">{test.name}</p>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">{test.category}</p>
                    </div>
                    <p className="text-blue-600 font-black">₹{test.price}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-6 space-y-6">
              <h2 className="text-2xl font-bold">Collection Mode</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setBookingData({...bookingData, collectionType: 'Home'})}
                  className={`p-6 rounded-2xl border flex flex-col items-center space-y-3 ${bookingData.collectionType === 'Home' ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500' : ''}`}
                >
                  <HomeIcon className={`w-8 h-8 ${bookingData.collectionType === 'Home' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className="font-bold">Home Collection</span>
                  <span className="text-[10px] text-green-600 font-bold">FREE PICKUP</span>
                </button>
                <button
                  onClick={() => setBookingData({...bookingData, collectionType: 'Lab'})}
                  className={`p-6 rounded-2xl border flex flex-col items-center space-y-3 ${bookingData.collectionType === 'Lab' ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500' : ''}`}
                >
                  <Building2 className={`w-8 h-8 ${bookingData.collectionType === 'Lab' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className="font-bold">Visit Lab</span>
                  <span className="text-[10px] text-gray-400 uppercase">WALK-IN</span>
                </button>
              </div>

              {bookingData.collectionType === 'Home' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Full Address</label>
                  <textarea
                    className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="House no, Street, Landmark..."
                    value={bookingData.address}
                    onChange={(e) => setBookingData({...bookingData, address: e.target.value})}
                  />
                </div>
              )}
              <button onClick={nextStep} disabled={bookingData.collectionType === 'Home' && !bookingData.address} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg disabled:opacity-50">Continue</button>
              <button onClick={prevStep} className="w-full text-gray-400 text-sm font-bold py-2">Go Back</button>
            </div>
          )}

          {step === 3 && (
            <div className="p-6 space-y-6">
              <h2 className="text-2xl font-bold">Schedule Slot</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Select Date</label>
                  <input
                    type="date"
                    className="w-full p-4 bg-gray-50 border rounded-2xl mt-1 outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Available Time Slots</label>
                  <div className="grid grid-cols-1 gap-2">
                    {timeSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setBookingData({...bookingData, timeSlot: slot})}
                        className={`p-4 rounded-xl border text-sm text-left ${bookingData.timeSlot === slot ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-50'}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={nextStep} disabled={!bookingData.date || !bookingData.timeSlot} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg disabled:opacity-50">Next: Payment</button>
              <button onClick={prevStep} className="w-full text-gray-400 text-sm font-bold py-2">Go Back</button>
            </div>
          )}

          {step === 4 && (
            <div className="p-6 space-y-6">
              <h2 className="text-2xl font-bold">Summary & Payment</h2>
              <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                <div className="flex justify-between border-b pb-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold">Test Selected</p>
                    <p className="font-bold text-lg">{selectedTest?.name}</p>
                  </div>
                  <p className="text-blue-600 font-black text-xl">₹{selectedTest?.price}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold">Appointment</p>
                    <p className="text-sm font-bold">{bookingData.date}</p>
                    <p className="text-xs text-gray-500">{bookingData.timeSlot}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase font-bold">Type</p>
                    <p className="text-sm font-bold text-blue-600">{bookingData.collectionType}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold">Payment Method</h3>
                <div className="space-y-2">
                  {["Cash on Collection", "Online (UPI / Card)"].map(m => (
                    <button
                      key={m}
                      onClick={() => setBookingData({...bookingData, paymentMethod: m})}
                      className={`w-full p-4 rounded-xl border flex items-center justify-between ${bookingData.paymentMethod === m ? 'border-blue-600 bg-blue-50' : ''}`}
                    >
                      <span className="text-sm font-bold">{m}</span>
                      <CreditCard className={`w-5 h-5 ${bookingData.paymentMethod === m ? 'text-blue-600' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  alert('Booking Confirmed! You will receive an SMS shortly.');
                  navigate('/dashboard');
                }}
                className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg mt-4 text-lg"
              >
                Confirm Booking
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
