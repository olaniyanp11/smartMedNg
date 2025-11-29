import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { 
  Brain, 
  Stethoscope, 
  Pill, 
  UserPlus, 
  Calendar, 
  AlertCircle,
  Phone,
  ChevronRight,
  Activity,
  Clock,
  MapPin,
  Bell,
  FileText,
  MessageSquare
} from 'lucide-react';
import { SymptomChecker } from './components/SymptomChecker';
import { SmartTriage } from './components/SmartTriage';
import { PrescriptionPharmacy } from './components/PrescriptionPharmacy';
import { OnlineRegistration } from './components/OnlineRegistration';
import { AppointmentBooking } from './components/AppointmentBooking';
import { NotificationCenter } from './components/NotificationCenter';
import { MedicalRecords } from './components/MedicalRecords';
import { EConsultation } from './components/EConsultation';
import { DoctorDashboard } from './components/DoctorDashboard';
import { Login } from './components/Login';
import { Signup } from './components/Signup';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'student' | 'doctor'>('student');
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);

  const handleLogin = (matricNo: string) => {
    setCurrentUser(matricNo);
    setIsLoggedIn(true);
    setShowSignup(false);
  };

  const handleSignup = (matricNo: string) => {
    setCurrentUser(matricNo);
    setIsLoggedIn(true);
    setShowSignup(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setViewMode('student');
    setActiveFeature(null);
  };

  const handleEmergencyCall = () => {
    setShowEmergencyAlert(true);
    // Add user to top priority in triage
    setTimeout(() => {
      alert('Emergency services contacted. You have been added to top priority in the triage queue. Help is on the way!');
      setShowEmergencyAlert(false);
      // Optionally navigate to smart triage
      setActiveFeature('smart-triage');
    }, 2000);
  };

  // Show Login/Signup if not logged in
  if (!isLoggedIn) {
    if (showSignup) {
      return <Signup onSignup={handleSignup} onSwitchToLogin={() => setShowSignup(false)} />;
    }
    return <Login onLogin={handleLogin} onSwitchToSignup={() => setShowSignup(true)} />;
  }

  const features = [
    {
      id: 'symptom-checker',
      title: 'AI Symptom Checker',
      description: 'Describe your symptoms and get instant AI-powered health insights',
      icon: Brain,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'smart-triage',
      title: 'Smart Triage',
      description: 'Get prioritized based on urgency and condition severity',
      icon: Stethoscope,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'medical-records',
      title: 'Medical Records',
      description: 'View your complete medical history and health records',
      icon: FileText,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
    {
      id: 'prescription',
      title: 'E-Prescription & Pharmacy',
      description: 'View prescriptions and connect with nearby pharmacies',
      icon: Pill,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 'registration',
      title: 'Online Registration',
      description: 'Register for health services quickly and securely',
      icon: UserPlus,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      id: 'appointment',
      title: 'Appointment Booking',
      description: 'Schedule appointments with healthcare providers',
      icon: Calendar,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      id: 'e-consultation',
      title: 'E-Consultation',
      description: 'Chat with a doctor online for instant medical advice',
      icon: MessageSquare,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
  ];

  const content = () => {
    if (activeFeature === 'symptom-checker') {
      return (
        <SymptomChecker 
          onBack={() => setActiveFeature(null)}
          onBookAppointment={() => setActiveFeature('appointment')}
          onEConsultation={() => setActiveFeature('e-consultation')}
          onEmergencyCall={handleEmergencyCall}
        />
      );
    }

    if (activeFeature === 'smart-triage') {
      return <SmartTriage onBack={() => setActiveFeature(null)} />;
    }

    if (activeFeature === 'medical-records') {
      return <MedicalRecords onBack={() => setActiveFeature(null)} />;
    }

    if (activeFeature === 'prescription') {
      return <PrescriptionPharmacy onBack={() => setActiveFeature(null)} />;
    }

    if (activeFeature === 'registration') {
      return <OnlineRegistration onBack={() => setActiveFeature(null)} />;
    }

    if (activeFeature === 'appointment') {
      return <AppointmentBooking onBack={() => setActiveFeature(null)} />;
    }

    if (activeFeature === 'notifications') {
      return <NotificationCenter onBack={() => setActiveFeature(null)} />;
    }

    if (activeFeature === 'e-consultation') {
      return <EConsultation onBack={() => setActiveFeature(null)} />;
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 pt-8 pb-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl mb-1 font-[Spartan]">SmartMed</h1>
            <p className="text-blue-100 text-sm">Student Health Management</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setViewMode('doctor')}
              className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors text-xs"
            >
              Doctor View
            </button>
            <button 
              onClick={() => setActiveFeature('notifications')}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                3
              </span>
            </button>
            <Avatar className="h-9 w-9 border-2 border-white">
              <AvatarImage src="" />
              <AvatarFallback className="bg-blue-500 text-sm">JS</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <Activity className="h-5 w-5 mb-1" />
            <p className="text-xs text-blue-100">Health Score</p>
            <p className="text-lg">85%</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <Calendar className="h-5 w-5 mb-1" />
            <p className="text-xs text-blue-100">Next Visit</p>
            <p className="text-sm">Nov 15</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <Clock className="h-5 w-5 mb-1" />
            <p className="text-xs text-blue-100">Wait Time</p>
            <p className="text-sm">~12 min</p>
          </div>
        </div>
      </div>

      {/* Notification Banner */}
      <div className="px-4 mt-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
          <p className="text-amber-900 text-xs">
            Upcoming appointment on November 5 at 10:00 AM
          </p>
        </div>
      </div>

      {/* Health Services Section */}
      <div className="px-4 mt-6">
        <h2 className="text-lg mb-4">Health Services</h2>
        <div className="grid grid-cols-2 gap-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setActiveFeature(feature.id)}
              >
                <CardContent className="p-4">
                  <div className={`${feature.bgColor} p-2 rounded-lg w-fit mb-3`}>
                    <Icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <h3 className="text-sm mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-4 mt-6 mb-6">
        <h2 className="text-lg mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b">
              <div className="bg-green-50 p-2 rounded-lg">
                <Pill className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm">Prescription Filled</p>
                <p className="text-xs text-gray-600">Campus Pharmacy - 2 days ago</p>
              </div>
              <Badge variant="outline" className="text-xs">Completed</Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm">Checkup Appointment</p>
                <p className="text-xs text-gray-600">Dr. Sarah Johnson - 5 days ago</p>
              </div>
              <Badge variant="outline" className="text-xs">Completed</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Emergency Call Button */}
      <div className="fixed bottom-[90px] right-[40px] z-50 group">
        <button
          onClick={handleEmergencyCall}
          disabled={showEmergencyAlert}
          className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-full h-14 w-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
        >
          <Phone className="h-6 w-6" />
        </button>
        {/* Hover Label */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap">
            Emergency
          </div>
        </div>
      </div>

      {/* Emergency Alert */}
      {showEmergencyAlert && (
        <div className="fixed bottom-[160px] right-[40px] bg-red-50 border-2 border-red-200 rounded-lg p-3 animate-pulse shadow-lg max-w-[200px] z-40">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-900 text-xs">Emergency services contacted</p>
              <p className="text-red-700 text-xs mt-1">Help is on the way...</p>
            </div>
          </div>
        </div>
      )}
    </div>
    );
  };

  // Switch between doctor and student views
  if (viewMode === 'doctor') {
    return <DoctorDashboard onSwitchToStudent={() => setViewMode('student')} />;
  }

  return content();
}