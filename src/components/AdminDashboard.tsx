import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAccount, useDisconnect } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  Landmark, 
  Settings, 
  DollarSign, 
  Users, 
  FileText,
  LogOut,
  Upload,
  ToggleLeft
} from 'lucide-react';

const AdminDashboard = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [tokenizeForm, setTokenizeForm] = useState({
    location: '',
    acres: '',
    metadataURI: ''
  });
  
  const [feeForm, setFeeForm] = useState({
    feePercentage: ''
  });

  const handleDisconnect = () => {
    disconnect();
    navigate('/');
  };

  const handleTokenizeLand = async () => {
    if (!tokenizeForm.location || !tokenizeForm.acres) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Tokenizing Land",
      description: `Processing tokenization for ${tokenizeForm.location}`,
    });
    
    // Smart contract interaction would go here
    console.log('Tokenizing land:', tokenizeForm);
  };

  const handleSetPlatformFee = async () => {
    if (!feeForm.feePercentage) {
      toast({
        title: "Error",
        description: "Please enter a fee percentage",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Setting Platform Fee",
      description: `Setting fee to ${feeForm.feePercentage}%`,
    });
    
    // Smart contract interaction would go here
    console.log('Setting platform fee:', feeForm.feePercentage);
  };

  const handleWithdrawFees = async () => {
    toast({
      title: "Withdrawing Fees",
      description: "Processing fee withdrawal...",
    });
    
    // Smart contract interaction would go here
    console.log('Withdrawing fees');
  };

  const adminActions = [
    {
      icon: <Upload className="w-5 h-5" />,
      title: "Tokenize Land",
      description: "Convert physical land into digital fractions",
      action: "tokenize"
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Platform Settings",
      description: "Configure platform fees and parameters",
      action: "settings"
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      title: "Withdraw Fees",
      description: "Collect accumulated platform fees",
      action: "withdraw"
    },
    {
      icon: <ToggleLeft className="w-5 h-5" />,
      title: "Land Management",
      description: "Activate/deactivate land parcels",
      action: "manage"
    }
  ];

  const mockLandParcels = [
    { id: 1, location: "Chennai Downtown", acres: 5, status: "Active", value: "$250,000" },
    { id: 2, location: "Mumbai Hills", acres: 3.2, status: "Active", value: "$180,000" },
    { id: 3, location: "Bangalore Tech Park", acres: 7.5, status: "Pending", value: "$420,000" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-lighter p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cyan rounded-lg flex items-center justify-center">
              <Landmark className="w-7 h-7 text-cyan-dark" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage land tokenization platform</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Connected as Admin</p>
              <p className="text-sm font-mono text-cyan">{address?.slice(0, 8)}...{address?.slice(-6)}</p>
            </div>
            <Button variant="outline" onClick={handleDisconnect} className="gap-2">
              <LogOut className="w-4 h-4" />
              Disconnect
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="gradient-card border-emerald/20 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Lands</p>
                  <p className="text-2xl font-bold text-emerald">23</p>
                </div>
                <FileText className="w-8 h-8 text-emerald" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-cyan/20 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Users</p>
                  <p className="text-2xl font-bold text-cyan">1,247</p>
                </div>
                <Users className="w-8 h-8 text-cyan" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-gold/20 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Value</p>
                  <p className="text-2xl font-bold text-gold">$12.4M</p>
                </div>
                <DollarSign className="w-8 h-8 text-gold" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-emerald/20 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Platform Fees</p>
                  <p className="text-2xl font-bold text-emerald">$24,680</p>
                </div>
                <Settings className="w-8 h-8 text-emerald" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tokenize Land Form */}
          <Card className="gradient-card border-emerald/20 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald">
                <Upload className="w-5 h-5" />
                Tokenize New Land
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location" className="text-foreground">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Chennai Downtown"
                  value={tokenizeForm.location}
                  onChange={(e) => setTokenizeForm(prev => ({ ...prev, location: e.target.value }))}
                  className="bg-navy-light border-emerald/30"
                />
              </div>
              <div>
                <Label htmlFor="acres" className="text-foreground">Acres</Label>
                <Input
                  id="acres"
                  type="number"
                  placeholder="e.g., 5.5"
                  value={tokenizeForm.acres}
                  onChange={(e) => setTokenizeForm(prev => ({ ...prev, acres: e.target.value }))}
                  className="bg-navy-light border-emerald/30"
                />
              </div>
              <div>
                <Label htmlFor="metadata" className="text-foreground">Metadata URI (Optional)</Label>
                <Input
                  id="metadata"
                  placeholder="ipfs://..."
                  value={tokenizeForm.metadataURI}
                  onChange={(e) => setTokenizeForm(prev => ({ ...prev, metadataURI: e.target.value }))}
                  className="bg-navy-light border-emerald/30"
                />
              </div>
              <Button variant="web3" className="w-full" onClick={handleTokenizeLand}>
                Tokenize Land
              </Button>
            </CardContent>
          </Card>

          {/* Platform Settings */}
          <Card className="gradient-card border-cyan/20 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan">
                <Settings className="w-5 h-5" />
                Platform Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fee" className="text-foreground">Platform Fee (%)</Label>
                <Input
                  id="fee"
                  type="number"
                  placeholder="e.g., 2.5"
                  value={feeForm.feePercentage}
                  onChange={(e) => setFeeForm(prev => ({ ...prev, feePercentage: e.target.value }))}
                  className="bg-navy-light border-cyan/30"
                />
              </div>
              <Button variant="admin" className="w-full" onClick={handleSetPlatformFee}>
                Set Platform Fee
              </Button>
              
              <div className="pt-4 border-t border-cyan/20">
                <Button variant="gold" className="w-full" onClick={handleWithdrawFees}>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Withdraw Platform Fees
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Land Parcels Table */}
        <Card className="gradient-card border-emerald/20 shadow-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald">
              <FileText className="w-5 h-5" />
              Tokenized Land Parcels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-emerald/20">
                    <th className="text-left py-3 px-4 text-foreground">ID</th>
                    <th className="text-left py-3 px-4 text-foreground">Location</th>
                    <th className="text-left py-3 px-4 text-foreground">Acres</th>
                    <th className="text-left py-3 px-4 text-foreground">Value</th>
                    <th className="text-left py-3 px-4 text-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLandParcels.map((land) => (
                    <tr key={land.id} className="border-b border-emerald/10">
                      <td className="py-3 px-4 text-muted-foreground">#{land.id}</td>
                      <td className="py-3 px-4 text-foreground">{land.location}</td>
                      <td className="py-3 px-4 text-muted-foreground">{land.acres}</td>
                      <td className="py-3 px-4 text-emerald font-semibold">{land.value}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          land.status === 'Active' 
                            ? 'bg-emerald/20 text-emerald' 
                            : 'bg-gold/20 text-gold'
                        }`}>
                          {land.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm" className="border-emerald/30 text-emerald hover:bg-emerald hover:text-emerald-dark">
                          Manage
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;