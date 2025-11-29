import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ArrowLeft, Send, Video, Phone, Paperclip, Smile } from 'lucide-react';

interface Message {
  id: number;
  sender: 'user' | 'doctor';
  text: string;
  time: string;
}

interface EConsultationProps {
  onBack: () => void;
}

export function EConsultation({ onBack }: EConsultationProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'doctor',
      text: 'Hello! I\'m Dr. Sarah Johnson. How can I help you today?',
      time: '10:30 AM',
    },
    {
      id: 2,
      sender: 'user',
      text: 'Hi Doctor, I\'ve been experiencing headaches for the past few days.',
      time: '10:31 AM',
    },
    {
      id: 3,
      sender: 'doctor',
      text: 'I understand. Can you describe the headaches? Are they constant or do they come and go?',
      time: '10:32 AM',
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (newMessage.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate doctor response
    setTimeout(() => {
      const doctorResponses = [
        'Thank you for sharing that. Let me note this down in your medical record.',
        'I see. Have you noticed any triggers that might be causing this?',
        'Based on what you\'ve told me, I\'d recommend getting some rest and staying hydrated. If symptoms persist, we should schedule an in-person appointment.',
        'That\'s helpful information. Are you currently taking any medications?',
      ];

      const doctorMessage: Message = {
        id: messages.length + 2,
        sender: 'doctor',
        text: doctorResponses[Math.floor(Math.random() * doctorResponses.length)],
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, doctorMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="hover:bg-white/10 p-2 rounded-lg transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl">E-Consultation</h1>
          <div className="w-10" />
        </div>

        {/* Doctor Info */}
        <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-white">
              <AvatarImage src="" />
              <AvatarFallback className="bg-blue-500">SJ</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">Dr. Sarah Johnson</h3>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <p className="text-sm text-blue-100">Online</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors">
              <Phone className="h-5 w-5" />
            </button>
            <button className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors">
              <Video className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="px-4 py-4 space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-gray-100 text-gray-900 rounded-bl-sm'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Responses */}
      <div className="px-4 py-3 border-t bg-white">
        <p className="text-xs text-gray-500 mb-2">Quick responses:</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Badge 
            variant="outline" 
            className="cursor-pointer hover:bg-gray-100 whitespace-nowrap"
            onClick={() => setNewMessage('Can you prescribe medication?')}
          >
            Can you prescribe medication?
          </Badge>
          <Badge 
            variant="outline" 
            className="cursor-pointer hover:bg-gray-100 whitespace-nowrap"
            onClick={() => setNewMessage('Should I come for a check-up?')}
          >
            Should I come for a check-up?
          </Badge>
          <Badge 
            variant="outline" 
            className="cursor-pointer hover:bg-gray-100 whitespace-nowrap"
            onClick={() => setNewMessage('Thank you, Doctor!')}
          >
            Thank you, Doctor!
          </Badge>
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-700 p-2">
            <Paperclip className="h-5 w-5" />
          </button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
          />
          <button className="text-gray-500 hover:text-gray-700 p-2">
            <Smile className="h-5 w-5" />
          </button>
          <Button
            onClick={handleSend}
            disabled={newMessage.trim() === ''}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
