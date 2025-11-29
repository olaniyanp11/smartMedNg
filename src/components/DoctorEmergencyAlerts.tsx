import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AlertCircle, MapPin, Clock, Phone, Navigation } from 'lucide-react';

export function DoctorEmergencyAlerts() {
  const activeEmergencies = [
    {
      id: 'EM001',
      type: 'Medical Emergency',
      severity: 'Critical',
      patient: 'Student collapsed in hostel',
      location: 'Block B, Room 204',
      time: '2 mins ago',
      status: 'Responding',
      responders: ['Dr. Johnson', 'Paramedic Team'],
    },
    {
      id: 'EM002',
      type: 'Critical Condition',
      severity: 'High',
      patient: 'Patient vitals dropping',
      location: 'Clinic Ward A',
      time: '15 mins ago',
      status: 'In Progress',
      responders: ['Dr. Smith', 'Nurse Williams'],
    },
    {
      id: 'EM003',
      type: 'Severe Allergic Reaction',
      severity: 'Critical',
      patient: 'Anaphylactic shock reported',
      location: 'Sports Complex',
      time: '5 mins ago',
      status: 'Pending Response',
      responders: [],
    },
  ];

  const recentAlerts = [
    {
      id: 'EM004',
      type: 'Resolved - Seizure',
      location: 'Library Building',
      time: '1 hour ago',
      status: 'Resolved',
    },
    {
      id: 'EM005',
      type: 'Resolved - Breathing Difficulty',
      location: 'Lecture Hall 3',
      time: '2 hours ago',
      status: 'Resolved',
    },
    {
      id: 'EM006',
      type: 'Resolved - Severe Injury',
      location: 'Football Field',
      time: '3 hours ago',
      status: 'Resolved',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl mb-2">Emergency Alerts</h1>
        <p className="text-gray-600">Monitor and respond to emergency situations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Active Emergencies</p>
                <p className="text-3xl text-red-700">3</p>
              </div>
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Responded Today</p>
                <p className="text-2xl">8</p>
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
                <p className="text-sm text-gray-600">Avg Response Time</p>
                <p className="text-2xl">4m</p>
              </div>
              <Clock className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Cases</p>
                <p className="text-2xl">2</p>
              </div>
              <div className="h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center text-white">
                !
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Emergencies */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Active Emergencies
            </CardTitle>
            <Badge className="bg-red-600 text-white">
              {activeEmergencies.length} Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeEmergencies.map((emergency) => (
              <div
                key={emergency.id}
                className={`border-l-4 rounded-r-lg p-5 ${
                  emergency.severity === 'Critical'
                    ? 'border-red-600 bg-red-50'
                    : 'border-orange-500 bg-orange-50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-lg">{emergency.type}</h3>
                      <Badge
                        className={
                          emergency.severity === 'Critical'
                            ? 'bg-red-600 text-white'
                            : 'bg-orange-600 text-white'
                        }
                      >
                        {emergency.severity}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          emergency.status === 'Responding'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : emergency.status === 'In Progress'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                        }
                      >
                        {emergency.status}
                      </Badge>
                    </div>
                    <p className={`text-sm mb-3 ${
                      emergency.severity === 'Critical' ? 'text-red-900' : 'text-orange-900'
                    }`}>
                      {emergency.patient}
                    </p>
                    <div className="flex items-center gap-6 text-sm mb-3">
                      <div className={`flex items-center gap-2 ${
                        emergency.severity === 'Critical' ? 'text-red-700' : 'text-orange-700'
                      }`}>
                        <MapPin className="h-4 w-4" />
                        {emergency.location}
                      </div>
                      <div className={`flex items-center gap-2 ${
                        emergency.severity === 'Critical' ? 'text-red-600' : 'text-orange-600'
                      }`}>
                        <Clock className="h-4 w-4" />
                        {emergency.time}
                      </div>
                    </div>
                    {emergency.responders.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600">Responders:</span>
                        {emergency.responders.map((responder, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {responder}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    className={
                      emergency.severity === 'Critical'
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-orange-600 hover:bg-orange-700'
                    }
                  >
                    Respond Now
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Phone className="h-4 w-4" />
                    Call
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Navigation className="h-4 w-4" />
                    Navigate
                  </Button>
                  {emergency.responders.length === 0 && (
                    <Button variant="outline">
                      Assign Team
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Resolved</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-4 border rounded-lg bg-green-50"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium text-green-900">{alert.type}</p>
                    <div className="flex items-center gap-4 text-sm text-green-700 mt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {alert.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {alert.time}
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Report
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
