import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Church,
  BookOpen,
  Coins,
  Users,
  Calendar,
  Trophy,
  CheckCircle,
  Circle,
  Flame
} from "lucide-react";
import islamicHeroBg from "@/assets/islamic-hero-bg.jpg";

interface PrayerStatus {
  name: string;
  completed: boolean;
  time: string;
}

const DAILY_PRAYERS: PrayerStatus[] = [
  { name: "Fajr", completed: true, time: "05:30" },
  { name: "Dhuhr", completed: true, time: "12:45" },
  { name: "Asr", completed: false, time: "15:30" },
  { name: "Maghrib", completed: false, time: "18:15" },
  { name: "Isha", completed: false, time: "19:45" },
];

const DAILY_HADITH = "The believer's shade on the Day of Resurrection will be his charity. - Ahmad";

export default function Dashboard() {
  const [prayers, setPrayers] = useState(DAILY_PRAYERS);
  const [quranStreak, setQuranStreak] = useState(7);
  const [zakatAmount, setZakatAmount] = useState(2850);

  const completedPrayers = prayers.filter(p => p.completed).length;
  const prayerProgress = (completedPrayers / prayers.length) * 100;

  const togglePrayer = (index: number) => {
    const newPrayers = [...prayers];
    newPrayers[index].completed = !newPrayers[index].completed;
    setPrayers(newPrayers);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Welcome Section */}
      <div 
        className="relative rounded-2xl overflow-hidden bg-gradient-primary p-8 text-white"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(59, 130, 246, 0.8)), url(${islamicHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Assalamu Alaikum, Ahmad! 🌙
          </h1>
          <p className="text-xl opacity-90 mb-6">
            May this day bring you closer to Allah and strengthen your family bonds
          </p>
          <div className="flex flex-wrap gap-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Trophy className="w-4 h-4 mr-2" />
              7-day Quran streak
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Church className="w-4 h-4 mr-2" />
              {completedPrayers}/5 prayers today
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Salah Tracker */}
        <Card className="shadow-card hover:shadow-worship transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Church className="w-5 h-5 text-primary" />
              Today's Salah
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {prayers.map((prayer, index) => (
                <div
                  key={prayer.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  onClick={() => togglePrayer(index)}
                >
                  <div className="flex items-center gap-3">
                    {prayer.completed ? (
                      <CheckCircle className="w-5 h-5 text-worship-complete animate-prayer-glow" />
                    ) : (
                      <Circle className="w-5 h-5 text-worship-pending" />
                    )}
                    <span className={prayer.completed ? "text-worship-complete font-medium" : "text-muted-foreground"}>
                      {prayer.name}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">{prayer.time}</span>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium">{completedPrayers}/5</span>
              </div>
              <Progress value={prayerProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Quran Streak */}
        <Card className="shadow-card hover:shadow-worship transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Quran Recitation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Flame className="w-8 h-8 text-islamic-gold animate-gentle-bounce" />
                <span className="text-3xl font-bold text-primary ml-2">{quranStreak}</span>
              </div>
              <p className="text-muted-foreground mb-4">Day streak</p>
              <Button variant="outline" className="w-full">
                Continue Reading
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">Pages today</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">127</p>
                <p className="text-sm text-muted-foreground">Total pages</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Zakat Summary */}
        <Card className="shadow-card hover:shadow-worship transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-primary" />
              Zakat Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">${zakatAmount.toLocaleString()}</p>
              <p className="text-muted-foreground mb-4">Due this year</p>
              <Button variant="outline" className="w-full mb-4">
                Calculate Zakat
              </Button>
            </div>
            <div className="space-y-2 pt-4 border-t border-border">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Cash & Savings</span>
                <span className="text-sm font-medium">$45,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Gold & Silver</span>
                <span className="text-sm font-medium">$12,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Investments</span>
                <span className="text-sm font-medium">$57,000</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Family Overview */}
        <Card className="shadow-card hover:shadow-worship transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Family Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-sm text-muted-foreground">Family members</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View Family Tree
            </Button>
            <div className="space-y-2 pt-4 border-t border-border">
              <p className="text-sm font-medium">Recent Activity</p>
              <p className="text-sm text-muted-foreground">• Fatima completed Quran reading</p>
              <p className="text-sm text-muted-foreground">• Omar added new assets</p>
              <p className="text-sm text-muted-foreground">• Family goal: $500 charity</p>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="shadow-card hover:shadow-worship transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/30">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div>
                  <p className="font-medium text-sm">Aqeeqah - Baby Maryam</p>
                  <p className="text-xs text-muted-foreground">Tomorrow, 3:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <div className="w-2 h-2 bg-accent-vivid rounded-full"></div>
                <div>
                  <p className="font-medium text-sm">Community Iftar</p>
                  <p className="text-xs text-muted-foreground">Friday, 6:30 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-islamic-gold-soft/30">
                <div className="w-2 h-2 bg-islamic-gold rounded-full"></div>
                <div>
                  <p className="font-medium text-sm">Nikah - Cousin Sarah</p>
                  <p className="text-xs text-muted-foreground">Next week</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Hadith */}
        <Card className="shadow-card hover:shadow-worship transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Daily Wisdom
            </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="text-center">
              <p className="text-muted-foreground italic mb-4">"{DAILY_HADITH}"</p>
              <Button variant="ghost" size="sm" className="text-primary">
                Share Hadith
              </Button>
            </blockquote>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}