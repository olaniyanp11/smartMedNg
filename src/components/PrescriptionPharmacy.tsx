import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Pill, MapPin, Phone, Clock, CheckCircle2, Package } from 'lucide-react';

interface PrescriptionPharmacyProps {
  onBack: () => void;
}

export function PrescriptionPharmacy({ onBack }: PrescriptionPharmacyProps) {
  const [selectedTab, setSelectedTab] = useState<'prescriptions' | 'pharmacies'>('prescriptions');

  const prescriptions = [
    {
      id: 1,
      medication: 'Amoxicillin 500mg',
      dosage: '3 times daily',
      quantity: '21 tablets',
      prescriber: 'Dr. Sarah Johnson',
      date: 'Oct 28, 2024',
      status: 'Active',
      refillsLeft: 2,
    },
    {
      id: 2,
      medication: 'Ibuprofen 400mg',
      dosage: 'As needed for pain',
      quantity: '30 tablets',
      prescriber: 'Dr. Michael Chen',
      date: 'Oct 15, 2024',
      status: 'Ready for Pickup',
      refillsLeft: 0,
    },
    {
      id: 3,
      medication: 'Vitamin D3 1000 IU',
      dosage: 'Once daily',
      quantity: '90 tablets',
      prescriber: 'Dr. Sarah Johnson',
      date: 'Sep 20, 2024',
      status: 'Completed',
      refillsLeft: 1,
    },
  ];

  const pharmacies = [
    {
      id: 1,
      name: 'Campus Health Pharmacy',
      distance: '0.2 miles',
      hours: 'Open until 8:00 PM',
      phone: '(555) 123-4567',
      rating: 4.8,
      waitTime: '~15 min',
      isOpen: true,
    },
    {
      id: 2,
      name: 'QuickMed Pharmacy',
      distance: '0.5 miles',
      hours: 'Open 24 hours',
      phone: '(555) 234-5678',
      rating: 4.6,
      waitTime: '~20 min',
      isOpen: true,
    },
    {
      id: 3,
      name: 'University Wellness Pharmacy',
      distance: '1.1 miles',
      hours: 'Closed - Opens 9:00 AM',
      phone: '(555) 345-6789',
      rating: 4.9,
      waitTime: 'N/A',
      isOpen: false,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Ready for Pickup':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 pt-8 pb-6">
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
            <Pill className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-xl">E-Prescription</h1>
            <p className="text-green-100 text-sm">Prescriptions & Pharmacies</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-6">
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setSelectedTab('prescriptions')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              selectedTab === 'prescriptions'
                ? 'bg-white shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Prescriptions
          </button>
          <button
            onClick={() => setSelectedTab('pharmacies')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              selectedTab === 'pharmacies'
                ? 'bg-white shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Pharmacies
          </button>
        </div>
      </div>

      <div className="px-4 mt-6 space-y-4">
        {selectedTab === 'prescriptions' ? (
          <>
            {prescriptions.map((prescription) => (
              <Card key={prescription.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm mb-1">{prescription.medication}</h3>
                      <p className="text-xs text-gray-600">{prescription.dosage}</p>
                    </div>
                    <Badge className={`${getStatusColor(prescription.status)} text-xs`}>
                      {prescription.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-xs text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <Package className="h-3 w-3" />
                      <span>Quantity: {prescription.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Prescribed by {prescription.prescriber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>{prescription.date}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            {pharmacies.map((pharmacy) => (
              <Card key={pharmacy.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm mb-1">{pharmacy.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{pharmacy.distance}</span>
                        <span className="mx-1">•</span>
                        <span>★ {pharmacy.rating}</span>
                      </div>
                    </div>
                    <Badge 
                      variant={pharmacy.isOpen ? 'default' : 'outline'}
                      className={pharmacy.isOpen ? 'bg-green-600' : ''}
                    >
                      {pharmacy.isOpen ? 'Open' : 'Closed'}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Clock className="h-3 w-3" />
                      <span>{pharmacy.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Phone className="h-3 w-3" />
                      <span>{pharmacy.phone}</span>
                    </div>
                    {pharmacy.isOpen && (
                      <div className="bg-blue-50 rounded p-2 text-xs text-blue-900">
                        Wait time: {pharmacy.waitTime}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      Directions
                    </Button>
                    <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
}