import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Globe,
  Trophy,
  Users,
  Heart,
  BookOpen,
  Church,
  Target,
  Calendar,
  Bell,
  Gift,
  Star,
  Award,
  TrendingUp,
  MessageCircle,
  Crown
} from "lucide-react";

interface LeaderboardEntry {
  id: string;
  name: string;
  family: string;
  quranPages: number;
  prayersCompleted: number;
  dhikrCount: number;
  totalScore: number;
  rank: number;
  avatar?: string;
}

interface CommunityGoal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  participants: number;
  deadline: string;
  category: 'charity' | 'worship' | 'community';
}

interface Event {
  id: string;
  title: string;
  type: 'aqeeqah' | 'nikah' | 'janazah' | 'illness' | 'community';
  date: string;
  family: string;
  description: string;
  status: 'upcoming' | 'active' | 'completed';
}

export default function Community() {
  const [leaderboard] = useState<LeaderboardEntry[]>([
    {
      id: '1',
      name: 'Ahmad Ibn Abdullah',
      family: 'Abdullah Family',
      quranPages: 127,
      prayersCompleted: 148,
      dhikrCount: 2850,
      totalScore: 3125,
      rank: 1
    },
    {
      id: '2',
      name: 'Fatima bint Ali',
      family: 'Ali Family',
      quranPages: 156,
      prayersCompleted: 150,
      dhikrCount: 3200,
      totalScore: 3506,
      rank: 2
    },
    {
      id: '3',
      name: 'Omar Al-Rashid',
      family: 'Al-Rashid Family',
      quranPages: 98,
      prayersCompleted: 145,
      dhikrCount: 2100,
      totalScore: 2343,
      rank: 3
    },
    {
      id: '4',
      name: 'Khadija bint Omar',
      family: 'Omar Family',
      quranPages: 89,
      prayersCompleted: 142,
      dhikrCount: 1850,
      totalScore: 2081,
      rank: 4
    },
    {
      id: '5',
      name: 'Yusuf Ahmad',
      family: 'Ahmad Family',
      quranPages: 76,
      prayersCompleted: 138,
      dhikrCount: 1650,
      totalScore: 1864,
      rank: 5
    }
  ]);

  const [communityGoals] = useState<CommunityGoal[]>([
    {
      id: '1',
      title: 'Build New Masjid Wing',
      description: 'Expand our community masjid to accommodate growing congregation',
      targetAmount: 50000,
      currentAmount: 32500,
      participants: 45,
      deadline: '2024-12-31',
      category: 'charity'
    },
    {
      id: '2',
      title: 'Community Quran Completion',
      description: 'Complete 1000 pages of Quran recitation as a community',
      targetAmount: 1000,
      currentAmount: 743,
      participants: 28,
      deadline: '2024-11-30',
      category: 'worship'
    },
    {
      id: '3',
      title: 'Orphan Support Program',
      description: 'Provide monthly support for orphaned children in our community',
      targetAmount: 15000,
      currentAmount: 8750,
      participants: 23,
      deadline: '2024-10-15',
      category: 'charity'
    }
  ]);

  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Aqeeqah for Baby Maryam',
      type: 'aqeeqah',
      date: '2024-09-17',
      family: 'Ahmad Family',
      description: 'Celebrating the birth of Maryam with traditional Aqeeqah ceremony',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Community Iftar',
      type: 'community',
      date: '2024-09-20',
      family: 'Community Center',
      description: 'Monthly community gathering for shared iftar and prayers',
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Nikah - Omar & Aisha',
      type: 'nikah',
      date: '2024-09-25',
      family: 'Al-Rashid Family',
      description: 'Wedding celebration for Omar and Aisha',
      status: 'upcoming'
    },
    {
      id: '4',
      title: 'Visit Brother Abdullah',
      type: 'illness',
      date: '2024-09-18',
      family: 'Abdullah Family',
      description: 'Support visit for recovering family member',
      status: 'active'
    }
  ]);

  const getEventIcon = (type: Event['type']) => {
    switch (type) {
      case 'aqeeqah': return Gift;
      case 'nikah': return Heart;
      case 'janazah': return Church;
      case 'illness': return Heart;
      case 'community': return Users;
      default: return Calendar;
    }
  };

  const getEventColor = (type: Event['type']) => {
    switch (type) {
      case 'aqeeqah': return 'bg-islamic-gold-soft text-islamic-gold';
      case 'nikah': return 'bg-primary-soft text-primary';
      case 'janazah': return 'bg-muted text-muted-foreground';
      case 'illness': return 'bg-accent text-accent-foreground';
      case 'community': return 'bg-worship-complete text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getCategoryIcon = (category: CommunityGoal['category']) => {
    switch (category) {
      case 'charity': return Heart;
      case 'worship': return Church;
      case 'community': return Users;
      default: return Target;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Community Hub</h1>
        <p className="text-lg text-muted-foreground">Connect, compete, and grow together in faith</p>
        
        {/* Community Stats */}
        <div className="flex flex-wrap justify-center gap-4">
          <Badge variant="secondary" className="bg-primary-soft text-primary px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            156 Active Members
          </Badge>
          <Badge variant="secondary" className="bg-islamic-gold-soft text-islamic-gold px-4 py-2">
            <Heart className="w-4 h-4 mr-2" />
            $47,250 Raised This Month
          </Badge>
          <Badge variant="secondary" className="bg-worship-complete text-white px-4 py-2">
            <BookOpen className="w-4 h-4 mr-2" />
            3,847 Quran Pages Read
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leaderboard */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-islamic-gold" />
                <span>Community Leaderboard</span>
              </div>
              <Badge variant="secondary">This Month</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                    index === 0 
                      ? 'bg-gradient-islamic text-white shadow-worship' 
                      : index < 3 
                        ? 'bg-primary-soft text-primary' 
                        : 'bg-gradient-card hover:shadow-soft'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0 
                        ? 'bg-white/20 text-white' 
                        : index < 3 
                          ? 'bg-primary text-white' 
                          : 'bg-primary text-white'
                    }`}>
                      {index === 0 ? <Crown className="w-5 h-5" /> : entry.rank}
                    </div>
                    <div>
                      <p className="font-semibold">{entry.name}</p>
                      <p className={`text-sm ${
                        index === 0 ? 'text-white/80' : 'text-muted-foreground'
                      }`}>
                        {entry.family}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="font-bold">{entry.quranPages}</p>
                      <p className={`text-xs ${
                        index === 0 ? 'text-white/80' : 'text-muted-foreground'
                      }`}>
                        Quran
                      </p>
                    </div>
                    <div>
                      <p className="font-bold">{entry.prayersCompleted}</p>
                      <p className={`text-xs ${
                        index === 0 ? 'text-white/80' : 'text-muted-foreground'
                      }`}>
                        Prayers
                      </p>
                    </div>
                    <div>
                      <p className="font-bold">{entry.dhikrCount}</p>
                      <p className={`text-xs ${
                        index === 0 ? 'text-white/80' : 'text-muted-foreground'
                      }`}>
                        Dhikr
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold">{entry.totalScore.toLocaleString()}</p>
                    <p className={`text-sm ${
                      index === 0 ? 'text-white/80' : 'text-muted-foreground'
                    }`}>
                      Total Score
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Your current rank: #12</p>
                <Button variant="outline" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Full Rankings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats & Actions */}
        <div className="space-y-6">
          {/* Personal Stats */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Star className="w-5 h-5 text-islamic-gold" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">127</p>
                  <p className="text-sm text-muted-foreground">Quran Pages</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">4.8</p>
                  <p className="text-sm text-muted-foreground">Avg Prayers</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Monthly Goal</span>
                  <span>78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <Button variant="outline" className="w-full" size="sm">
                <Target className="w-4 h-4 mr-2" />
                Set New Goals
              </Button>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award className="w-5 h-5 text-islamic-gold" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-islamic-gold-soft">
                <Trophy className="w-5 h-5 text-islamic-gold" />
                <div>
                  <p className="text-sm font-medium">Consistent Worshipper</p>
                  <p className="text-xs text-muted-foreground">5 days streak</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-primary-soft">
                <BookOpen className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Quran Lover</p>
                  <p className="text-xs text-muted-foreground">100+ pages read</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-worship-complete/10">
                <Heart className="w-5 h-5 text-worship-complete" />
                <div>
                  <p className="text-sm font-medium">Generous Giver</p>
                  <p className="text-xs text-muted-foreground">$500+ donated</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Community Goals */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Community Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {communityGoals.map((goal) => {
              const IconComponent = getCategoryIcon(goal.category);
              const progress = (goal.currentAmount / goal.targetAmount) * 100;
              return (
                <div key={goal.id} className="space-y-4 p-4 rounded-xl bg-gradient-card">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-5 h-5 text-primary" />
                      <Badge variant="outline" className="text-xs">
                        {goal.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {goal.participants} participants
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">{goal.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium">
                        {goal.category === 'charity' ? '$' : ''}{goal.currentAmount.toLocaleString()} / 
                        {goal.category === 'charity' ? '$' : ''}{goal.targetAmount.toLocaleString()}
                        {goal.category === 'worship' ? ' pages' : ''}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Deadline: {new Date(goal.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    Contribute
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Community Events */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              <span>Upcoming Events</span>
            </div>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((event) => {
              const IconComponent = getEventIcon(event.type);
              return (
                <div
                  key={event.id}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gradient-card hover:shadow-soft transition-all duration-300"
                >
                  <div className={`p-2 rounded-lg ${getEventColor(event.type)}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{event.title}</h3>
                      <Badge 
                        variant={event.status === 'upcoming' ? 'default' : event.status === 'active' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {event.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{event.family}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {events.filter(e => e.status === 'upcoming').length} upcoming events
              </p>
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Community Chat
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}