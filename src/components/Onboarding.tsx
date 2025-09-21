import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';

interface OnboardingProps {
  onComplete: (userData: any) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    currentRole: '',
    experience: '',
    education: '',
    skills: [] as string[],
    goals: '',
    industries: [] as string[],
    timeline: ''
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const skillOptions = [
    'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Data Analysis',
    'Project Management', 'Marketing', 'Design', 'Communication',
    'Leadership', 'Excel', 'AWS', 'Machine Learning', 'Sales'
  ];

  const industryOptions = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Marketing',
    'Consulting', 'Retail', 'Manufacturing', 'Media', 'Government'
  ];

  const handleSkillToggle = (skill: string) => {
    setUserData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleIndustryToggle = (industry: string) => {
    setUserData(prev => ({
      ...prev,
      industries: prev.industries.includes(industry)
        ? prev.industries.filter(i => i !== industry)
        : [...prev.industries, industry]
    }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(userData);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Welcome to Your Career Journey</CardTitle>
          <CardDescription>
            Let's get to know you better to provide personalized career guidance
          </CardDescription>
          <Progress value={progress} className="mt-4" />
          <p className="text-sm text-muted-foreground">Step {step} of {totalSteps}</p>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <h3>Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="currentRole">Current Role/Position</Label>
                <Input
                  id="currentRole"
                  value={userData.currentRole}
                  onChange={(e) => setUserData(prev => ({ ...prev, currentRole: e.target.value }))}
                  placeholder="e.g., Software Developer, Student, etc."
                />
              </div>
              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Select value={userData.experience} onValueChange={(value) => setUserData(prev => ({ ...prev, experience: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="2-3">2-3 years</SelectItem>
                    <SelectItem value="4-6">4-6 years</SelectItem>
                    <SelectItem value="7-10">7-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3>Education & Skills</h3>
              <div>
                <Label htmlFor="education">Highest Education</Label>
                <Select value={userData.education} onValueChange={(value) => setUserData(prev => ({ ...prev, education: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Current Skills (select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {skillOptions.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={skill}
                        checked={userData.skills.includes(skill)}
                        onCheckedChange={() => handleSkillToggle(skill)}
                      />
                      <Label htmlFor={skill} className="text-sm">{skill}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3>Career Goals & Interests</h3>
              <div>
                <Label htmlFor="goals">What are your career goals?</Label>
                <Textarea
                  id="goals"
                  value={userData.goals}
                  onChange={(e) => setUserData(prev => ({ ...prev, goals: e.target.value }))}
                  placeholder="Describe your career aspirations, what you want to achieve..."
                  rows={4}
                />
              </div>
              <div>
                <Label>Industries of Interest</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {industryOptions.map((industry) => (
                    <div key={industry} className="flex items-center space-x-2">
                      <Checkbox
                        id={industry}
                        checked={userData.industries.includes(industry)}
                        onCheckedChange={() => handleIndustryToggle(industry)}
                      />
                      <Label htmlFor={industry} className="text-sm">{industry}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3>Timeline & Preferences</h3>
              <div>
                <Label htmlFor="timeline">When do you want to achieve your career goals?</Label>
                <Select value={userData.timeline} onValueChange={(value) => setUserData(prev => ({ ...prev, timeline: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3-months">Within 3 months</SelectItem>
                    <SelectItem value="6-months">Within 6 months</SelectItem>
                    <SelectItem value="1-year">Within 1 year</SelectItem>
                    <SelectItem value="2-years">Within 2 years</SelectItem>
                    <SelectItem value="flexible">I'm flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="mb-2">Summary</h4>
                <p className="text-sm text-muted-foreground">
                  Great! We'll create a personalized career plan for {userData.name} focusing on {userData.goals || 'your career goals'} in the {userData.industries.join(', ') || 'selected industries'} within {userData.timeline || 'your preferred timeline'}.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={prevStep} disabled={step === 1}>
              Previous
            </Button>
            <Button onClick={nextStep}>
              {step === totalSteps ? 'Complete Setup' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}