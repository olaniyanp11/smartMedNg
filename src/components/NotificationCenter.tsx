import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Bell, Calendar, Pill, AlertCircle, Check, X } from 'lucide-react';

interface NotificationCenterProps {
  onBack: () => void;
}

export function NotificationCenter({ onBack }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      title: 'Upcoming Appointment',
      message: 'Appointment with Dr. Sarah Johnson tomorrow at 10:00 AM',
      time: '2 hours ago',
      read: false,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 2,
      type: 'prescription',
      title: 'Prescription Ready',
      message: 'Your prescription for Amoxicillin is ready for pickup at Campus Pharmacy',
      time: '5 hours ago',
      read: false,
      icon: Pill,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Medication Reminder',
      message: 'Time to take your Ibuprofen 400mg',
      time: '1 day ago',
      read: true,
      icon: AlertCircle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      id: 4,
      type: 'appointment',
      title: 'Appointment Confirmed',
      message: 'Your appointment on Nov 15 has been confirmed',
      time: '2 days ago',
      read: true,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 5,
      type: 'prescription',
      title: 'Refill Available',
      message: 'You have 2 refills available for Vitamin D3. Order now?',
      time: '3 days ago',
      read: false,
      icon: Pill,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-xl">
              <Bell className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-xl">Notifications</h1>
              <p className="text-blue-100 text-sm">{unreadCount} unread</p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={markAllAsRead}
            >
              Mark all read
            </Button>
          )}
        </div>
      </div>

      <div className="px-4 mt-6 space-y-3">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p className="text-gray-600">No notifications</p>
              <p className="text-gray-500 text-sm mt-1">You're all caught up!</p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <Card 
                key={notification.id}
                className={`${!notification.read ? 'border-blue-300 bg-blue-50/50' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`${notification.bgColor} p-2 rounded-lg flex-shrink-0`}>
                      <Icon className={`h-5 w-5 ${notification.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-sm">{notification.title}</h3>
                        {!notification.read && (
                          <Badge className="bg-blue-600 text-xs flex-shrink-0">New</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">{notification.time}</p>
                        <div className="flex gap-1">
                          {!notification.read && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 px-2"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 hover:bg-red-50 hover:text-red-600"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
