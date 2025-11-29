import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ArrowLeft, UserPlus, CheckCircle2, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface OnlineRegistrationProps {
  onBack: () => void;
}

export function OnlineRegistration({ onBack }: OnlineRegistrationProps) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    studentId: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    bloodType: '',
    allergies: '',
    medications: '',
    emergencyContact: '',
    emergencyPhone: '',
  });

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStep(4);
    }, 2000);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 pt-8 pb-6">
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
            <UserPlus className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-xl">Online Registration</h1>
            <p className="text-orange-100 text-sm">Student Health Services</p>
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
                    s <= step ? 'bg-orange-600' : 'bg-gray-200'
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

      <div className="px-4 mt-6">
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  placeholder="STU123456"
                  value={formData.studentId}
                  onChange={(e) => updateFormData('studentId', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@university.edu"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => updateFormData('dob', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={() => setStep(2)}
                className="w-full bg-orange-600 hover:bg-orange-700"
                disabled={!formData.firstName || !formData.lastName || !formData.email}
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Medical Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select value={formData.bloodType} onValueChange={(value) => updateFormData('bloodType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a+">A+</SelectItem>
                    <SelectItem value="a-">A-</SelectItem>
                    <SelectItem value="b+">B+</SelectItem>
                    <SelectItem value="b-">B-</SelectItem>
                    <SelectItem value="ab+">AB+</SelectItem>
                    <SelectItem value="ab-">AB-</SelectItem>
                    <SelectItem value="o+">O+</SelectItem>
                    <SelectItem value="o-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Known Allergies</Label>
                <Textarea
                  id="allergies"
                  placeholder="List any allergies (e.g., penicillin, peanuts, latex)"
                  value={formData.allergies}
                  onChange={(e) => updateFormData('allergies', e.target.value)}
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  placeholder="List any medications you're currently taking"
                  value={formData.medications}
                  onChange={(e) => updateFormData('medications', e.target.value)}
                  className="min-h-20"
                />
              </div>

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
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
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
              <CardTitle className="text-lg">Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                <Input
                  id="emergencyContact"
                  placeholder="Jane Doe"
                  value={formData.emergencyContact}
                  onChange={(e) => updateFormData('emergencyContact', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  placeholder="(555) 987-6543"
                  value={formData.emergencyPhone}
                  onChange={(e) => updateFormData('emergencyPhone', e.target.value)}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-900 text-sm">
                  By submitting this registration, you agree to the terms and conditions of the Student Health Services.
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
                  onClick={handleSubmit}
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                  disabled={submitting || !formData.emergencyContact || !formData.emergencyPhone}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Registration'
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
              <h2 className="text-xl mb-2">Registration Complete!</h2>
              <p className="text-gray-600 mb-6">
                Your registration has been successfully submitted. You can now access all health services.
              </p>
              <div className="space-y-2">
                <Button 
                  onClick={onBack}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  Return to Dashboard
                </Button>
                <Button 
                  variant="outline"
                  className="w-full"
                >
                  Download Registration Confirmation
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
