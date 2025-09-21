import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Church,
  BookOpen,
  Heart,
  Plus,
  Minus,
  CheckCircle,
  Circle,
  Clock,
  Calendar,
  Flame,
  Award
} from "lucide-react";

interface Prayer {
  name: string;
  arabicName: string;
  completed: boolean;
  time: string;
}

interface DhikrItem {
  name: string;
  arabicText: string;
  count: number;
  target: number;
}

export default function Worship() {
  const [prayers, setPrayers] = useState<Prayer[]>([
    { name: "Fajr", arabicName: "الفجر", completed: true, time: "05:30" },
    { name: "Dhuhr", arabicName: "الظهر", completed: true, time: "12:45" },
    { name: "Asr", arabicName: "العصر", completed: false, time: "15:30" },
    { name: "Maghrib", arabicName: "المغرب", completed: false, time: "18:15" },
    { name: "Isha", arabicName: "العشاء", completed: false, time: "19:45" },
  ]);

  const [dhikrList, setDhikrList] = useState<DhikrItem[]>([
    { name: "SubhanAllah", arabicText: "سبحان الله", count: 23, target: 33 },
    { name: "Alhamdulillah", arabicText: "الحمد لله", count: 15, target: 33 },
    { name: "Allahu Akbar", arabicText: "الله أكبر", count: 8, target: 33 },
  ]);

  const [quranPages, setQuranPages] = useState(3);
  const [quranStreak, setQuranStreak] = useState(7);

  const completedPrayers = prayers.filter(p => p.completed).length;
  const prayerProgress = (completedPrayers / prayers.length) * 100;

  const togglePrayer = (index: number) => {
    const newPrayers = [...prayers];
    newPrayers[index].completed = !newPrayers[index].completed;
    setPrayers(newPrayers);
  };

  const updateDhikr = (index: number, increment: boolean) => {
    const newDhikr = [...dhikrList];
    if (increment) {
      newDhikr[index].count = Math.min(newDhikr[index].count + 1, newDhikr[index].target);
    } else {
      newDhikr[index].count = Math.max(newDhikr[index].count - 1, 0);
    }
    setDhikrList(newDhikr);
  };

  const totalDhikrProgress = dhikrList.reduce((sum, dhikr) => sum + dhikr.count, 0);
  const totalDhikrTarget = dhikrList.reduce((sum, dhikr) => sum + dhikr.target, 0);
  const dhikrProgress = (totalDhikrProgress / totalDhikrTarget) * 100;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Worship Tracker</h1>
        <p className="text-lg text-muted-foreground">Track your daily spiritual journey</p>
        
        {/* Achievement Badges */}
        <div className="flex flex-wrap justify-center gap-3">
          <Badge variant="secondary" className="bg-primary-soft text-primary">
            <Award className="w-4 h-4 mr-2" />
            Consistent Worshipper
          </Badge>
          <Badge variant="secondary" className="bg-islamic-gold-soft text-islamic-gold">
            <Flame className="w-4 h-4 mr-2" />
            7-Day Streak
          </Badge>
          <Badge variant="secondary" className="bg-accent text-accent-foreground">
            <BookOpen className="w-4 h-4 mr-2" />
            Quran Lover
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Salah Tracker */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Church className="w-6 h-6 text-primary" />
                <span>Daily Salah</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{completedPrayers}/5</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {prayers.map((prayer, index) => (
                <div
                  key={prayer.name}
                  className="flex items-center justify-between p-4 rounded-xl bg-gradient-card hover:shadow-soft transition-all duration-300 cursor-pointer"
                  onClick={() => togglePrayer(index)}
                >
                  <div className="flex items-center gap-4">
                    {prayer.completed ? (
                      <CheckCircle className="w-6 h-6 text-worship-complete animate-prayer-glow" />
                    ) : (
                      <Circle className="w-6 h-6 text-worship-pending" />
                    )}
                    <div>
                      <p className={`font-medium ${prayer.completed ? 'text-worship-complete' : 'text-foreground'}`}>
                        {prayer.name}
                      </p>
                      <p className="text-sm text-muted-foreground">{prayer.arabicName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{prayer.time}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Daily Progress</span>
                <span className="text-sm font-medium">{Math.round(prayerProgress)}%</span>
              </div>
              <Progress value={prayerProgress} className="h-3" />
            </div>

            {/* Weekly Overview */}
            <div className="pt-4 border-t border-border">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                This Week
              </h4>
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">{day}</p>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      index < 4 ? 'bg-worship-complete text-white' : 
                      index === 4 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                    }`}>
                      {index < 4 ? '5' : index === 4 ? completedPrayers : '-'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quran Recitation */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary" />
                <span>Quran Recitation</span>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <Flame className="w-5 h-5 text-islamic-gold" />
                  <span className="text-2xl font-bold text-primary">{quranStreak}</span>
                </div>
                <p className="text-sm text-muted-foreground">Day streak</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuranPages(Math.max(0, quranPages - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{quranPages}</p>
                  <p className="text-sm text-muted-foreground">Pages today</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuranPages(quranPages + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <Button className="w-full bg-gradient-primary hover:opacity-90">
                Start Reading Session
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-foreground">127</p>
                <p className="text-sm text-muted-foreground">Total pages</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-foreground">21%</p>
                <p className="text-sm text-muted-foreground">Progress</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Monthly Goal: 90 pages</p>
              <Progress value={21} className="h-2" />
              <p className="text-xs text-muted-foreground">69 pages remaining</p>
            </div>
          </CardContent>
        </Card>

        {/* Dhikr Counter */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-primary" />
                <span>Dhikr Counter</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{Math.round(dhikrProgress)}%</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dhikrList.map((dhikr, index) => (
                <div key={dhikr.name} className="space-y-4">
                  <div className="text-center">
                    <h3 className="font-medium text-foreground">{dhikr.name}</h3>
                    <p className="text-2xl font-bold text-primary my-2" dir="rtl">{dhikr.arabicText}</p>
                    <p className="text-3xl font-bold text-primary">{dhikr.count}/{dhikr.target}</p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateDhikr(index, false)}
                      disabled={dhikr.count === 0}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      size="lg"
                      className="bg-gradient-primary hover:opacity-90 text-2xl font-bold px-8"
                      onClick={() => updateDhikr(index, true)}
                      disabled={dhikr.count >= dhikr.target}
                    >
                      +
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateDhikr(index, true)}
                      disabled={dhikr.count >= dhikr.target}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-1">
                    <Progress 
                      value={(dhikr.count / dhikr.target) * 100} 
                      className="h-2"
                    />
                    <p className="text-xs text-center text-muted-foreground">
                      {dhikr.target - dhikr.count} remaining
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Overall Progress</span>
                <span className="text-sm font-medium">{totalDhikrProgress}/{totalDhikrTarget}</span>
              </div>
              <Progress value={dhikrProgress} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}