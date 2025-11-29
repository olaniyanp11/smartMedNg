import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Search, Plus, Send, Clock, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

export function DoctorPrescriptions() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const prescriptions = [
    {
      id: 'RX001',
      patient: 'Adebayo Oluwaseun',
      avatar: 'AO',
      patientId: '20210123',
      medication: 'Paracetamol 500mg',
      dosage: '2 tablets, 3x daily',
      duration: '7 days',
      date: '2025-11-05',
      status: 'Active',
      pharmacyStatus: 'Dispensed',
    },
    {
      id: 'RX002',
      patient: 'Chioma Nnamdi',
      avatar: 'CN',
      patientId: '20210456',
      medication: 'Amoxicillin 250mg',
      dosage: '1 capsule, 3x daily',
      duration: '5 days',
      date: '2025-11-04',
      status: 'Active',
      pharmacyStatus: 'Pending',
    },
    {
      id: 'RX003',
      patient: 'Ibrahim Musa',
      avatar: 'IM',
      patientId: '20210789',
      medication: 'Hydrocortisone Cream',
      dosage: 'Apply 2x daily',
      duration: '14 days',
      date: '2025-11-03',
      status: 'Active',
      pharmacyStatus: 'Ready for Pickup',
    },
    {
      id: 'RX004',
      patient: 'Fatima Hassan',
      avatar: 'FH',
      patientId: '20210234',
      medication: 'Omeprazole 20mg',
      dosage: '1 tablet, before breakfast',
      duration: '30 days',
      date: '2025-11-01',
      status: 'Completed',
      pharmacyStatus: 'Dispensed',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-2">Prescription Management</h1>
          <p className="text-gray-600">Create and manage patient prescriptions</p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 gap-2"
        >
          <Plus className="h-4 w-4" />
          New Prescription
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total This Month</p>
                <p className="text-2xl">156</p>
              </div>
              <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                📋
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl">42</p>
              </div>
              <Clock className="h-10 w-10 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Dispensed</p>
                <p className="text-2xl">98</p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl">16</p>
              </div>
              <div className="h-10 w-10 bg-yellow-500 rounded-full flex items-center justify-center text-white">
                ⏳
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search prescriptions by patient name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Prescriptions List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Prescriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {prescription.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{prescription.patient}</h3>
                        <Badge variant="outline" className="text-xs">
                          {prescription.id}
                        </Badge>
                        <Badge
                          className={
                            prescription.status === 'Active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }
                        >
                          {prescription.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm mb-3">
                        <div>
                          <span className="text-gray-500">Medication:</span>{' '}
                          <span className="text-gray-900">{prescription.medication}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Dosage:</span>{' '}
                          <span className="text-gray-900">{prescription.dosage}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Duration:</span>{' '}
                          <span className="text-gray-900">{prescription.duration}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Date:</span>{' '}
                          <span className="text-gray-900">{prescription.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Pharmacy Status:</span>
                        <Badge
                          variant="outline"
                          className={
                            prescription.pharmacyStatus === 'Dispensed'
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : prescription.pharmacyStatus === 'Pending'
                              ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }
                        >
                          {prescription.pharmacyStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Refill
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Prescription Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Prescription</DialogTitle>
            <DialogDescription>
              Fill in the prescription details to send to pharmacy
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Patient Name</Label>
                <Input placeholder="Search patient..." className="mt-2" />
              </div>
              <div>
                <Label>Patient ID</Label>
                <Input placeholder="Enter patient ID..." className="mt-2" />
              </div>
            </div>

            <div>
              <Label>Medication Name</Label>
              <Input placeholder="e.g., Paracetamol 500mg" className="mt-2" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Dosage</Label>
                <Input placeholder="e.g., 2 tablets" className="mt-2" />
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
                placeholder="Additional instructions for patient and pharmacist..."
                className="mt-2 min-h-[100px]"
              />
            </div>

            <div>
              <Label>Notes (Internal)</Label>
              <Textarea
                placeholder="Medical notes for reference..."
                className="mt-2 min-h-[80px]"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={() => {
                  alert('Prescription sent to pharmacy successfully!');
                  setIsCreateOpen(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 gap-2"
              >
                <Send className="h-4 w-4" />
                Send to Pharmacy
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsCreateOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
