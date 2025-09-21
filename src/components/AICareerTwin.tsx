import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  User, 
  Target, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  Clock,
  Award,
  BookOpen,
  Briefcase,
  Star
} from 'lucide-react';

interface AICareerTwinProps {
  userData: any;
}

export function AICareerTwin({ userData }: AICareerTwinProps) {
  const [achievements, setAchievements] = useState([
    { id: 1, title: 'Profile Complete', description: 'Completed your career profile setup', date: 'Today', completed: true },
    { id: 2, title: 'First Skill Assessment', description: 'Completed initial skill gap analysis', date: 'Today', completed: true },
    { id: 3, title: 'Learning Path Started', description: 'Begin your React development journey', date: 'Pending', completed: false },
    { id: 4, title: 'Portfolio Project', description: 'Complete first portfolio project', date: 'In Progress', completed: false }
  ]);

  const skillProgress = [
    { skill: 'JavaScript', current: 85, target: 95, category: 'Technical' },
    { skill: 'React', current: userData.skills?.includes('React') ? 70 : 30, target: 85, category: 'Technical' },
    { skill: 'Node.js', current: userData.skills?.includes('Node.js') ? 60 : 0, target: 75, category: 'Technical' },
    { skill: 'Project Management', current: 40, target: 80, category: 'Soft Skills' },
    { skill: 'Communication', current: 75, target: 90, category: 'Soft Skills' },
    { skill: 'Leadership', current: 35, target: 70, category: 'Soft Skills' }
  ];

  const upcomingMilestones = [
    { 
      title: 'Complete React Advanced Course', 
      deadline: '2 weeks', 
      priority: 'High',
      progress: 65,
      description: 'Master hooks, context, and advanced patterns'
    },
    { 
      title: 'Build Portfolio Website', 
      deadline: '1 month', 
      priority: 'Medium',
      progress: 20,
      description: 'Showcase your projects and skills'
    },
    { 
      title: 'Obtain AWS Certification', 
      deadline: '3 months', 
      priority: 'Low',
      progress: 0,
      description: 'Cloud computing fundamentals certification'
    }
  ];

  const careerMetrics = {
    overallProgress: 68,
    skillsAcquired: userData.skills?.length || 0,
    targetSkills: 15,
    monthlyGrowth: '+12%',
    jobReadiness: 72,
    marketValue: '$95,000',
    experiencePoints: 2480,
    level: 'Intermediate Developer'
  };

  const recentActivity = [
    { action: 'Completed skill assessment', type: 'assessment', time: '2 hours ago' },
    { action: 'Started React learning path', type: 'learning', time: '1 day ago' },
    { action: 'Updated career goals', type: 'profile', time: '2 days ago' },
    { action: 'Connected with AI Counsellor', type: 'chat', time: '3 days ago' }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-white text-blue-600 text-xl">
                {userData.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl">{userData.name}'s Career Twin</CardTitle>
              <CardDescription className="text-blue-100">
                {careerMetrics.level} • {careerMetrics.experiencePoints} XP
              </CardDescription>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">{careerMetrics.monthlyGrowth} growth</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  <span className="text-sm">{careerMetrics.jobReadiness}% job ready</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl">Level 7</div>
              <div className="text-sm text-blue-100">Next: 520 XP</div>
              <Progress value={75} className="w-20 mt-1" />
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="dashboard" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl">{careerMetrics.overallProgress}%</div>
                    <p className="text-sm text-muted-foreground">Overall Progress</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl">{careerMetrics.skillsAcquired}/{careerMetrics.targetSkills}</div>
                    <p className="text-sm text-muted-foreground">Skills Acquired</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl">{careerMetrics.jobReadiness}%</div>
                    <p className="text-sm text-muted-foreground">Job Readiness</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl">{careerMetrics.marketValue}</div>
                    <p className="text-sm text-muted-foreground">Market Value</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Career Goals Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Primary Goal: {userData.goals || 'Senior Developer Role'}</span>
                        <span>72%</span>
                      </div>
                      <Progress value={72} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Timeline: {userData.timeline || 'Within 1 year'}</span>
                        <span>On Track</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Based on current progress, you're on track to achieve your goals within the desired timeline.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Skill Development Progress</CardTitle>
                  <CardDescription>Track your skill growth and identify areas for improvement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skillProgress.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span>{skill.skill}</span>
                            <Badge variant="outline" className="text-xs">{skill.category}</Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {skill.current}% / {skill.target}%
                          </span>
                        </div>
                        <div className="space-y-1">
                          <Progress value={skill.current} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Current</span>
                            <span>Target</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="milestones" className="space-y-4">
              <div className="space-y-4">
                {upcomingMilestones.map((milestone, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4>{milestone.title}</h4>
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={milestone.priority === 'High' ? 'destructive' : milestone.priority === 'Medium' ? 'default' : 'secondary'}>
                            {milestone.priority}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">Due: {milestone.deadline}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{milestone.progress}%</span>
                        </div>
                        <Progress value={milestone.progress} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                        <div className="p-2 rounded-full bg-primary/10">
                          {activity.type === 'assessment' && <Target className="h-4 w-4" />}
                          {activity.type === 'learning' && <BookOpen className="h-4 w-4" />}
                          {activity.type === 'profile' && <User className="h-4 w-4" />}
                          {activity.type === 'chat' && <Briefcase className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start gap-3">
                    <div className={`p-1 rounded-full ${achievement.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <CheckCircle2 className={`h-4 w-4 ${achievement.completed ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="h-4 w-4 mr-2" />
                Start New Course
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="h-4 w-4 mr-2" />
                Update Goals
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Learning
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Briefcase className="h-4 w-4 mr-2" />
                Find Jobs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}