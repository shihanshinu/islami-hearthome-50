import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Coins,
  Plus,
  Calculator,
  PiggyBank,
  Heart,
  TrendingUp,
  Wallet,
  DollarSign,
  Edit,
  Trash2
} from "lucide-react";

interface Asset {
  id: string;
  type: 'cash' | 'gold' | 'silver' | 'property' | 'investment' | 'livestock';
  name: string;
  value: number;
  zakatApplicable: boolean;
}

interface ZakatCalculation {
  totalAssets: number;
  zakatAmount: number;
  nisab: number;
  eligible: boolean;
}

export default function Finance() {
  const [assets, setAssets] = useState<Asset[]>([
    { id: '1', type: 'cash', name: 'Savings Account', value: 25000, zakatApplicable: true },
    { id: '2', type: 'cash', name: 'Checking Account', value: 8000, zakatApplicable: true },
    { id: '3', type: 'gold', name: 'Gold Jewelry', value: 12000, zakatApplicable: true },
    { id: '4', type: 'investment', name: 'Stock Portfolio', value: 35000, zakatApplicable: true },
    { id: '5', type: 'property', name: 'Investment Property', value: 180000, zakatApplicable: false },
  ]);

  const [newAsset, setNewAsset] = useState({
    type: 'cash' as Asset['type'],
    name: '',
    value: '',
    zakatApplicable: true
  });

  const [sadaqahAmount, setSadaqahAmount] = useState(450);
  const [debtAmount, setDebtAmount] = useState(5000);

  const nisab = 4340; // Current gold nisab in USD (approximate)
  const zakatRate = 0.025; // 2.5%

  const calculateZakat = (): ZakatCalculation => {
    const zakatableAssets = assets
      .filter(asset => asset.zakatApplicable)
      .reduce((sum, asset) => sum + asset.value, 0);
    
    const netAssets = zakatableAssets - debtAmount;
    const eligible = netAssets >= nisab;
    const zakatAmount = eligible ? netAssets * zakatRate : 0;

    return {
      totalAssets: zakatableAssets,
      zakatAmount,
      nisab,
      eligible
    };
  };

  const addAsset = () => {
    if (newAsset.name && newAsset.value) {
      const asset: Asset = {
        id: Date.now().toString(),
        type: newAsset.type,
        name: newAsset.name,
        value: parseFloat(newAsset.value),
        zakatApplicable: newAsset.zakatApplicable
      };
      setAssets([...assets, asset]);
      setNewAsset({ type: 'cash', name: '', value: '', zakatApplicable: true });
    }
  };

  const removeAsset = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  const zakatCalculation = calculateZakat();

  const getAssetIcon = (type: Asset['type']) => {
    switch (type) {
      case 'cash': return Wallet;
      case 'gold': 
      case 'silver': return Coins;
      case 'investment': return TrendingUp;
      case 'property': return PiggyBank;
      case 'livestock': return Heart;
      default: return DollarSign;
    }
  };

  const getAssetColor = (type: Asset['type']) => {
    switch (type) {
      case 'cash': return 'text-primary';
      case 'gold': return 'text-islamic-gold';
      case 'silver': return 'text-muted-foreground';
      case 'investment': return 'text-accent-vivid';
      case 'property': return 'text-secondary-dark';
      case 'livestock': return 'text-worship-complete';
      default: return 'text-primary';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Financial Management</h1>
        <p className="text-lg text-muted-foreground">Track your wealth and fulfill your Islamic obligations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Zakat Calculator */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-6 h-6 text-primary" />
              Zakat Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Zakat Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-gradient-card">
                <p className="text-2xl font-bold text-primary">
                  ${zakatCalculation.totalAssets.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Zakatable Assets</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-card">
                <p className="text-2xl font-bold text-islamic-gold">
                  ${zakatCalculation.zakatAmount.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Zakat Due</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-card">
                <Badge 
                  variant={zakatCalculation.eligible ? "default" : "secondary"}
                  className={zakatCalculation.eligible ? "bg-worship-complete" : ""}
                >
                  {zakatCalculation.eligible ? "Zakat Obligatory" : "Below Nisab"}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Nisab: ${nisab.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Debt Input */}
            <div className="space-y-2">
              <Label htmlFor="debt">Outstanding Debts (deducted from zakat calculation)</Label>
              <Input
                id="debt"
                type="number"
                value={debtAmount}
                onChange={(e) => setDebtAmount(parseFloat(e.target.value) || 0)}
                placeholder="Enter debt amount"
              />
            </div>

            {/* Zakat Payment Button */}
            {zakatCalculation.eligible && (
              <Button className="w-full bg-gradient-islamic hover:opacity-90" size="lg">
                <Heart className="w-5 h-5 mr-2" />
                Pay Zakat (${zakatCalculation.zakatAmount.toLocaleString()})
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* Sadaqah Tracker */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="w-5 h-5 text-primary" />
                Sadaqah This Year
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-3xl font-bold text-worship-complete">
                  ${sadaqahAmount.toLocaleString()}
                </p>
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Donation
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Summary */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Income</span>
                <span className="font-medium">$8,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expenses</span>
                <span className="font-medium">$6,200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Savings</span>
                <span className="font-medium text-worship-complete">$2,300</span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between font-medium">
                <span>Net Worth Growth</span>
                <span className="text-primary">+$2,300</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Assets Management */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PiggyBank className="w-6 h-6 text-primary" />
              Asset Portfolio
            </div>
            <Badge variant="secondary">
              {assets.length} Assets
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add New Asset */}
          <div className="p-4 rounded-xl bg-muted/30 space-y-4">
            <h3 className="font-medium">Add New Asset</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <Label htmlFor="asset-type">Type</Label>
                <select
                  id="asset-type"
                  className="w-full p-2 rounded-lg border border-border bg-background"
                  value={newAsset.type}
                  onChange={(e) => setNewAsset({...newAsset, type: e.target.value as Asset['type']})}
                >
                  <option value="cash">Cash</option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="investment">Investment</option>
                  <option value="property">Property</option>
                  <option value="livestock">Livestock</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="asset-name">Name</Label>
                <Input
                  id="asset-name"
                  value={newAsset.name}
                  onChange={(e) => setNewAsset({...newAsset, name: e.target.value})}
                  placeholder="Asset name"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="asset-value">Value ($)</Label>
                <Input
                  id="asset-value"
                  type="number"
                  value={newAsset.value}
                  onChange={(e) => setNewAsset({...newAsset, value: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={addAsset} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Asset
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="zakat-applicable"
                checked={newAsset.zakatApplicable}
                onChange={(e) => setNewAsset({...newAsset, zakatApplicable: e.target.checked})}
                className="rounded"
              />
              <Label htmlFor="zakat-applicable" className="text-sm">
                Subject to Zakat
              </Label>
            </div>
          </div>

          {/* Assets List */}
          <div className="space-y-3">
            {assets.map((asset) => {
              const IconComponent = getAssetIcon(asset.type);
              return (
                <div
                  key={asset.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-gradient-card hover:shadow-soft transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <IconComponent className={`w-6 h-6 ${getAssetColor(asset.type)}`} />
                    <div>
                      <p className="font-medium">{asset.name}</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {asset.type} {asset.zakatApplicable && "• Zakatable"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-bold text-foreground">
                      ${asset.value.toLocaleString()}
                    </p>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeAsset(asset.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Assets Summary */}
          <div className="pt-4 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  ${assets.reduce((sum, asset) => sum + asset.value, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  ${assets.filter(a => a.zakatApplicable).reduce((sum, asset) => sum + asset.value, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Zakatable Assets</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-islamic-gold">
                  {assets.filter(a => a.zakatApplicable).length}/{assets.length}
                </p>
                <p className="text-sm text-muted-foreground">Zakatable Assets</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}