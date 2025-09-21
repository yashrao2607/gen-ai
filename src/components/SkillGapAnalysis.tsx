import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { CheckCircle, XCircle, Target, TrendingUp, FileText, Upload } from 'lucide-react';

interface SkillGapAnalysisProps {
  userData: any;
}

export function SkillGapAnalysis({ userData }: SkillGapAnalysisProps) {
  const [selectedRole, setSelectedRole] = useState('');
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Mock job roles and their required skills
  const jobRoles = {
    'Senior Software Developer': {
      required: ['JavaScript', 'React', 'Node.js', 'AWS', 'Git', 'Testing', 'System Design'],
      preferred: ['TypeScript', 'Docker', 'Kubernetes', 'CI/CD', 'Microservices'],
      salary: '$95,000 - $130,000',
      growth: '+12% annually'
    },
    'Data Analyst': {
      required: ['Python', 'SQL', 'Excel', 'Data Visualization', 'Statistics'],
      preferred: ['Tableau', 'Power BI', 'R', 'Machine Learning', 'Big Data'],
      salary: '$70,000 - $95,000',
      growth: '+25% annually'
    },
    'Product Manager': {
      required: ['Product Strategy', 'Market Research', 'Analytics', 'Communication', 'Project Management'],
      preferred: ['Agile', 'Scrum', 'User Research', 'A/B Testing', 'Roadmapping'],
      salary: '$100,000 - $140,000',
      growth: '+15% annually'
    },
    'UI/UX Designer': {
      required: ['Design', 'Figma', 'Prototyping', 'User Research', 'Usability Testing'],
      preferred: ['Adobe Creative Suite', 'CSS', 'Animation', 'Design Systems', 'Accessibility'],
      salary: '$75,000 - $110,000',
      growth: '+18% annually'
    }
  };

  const analyzeSkillGap = (roleKey: string) => {
    const role = jobRoles[roleKey as keyof typeof jobRoles];
    const userSkills = userData.skills || [];
    
    const hasRequired = role.required.filter(skill => userSkills.includes(skill));
    const missingRequired = role.required.filter(skill => !userSkills.includes(skill));
    const hasPreferred = role.preferred.filter(skill => userSkills.includes(skill));
    const missingPreferred = role.preferred.filter(skill => !userSkills.includes(skill));

    return {
      role: roleKey,
      hasRequired,
      missingRequired,
      hasPreferred,
      missingPreferred,
      readinessScore: Math.round((hasRequired.length / role.required.length) * 100),
      ...role
    };
  };

  const handleAnalyze = (roleKey: string) => {
    setSelectedRole(roleKey);
    setAnalysisComplete(true);
  };

  const analysis = selectedRole ? analyzeSkillGap(selectedRole) : null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            AI-Powered Skill Gap Analysis
          </CardTitle>
          <CardDescription>
            Compare your skills with job requirements and get personalized recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="roles" className="space-y-4">
            <TabsList>
              <TabsTrigger value="roles">Role Analysis</TabsTrigger>
              <TabsTrigger value="resume">Resume Upload</TabsTrigger>
            </TabsList>
            
            <TabsContent value="roles" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(jobRoles).map(([roleKey, role]) => (
                  <Card key={roleKey} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{roleKey}</CardTitle>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{role.salary}</span>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {role.growth}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm">Required Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {role.required.slice(0, 4).map(skill => (
                            <Badge 
                              key={skill} 
                              variant={userData.skills?.includes(skill) ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {role.required.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{role.required.length - 4} more
                            </Badge>
                          )}
                        </div>
                        <Button 
                          onClick={() => handleAnalyze(roleKey)}
                          className="w-full mt-3"
                          variant="outline"
                        >
                          Analyze Fit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="resume" className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg mb-2">Upload Your Resume</h3>
                <p className="text-muted-foreground mb-4">
                  Upload your resume for automated skill extraction and gap analysis
                </p>
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Supports PDF, DOC, DOCX files up to 5MB
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {analysisComplete && analysis && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results: {analysis.role}</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{analysis.readinessScore}%</span>
                <span className="text-sm text-muted-foreground">Job Ready</span>
              </div>
              <Progress value={analysis.readinessScore} className="flex-1" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Skills You Have ({analysis.hasRequired.length}/{analysis.required.length} required)
                </h4>
                <div className="space-y-2">
                  {analysis.hasRequired.map(skill => (
                    <div key={skill} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <Badge variant="default" className="text-xs">{skill}</Badge>
                    </div>
                  ))}
                  {analysis.hasPreferred.map(skill => (
                    <div key={skill} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-blue-500" />
                      <Badge variant="secondary" className="text-xs">{skill}</Badge>
                      <span className="text-xs text-muted-foreground">(preferred)</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="flex items-center gap-2 mb-3">
                  <XCircle className="h-4 w-4 text-red-500" />
                  Skills to Develop
                </h4>
                <div className="space-y-2">
                  {analysis.missingRequired.map(skill => (
                    <div key={skill} className="flex items-center gap-2">
                      <XCircle className="h-3 w-3 text-red-500" />
                      <Badge variant="destructive" className="text-xs">{skill}</Badge>
                      <span className="text-xs text-muted-foreground">(required)</span>
                    </div>
                  ))}
                  {analysis.missingPreferred.slice(0, 3).map(skill => (
                    <div key={skill} className="flex items-center gap-2">
                      <XCircle className="h-3 w-3 text-orange-500" />
                      <Badge variant="outline" className="text-xs">{skill}</Badge>
                      <span className="text-xs text-muted-foreground">(preferred)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Alert>
              <Target className="h-4 w-4" />
              <AlertDescription>
                <strong>Recommendation:</strong> Focus on developing {analysis.missingRequired.slice(0, 2).join(' and ')} first. 
                These are critical requirements for this role. With these skills, you'll increase your job readiness to {Math.min(100, analysis.readinessScore + 30)}%.
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button>
                Create Learning Path
              </Button>
              <Button variant="outline">
                Find Similar Jobs
              </Button>
              <Button variant="outline">
                Save Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}