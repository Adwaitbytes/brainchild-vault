import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Brain, Wallet, Lightbulb, Lock, Zap, ChevronRight, Mic, FileText, Image, Bot } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { MemoryCreator } from "@/components/MemoryCreator";
import { MemoryTimeline } from "@/components/MemoryTimeline";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const handleWalletConnect = () => {
    // TODO: Implement actual wallet connection with Camp Origin SDK
    setIsConnected(true);
    setActiveTab("timeline");
  };

  if (!isConnected) {
    return <HeroSection onConnect={handleWalletConnect} />;
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-primary animate-pulse-glow" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Re:Mind
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              <Button
                variant={activeTab === "timeline" ? "default" : "ghost"}
                onClick={() => setActiveTab("timeline")}
                className="font-medium"
              >
                Timeline
              </Button>
              <Button
                variant={activeTab === "create" ? "default" : "ghost"}
                onClick={() => setActiveTab("create")}
                className="font-medium"
              >
                Create Memory
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                Connected
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "timeline" && <MemoryTimeline />}
        {activeTab === "create" && <MemoryCreator />}
      </main>
    </div>
  );
};

export default Index;