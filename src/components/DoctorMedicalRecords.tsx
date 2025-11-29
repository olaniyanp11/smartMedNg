import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { Search, FileText, Download, Eye, Calendar, Activity } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function DoctorMedicalRecords() {
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const records = [
    {
      id: '20210123',
      name: 'Adebayo Oluwaseun',
      avatar: 'AO',
      lastVisit: '2024-10-28',
      diagnosis: 'Acute Sinusitis',
      department: 'Computer Science',
      age: 22,
      bloodType: 'O+',
      allergies: ['Penicillin'],
      chronicConditions: ['Asthma'],
      visits: 12,
    },
    {
      id: '20210456',
      name: 'Chioma Nnamdi',
      avatar: 'CN',
      lastVisit: '2024-11-01',
      diagnosis: 'Gastritis',
      department: 'Engineering',
      age: 21,
      bloodType: 'A+',
      allergies: ['None'],
      chronicConditions: ['None'],
      visits: 5,
    },
    {
      id: '20210789',
      name: 'Ibrahim Musa',
      avatar: 'IM',
      lastVisit: '2024-10-25',
      diagnosis: 'Allergic Dermatitis',
      department: 'Medicine',
      age: 23,
      bloodType: 'B+',
      allergies: ['Latex', 'Shellfish'],
      chronicConditions: ['Eczema'],
      visits: 18,
    },
    {
      id: '20210234',
      name: 'Fatima Hassan',
      avatar: 'FH',
      lastVisit: '2024-10-30',
      diagnosis: 'Migraine',
      department: 'Law',
      age: 20,
      bloodType: 'AB+',
      allergies: ['None'],
      chronicConditions: ['Chronic Migraine'],
      visits: 8,
    },
  ];

  const consultationHistory = [
    {
      date: '2024-10-28',
      doctor: 'Dr. Sarah Johnson',
      complaint: 'Severe headache, nasal congestion',
      diagnosis: 'Acute Sinusitis',
      prescription: 'Amoxicillin 500mg, Ibuprofen 400mg',
    },
    {
      date: '2024-09-15',
      doctor: 'Dr. Michael Chen',
      complaint: 'Persistent cough',
      diagnosis: 'Upper Respiratory Infection',
      prescription: 'Cough syrup, Rest',
    },
    {
      date: '2024-08-10',
      doctor: 'Dr. Sarah Johnson',
      complaint: 'Annual checkup',
      diagnosis: 'Healthy',
      prescription: 'Vitamin supplements',
    },
  ];

  const labResults = [
    {
      date: '2024-10-20',
      test: 'Complete Blood Count',
      status: 'Normal',
      results: 'All values within normal range',
    },
    {
      date: '2024-09-10',
      test: 'Chest X-Ray',
      status: 'Normal',
      results: 'No abnormalities detected',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl mb-2">Medical Records</h1>
        <p className="text-gray-600">View and manage patient medical records</p>
      </div>

      {/* Search */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by patient name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Download className="h-4 w-4" />
          Export Records
        </Button>
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {records.map((record) => (
          <Card key={record.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {record.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{record.name}</h3>
                    <p className="text-xs text-gray-500">ID: {record.id}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {record.bloodType}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Last Visit:</span>
                  <span>{record.lastVisit}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Activity className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Total Visits:</span>
                  <span>{record.visits}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Last Diagnosis:</span>
                  <span className="text-xs">{record.diagnosis}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-1">Allergies:</p>
                <div className="flex flex-wrap gap-1">
                  {record.allergies.map((allergy, i) => (
                    <Badge key={i} variant="outline" className="text-xs bg-red-50 text-red-700">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => setSelectedRecord(record)}
                className="w-full bg-blue-600 hover:bg-blue-700 gap-2"
                size="sm"
              >
                <Eye className="h-4 w-4" />
                View Full Record
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Record Details Dialog */}
      <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Patient Medical Record</DialogTitle>
            <DialogDescription>
              Complete medical history for {selectedRecord?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Patient Info */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Patient ID</p>
                    <p className="text-sm">{selectedRecord?.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Age</p>
                    <p className="text-sm">{selectedRecord?.age} years</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Blood Type</p>
                    <p className="text-sm">{selectedRecord?.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Department</p>
                    <p className="text-sm">{selectedRecord?.department}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="history" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="history">Consultation History</TabsTrigger>
                <TabsTrigger value="labs">Lab Results</TabsTrigger>
                <TabsTrigger value="summary">Medical Summary</TabsTrigger>
              </TabsList>

              <TabsContent value="history" className="space-y-3">
                {consultationHistory.map((visit, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm">{visit.doctor}</p>
                          <p className="text-xs text-gray-500">{visit.date}</p>
                        </div>
                        <Badge variant="outline">{visit.diagnosis}</Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-gray-600">Complaint:</span> {visit.complaint}
                        </p>
                        <p>
                          <span className="text-gray-600">Prescription:</span> {visit.prescription}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="labs" className="space-y-3">
                {labResults.map((lab, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm">{lab.test}</p>
                          <p className="text-xs text-gray-500">{lab.date}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700"
                        >
                          {lab.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{lab.results}</p>
                      <Button variant="link" className="text-blue-600 p-0 h-auto mt-2">
                        Download Full Report
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="summary" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Chronic Conditions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedRecord?.chronicConditions.map((condition: string, i: number) => (
                        <Badge key={i} variant="outline" className="bg-orange-50 text-orange-700">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Known Allergies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedRecord?.allergies.map((allergy: string, i: number) => (
                        <Badge key={i} variant="outline" className="bg-red-50 text-red-700">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Visit Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl">{selectedRecord?.visits}</p>
                        <p className="text-xs text-gray-600">Total Visits</p>
                      </div>
                      <div>
                        <p className="text-2xl">{consultationHistory.length}</p>
                        <p className="text-xs text-gray-600">Consultations</p>
                      </div>
                      <div>
                        <p className="text-2xl">{labResults.length}</p>
                        <p className="text-xs text-gray-600">Lab Tests</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
