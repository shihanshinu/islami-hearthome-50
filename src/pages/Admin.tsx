import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Settings,
  Users,
  DollarSign,
  Activity,
  Bell,
  Shield,
  Database,
  BarChart3,
  UserCheck,
  UserX,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download
} from "lucide-react";

interface FamilyRequest {
  id: string;
  familyName: string;
  headOfFamily: string;
  email: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  members: number;
  reason: string;
}

interface SystemStats {
  totalFamilies: number;
  activeFamilies: number;
  totalMembers: number;
  totalAssets: number;
  totalZakat: number;
  monthlyGrowth: number;
}

export default function Admin() {
  const [familyRequests, setFamilyRequests] = useState<FamilyRequest[]>([
    {
      id: '1',
      familyName: 'Al-Hassan Family',
      headOfFamily: 'Mohamed Al-Hassan',
      email: 'mohamed.hassan@email.com',
      requestDate: '2024-09-15',
      status: 'pending',
      members: 6,
      reason: 'New family moving to the community'
    },
    {
      id: '2',
      familyName: 'Al-Zahra Family',
      headOfFamily: 'Fatima Al-Zahra',
      email: 'fatima.zahra@email.com',
      requestDate: '2024-09-14',
      status: 'pending',
      members: 4,
      reason: 'Recently married, starting new family unit'
    },
    {
      id: '3',
      familyName: 'Al-Rashid Family',
      headOfFamily: 'Omar Al-Rashid',
      email: 'omar.rashid@email.com',
      requestDate: '2024-09-13',
      status: 'approved',
      members: 8,
      reason: 'Extended family joining community program'
    }
  ]);

  const [systemStats] = useState<SystemStats>({
    totalFamilies: 47,
    activeFamilies: 42,
    totalMembers: 156,
    totalAssets: 2840000,
    totalZakat: 71000,
    monthlyGrowth: 12.5
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const handleRequestAction = (requestId: string, action: 'approve' | 'reject') => {
    setFamilyRequests(prev => prev.map(request => 
      request.id === requestId 
        ? { ...request, status: action === 'approve' ? 'approved' : 'rejected' }
        : request
    ));
  };

  const filteredRequests = familyRequests.filter(request => {
    const matchesSearch = request.familyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.headOfFamily.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingRequests = familyRequests.filter(r => r.status === 'pending').length;
  const activeFamilyRate = (systemStats.activeFamilies / systemStats.totalFamilies) * 100;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-lg text-muted-foreground">Manage families, monitor statistics, and configure system settings</p>
        
        {/* Admin Stats */}
        <div className="flex flex-wrap justify-center gap-4">
          <Badge variant="secondary" className="bg-primary-soft text-primary px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            {systemStats.totalFamilies} Total Families
          </Badge>
          <Badge variant="secondary" className="bg-islamic-gold-soft text-islamic-gold px-4 py-2">
            <DollarSign className="w-4 h-4 mr-2" />
            ${systemStats.totalAssets.toLocaleString()} Assets
          </Badge>
          <Badge variant="secondary" className="bg-worship-complete text-white px-4 py-2">
            <Activity className="w-4 h-4 mr-2" />
            {systemStats.monthlyGrowth}% Growth
          </Badge>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Families</p>
                <p className="text-3xl font-bold text-primary">{systemStats.activeFamilies}</p>
                <p className="text-sm text-worship-complete">
                  +{systemStats.monthlyGrowth}% this month
                </p>
              </div>
              <Users className="w-10 h-10 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Members</p>
                <p className="text-3xl font-bold text-primary">{systemStats.totalMembers}</p>
                <p className="text-sm text-muted-foreground">
                  Avg {(systemStats.totalMembers / systemStats.totalFamilies).toFixed(1)} per family
                </p>
              </div>
              <Users className="w-10 h-10 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Assets</p>
                <p className="text-3xl font-bold text-primary">
                  ${(systemStats.totalAssets / 1000000).toFixed(1)}M
                </p>
                <p className="text-sm text-muted-foreground">
                  Avg ${(systemStats.totalAssets / systemStats.totalFamilies / 1000).toFixed(0)}K per family
                </p>
              </div>
              <DollarSign className="w-10 h-10 text-islamic-gold opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Zakat Due</p>
                <p className="text-3xl font-bold text-islamic-gold">
                  ${(systemStats.totalZakat / 1000).toFixed(0)}K
                </p>
                <p className="text-sm text-muted-foreground">
                  {((systemStats.totalZakat / systemStats.totalAssets) * 100).toFixed(1)}% of assets
                </p>
              </div>
              <Activity className="w-10 h-10 text-islamic-gold opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Family Requests Management */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-primary" />
                <span>Family Requests</span>
                {pendingRequests > 0 && (
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {pendingRequests} pending
                  </Badge>
                )}
              </div>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Family
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search and Filter */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search families..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                className="px-3 py-2 rounded-lg border border-border bg-background"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Requests List */}
            <div className="space-y-3">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-gradient-card hover:shadow-soft transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-soft rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{request.familyName}</h3>
                      <p className="text-sm text-muted-foreground">{request.headOfFamily}</p>
                      <p className="text-sm text-muted-foreground">{request.members} members</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge 
                        variant={
                          request.status === 'pending' ? 'secondary' :
                          request.status === 'approved' ? 'default' : 'outline'
                        }
                        className={
                          request.status === 'approved' ? 'bg-worship-complete text-white' :
                          request.status === 'rejected' ? 'text-destructive' : ''
                        }
                      >
                        {request.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(request.requestDate).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      {request.status === 'pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRequestAction(request.id, 'approve')}
                            className="text-worship-complete hover:text-worship-complete"
                          >
                            <UserCheck className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRequestAction(request.id, 'reject')}
                            className="text-destructive hover:text-destructive"
                          >
                            <UserX className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Management */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="w-5 h-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Database className="w-4 h-4 mr-2" />
                Backup Database
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="w-4 h-4 mr-2" />
                Send Notifications
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Security Settings
              </Button>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="w-5 h-5 text-primary" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Active Families</span>
                  <span>{activeFamilyRate.toFixed(1)}%</span>
                </div>
                <Progress value={activeFamilyRate} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Database Usage</span>
                  <span>67%</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Server Performance</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              
              <div className="pt-3 border-t border-border">
                <p className="text-sm text-worship-complete">
                  All systems operational
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-worship-complete rounded-full"></div>
                <span className="text-muted-foreground">
                  Al-Hassan family approved
                </span>
                <span className="text-xs text-muted-foreground ml-auto">2m ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-islamic-gold rounded-full"></div>
                <span className="text-muted-foreground">
                  New zakat payment: $2,500
                </span>
                <span className="text-xs text-muted-foreground ml-auto">15m ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">
                  5 new member registrations
                </span>
                <span className="text-xs text-muted-foreground ml-auto">1h ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-accent-vivid rounded-full"></div>
                <span className="text-muted-foreground">
                  Community goal reached
                </span>
                <span className="text-xs text-muted-foreground ml-auto">3h ago</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Settings & Configuration */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-primary" />
            System Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Notification Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Notifications</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Prayer Reminders</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Zakat Alerts</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Community Events</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Family Management</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-approve families</span>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Require verification</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Public family trees</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Member invitations</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Financial Settings</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="text-sm">Current Nisab (USD)</span>
                  <Input type="number" defaultValue="4340" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm">Zakat Rate (%)</span>
                  <Input type="number" defaultValue="2.5" step="0.1" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-calculate zakat</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex gap-4">
              <Button className="bg-gradient-primary hover:opacity-90">
                Save Configuration
              </Button>
              <Button variant="outline">
                Reset to Defaults
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}