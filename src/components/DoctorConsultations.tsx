import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { MessageSquare, Video, Phone, Clock } from 'lucide-react';

export function DoctorConsultations() {
  const consultations = [
    {
      id: 1,
      patient: 'John Adeyemi',
      avatar: 'JA',
      status: 'Active',
      time: '5 mins ago',
      messages: 12,
      concern: 'Persistent headache for 3 days',
    },
    {
      id: 2,
      patient: 'Amina Bello',
      avatar: 'AB',
      status: 'Waiting',
      time: '15 mins ago',
      messages: 3,
      concern: 'Fever and body aches',
    },
    {
      id: 3,
      patient: 'David Okafor',
      avatar: 'DO',
      status: 'Active',
      time: '30 mins ago',
      messages: 8,
      concern: 'Skin rash on arms',
    },
    {
      id: 4,
      patient: 'Grace Mensah',
      avatar: 'GM',
      status: 'Completed',
      time: '1 hour ago',
      messages: 15,
      concern: 'Follow-up consultation',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl mb-2">AI Consultations</h1>
        <p className="text-gray-600">Manage online consultations with students</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Chats</p>
                <p className="text-2xl">8</p>
              </div>
              <MessageSquare className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Waiting</p>
                <p className="text-2xl">5</p>
              </div>
              <Clock className="h-10 w-10 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed Today</p>
                <p className="text-2xl">15</p>
              </div>
              <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                ✓
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response</p>
                <p className="text-2xl">3m</p>
              </div>
              <div className="h-10 w-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
                ⚡
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Consultation List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Active Consultations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultations.map((consultation) => (
                <div
                  key={consultation.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {consultation.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {consultation.status === 'Active' && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{consultation.patient}</h3>
                          <Badge
                            className={
                              consultation.status === 'Active'
                                ? 'bg-green-100 text-green-700'
                                : consultation.status === 'Waiting'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-gray-100 text-gray-700'
                            }
                          >
                            {consultation.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {consultation.concern}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{consultation.messages} messages</span>
                          <span>•</span>
                          <span>{consultation.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 gap-2">
              <MessageSquare className="h-4 w-4" />
              Start New Chat
            </Button>
            <Button variant="outline" className="w-full gap-2">
              <Video className="h-4 w-4" />
              Video Consultation
            </Button>
            <Button variant="outline" className="w-full gap-2">
              <Phone className="h-4 w-4" />
              Voice Call
            </Button>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3">Today's Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total consultations:</span>
                  <span>28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed:</span>
                  <span>15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">In progress:</span>
                  <span>8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Waiting:</span>
                  <span>5</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3">Performance</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Response Rate</span>
                    <span>98%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Satisfaction</span>
                    <span>4.8/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
