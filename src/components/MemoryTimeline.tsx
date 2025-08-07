import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Mic, Bot, Image, Lock, Globe, Search, Filter, Clock, Hash, Sparkles, ChevronRight } from "lucide-react";

interface Memory {
  id: string;
  type: 'text' | 'voice' | 'prompt' | 'visual';
  title: string;
  content: string;
  summary: string;
  tags: string[];
  privacy: 'private' | 'tokenized';
  timestamp: Date;
  onChain?: boolean;
}

// Mock data for demonstration
const mockMemories: Memory[] = [
  {
    id: '1',
    type: 'text',
    title: 'App Idea: Social Memory Sharing',
    content: 'What if people could share memories but also control who sees them through smart contracts...',
    summary: 'Concept for decentralized social memory platform with privacy controls',
    tags: ['app-idea', 'web3', 'privacy'],
    privacy: 'tokenized',
    timestamp: new Date('2024-01-15T10:30:00'),
    onChain: true,
  },
  {
    id: '2',
    type: 'prompt',
    title: 'AI Prompt for Logo Design',
    content: 'Create a minimalist logo that represents the connection between mind and technology...',
    summary: 'Creative prompt for AI-generated logo designs',
    tags: ['design', 'ai-prompt', 'branding'],
    privacy: 'private',
    timestamp: new Date('2024-01-14T15:45:00'),
  },
  {
    id: '3',
    type: 'voice',
    title: 'Voice Note: Music Inspiration',
    content: '[Transcribed] I was walking and heard this melody... reminded me of childhood summers...',
    summary: 'Musical inspiration captured during a walk',
    tags: ['music', 'inspiration', 'melody'],
    privacy: 'private',
    timestamp: new Date('2024-01-13T08:20:00'),
  },
  {
    id: '4',
    type: 'visual',
    title: 'Sketch: User Flow Diagram',
    content: 'Initial wireframe sketch for the onboarding process',
    summary: 'Hand-drawn user experience flow for app onboarding',
    tags: ['ux', 'wireframe', 'design'],
    privacy: 'tokenized',
    timestamp: new Date('2024-01-12T14:15:00'),
    onChain: true,
  },
];

export const MemoryTimeline = () => {
  const [memories] = useState<Memory[]>(mockMemories);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  const getTypeIcon = (type: Memory['type']) => {
    switch (type) {
      case 'text': return FileText;
      case 'voice': return Mic;
      case 'prompt': return Bot;
      case 'visual': return Image;
    }
  };

  const getTypeColor = (type: Memory['type']) => {
    switch (type) {
      case 'text': return 'text-blue-600';
      case 'voice': return 'text-green-600';
      case 'prompt': return 'text-purple-600';
      case 'visual': return 'text-orange-600';
    }
  };

  const filteredMemories = memories.filter(memory => {
    const matchesSearch = memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         memory.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         memory.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === "all" || memory.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Memory Timeline</h1>
        <p className="text-muted-foreground">Your captured ideas, thoughts, and creative process</p>
      </div>

      {/* Filters */}
      <Card className="memory-block p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search memories, tags, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="text">Text Notes</SelectItem>
              <SelectItem value="voice">Voice Notes</SelectItem>
              <SelectItem value="prompt">AI Prompts</SelectItem>
              <SelectItem value="visual">Visuals</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <Clock className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Memory List */}
      <div className="space-y-6">
        {filteredMemories.length === 0 ? (
          <Card className="memory-block p-12 text-center">
            <Sparkles className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No memories found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || filterType !== "all" 
                ? "Try adjusting your search or filters"
                : "Start capturing your first memory"
              }
            </p>
            <Button>
              <Sparkles className="w-4 h-4 mr-2" />
              Create Memory
            </Button>
          </Card>
        ) : (
          filteredMemories.map((memory) => {
            const TypeIcon = getTypeIcon(memory.type);
            return (
              <Card key={memory.id} className="memory-block p-6 cursor-pointer group">
                <div className="flex items-start gap-4">
                  {/* Type Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-soft flex items-center justify-center ${getTypeColor(memory.type)}`}>
                      <TypeIcon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {memory.title}
                      </h3>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                        {memory.privacy === 'private' ? (
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Globe className="w-4 h-4 text-primary" />
                        )}
                        {memory.onChain && (
                          <Badge variant="outline" className="text-xs">
                            On-Chain
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-3 line-clamp-2">
                      {memory.summary}
                    </p>

                    <p className="text-sm text-muted-foreground/80 mb-4 line-clamp-1">
                      {memory.content}
                    </p>

                    {/* Tags */}
                    {memory.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {memory.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            <Hash className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {memory.timestamp.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                      
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Stats Footer */}
      <Card className="memory-block p-6 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{memories.length}</div>
            <div className="text-sm text-muted-foreground">Total Memories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent-blue-dark">
              {memories.filter(m => m.privacy === 'tokenized').length}
            </div>
            <div className="text-sm text-muted-foreground">Tokenized</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success">
              {memories.filter(m => m.onChain).length}
            </div>
            <div className="text-sm text-muted-foreground">On-Chain</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-glow">
              {memories.reduce((acc, m) => acc + m.tags.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Tags</div>
          </div>
        </div>
      </Card>
    </div>
  );
};