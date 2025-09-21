import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  TrendingUp, 
  Target, 
  BookOpen, 
  Briefcase, 
  Calendar,
  ArrowRight,
  Star,
  CheckCircle2
} from 'lucide-react';

interface DashboardProps {
  userData: any;
  onViewChange: (view: string) => void;
}

export function Dashboard({ userData, onViewChange }: DashboardProps) {
  const todaysTasks = [
    { id: 1, title: 'Complete React Hooks Module', type: 'learning', urgency: 'high', completed: false },
    { id: 2, title: 'Practice JavaScript Interview Questions', type: 'practice', urgency: 'medium', completed: false },
    { id: 3, title: 'Update LinkedIn Profile', type: 'networking', urgency: 'low', completed: true },
    { id: 4, title: 'Review Job Applications', type: 'job-search', urgency: 'high', completed: false }
  ];

  const quickStats = {
    careerScore: 72,
    skillsProgress: 68,
    jobReadiness: 75,
    weeklyGrowth: '+8%'
  };

  const recommendations = [
    {
      title: 'Skill Gap Alert: Cloud Computing',
      description: 'Add AWS or Azure skills to increase your job match rate by 35%',
      action: 'Start Learning',
      priority: 'high'
    },
    {
      title: 'Job Market Opportunity',
      description: '127 new jobs match your profile this week in your area',
      action: 'View Jobs',
      priority: 'medium'
    },
    {
      title: 'Portfolio Enhancement',
      description: 'Add 2 more projects to showcase your React skills',
      action: 'Get Ideas',
      priority: 'medium'
    }
  ];

  const recentActivity = [
    { action: 'Completed skill assessment for JavaScript', time: '2 hours ago' },
    { action: 'Started "Advanced React Patterns" course', time: '1 day ago' },
    { action: 'Connected with 3 industry professionals', time: '2 days ago' },
    { action: 'Applied to Senior Developer position at TechCorp', time: '3 days ago' }
  ];

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Welcome back, {userData.name}! 👋</h1>
        <p className="text-muted-foreground">
          Here's your career progress and today's recommendations to accelerate your growth.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl">{quickStats.careerScore}%</p>
                <p className="text-sm text-muted-foreground">Career Score</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-2">
              <Progress value={quickStats.careerScore} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl">{quickStats.skillsProgress}%</p>
                <p className="text-sm text-muted-foreground">Skills Progress</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-2">
              <Progress value={quickStats.skillsProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl">{quickStats.jobReadiness}%</p>
                <p className="text-sm text-muted-foreground">Job Readiness</p>
              </div>
              <Briefcase className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-2">
              <Progress value={quickStats.jobReadiness} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl">{quickStats.weeklyGrowth}</p>
                <p className="text-sm text-muted-foreground">Weekly Growth</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending up
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Focus
                </span>
                <Badge variant="outline">{todaysTasks.filter(task => !task.completed).length} remaining</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todaysTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      task.completed ? 'bg-green-50 border-green-200' : 'bg-white'
                    }`}
                  >
                    <div className={`p-1 rounded-full ${
                      task.completed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <CheckCircle2 className={`h-4 w-4 ${
                        task.completed ? 'text-green-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant={task.urgency === 'high' ? 'destructive' : task.urgency === 'medium' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {task.urgency}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {task.type.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                    {!task.completed && (
                      <Button size="sm" variant="outline">
                        Start
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                AI Recommendations
              </CardTitle>
              <CardDescription>
                Personalized suggestions to accelerate your career growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className={`p-2 rounded-full ${
                      rec.priority === 'high' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      <Target className={`h-4 w-4 ${
                        rec.priority === 'high' ? 'text-red-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                      <Button size="sm" variant="outline">
                        {rec.action}
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                className="w-full justify-between" 
                variant="outline"
                onClick={() => onViewChange('counsellor')}
              >
                Chat with AI Counsellor
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                className="w-full justify-between" 
                variant="outline"
                onClick={() => onViewChange('skills')}
              >
                Analyze Skill Gaps
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                className="w-full justify-between" 
                variant="outline"
                onClick={() => onViewChange('explorer')}
              >
                Explore Career Paths
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                className="w-full justify-between" 
                variant="outline"
                onClick={() => onViewChange('twin')}
              >
                View Career Twin
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="text-sm">
                    <p>{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Goal Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Current Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm mb-2">{userData.goals || 'Become a Senior Developer'}</p>
                  <Progress value={72} />
                  <p className="text-xs text-muted-foreground mt-1">72% complete</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Timeline: {userData.timeline || 'Within 1 year'}</p>
                  <p>Status: On track 🎯</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}