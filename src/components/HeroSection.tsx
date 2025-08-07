import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Wallet, Lightbulb, Lock, Zap, ChevronRight, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onConnect: () => void;
}

export const HeroSection = ({ onConnect }: HeroSectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary animate-pulse-glow" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Re:Mind
            </span>
          </div>
          <Button variant="outline" className="font-medium">
            Learn More
          </Button>
        </div>
      </header>

      {/* Hero Content */}
      <main className="flex-1 container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        {/* Animated Brain Visual */}
        <div className="relative mb-12">
          <div className="relative">
            <Brain className="w-32 h-32 text-primary animate-float opacity-20" />
            {/* Flowing Ideas Animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full animate-flow" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 bg-accent-blue-dark rounded-full animate-flow" style={{ animationDelay: '1s' }}></div>
              <div className="w-2 h-2 bg-primary-glow rounded-full animate-flow" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
          <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-primary-glow animate-pulse" />
          <Lightbulb className="absolute -bottom-4 -left-4 w-6 h-6 text-accent-blue-dark animate-bounce" />
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Start Capturing
          </span>
          <br />
          <span className="text-foreground">Genius</span>
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
          Re:Mind is your decentralized AI memory vault. Privately log ideas, prompts, and creative iterations with on-chain timestamping and NFT licensing.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button 
            onClick={onConnect}
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-primary hover:opacity-90 transition-all duration-300 animate-pulse-glow"
          >
            <Wallet className="w-5 h-5 mr-2" />
            Connect Wallet
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg px-8 py-6 border-2 hover:bg-secondary"
          >
            Watch Demo
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <Card className="memory-block p-6 text-center">
            <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Private & Secure</h3>
            <p className="text-muted-foreground text-sm">
              Your ideas are encrypted and stored securely with decentralized technology
            </p>
          </Card>
          
          <Card className="memory-block p-6 text-center">
            <Zap className="w-12 h-12 text-accent-blue-dark mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
            <p className="text-muted-foreground text-sm">
              Smart summaries, voice transcription, and intelligent insights
            </p>
          </Card>
          
          <Card className="memory-block p-6 text-center">
            <Brain className="w-12 h-12 text-primary-glow mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Tokenize Ideas</h3>
            <p className="text-muted-foreground text-sm">
              License your creative process and establish provenance on-chain
            </p>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 text-center text-muted-foreground text-sm">
        Built with Camp Origin SDK on BaseCAMP L1
      </footer>
    </div>
  );
};