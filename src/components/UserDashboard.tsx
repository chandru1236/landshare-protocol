import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAccount, useDisconnect } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  Wallet, 
  TrendingUp, 
  ShoppingCart, 
  DollarSign,
  LogOut,
  MapPin,
  Activity,
  PieChart
} from 'lucide-react';

const UserDashboard = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [buyForm, setBuyForm] = useState({
    landId: '',
    units: ''
  });
  
  const [sellForm, setSellForm] = useState({
    landId: '',
    units: '',
    pricePerUnit: ''
  });

  const handleDisconnect = () => {
    disconnect();
    navigate('/');
  };

  const handleBuyFromAdmin = async () => {
    if (!buyForm.landId || !buyForm.units) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Processing Purchase",
      description: `Buying ${buyForm.units} units of Land #${buyForm.landId}`,
    });
    
    // Smart contract interaction would go here
    console.log('Buying from admin:', buyForm);
  };

  const handleListForSale = async () => {
    if (!sellForm.landId || !sellForm.units || !sellForm.pricePerUnit) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Listing for Sale",
      description: `Listing ${sellForm.units} units at $${sellForm.pricePerUnit} each`,
    });
    
    // Smart contract interaction would go here
    console.log('Listing for sale:', sellForm);
  };

  const mockPortfolio = [
    { landId: 1, location: "Chennai Downtown", units: 250, totalValue: "$12,500", percentage: 35 },
    { landId: 2, location: "Mumbai Hills", units: 180, totalValue: "$9,000", percentage: 25 },
    { landId: 3, location: "Bangalore Tech Park", units: 320, totalValue: "$19,200", percentage: 40 },
  ];

  const mockMarketplace = [
    { saleId: 1, landId: 2, seller: "0x742d...3A8B", units: 100, pricePerUnit: "$45", total: "$4,500" },
    { saleId: 2, landId: 1, seller: "0x8F9C...7D2E", units: 75, pricePerUnit: "$52", total: "$3,900" },
    { saleId: 3, landId: 3, seller: "0x6A1B...4F9C", units: 200, pricePerUnit: "$58", total: "$11,600" },
  ];

  const mockTransactions = [
    { type: "Purchase", landId: 1, amount: "250 units", value: "$12,500", date: "2024-08-20" },
    { type: "Sale", landId: 2, amount: "50 units", value: "$2,500", date: "2024-08-18" },
    { type: "Purchase", landId: 3, amount: "100 units", value: "$6,000", date: "2024-08-15" },
  ];

  const totalPortfolioValue = mockPortfolio.reduce((sum, item) => 
    sum + parseInt(item.totalValue.replace(/[$,]/g, '')), 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-lighter p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald rounded-lg flex items-center justify-center">
              <PieChart className="w-7 h-7 text-emerald-dark" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Investment Dashboard</h1>
              <p className="text-muted-foreground">Manage your land investments</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Wallet Address</p>
              <p className="text-sm font-mono text-emerald">{address?.slice(0, 8)}...{address?.slice(-6)}</p>
            </div>
            <Button variant="outline" onClick={handleDisconnect} className="gap-2">
              <LogOut className="w-4 h-4" />
              Disconnect
            </Button>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="gradient-card border-emerald/20 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Portfolio Value</p>
                  <p className="text-2xl font-bold text-emerald">${totalPortfolioValue.toLocaleString()}</p>
                </div>
                <Wallet className="w-8 h-8 text-emerald" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-cyan/20 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">LAND Tokens</p>
                  <p className="text-2xl font-bold text-cyan">750</p>
                </div>
                <TrendingUp className="w-8 h-8 text-cyan" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-gold/20 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Land Parcels</p>
                  <p className="text-2xl font-bold text-gold">{mockPortfolio.length}</p>
                </div>
                <MapPin className="w-8 h-8 text-gold" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-emerald/20 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Returns</p>
                  <p className="text-2xl font-bold text-emerald">+12.5%</p>
                </div>
                <Activity className="w-8 h-8 text-emerald" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Buy From Admin */}
          <Card className="gradient-card border-emerald/20 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald">
                <ShoppingCart className="w-5 h-5" />
                Buy from Admin
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="buyLandId" className="text-foreground">Land ID</Label>
                <Input
                  id="buyLandId"
                  placeholder="e.g., 1"
                  value={buyForm.landId}
                  onChange={(e) => setBuyForm(prev => ({ ...prev, landId: e.target.value }))}
                  className="bg-navy-light border-emerald/30"
                />
              </div>
              <div>
                <Label htmlFor="buyUnits" className="text-foreground">Units to Buy</Label>
                <Input
                  id="buyUnits"
                  type="number"
                  placeholder="e.g., 100"
                  value={buyForm.units}
                  onChange={(e) => setBuyForm(prev => ({ ...prev, units: e.target.value }))}
                  className="bg-navy-light border-emerald/30"
                />
              </div>
              <Button variant="web3" className="w-full" onClick={handleBuyFromAdmin}>
                Buy Land Fractions
              </Button>
            </CardContent>
          </Card>

          {/* List for Sale */}
          <Card className="gradient-card border-cyan/20 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan">
                <DollarSign className="w-5 h-5" />
                List for Sale
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sellLandId" className="text-foreground">Land ID</Label>
                <Input
                  id="sellLandId"
                  placeholder="e.g., 1"
                  value={sellForm.landId}
                  onChange={(e) => setSellForm(prev => ({ ...prev, landId: e.target.value }))}
                  className="bg-navy-light border-cyan/30"
                />
              </div>
              <div>
                <Label htmlFor="sellUnits" className="text-foreground">Units to Sell</Label>
                <Input
                  id="sellUnits"
                  type="number"
                  placeholder="e.g., 50"
                  value={sellForm.units}
                  onChange={(e) => setSellForm(prev => ({ ...prev, units: e.target.value }))}
                  className="bg-navy-light border-cyan/30"
                />
              </div>
              <div>
                <Label htmlFor="pricePerUnit" className="text-foreground">Price per Unit ($)</Label>
                <Input
                  id="pricePerUnit"
                  type="number"
                  placeholder="e.g., 50"
                  value={sellForm.pricePerUnit}
                  onChange={(e) => setSellForm(prev => ({ ...prev, pricePerUnit: e.target.value }))}
                  className="bg-navy-light border-cyan/30"
                />
              </div>
              <Button variant="admin" className="w-full" onClick={handleListForSale}>
                List for Sale
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Holdings */}
        <Card className="gradient-card border-emerald/20 shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald">
              <PieChart className="w-5 h-5" />
              My Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-emerald/20">
                    <th className="text-left py-3 px-4 text-foreground">Land ID</th>
                    <th className="text-left py-3 px-4 text-foreground">Location</th>
                    <th className="text-left py-3 px-4 text-foreground">Units Owned</th>
                    <th className="text-left py-3 px-4 text-foreground">Value</th>
                    <th className="text-left py-3 px-4 text-foreground">Portfolio %</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPortfolio.map((holding) => (
                    <tr key={holding.landId} className="border-b border-emerald/10">
                      <td className="py-3 px-4 text-muted-foreground">#{holding.landId}</td>
                      <td className="py-3 px-4 text-foreground">{holding.location}</td>
                      <td className="py-3 px-4 text-emerald font-semibold">{holding.units}</td>
                      <td className="py-3 px-4 text-emerald font-semibold">{holding.totalValue}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-navy-lighter rounded-full h-2">
                            <div 
                              className="bg-emerald h-2 rounded-full" 
                              style={{ width: `${holding.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">{holding.percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Marketplace */}
          <Card className="gradient-card border-cyan/20 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan">
                <ShoppingCart className="w-5 h-5" />
                Marketplace
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMarketplace.map((sale) => (
                  <div key={sale.saleId} className="flex items-center justify-between p-4 bg-navy-light rounded-lg border border-cyan/20">
                    <div>
                      <p className="text-foreground font-semibold">Land #{sale.landId}</p>
                      <p className="text-sm text-muted-foreground">Seller: {sale.seller}</p>
                      <p className="text-sm text-cyan">{sale.units} units @ {sale.pricePerUnit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald font-bold">{sale.total}</p>
                      <Button variant="web3" size="sm" className="mt-2">
                        Buy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card className="gradient-card border-gold/20 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gold">
                <Activity className="w-5 h-5" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTransactions.map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-navy-light rounded-lg border border-gold/20">
                    <div>
                      <p className="text-foreground font-semibold">{tx.type}</p>
                      <p className="text-sm text-muted-foreground">Land #{tx.landId} • {tx.amount}</p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${tx.type === 'Purchase' ? 'text-emerald' : 'text-gold'}`}>
                        {tx.type === 'Purchase' ? '-' : '+'}{tx.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;