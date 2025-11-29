import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { ArrowLeft, Brain, AlertCircle, CheckCircle2, ThermometerSun, Loader2, Phone } from 'lucide-react';
import { Progress } from './ui/progress';

interface SymptomCheckerProps {
  onBack: () => void;
  onBookAppointment?: () => void;
  onEConsultation?: () => void;
  onEmergencyCall?: () => void;
}

export function SymptomChecker({ onBack, onBookAppointment, onEConsultation, onEmergencyCall }: SymptomCheckerProps) {
  const [symptoms, setSymptoms] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    
    // Simulate AI analysis with different severity levels
    setTimeout(() => {
      // Randomly generate different severity levels for demo
      const severityLevels = ['Mild', 'Moderate', 'High', 'Critical'];
      const randomSeverity = severityLevels[Math.floor(Math.random() * severityLevels.length)];
      
      const severityData: any = {
        'Mild': {
          severity: 'Mild',
          conditions: [
            { name: 'Common Cold', probability: 75, severity: 'low' },
            { name: 'Seasonal Allergies', probability: 45, severity: 'low' },
          ],
          recommendations: [
            'Rest and stay hydrated',
            'Monitor temperature regularly',
            'Over-the-counter medications may help',
          ],
          urgency: 'You can book an appointment or consult online at your convenience',
        },
        'Moderate': {
          severity: 'Moderate',
          conditions: [
            { name: 'Flu', probability: 70, severity: 'moderate' },
            { name: 'Acute Bronchitis', probability: 40, severity: 'moderate' },
          ],
          recommendations: [
            'Rest and stay hydrated',
            'Monitor temperature regularly',
            'Consider scheduling a consultation soon',
            'Avoid contact with others to prevent spread',
          ],
          urgency: 'Schedule appointment within 2-3 days or consult online',
        },
        'High': {
          severity: 'High',
          conditions: [
            { name: 'Severe Infection', probability: 65, severity: 'high' },
            { name: 'Pneumonia', probability: 55, severity: 'high' },
          ],
          recommendations: [
            'Seek medical attention soon',
            'Monitor symptoms closely',
            'Keep track of temperature changes',
            'Have someone check on you regularly',
          ],
          urgency: 'Seek medical attention within 24 hours',
        },
        'Critical': {
          severity: 'Critical',
          conditions: [
            { name: 'Severe Medical Emergency', probability: 80, severity: 'critical' },
            { name: 'Acute Condition', probability: 70, severity: 'critical' },
          ],
          recommendations: [
            'Seek immediate medical attention',
            'Do not delay treatment',
            'Contact emergency services if condition worsens',
            'Have someone stay with you',
          ],
          urgency: 'Immediate medical attention required',
        },
      };
      
      setResults(severityData[randomSeverity]);
      setAnalyzing(false);
    }, 2500);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'mild':
        return 'border-green-200 bg-green-50 text-green-900';
      case 'moderate':
        return 'border-amber-200 bg-amber-50 text-amber-900';
      case 'high':
        return 'border-orange-200 bg-orange-50 text-orange-900';
      case 'critical':
        return 'border-red-200 bg-red-50 text-red-900';
      default:
        return 'border-amber-200 bg-amber-50 text-amber-900';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'mild':
        return 'text-green-600';
      case 'moderate':
        return 'text-amber-600';
      case 'high':
        return 'text-orange-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-amber-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 pt-8 pb-6">
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
            <Brain className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-xl">AI Symptom Checker</h1>
            <p className="text-purple-100 text-sm">Get instant health insights</p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6">
        {!results ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Describe Your Symptoms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="E.g., I have a headache, fever, and sore throat. Started 2 days ago..."
                className="min-h-32"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                  <p className="text-blue-900 text-sm">
                    Be as detailed as possible. Include when symptoms started, severity, and any relevant information.
                  </p>
                </div>
              </div>

              <Button 
                onClick={handleAnalyze}
                disabled={!symptoms.trim() || analyzing}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing Symptoms...
                  </>
                ) : (
                  'Analyze Symptoms'
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {/* Severity Alert */}
            <Card className={getSeverityColor(results.severity)}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <ThermometerSun className={`h-6 w-6 ${getSeverityIcon(results.severity)}`} />
                  <div>
                    <p className="text-sm">Severity Level</p>
                    <p className={getSeverityIcon(results.severity)}>{results.severity}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Possible Conditions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Possible Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {results.conditions.map((condition: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{condition.name}</span>
                      <Badge variant={condition.severity === 'low' ? 'outline' : 'default'}>
                        {condition.probability}% match
                      </Badge>
                    </div>
                    <Progress value={condition.probability} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {results.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <p className="text-sm text-gray-700">{rec}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Urgency */}
            <Card className={getSeverityColor(results.severity)}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className={`h-5 w-5 ${getSeverityIcon(results.severity)}`} />
                  <div>
                    <p className="text-sm">Next Steps</p>
                    <p className={`text-sm ${getSeverityIcon(results.severity)}`}>{results.urgency}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons Based on Severity */}
            <div className="space-y-3">
              <Button 
                variant="outline" 
                onClick={() => setResults(null)}
                className="w-full"
              >
                Check Again
              </Button>

              {(results.severity === 'Mild' || results.severity === 'Moderate') && (
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={onBookAppointment}
                  >
                    Book Appointment
                  </Button>
                  <Button 
                    className="bg-pink-600 hover:bg-pink-700"
                    onClick={onEConsultation}
                  >
                    E-Consultation
                  </Button>
                </div>
              )}

              {(results.severity === 'High' || results.severity === 'Critical') && (
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={onBookAppointment}
                  >
                    Book Appointment
                  </Button>
                  <Button 
                    className="bg-red-600 hover:bg-red-700"
                    onClick={onEmergencyCall}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Emergency Call
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}