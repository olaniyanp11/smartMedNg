import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Stethoscope, AlertTriangle, Clock, Users, RefreshCw } from 'lucide-react';
import { Progress } from './ui/progress';

interface SmartTriageProps {
  onBack: () => void;
}

export function SmartTriage({ onBack }: SmartTriageProps) {
  const [currentQueue, setCurrentQueue] = useState([
    { id: 1, name: 'John Smith', priority: 'Critical', waitTime: '0 min', reason: 'Chest pain' },
    { id: 2, name: 'Emily Davis', priority: 'High', waitTime: '5 min', reason: 'Severe headache' },
    { id: 3, name: 'You', priority: 'Medium', waitTime: '12 min', reason: 'General checkup', isUser: true },
    { id: 4, name: 'Michael Brown', priority: 'Medium', waitTime: '20 min', reason: 'Follow-up' },
    { id: 5, name: 'Sarah Wilson', priority: 'Low', waitTime: '30 min', reason: 'Vaccination' },
  ]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Simulate real-time queue updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setCurrentQueue(prevQueue => {
        // Simulate queue movement
        const newQueue = [...prevQueue];
        const userIndex = newQueue.findIndex(p => p.isUser);
        
        // Randomly remove someone from the queue (they've been served)
        if (Math.random() > 0.7 && newQueue.length > 1) {
          const randomIndex = Math.floor(Math.random() * (userIndex));
          if (randomIndex >= 0) {
            newQueue.splice(randomIndex, 1);
          }
        }

        // Update wait times
        return newQueue.map((patient, index) => ({
          ...patient,
          waitTime: patient.isUser 
            ? `${Math.max(0, (userIndex - (prevQueue.length - newQueue.length)) * 5)} min`
            : `${index * 5} min`
        }));
      });
      setLastUpdate(new Date());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const userPosition = currentQueue.findIndex(p => p.isUser) + 1;
  const userWaitTime = currentQueue.find(p => p.isUser)?.waitTime || '0 min';

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 pt-8 pb-6">
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
            <Stethoscope className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-xl">Smart Triage</h1>
            <p className="text-blue-100 text-sm">AI-powered priority queue</p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6 space-y-4">
        {/* Live Update Banner */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${autoRefresh ? 'bg-green-600 animate-pulse' : 'bg-gray-400'}`} />
                <p className="text-sm text-green-900">
                  {autoRefresh ? 'Live updates enabled' : 'Live updates paused'}
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setAutoRefresh(!autoRefresh)}
                className="h-7"
              >
                <RefreshCw className={`h-3 w-3 ${autoRefresh ? 'animate-spin' : ''}`} />
              </Button>
            </div>
            <p className="text-xs text-green-700 mt-1">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>

        {/* Your Status */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-blue-900">Your Position</p>
                <p className="text-2xl text-blue-700">{userPosition}{userPosition === 1 ? 'st' : userPosition === 2 ? 'nd' : userPosition === 3 ? 'rd' : 'th'} in queue</p>
              </div>
              <div className="bg-blue-600 text-white rounded-full h-14 w-14 flex items-center justify-center">
                <Clock className="h-7 w-7" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-blue-700">Estimated Wait Time</span>
                <span className="text-blue-900">~{userWaitTime}</span>
              </div>
              <Progress value={Math.max(10, 100 - (userPosition * 20))} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Queue Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <Users className="h-5 w-5 mx-auto mb-1 text-gray-600" />
              <p className="text-lg">5</p>
              <p className="text-xs text-gray-600">In Queue</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <Clock className="h-5 w-5 mx-auto mb-1 text-gray-600" />
              <p className="text-lg">18m</p>
              <p className="text-xs text-gray-600">Avg Wait</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <Stethoscope className="h-5 w-5 mx-auto mb-1 text-gray-600" />
              <p className="text-lg">3</p>
              <p className="text-xs text-gray-600">Doctors</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQueue.map((patient, index) => (
              <div 
                key={patient.id}
                className={`p-3 rounded-lg border ${
                  patient.isUser ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{index + 1}.</span>
                    <span className={patient.isUser ? '' : 'text-sm'}>
                      {patient.name}
                    </span>
                    {patient.isUser && (
                      <Badge variant="outline" className="text-xs">You</Badge>
                    )}
                  </div>
                  <Badge className={`text-xs ${getPriorityColor(patient.priority)}`}>
                    {patient.priority}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{patient.reason}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{patient.waitTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Priority Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Priority Levels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm">Critical</p>
                <p className="text-xs text-gray-600">Life-threatening conditions, immediate attention</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm">High</p>
                <p className="text-xs text-gray-600">Severe symptoms, urgent care needed</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm">Medium</p>
                <p className="text-xs text-gray-600">Moderate symptoms, standard wait time</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Clock className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm">Low</p>
                <p className="text-xs text-gray-600">Minor issues, routine care</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full" variant="outline">
          Update My Priority
        </Button>
      </div>
    </div>
  );
}
