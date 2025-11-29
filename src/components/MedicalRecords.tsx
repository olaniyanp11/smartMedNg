import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, FileText, Calendar, Download, Activity, Heart, Droplet, Weight, Ruler } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface MedicalRecordsProps {
  onBack: () => void;
}

export function MedicalRecords({ onBack }: MedicalRecordsProps) {
  const [selectedTab, setSelectedTab] = useState('overview');

  const vitals = {
    bloodPressure: '120/80',
    heartRate: '72 bpm',
    temperature: '98.6°F',
    weight: '165 lbs',
    height: '5\'10"',
    bmi: '23.7',
    bloodType: 'O+',
  };

  const visits = [
    {
      id: 1,
      date: 'Oct 28, 2024',
      doctor: 'Dr. Sarah Johnson',
      type: 'General Checkup',
      diagnosis: 'Upper Respiratory Infection',
      notes: 'Prescribed Amoxicillin 500mg. Patient advised to rest and stay hydrated.',
    },
    {
      id: 2,
      date: 'Sep 15, 2024',
      doctor: 'Dr. Michael Chen',
      type: 'Follow-up',
      diagnosis: 'Seasonal Allergies',
      notes: 'Allergies under control. Continue current medication.',
    },
    {
      id: 3,
      date: 'Aug 10, 2024',
      doctor: 'Dr. Sarah Johnson',
      type: 'Annual Physical',
      diagnosis: 'Healthy',
      notes: 'All vitals normal. Recommended flu vaccination.',
    },
  ];

  const labResults = [
    {
      id: 1,
      test: 'Complete Blood Count (CBC)',
      date: 'Oct 20, 2024',
      status: 'Normal',
      doctor: 'Dr. Sarah Johnson',
    },
    {
      id: 2,
      test: 'Lipid Panel',
      date: 'Aug 10, 2024',
      status: 'Normal',
      doctor: 'Dr. Sarah Johnson',
    },
    {
      id: 3,
      test: 'Vitamin D Test',
      date: 'Aug 10, 2024',
      status: 'Low',
      doctor: 'Dr. Sarah Johnson',
    },
  ];

  const vaccinations = [
    { name: 'Flu Shot', date: 'Sep 20, 2024', nextDue: 'Sep 2025' },
    { name: 'COVID-19 Booster', date: 'Jan 15, 2024', nextDue: 'As recommended' },
    { name: 'Tetanus', date: 'Mar 2022', nextDue: 'Mar 2032' },
  ];

  const allergies = [
    { name: 'Penicillin', severity: 'Moderate', reaction: 'Rash, itching' },
    { name: 'Peanuts', severity: 'Severe', reaction: 'Anaphylaxis' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 pt-8 pb-6">
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
            <FileText className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-xl">Medical Records</h1>
            <p className="text-teal-100 text-sm">Your health history</p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="visits">Visits</TabsTrigger>
            <TabsTrigger value="labs">Labs</TabsTrigger>
            <TabsTrigger value="vaccines">Vaccines</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            {/* Vitals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Current Vitals
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Heart className="h-4 w-4 text-red-600" />
                    <p className="text-xs text-gray-600">Blood Pressure</p>
                  </div>
                  <p className="text-lg text-gray-900">{vitals.bloodPressure}</p>
                  <p className="text-xs text-gray-500">mmHg</p>
                </div>
                <div className="bg-pink-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="h-4 w-4 text-pink-600" />
                    <p className="text-xs text-gray-600">Heart Rate</p>
                  </div>
                  <p className="text-lg text-gray-900">{vitals.heartRate}</p>
                  <p className="text-xs text-gray-500">Normal range</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Weight className="h-4 w-4 text-blue-600" />
                    <p className="text-xs text-gray-600">Weight</p>
                  </div>
                  <p className="text-lg text-gray-900">{vitals.weight}</p>
                  <p className="text-xs text-gray-500">BMI: {vitals.bmi}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Droplet className="h-4 w-4 text-purple-600" />
                    <p className="text-xs text-gray-600">Blood Type</p>
                  </div>
                  <p className="text-lg text-gray-900">{vitals.bloodType}</p>
                  <p className="text-xs text-gray-500">Universal donor</p>
                </div>
              </CardContent>
            </Card>

            {/* Allergies */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Known Allergies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {allergies.map((allergy, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="text-sm">{allergy.name}</p>
                      <p className="text-xs text-gray-600">{allergy.reaction}</p>
                    </div>
                    <Badge 
                      className={allergy.severity === 'Severe' ? 'bg-red-600' : 'bg-orange-500'}
                    >
                      {allergy.severity}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Visit */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Most Recent Visit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">{visits[0].type}</p>
                    <Badge variant="outline">{visits[0].date}</Badge>
                  </div>
                  <p className="text-xs text-gray-600">with {visits[0].doctor}</p>
                  <div className="bg-blue-50 rounded-lg p-3 mt-3">
                    <p className="text-sm mb-1">Diagnosis</p>
                    <p className="text-xs text-gray-700">{visits[0].diagnosis}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visits" className="space-y-3 mt-4">
            {visits.map((visit) => (
              <Card key={visit.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm mb-1">{visit.type}</h3>
                      <p className="text-xs text-gray-600">{visit.doctor}</p>
                    </div>
                    <Badge variant="outline">{visit.date}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs mb-1">Diagnosis</p>
                      <p className="text-sm text-gray-900">{visit.diagnosis}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs mb-1">Notes</p>
                      <p className="text-xs text-gray-700">{visit.notes}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-3">
                    <Download className="h-3 w-3 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="labs" className="space-y-3 mt-4">
            {labResults.map((lab) => (
              <Card key={lab.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm mb-1">{lab.test}</h3>
                      <p className="text-xs text-gray-600">{lab.doctor}</p>
                    </div>
                    <Badge 
                      className={lab.status === 'Normal' ? 'bg-green-600' : 'bg-yellow-600'}
                    >
                      {lab.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>{lab.date}</span>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="vaccines" className="space-y-3 mt-4">
            {vaccinations.map((vaccine, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm">{vaccine.name}</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Current
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-gray-600">Last Dose</p>
                      <p className="text-gray-900">{vaccine.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Next Due</p>
                      <p className="text-gray-900">{vaccine.nextDue}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-4">
                <p className="text-amber-900 text-sm">
                  Your flu vaccination is due. Schedule your appointment today.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
