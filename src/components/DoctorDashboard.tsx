import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Pill,
  MessageSquare,
  AlertCircle,
  FileText,
  Bell,
  Menu,
  TrendingDown,
  TrendingUp,
  Activity,
} from 'lucide-react';
import { DoctorPatientQueue } from './DoctorPatientQueue';
import { DoctorAppointments } from './DoctorAppointments';
import { DoctorPrescriptions } from './DoctorPrescriptions';
import { DoctorConsultations } from './DoctorConsultations';
import { DoctorEmergencyAlerts } from './DoctorEmergencyAlerts';
import { DoctorMedicalRecords } from './DoctorMedicalRecords';

interface DoctorDashboardProps {
  onSwitchToStudent: () => void;
}

export function DoctorDashboard({ onSwitchToStudent }: DoctorDashboardProps) {
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patient-queue', label: 'Patient Queue', icon: Users },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
    { id: 'consultations', label: 'AI Consultations', icon: MessageSquare },
    { id: 'emergency', label: 'Emergency Alerts', icon: AlertCircle },
    { id: 'records', label: 'Medical Records', icon: FileText },
  ];

  const stats = [
    {
      title: 'Patients in Queue',
      value: '45',
      change: '↓ 12% from yesterday',
      changeType: 'decrease',
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      title: 'AI Consultations',
      value: '28',
      change: '↑ 24% from yesterday',
      changeType: 'increase',
      icon: MessageSquare,
      color: 'bg-green-500',
    },
    {
      title: 'Appointments Today',
      value: '18',
      change: '↑ 8% from yesterday',
      changeType: 'increase',
      icon: Calendar,
      color: 'bg-orange-500',
    },
    {
      title: 'Active Emergencies',
      value: '3',
      change: 'Requires attention',
      changeType: 'alert',
      icon: AlertCircle,
      color: 'bg-red-500',
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'patient-queue':
        return <DoctorPatientQueue />;
      case 'appointments':
        return <DoctorAppointments />;
      case 'prescriptions':
        return <DoctorPrescriptions />;
      case 'consultations':
        return <DoctorConsultations />;
      case 'emergency':
        return <DoctorEmergencyAlerts />;
      case 'records':
        return <DoctorMedicalRecords />;
      default:
        return (
          <div className="p-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="border-none shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
                        <h3 className="text-3xl mb-2">{stat.value}</h3>
                        <p
                          className={`text-xs ${
                            stat.changeType === 'increase'
                              ? 'text-green-600'
                              : stat.changeType === 'decrease'
                              ? 'text-red-600'
                              : 'text-red-600'
                          }`}
                        >
                          {stat.change}
                        </p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-xl`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current Patient Queue */}
              <Card className="lg:col-span-2 border-none shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Current Patient Queue</CardTitle>
                    <Button
                      variant="link"
                      className="text-blue-600"
                      onClick={() => setActiveSection('patient-queue')}
                    >
                      View All →
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-5 gap-4 text-sm text-gray-500 pb-2 border-b">
                      <div>Patient</div>
                      <div>Complaint</div>
                      <div>Wait Time</div>
                      <div>Status</div>
                      <div>Action</div>
                    </div>

                    {[
                      {
                        name: 'Adebayo Oluwaseun',
                        id: 'ID: 20210123',
                        complaint: 'Fever, Headache',
                        waitTime: '25 mins',
                        status: 'Waiting',
                        avatar: 'AO',
                      },
                      {
                        name: 'Chioma Nnamdi',
                        id: 'ID: 20210456',
                        complaint: 'Chest Pain',
                        waitTime: '5 mins',
                        status: 'Urgent',
                        avatar: 'CN',
                      },
                      {
                        name: 'Ibrahim Musa',
                        id: 'ID: 20210789',
                        complaint: 'Skin Rash',
                        waitTime: '35 mins',
                        status: 'Waiting',
                        avatar: 'IM',
                      },
                    ].map((patient, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-5 gap-4 items-center py-3 border-b last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                              {patient.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm">{patient.name}</p>
                            <p className="text-xs text-gray-500">{patient.id}</p>
                          </div>
                        </div>
                        <div className="text-sm">{patient.complaint}</div>
                        <div className="text-sm text-gray-600">{patient.waitTime}</div>
                        <div>
                          <Badge
                            variant={patient.status === 'Urgent' ? 'destructive' : 'secondary'}
                            className={
                              patient.status === 'Urgent'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }
                          >
                            {patient.status}
                          </Badge>
                        </div>
                        <div>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Call Patient
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Alerts */}
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle>Emergency Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        type: 'Medical Emergency',
                        location: 'Block B, Room 204',
                        description: 'Student collapsed in hostel',
                        time: '2 mins ago',
                      },
                      {
                        type: 'Critical Condition',
                        location: 'Clinic Ward A',
                        description: 'Patient vitals dropping',
                        time: '15 mins ago',
                      },
                    ].map((alert, index) => (
                      <div
                        key={index}
                        className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg"
                      >
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm text-red-900">{alert.type}</p>
                            <p className="text-xs text-red-700 mt-1">
                              📍 {alert.location}
                            </p>
                            <p className="text-xs text-red-600 mt-1">
                              {alert.description}
                            </p>
                            <p className="text-xs text-red-500 mt-2">{alert.time}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="w-full mt-3 bg-red-600 hover:bg-red-700"
                        >
                          Respond Now
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-blue-600 to-blue-700 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Activity className="h-6 w-6" />
          </div>
          {sidebarOpen && <h1 className="text-xl">SmartMed</h1>}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-white/20 backdrop-blur-sm'
                  : 'hover:bg-white/10'
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Switch View */}
        <div className="p-3">
          <Button
            onClick={onSwitchToStudent}
            variant="outline"
            className="w-full bg-white/10 border-white/20 hover:bg-white/20 text-white"
          >
            {sidebarOpen ? 'Switch to Student View' : '👤'}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <header className="bg-white border-b px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h2 className="text-xl">Hospital Dashboard</h2>
                <p className="text-sm text-gray-500">
                  Sunday, November 02, 2025
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm">Dr. Sarah Johnson</p>
                  <p className="text-xs text-gray-500">Medical Director</p>
                </div>
                <Avatar>
                  <AvatarFallback className="bg-blue-600">SJ</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        {renderContent()}
      </main>
    </div>
  );
}
