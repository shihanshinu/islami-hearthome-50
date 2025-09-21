import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Plus,
  Eye,
  Edit,
  Heart,
  Calendar,
  MapPin,
  Phone,
  Mail,
  UserPlus,
  Baby,
  Crown
} from "lucide-react";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  birthDate: string;
  status: 'alive' | 'deceased';
  parentId?: string;
  spouse?: string;
  email?: string;
  phone?: string;
  address?: string;
  worshipStats?: {
    prayersCompleted: number;
    quranPages: number;
    dhikrCount: number;
  };
  financialSummary?: {
    assets: number;
    zakatDue: number;
  };
}

export default function Family() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'Ahmad Ibn Abdullah',
      relationship: 'Self',
      birthDate: '1985-03-15',
      status: 'alive',
      email: 'ahmad@email.com',
      phone: '+1-555-0123',
      worshipStats: { prayersCompleted: 4, quranPages: 3, dhikrCount: 99 },
      financialSummary: { assets: 114000, zakatDue: 2850 }
    },
    {
      id: '2',
      name: 'Fatima bint Ali',
      relationship: 'Spouse',
      birthDate: '1987-07-22',
      status: 'alive',
      spouse: '1',
      email: 'fatima@email.com',
      phone: '+1-555-0124',
      worshipStats: { prayersCompleted: 5, quranPages: 5, dhikrCount: 150 },
      financialSummary: { assets: 35000, zakatDue: 875 }
    },
    {
      id: '3',
      name: 'Omar Ahmad',
      relationship: 'Son',
      birthDate: '2010-12-10',
      status: 'alive',
      parentId: '1',
      worshipStats: { prayersCompleted: 3, quranPages: 2, dhikrCount: 33 },
      financialSummary: { assets: 500, zakatDue: 0 }
    },
    {
      id: '4',
      name: 'Maryam Ahmad',
      relationship: 'Daughter',
      birthDate: '2015-09-05',
      status: 'alive',
      parentId: '1',
      worshipStats: { prayersCompleted: 2, quranPages: 1, dhikrCount: 20 },
      financialSummary: { assets: 200, zakatDue: 0 }
    },
    {
      id: '5',
      name: 'Abdullah Ibn Ahmad',
      relationship: 'Father',
      birthDate: '1955-01-20',
      status: 'alive',
      email: 'abdullah@email.com',
      phone: '+1-555-0125',
      worshipStats: { prayersCompleted: 5, quranPages: 8, dhikrCount: 300 },
      financialSummary: { assets: 250000, zakatDue: 6250 }
    },
    {
      id: '6',
      name: 'Khadija bint Omar',
      relationship: 'Mother',
      birthDate: '1960-05-18',
      status: 'alive',
      email: 'khadija@email.com',
      phone: '+1-555-0126',
      worshipStats: { prayersCompleted: 5, quranPages: 6, dhikrCount: 200 },
      financialSummary: { assets: 45000, zakatDue: 1125 }
    }
  ]);

  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [newMember, setNewMember] = useState({
    name: '',
    relationship: '',
    birthDate: '',
    email: '',
    phone: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const addFamilyMember = () => {
    if (newMember.name && newMember.relationship) {
      const member: FamilyMember = {
        id: Date.now().toString(),
        ...newMember,
        status: 'alive',
        worshipStats: { prayersCompleted: 0, quranPages: 0, dhikrCount: 0 },
        financialSummary: { assets: 0, zakatDue: 0 }
      };
      setFamilyMembers([...familyMembers, member]);
      setNewMember({ name: '', relationship: '', birthDate: '', email: '', phone: '' });
      setShowAddForm(false);
    }
  };

  const getRelationshipIcon = (relationship: string) => {
    switch (relationship.toLowerCase()) {
      case 'self': return Crown;
      case 'spouse': return Heart;
      case 'son':
      case 'daughter': return Baby;
      default: return Users;
    }
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship.toLowerCase()) {
      case 'self': return 'bg-islamic-gold text-foreground';
      case 'spouse': return 'bg-primary-soft text-primary';
      case 'son':
      case 'daughter': return 'bg-accent text-accent-foreground';
      case 'father':
      case 'mother': return 'bg-worship-complete text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const totalFamilyAssets = familyMembers.reduce((sum, member) => 
    sum + (member.financialSummary?.assets || 0), 0
  );
  const totalZakatDue = familyMembers.reduce((sum, member) => 
    sum + (member.financialSummary?.zakatDue || 0), 0
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Family Tree</h1>
        <p className="text-lg text-muted-foreground">Manage your extended family and their spiritual journey</p>
        
        {/* Family Summary */}
        <div className="flex flex-wrap justify-center gap-4">
          <Badge variant="secondary" className="bg-primary-soft text-primary px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            {familyMembers.length} Members
          </Badge>
          <Badge variant="secondary" className="bg-islamic-gold-soft text-islamic-gold px-4 py-2">
            ${totalFamilyAssets.toLocaleString()} Total Assets
          </Badge>
          <Badge variant="secondary" className="bg-worship-complete text-white px-4 py-2">
            ${totalZakatDue.toLocaleString()} Zakat Due
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Family Members List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add Member Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Family Members</h2>
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              variant="outline"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </div>

          {/* Add Member Form */}
          {showAddForm && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Add New Family Member</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newMember.name}
                      onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="relationship">Relationship</Label>
                    <Input
                      id="relationship"
                      value={newMember.relationship}
                      onChange={(e) => setNewMember({...newMember, relationship: e.target.value})}
                      placeholder="e.g., Son, Daughter, Brother"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="birthDate">Birth Date</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={newMember.birthDate}
                      onChange={(e) => setNewMember({...newMember, birthDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={addFamilyMember}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Member
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {familyMembers.map((member) => {
              const RelationshipIcon = getRelationshipIcon(member.relationship);
              return (
                <Card 
                  key={member.id}
                  className="shadow-card hover:shadow-worship transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedMember(member)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getRelationshipColor(member.relationship)}`}>
                          <RelationshipIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.relationship}</p>
                        </div>
                      </div>
                      <Badge variant={member.status === 'alive' ? 'default' : 'secondary'}>
                        {member.status}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {member.birthDate ? `${calculateAge(member.birthDate)} years old` : 'Age unknown'}
                        </span>
                      </div>
                      
                      {member.worshipStats && (
                        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border">
                          <div className="text-center">
                            <p className="font-medium text-primary">{member.worshipStats.prayersCompleted}/5</p>
                            <p className="text-xs text-muted-foreground">Prayers</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium text-primary">{member.worshipStats.quranPages}</p>
                            <p className="text-xs text-muted-foreground">Quran</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium text-primary">{member.worshipStats.dhikrCount}</p>
                            <p className="text-xs text-muted-foreground">Dhikr</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Member Details Sidebar */}
        <div className="space-y-6">
          {selectedMember ? (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Member Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${getRelationshipColor(selectedMember.relationship)}`}>
                    {(() => {
                      const IconComponent = getRelationshipIcon(selectedMember.relationship);
                      return <IconComponent className="w-8 h-8" />;
                    })()}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{selectedMember.name}</h3>
                  <p className="text-muted-foreground">{selectedMember.relationship}</p>
                  <Badge variant={selectedMember.status === 'alive' ? 'default' : 'secondary'} className="mt-2">
                    {selectedMember.status}
                  </Badge>
                </div>

                {/* Contact Information */}
                <div className="space-y-3">
                  <h4 className="font-medium">Contact Information</h4>
                  {selectedMember.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedMember.email}</span>
                    </div>
                  )}
                  {selectedMember.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedMember.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Born {selectedMember.birthDate} ({calculateAge(selectedMember.birthDate)} years old)</span>
                  </div>
                </div>

                {/* Worship Stats */}
                {selectedMember.worshipStats && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Worship Statistics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Daily Prayers</span>
                        <span className="text-sm font-medium">{selectedMember.worshipStats.prayersCompleted}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Quran Pages</span>
                        <span className="text-sm font-medium">{selectedMember.worshipStats.quranPages}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Dhikr Count</span>
                        <span className="text-sm font-medium">{selectedMember.worshipStats.dhikrCount}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Financial Summary */}
                {selectedMember.financialSummary && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Financial Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Assets</span>
                        <span className="text-sm font-medium">${selectedMember.financialSummary.assets.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Zakat Due</span>
                        <span className="text-sm font-medium text-islamic-gold">${selectedMember.financialSummary.zakatDue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-card">
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select a family member to view details</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Family Statistics */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Family Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{familyMembers.filter(m => m.status === 'alive').length}</p>
                  <p className="text-sm text-muted-foreground">Living Members</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-muted-foreground">{familyMembers.filter(m => m.status === 'deceased').length}</p>
                  <p className="text-sm text-muted-foreground">Deceased</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Average Age</span>
                  <span className="text-sm font-medium">
                    {Math.round(familyMembers
                      .filter(m => m.birthDate && m.status === 'alive')
                      .reduce((sum, m) => sum + calculateAge(m.birthDate), 0) / 
                      familyMembers.filter(m => m.birthDate && m.status === 'alive').length
                    )} years
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Wealth</span>
                  <span className="text-sm font-medium">${totalFamilyAssets.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Family Zakat</span>
                  <span className="text-sm font-medium text-islamic-gold">${totalZakatDue.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}