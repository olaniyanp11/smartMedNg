import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Calendar } from './ui/calendar';
import { Calendar as CalendarIcon, Clock, Video, MapPin } from 'lucide-react';

export function DoctorAppointments() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const appointments = [
    {
      id: 1,
      patient: 'Sarah Williams',
      avatar: 'SW',
      time: '09:00 AM',
      type: 'Follow-up',
      reason: 'Blood pressure check',
      status: 'Confirmed',
      mode: 'In-person',
    },
    {
      id: 2,
      patient: 'John Adeyemi',
      avatar: 'JA',
      time: '10:30 AM',
      type: 'Consultation',
      reason: 'General checkup',
      status: 'Confirmed',
      mode: 'Telemedicine',
    },
    {
      id: 3,
      patient: 'Amina Bello',
      avatar: 'AB',
      time: '11:00 AM',
      type: 'Emergency',
      reason: 'Severe headache',
      status: 'Pending',
      mode: 'In-person',
    },
    {
      id: 4,
      patient: 'David Okafor',
      avatar: 'DO',
      time: '02:00 PM',
      type: 'Lab Results',
      reason: 'Review test results',
      status: 'Confirmed',
      mode: 'In-person',
    },
    {
      id: 5,
      patient: 'Grace Mensah',
      avatar: 'GM',
      time: '03:30 PM',
      type: 'Consultation',
      reason: 'Persistent cough',
      status: 'Confirmed',
      mode: 'Telemedicine',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl mb-2">Appointment Management</h1>
        <p className="text-gray-600">Manage your daily appointments and schedule</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Today's Appointments: 18</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Completed: 12</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Pending: 6</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Appointments */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Today's Schedule</CardTitle>
              <Button className="bg-blue-600 hover:bg-blue-700">
                + Add Appointment
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {appointment.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{appointment.patient}</h3>
                          <Badge
                            variant="outline"
                            className={
                              appointment.type === 'Emergency'
                                ? 'bg-red-50 text-red-700 border-red-200'
                                : appointment.type === 'Follow-up'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-green-50 text-green-700 border-green-200'
                            }
                          >
                            {appointment.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {appointment.time}
                          </div>
                          <div className="flex items-center gap-1">
                            {appointment.mode === 'Telemedicine' ? (
                              <>
                                <Video className="h-4 w-4" />
                                Telemedicine
                              </>
                            ) : (
                              <>
                                <MapPin className="h-4 w-4" />
                                In-person
                              </>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">
                          Reason: {appointment.reason}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Badge
                        className={
                          appointment.status === 'Confirmed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }
                      >
                        {appointment.status}
                      </Badge>
                      <div className="flex gap-2 mt-2">
                        {appointment.mode === 'Telemedicine' && (
                          <Button size="sm" variant="outline">
                            <Video className="h-4 w-4 mr-1" />
                            Join Call
                          </Button>
                        )}
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Start Visit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Today</p>
                <p className="text-3xl mt-1">18</p>
              </div>
              <CalendarIcon className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In-Person</p>
                <p className="text-3xl mt-1">11</p>
              </div>
              <MapPin className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Telemedicine</p>
                <p className="text-3xl mt-1">7</p>
              </div>
              <Video className="h-10 w-10 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">No-shows</p>
                <p className="text-3xl mt-1">2</p>
              </div>
              <div className="h-10 w-10 bg-red-500 rounded-full flex items-center justify-center text-white text-xl">
                !
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
