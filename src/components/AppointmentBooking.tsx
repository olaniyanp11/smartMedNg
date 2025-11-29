import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Calendar, Clock, User, CheckCircle2, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface AppointmentBookingProps {
  onBack: () => void;
}

export function AppointmentBooking({ onBack }: AppointmentBookingProps) {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [booking, setBooking] = useState(false);

  const doctors = [
    { id: '1', name: 'Dr. Sarah Johnson', specialty: 'General Medicine', available: 'Mon, Wed, Fri' },
    { id: '2', name: 'Dr. Michael Chen', specialty: 'Pediatrics', available: 'Tue, Thu' },
    { id: '3', name: 'Dr. Emily Rodriguez', specialty: 'Cardiology', available: 'Mon, Tue, Thu' },
    { id: '4', name: 'Dr. James Wilson', specialty: 'Dermatology', available: 'Wed, Fri' },
  ];

  const availableDates = [
    { value: '2024-11-05', label: 'Tuesday, Nov 5, 2024' },
    { value: '2024-11-06', label: 'Wednesday, Nov 6, 2024' },
    { value: '2024-11-07', label: 'Thursday, Nov 7, 2024' },
    { value: '2024-11-08', label: 'Friday, Nov 8, 2024' },
    { value: '2024-11-11', label: 'Monday, Nov 11, 2024' },
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM'
  ];

  const handleBooking = () => {
    setBooking(true);
    setTimeout(() => {
      setBooking(false);
      setStep(4);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-4 pt-8 pb-6">
        <Button 
          variant="ghost" 
          className="text-white hover:bg-white/20 mb-4 -ml-2"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-xl">
            <Calendar className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-xl">Appointment Booking</h1>
            <p className="text-indigo-100 text-sm">Schedule your visit</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      {step < 4 && (
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`h-2 rounded-full flex-1 ${
                    s <= step ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                />
                {s < 3 && <div className="w-2" />}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">
            Step {step} of 3
          </p>
        </div>
      )}

      <div className="px-4 mt-6 space-y-4">
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Healthcare Provider</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => setSelectedDoctor(doctor.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedDoctor === doctor.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="bg-indigo-100 p-2 rounded-lg">
                        <User className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-sm mb-1">{doctor.name}</h3>
                        <p className="text-xs text-gray-600 mb-1">{doctor.specialty}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>Available: {doctor.available}</span>
                        </div>
                      </div>
                    </div>
                    {selectedDoctor === doctor.id && (
                      <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                    )}
                  </div>
                </div>
              ))}

              <Button 
                onClick={() => setStep(2)}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={!selectedDoctor}
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Date & Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm">Appointment Date</label>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a date" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDates.map((date) => (
                      <SelectItem key={date.value} value={date.value}>
                        {date.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedDate && (
                <div className="space-y-2">
                  <label className="text-sm">Available Time Slots</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className={selectedTime === time ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button 
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(3)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                  disabled={!selectedDate || !selectedTime}
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Appointment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-indigo-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm">
                    {doctors.find(d => d.id === selectedDoctor)?.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm">
                    {availableDates.find(d => d.value === selectedDate)?.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm">{selectedTime}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm">Reason for Visit</label>
                <Textarea
                  placeholder="Please describe your symptoms or reason for the appointment..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="min-h-24"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-900 text-sm">
                  Please arrive 10 minutes before your scheduled appointment time.
                </p>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleBooking}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                  disabled={booking || !reason.trim()}
                >
                  {booking ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card className="border-green-200">
            <CardContent className="p-8 text-center">
              <div className="bg-green-100 rounded-full h-16 w-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-xl mb-2">Appointment Confirmed!</h2>
              <p className="text-gray-600 mb-6">
                Your appointment has been successfully scheduled.
              </p>
              
              <div className="bg-indigo-50 rounded-lg p-4 space-y-2 mb-6 text-left">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm">
                    {doctors.find(d => d.id === selectedDoctor)?.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm">
                    {availableDates.find(d => d.value === selectedDate)?.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm">{selectedTime}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={onBack}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  Return to Dashboard
                </Button>
                <Button 
                  variant="outline"
                  className="w-full"
                >
                  Add to Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
