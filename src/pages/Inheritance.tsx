import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Scale,
  Calculator,
  Users,
  DollarSign,
  FileText,
  AlertCircle,
  CheckCircle,
  Heart,
  Crown,
  Baby
} from "lucide-react";

interface Heir {
  name: string;
  relationship: 'spouse' | 'father' | 'mother' | 'son' | 'daughter' | 'brother' | 'sister' | 'grandfather' | 'grandmother';
  gender: 'male' | 'female';
  isAlive: boolean;
  sharePercentage: number;
  shareAmount: number;
}

interface InheritanceCase {
  deceasedName: string;
  totalEstate: number;
  debts: number;
  funeralCosts: number;
  bequests: number;
  netEstate: number;
  heirs: Heir[];
}

export default function Inheritance() {
  const [inheritanceCase, setInheritanceCase] = useState<InheritanceCase>({
    deceasedName: '',
    totalEstate: 0,
    debts: 0,
    funeralCosts: 0,
    bequests: 0,
    netEstate: 0,
    heirs: []
  });

  const [newHeir, setNewHeir] = useState({
    name: '',
    relationship: 'son' as Heir['relationship'],
    gender: 'male' as 'male' | 'female',
    isAlive: true
  });

  // Islamic inheritance calculation logic (simplified)
  const calculateInheritance = () => {
    const netEstate = inheritanceCase.totalEstate - inheritanceCase.debts - inheritanceCase.funeralCosts - inheritanceCase.bequests;
    
    const heirs: Heir[] = [];
    
    // Simplified Faraid calculations
    const hasSpouse = inheritanceCase.heirs.some(h => h.relationship === 'spouse');
    const hasSons = inheritanceCase.heirs.some(h => h.relationship === 'son');
    const hasDaughters = inheritanceCase.heirs.some(h => h.relationship === 'daughter');
    const hasFather = inheritanceCase.heirs.some(h => h.relationship === 'father');
    const hasMother = inheritanceCase.heirs.some(h => h.relationship === 'mother');
    
    let remainingPercentage = 100;
    
    inheritanceCase.heirs.forEach(heir => {
      let sharePercentage = 0;
      
      switch (heir.relationship) {
        case 'spouse':
          // Spouse gets 1/8 if there are children, 1/4 if no children
          sharePercentage = (hasSons || hasDaughters) ? 12.5 : 25;
          break;
        case 'father':
          // Father gets 1/6 if there are children, more if no children
          sharePercentage = (hasSons || hasDaughters) ? 16.67 : 25;
          break;
        case 'mother':
          // Mother gets 1/6 if there are children, 1/3 if no children
          sharePercentage = (hasSons || hasDaughters) ? 16.67 : 33.33;
          break;
        case 'son':
          // Sons inherit by residuary (after fixed shares)
          sharePercentage = 0; // Will be calculated after fixed shares
          break;
        case 'daughter':
          // Daughters get 1/2 if only one, 2/3 if multiple (when no sons)
          if (!hasSons) {
            const daughterCount = inheritanceCase.heirs.filter(h => h.relationship === 'daughter').length;
            sharePercentage = daughterCount === 1 ? 50 : (66.67 / daughterCount);
          } else {
            sharePercentage = 0; // Will share residuary with sons (1:2 ratio)
          }
          break;
        default:
          sharePercentage = 0;
      }
      
      const shareAmount = (sharePercentage / 100) * netEstate;
      
      heirs.push({
        ...heir,
        sharePercentage,
        shareAmount
      });
    });
    
    // Handle residuary inheritance for sons and daughters when both exist
    if (hasSons && hasDaughters) {
      const usedPercentage = heirs.reduce((sum, heir) => 
        heir.relationship !== 'son' && heir.relationship !== 'daughter' ? sum + heir.sharePercentage : sum, 0
      );
      const residuaryPercentage = 100 - usedPercentage;
      
      const sons = heirs.filter(h => h.relationship === 'son');
      const daughters = heirs.filter(h => h.relationship === 'daughter');
      const totalShares = sons.length * 2 + daughters.length; // Sons get 2 shares, daughters get 1 share
      
      sons.forEach(son => {
        son.sharePercentage = (residuaryPercentage * 2) / totalShares;
        son.shareAmount = (son.sharePercentage / 100) * netEstate;
      });
      
      daughters.forEach(daughter => {
        daughter.sharePercentage = residuaryPercentage / totalShares;
        daughter.shareAmount = (daughter.sharePercentage / 100) * netEstate;
      });
    }
    
    setInheritanceCase(prev => ({
      ...prev,
      netEstate,
      heirs
    }));
  };

  const addHeir = () => {
    if (newHeir.name) {
      const updatedHeirs = [...inheritanceCase.heirs, {
        ...newHeir,
        sharePercentage: 0,
        shareAmount: 0
      }];
      
      setInheritanceCase(prev => ({
        ...prev,
        heirs: updatedHeirs
      }));
      
      setNewHeir({
        name: '',
        relationship: 'son',
        gender: 'male',
        isAlive: true
      });
    }
  };

  const removeHeir = (index: number) => {
    const updatedHeirs = inheritanceCase.heirs.filter((_, i) => i !== index);
    setInheritanceCase(prev => ({
      ...prev,
      heirs: updatedHeirs
    }));
  };

  const getRelationshipIcon = (relationship: string) => {
    switch (relationship) {
      case 'spouse': return Heart;
      case 'father':
      case 'mother': return Crown;
      case 'son':
      case 'daughter': return Baby;
      default: return Users;
    }
  };

  const totalDistributed = inheritanceCase.heirs.reduce((sum, heir) => sum + heir.shareAmount, 0);
  const distributionComplete = Math.abs(totalDistributed - inheritanceCase.netEstate) < 1;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Islamic Inheritance Calculator</h1>
        <p className="text-lg text-muted-foreground">Calculate inheritance shares according to Islamic Faraid laws</p>
        
        <div className="flex justify-center">
          <Badge variant="secondary" className="bg-primary-soft text-primary px-4 py-2">
            <Scale className="w-4 h-4 mr-2" />
            Sharia Compliant
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Estate Information */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Estate Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deceased-name">Deceased Name</Label>
              <Input
                id="deceased-name"
                value={inheritanceCase.deceasedName}
                onChange={(e) => setInheritanceCase(prev => ({...prev, deceasedName: e.target.value}))}
                placeholder="Enter name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="total-estate">Total Estate Value ($)</Label>
              <Input
                id="total-estate"
                type="number"
                value={inheritanceCase.totalEstate || ''}
                onChange={(e) => setInheritanceCase(prev => ({...prev, totalEstate: parseFloat(e.target.value) || 0}))}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="debts">Outstanding Debts ($)</Label>
              <Input
                id="debts"
                type="number"
                value={inheritanceCase.debts || ''}
                onChange={(e) => setInheritanceCase(prev => ({...prev, debts: parseFloat(e.target.value) || 0}))}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="funeral-costs">Funeral Costs ($)</Label>
              <Input
                id="funeral-costs"
                type="number"
                value={inheritanceCase.funeralCosts || ''}
                onChange={(e) => setInheritanceCase(prev => ({...prev, funeralCosts: parseFloat(e.target.value) || 0}))}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bequests">Bequests (Max 1/3) ($)</Label>
              <Input
                id="bequests"
                type="number"
                value={inheritanceCase.bequests || ''}
                onChange={(e) => {
                  const maxBequest = inheritanceCase.totalEstate / 3;
                  const bequest = Math.min(parseFloat(e.target.value) || 0, maxBequest);
                  setInheritanceCase(prev => ({...prev, bequests: bequest}));
                }}
                placeholder="0"
              />
              <p className="text-xs text-muted-foreground">
                Maximum: ${(inheritanceCase.totalEstate / 3).toFixed(2)}
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="font-medium">Net Inheritable Estate:</span>
                <span className="text-lg font-bold text-primary">
                  ${(inheritanceCase.totalEstate - inheritanceCase.debts - inheritanceCase.funeralCosts - inheritanceCase.bequests).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Heirs Management */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              Heirs ({inheritanceCase.heirs.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add Heir Form */}
            <div className="p-4 rounded-lg bg-muted/30 space-y-3">
              <h4 className="font-medium">Add Heir</h4>
              <div className="space-y-2">
                <Input
                  placeholder="Heir name"
                  value={newHeir.name}
                  onChange={(e) => setNewHeir({...newHeir, name: e.target.value})}
                />
                <select
                  className="w-full p-2 rounded-lg border border-border bg-background"
                  value={newHeir.relationship}
                  onChange={(e) => setNewHeir({...newHeir, relationship: e.target.value as Heir['relationship']})}
                >
                  <option value="spouse">Spouse</option>
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="son">Son</option>
                  <option value="daughter">Daughter</option>
                  <option value="brother">Brother</option>
                  <option value="sister">Sister</option>
                  <option value="grandfather">Grandfather</option>
                  <option value="grandmother">Grandmother</option>
                </select>
                <Button onClick={addHeir} size="sm" className="w-full">
                  Add Heir
                </Button>
              </div>
            </div>

            {/* Heirs List */}
            <div className="space-y-2">
              {inheritanceCase.heirs.map((heir, index) => {
                const IconComponent = getRelationshipIcon(heir.relationship);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gradient-card"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">{heir.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">{heir.relationship}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeHeir(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      Remove
                    </Button>
                  </div>
                );
              })}
            </div>

            <Button 
              onClick={calculateInheritance}
              className="w-full bg-gradient-islamic hover:opacity-90"
              size="lg"
              disabled={inheritanceCase.heirs.length === 0 || inheritanceCase.totalEstate === 0}
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculate Inheritance
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-6 h-6 text-primary" />
                Distribution Results
              </div>
              {distributionComplete ? (
                <CheckCircle className="w-6 h-6 text-worship-complete" />
              ) : (
                <AlertCircle className="w-6 h-6 text-accent-vivid" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {inheritanceCase.heirs.length > 0 && inheritanceCase.netEstate > 0 ? (
              <>
                <div className="space-y-3">
                  {inheritanceCase.heirs.map((heir, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-gradient-card"
                    >
                      <div className="flex items-center gap-3">
                        {(() => {
                          const IconComponent = getRelationshipIcon(heir.relationship);
                          return <IconComponent className="w-5 h-5 text-primary" />;
                        })()}
                        <div>
                          <p className="font-medium">{heir.name}</p>
                          <p className="text-sm text-muted-foreground capitalize">{heir.relationship}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">
                          ${heir.shareAmount.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {heir.sharePercentage.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Distributed:</span>
                    <span className="font-medium">${totalDistributed.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Net Estate:</span>
                    <span className="font-medium">${inheritanceCase.netEstate.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Remaining:</span>
                    <span className={`font-medium ${distributionComplete ? 'text-worship-complete' : 'text-accent-vivid'}`}>
                      ${(inheritanceCase.netEstate - totalDistributed).toLocaleString()}
                    </span>
                  </div>
                </div>

                {distributionComplete && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-worship-complete/10 text-worship-complete">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      Distribution complete according to Islamic law
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <Scale className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Add heirs and estate value to calculate inheritance
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Islamic Guidelines */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            Islamic Inheritance Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Key Principles</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Fixed shares (Faraid) are determined by Islamic law</li>
                <li>• Debts and funeral costs are paid before distribution</li>
                <li>• Maximum 1/3 of estate can be bequeathed to non-heirs</li>
                <li>• Male heirs typically receive twice the share of female heirs</li>
                <li>• Spouse, parents, and children have guaranteed shares</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Common Shares</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Spouse: 1/8 (with children) or 1/4 (without children)</li>
                <li>• Father: 1/6 (with children) or residuary</li>
                <li>• Mother: 1/6 (with children) or 1/3 (without children)</li>
                <li>• Sons: Residuary inheritance</li>
                <li>• Daughters: 1/2 (one daughter) or 2/3 (multiple daughters)</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
            <p className="text-sm text-accent-foreground">
              <strong>Note:</strong> This calculator provides a simplified calculation. 
              For complex cases involving multiple heirs or special circumstances, 
              please consult with a qualified Islamic scholar or legal expert.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}