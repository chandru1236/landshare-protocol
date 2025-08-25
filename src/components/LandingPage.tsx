import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import WalletConnect from '@/components/WalletConnect';
import { ADMIN_WALLET } from '@/config/wagmi';
import { Landmark, TrendingUp, Shield, Users } from 'lucide-react';

const LandingPage = () => {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected && address) {
      if (address.toLowerCase() === ADMIN_WALLET.toLowerCase()) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isConnected, address, navigate]);

  const features = [
    {
      icon: <Landmark className="w-8 h-8" />,
      title: "Tokenize Land",
      description: "Convert physical land assets into digital fractions",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Trade Fractions",
      description: "Buy and sell land fractions on the marketplace",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Ownership",
      description: "Blockchain-verified ownership and transparent transactions",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Shared Investment",
      description: "Democratize land investment for everyone",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy-lighter" />
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-cyan rounded-full blur-2xl" />
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gold rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald rounded-lg flex items-center justify-center">
              <Landmark className="w-6 h-6 text-emerald-dark" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">LandShare Protocol</h1>
          </div>
          
          {!isConnected && (
            <WalletConnect />
          )}
        </header>

        {/* Hero Section */}
        <div className="text-center mb-20">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-emerald via-cyan to-gold bg-clip-text text-transparent">
            Fractionalize Land Assets
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Revolutionize land ownership through blockchain technology. 
            Tokenize, trade, and democratize real estate investments with transparent, secure smart contracts.
          </p>
          
          {!isConnected && (
            <div className="flex justify-center">
              <WalletConnect />
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="gradient-card border-emerald/20 shadow-card hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-emerald">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald mb-2">$10M+</div>
            <div className="text-muted-foreground">Total Value Locked</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan mb-2">500+</div>
            <div className="text-muted-foreground">Land Parcels Tokenized</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gold mb-2">1,200+</div>
            <div className="text-muted-foreground">Active Investors</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="gradient-card border-emerald/20 shadow-card max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to Start?</h3>
              <p className="text-muted-foreground mb-6">
                Connect your wallet to access the land fractionalization platform and start your investment journey.
              </p>
              {!isConnected && <WalletConnect />}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;