import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Code, 
  BarChart, 
  Users, 
  Palette, 
  Shield, 
  Heart, 
  DollarSign, 
  GraduationCap,
  ArrowRight,
  Star,
  TrendingUp
} from 'lucide-react';

interface CareerExplorerProps {
  userData: any;
}

export function CareerExplorer({ userData }: CareerExplorerProps) {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedPath, setSelectedPath] = useState('');

  const industries = [
    {
      name: 'Technology',
      icon: Code,
      growth: '+15%',
      avgSalary: '$95k',
      description: 'Software development, AI, cybersecurity, and emerging tech',
      color: 'bg-blue-500',
      roles: ['Software Developer', 'Data Scientist', 'DevOps Engineer', 'Product Manager']
    },
    {
      name: 'Finance',
      icon: DollarSign,
      growth: '+8%',
      avgSalary: '$85k',
      description: 'Banking, investment, fintech, and financial analysis',
      color: 'bg-green-500',
      roles: ['Financial Analyst', 'Investment Banker', 'Risk Manager', 'Fintech Developer']
    },
    {
      name: 'Healthcare',
      icon: Heart,
      growth: '+22%',
      avgSalary: '$75k',
      description: 'Medical technology, healthcare administration, and patient care',
      color: 'bg-red-500',
      roles: ['Healthcare Admin', 'Medical Technician', 'Health Data Analyst', 'Telemedicine Specialist']
    },
    {
      name: 'Marketing',
      icon: Users,
      growth: '+12%',
      avgSalary: '$65k',
      description: 'Digital marketing, brand management, and customer engagement',
      color: 'bg-purple-500',
      roles: ['Digital Marketer', 'Brand Manager', 'Content Strategist', 'Marketing Analyst']
    },
    {
      name: 'Design',
      icon: Palette,
      growth: '+18%',
      avgSalary: '$70k',
      description: 'UI/UX design, graphic design, and creative direction',
      color: 'bg-pink-500',
      roles: ['UX Designer', 'Graphic Designer', 'Creative Director', 'Product Designer']
    },
    {
      name: 'Education',
      icon: GraduationCap,
      growth: '+6%',
      avgSalary: '$55k',
      description: 'EdTech, training, curriculum development, and online learning',
      color: 'bg-orange-500',
      roles: ['Instructional Designer', 'EdTech Developer', 'Training Manager', 'Curriculum Specialist']
    }
  ];

  const careerPaths = {
    'Software Developer': {
      current: userData.currentRole,
      timeline: '12-18 months',
      difficulty: 'Medium',
      steps: [
        { title: 'Foundation', skills: ['JavaScript', 'HTML/CSS', 'Git'], duration: '2-3 months', completed: true },
        { title: 'Frontend Framework', skills: ['React', 'State Management'], duration: '3-4 months', completed: userData.skills?.includes('React') },
        { title: 'Backend Development', skills: ['Node.js', 'Databases', 'APIs'], duration: '4-5 months', completed: false },
        { title: 'Advanced Topics', skills: ['Testing', 'DevOps', 'System Design'], duration: '4-6 months', completed: false }
      ],
      salaryProgression: ['$60k', '$75k', '$95k', '$120k'],
      matchScore: 85
    },
    'Data Scientist': {
      current: userData.currentRole,
      timeline: '18-24 months',
      difficulty: 'Hard',
      steps: [
        { title: 'Programming Basics', skills: ['Python', 'SQL', 'Statistics'], duration: '3-4 months', completed: userData.skills?.includes('Python') },
        { title: 'Data Analysis', skills: ['Pandas', 'NumPy', 'Data Visualization'], duration: '4-5 months', completed: false },
        { title: 'Machine Learning', skills: ['Scikit-learn', 'Model Selection', 'Evaluation'], duration: '5-6 months', completed: false },
        { title: 'Specialization', skills: ['Deep Learning', 'Big Data', 'MLOps'], duration: '6-8 months', completed: false }
      ],
      salaryProgression: ['$70k', '$85k', '$110k', '$140k'],
      matchScore: 62
    },
    'Product Manager': {
      current: userData.currentRole,
      timeline: '8-12 months',
      difficulty: 'Medium',
      steps: [
        { title: 'Product Fundamentals', skills: ['Product Strategy', 'Market Research'], duration: '2-3 months', completed: false },
        { title: 'Analytics & Data', skills: ['Data Analysis', 'A/B Testing', 'Metrics'], duration: '2-3 months', completed: false },
        { title: 'Technical Skills', skills: ['SQL', 'Basic Coding', 'APIs'], duration: '3-4 months', completed: userData.skills?.includes('SQL') },
        { title: 'Leadership', skills: ['Team Management', 'Stakeholder Communication'], duration: '2-3 months', completed: false }
      ],
      salaryProgression: ['$80k', '$100k', '$125k', '$150k'],
      matchScore: 78
    }
  };

  const getCompletionPercentage = (path: any) => {
    const completed = path.steps.filter((step: any) => step.completed).length;
    return Math.round((completed / path.steps.length) * 100);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Gamified Career Explorer
          </CardTitle>
          <CardDescription>
            Discover career paths, explore industries, and visualize your journey
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="industries" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="industries">Industry Map</TabsTrigger>
          <TabsTrigger value="paths">Career Paths</TabsTrigger>
          <TabsTrigger value="roadmap">Your Roadmap</TabsTrigger>
        </TabsList>

        <TabsContent value="industries" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((industry) => {
              const Icon = industry.icon;
              const isUserInterest = userData.industries?.includes(industry.name);
              
              return (
                <Card 
                  key={industry.name} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedIndustry === industry.name ? 'ring-2 ring-primary' : ''
                  } ${isUserInterest ? 'border-primary' : ''}`}
                  onClick={() => setSelectedIndustry(industry.name)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-lg ${industry.color} text-white`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      {isUserInterest && (
                        <Badge variant="default" className="text-xs">Your Interest</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{industry.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {industry.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1 text-sm">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-green-500">{industry.growth}</span>
                      </div>
                      <span className="text-sm">{industry.avgSalary} avg</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Popular Roles:</p>
                      <div className="flex flex-wrap gap-1">
                        {industry.roles.slice(0, 2).map(role => (
                          <Badge key={role} variant="outline" className="text-xs">
                            {role}
                          </Badge>
                        ))}
                        <Badge variant="secondary" className="text-xs">
                          +{industry.roles.length - 2} more
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="paths" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(careerPaths).map(([pathName, path]) => (
              <Card 
                key={pathName}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedPath === pathName ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedPath(pathName)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{pathName}</CardTitle>
                    <Badge 
                      variant={path.matchScore > 80 ? "default" : path.matchScore > 60 ? "secondary" : "outline"}
                    >
                      {path.matchScore}% match
                    </Badge>
                  </div>
                  <CardDescription>
                    From {path.current} • {path.timeline} • {path.difficulty} difficulty
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{getCompletionPercentage(path)}%</span>
                      </div>
                      <Progress value={getCompletionPercentage(path)} />
                    </div>
                    
                    <div>
                      <p className="text-sm mb-2">Learning Path:</p>
                      <div className="space-y-2">
                        {path.steps.map((step, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${
                              step.completed ? 'bg-green-500' : 'bg-gray-200'
                            }`} />
                            <span className="text-sm">{step.title}</span>
                            <span className="text-xs text-muted-foreground">({step.duration})</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm mb-1">Salary Progression:</p>
                      <div className="flex items-center gap-1 text-sm">
                        {path.salaryProgression.map((salary, index) => (
                          <div key={index} className="flex items-center">
                            <span className={index === 0 ? 'text-muted-foreground' : ''}>{salary}</span>
                            {index < path.salaryProgression.length - 1 && (
                              <ArrowRight className="h-3 w-3 mx-1 text-muted-foreground" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full" variant="outline">
                      Start This Path
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-4">
          {selectedPath && careerPaths[selectedPath as keyof typeof careerPaths] ? (
            <Card>
              <CardHeader>
                <CardTitle>Your Personalized Roadmap: {selectedPath}</CardTitle>
                <CardDescription>
                  Based on your current skills and goals, here's your step-by-step journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {careerPaths[selectedPath as keyof typeof careerPaths].steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                          step.completed 
                            ? 'bg-green-500 text-white' 
                            : index === careerPaths[selectedPath as keyof typeof careerPaths].steps.findIndex(s => !s.completed)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-gray-200 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        {index < careerPaths[selectedPath as keyof typeof careerPaths].steps.length - 1 && (
                          <div className="w-px h-12 bg-gray-200 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={step.completed ? 'text-green-600' : ''}>{step.title}</h4>
                          <Badge variant={step.completed ? "default" : "outline"}>
                            {step.duration}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {step.skills.map(skill => (
                            <Badge 
                              key={skill} 
                              variant={userData.skills?.includes(skill) ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        {!step.completed && (
                          <Button size="sm" variant="outline">
                            Start Learning
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Select a career path from the "Career Paths" tab to see your personalized roadmap
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}