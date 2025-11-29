import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { Search, Filter, Clock, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

export function DoctorPatientQueue() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const patients = [
    {
      id: '20210123',
      name: 'Adebayo Oluwaseun',
      avatar: 'AO',
      complaint: 'Fever, Headache',
      waitTime: '25 mins',
      status: 'Waiting',
      priority: 'Medium',
      age: 22,
      department: 'Computer Science',
    },
    {
      id: '20210456',
      name: 'Chioma Nnamdi',
      avatar: 'CN',
      complaint: 'Chest Pain',
      waitTime: '5 mins',
      status: 'Urgent',
      priority: 'High',
      age: 21,
      department: 'Engineering',
    },
    {
      id: '20210789',
      name: 'Ibrahim Musa',
      avatar: 'IM',
      complaint: 'Skin Rash',
      waitTime: '35 mins',
      status: 'Waiting',
      priority: 'Low',
      age: 23,
      department: 'Medicine',
    },
    {
      id: '20210234',
      name: 'Fatima Hassan',
      avatar: 'FH',
      complaint: 'Abdominal Pain',
      waitTime: '15 mins',
      status: 'In Progress',
      priority: 'Medium',
      age: 20,
      department: 'Law',
    },
    {
      id: '20210567',
      name: 'Eze Chukwuma',
      avatar: 'EC',
      complaint: 'Cough, Fever',
      waitTime: '45 mins',
      status: 'Waiting',
      priority: 'Low',
      age: 24,
      department: 'Business Admin',
    },
  ];

  const handleCallPatient = (patient: any) => {
    setSelectedPatient(patient);
  };

  const handleScheduleTest = () => {
    alert('Lab test scheduled successfully!');
    setSelectedPatient(null);
  };

  const handlePrescribe = () => {
    alert('Prescription created and sent to pharmacy!');
    setSelectedPatient(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl mb-2">Patient Queue Management</h1>
        <p className="text-gray-600">View and manage all patients in the queue</p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Queue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Waiting</p>
                <p className="text-2xl">45</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Urgent Cases</p>
                <p className="text-2xl">8</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl">12</p>
              </div>
              <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
                ⏱
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Wait Time</p>
                <p className="text-2xl">28m</p>
              </div>
              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                ⏰
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient Queue Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-6 gap-4 text-sm text-gray-500 pb-2 border-b">
              <div>Patient Info</div>
              <div>Complaint</div>
              <div>Wait Time</div>
              <div>Priority</div>
              <div>Status</div>
              <div>Action</div>
            </div>

            {patients.map((patient) => (
              <div
                key={patient.id}
                className="grid grid-cols-6 gap-4 items-center py-4 border-b last:border-0 hover:bg-gray-50 rounded-lg px-2"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {patient.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">{patient.name}</p>
                    <p className="text-xs text-gray-500">ID: {patient.id}</p>
                  </div>
                </div>
                <div className="text-sm">{patient.complaint}</div>
                <div className="text-sm text-gray-600">{patient.waitTime}</div>
                <div>
                  <Badge
                    variant="outline"
                    className={
                      patient.priority === 'High'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : patient.priority === 'Medium'
                        ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                        : 'bg-green-50 text-green-700 border-green-200'
                    }
                  >
                    {patient.priority}
                  </Badge>
                </div>
                <div>
                  <Badge
                    variant="secondary"
                    className={
                      patient.status === 'Urgent'
                        ? 'bg-red-100 text-red-700'
                        : patient.status === 'In Progress'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }
                  >
                    {patient.status}
                  </Badge>
                </div>
                <div>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleCallPatient(patient)}
                  >
                    Call Patient
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Patient Details Dialog */}
      <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Patient Consultation</DialogTitle>
            <DialogDescription>
              Managing patient: {selectedPatient?.name}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="consultation" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="consultation">Consultation</TabsTrigger>
              <TabsTrigger value="prescription">Prescription</TabsTrigger>
              <TabsTrigger value="tests">Tests & Labs</TabsTrigger>
              <TabsTrigger value="followup">Follow-up</TabsTrigger>
            </TabsList>

            <TabsContent value="consultation" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Chief Complaint</Label>
                  <p className="text-sm bg-gray-50 p-3 rounded-lg mt-2">
                    {selectedPatient?.complaint}
                  </p>
                </div>
                <div>
                  <Label>Patient Info</Label>
                  <div className="text-sm bg-gray-50 p-3 rounded-lg mt-2">
                    <p>Age: {selectedPatient?.age}</p>
                    <p>Department: {selectedPatient?.department}</p>
                  </div>
                </div>
              </div>

              <div>
                <Label>Consultation Notes</Label>
                <Textarea
                  placeholder="Enter your medical notes here..."
                  className="mt-2 min-h-[120px]"
                />
              </div>

              <div>
                <Label>Diagnosis</Label>
                <Textarea
                  placeholder="Enter diagnosis..."
                  className="mt-2 min-h-[80px]"
                />
              </div>

              <div className="flex gap-2">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Consultation
                </Button>
                <Button variant="outline">View Medical History</Button>
              </div>
            </TabsContent>

            <TabsContent value="prescription" className="space-y-4">
              <div>
                <Label>Medication Name</Label>
                <Input placeholder="e.g., Paracetamol" className="mt-2" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Dosage</Label>
                  <Input placeholder="e.g., 500mg" className="mt-2" />
                </div>
                <div>
                  <Label>Frequency</Label>
                  <Input placeholder="e.g., 3x daily" className="mt-2" />
                </div>
                <div>
                  <Label>Duration</Label>
                  <Input placeholder="e.g., 7 days" className="mt-2" />
                </div>
              </div>
              <div>
                <Label>Special Instructions</Label>
                <Textarea
                  placeholder="Additional instructions for patient..."
                  className="mt-2"
                />
              </div>
              <Button onClick={handlePrescribe} className="bg-green-600 hover:bg-green-700">
                Send to Pharmacy
              </Button>
            </TabsContent>

            <TabsContent value="tests" className="space-y-4">
              <div>
                <Label>Test Type</Label>
                <select className="w-full mt-2 px-3 py-2 border rounded-lg">
                  <option>Blood Test (Complete Blood Count)</option>
                  <option>Urine Analysis</option>
                  <option>X-Ray</option>
                  <option>ECG</option>
                  <option>Ultrasound</option>
                </select>
              </div>
              <div>
                <Label>Test Instructions</Label>
                <Textarea
                  placeholder="Special instructions for lab technicians..."
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Urgency</Label>
                <select className="w-full mt-2 px-3 py-2 border rounded-lg">
                  <option>Routine</option>
                  <option>Urgent</option>
                  <option>Emergency</option>
                </select>
              </div>
              <Button onClick={handleScheduleTest} className="bg-blue-600 hover:bg-blue-700">
                Schedule Test
              </Button>
            </TabsContent>

            <TabsContent value="followup" className="space-y-4">
              <div>
                <Label>Follow-up Type</Label>
                <select className="w-full mt-2 px-3 py-2 border rounded-lg">
                  <option>Clinic Visit</option>
                  <option>Specialist Consultation</option>
                  <option>Telemedicine</option>
                  <option>Lab Results Review</option>
                </select>
              </div>
              <div>
                <Label>Recommended Date</Label>
                <Input type="date" className="mt-2" />
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea
                  placeholder="Follow-up instructions and recommendations..."
                  className="mt-2"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Schedule Follow-up
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
