import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Mic, Bot, Image, Hash, Lock, Globe, Sparkles } from "lucide-react";

export const MemoryCreator = () => {
  const [memoryType, setMemoryType] = useState<'text' | 'voice' | 'prompt' | 'visual'>('text');
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [privacy, setPrivacy] = useState<'private' | 'tokenize'>('private');

  const memoryTypes = [
    { id: 'text', label: 'Text Note', icon: FileText, description: 'Write your thoughts and ideas' },
    { id: 'voice', label: 'Voice Note', icon: Mic, description: 'Record audio with AI transcription' },
    { id: 'prompt', label: 'AI Prompt', icon: Bot, description: 'Save prompts and AI conversations' },
    { id: 'visual', label: 'Visual', icon: Image, description: 'Upload sketches and images' },
  ];

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = () => {
    // TODO: Implement saving with Camp Origin SDK
    console.log('Saving memory:', { memoryType, title, content, tags, privacy });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Memory</h1>
        <p className="text-muted-foreground">Capture your ideas, thoughts, and creative process</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Memory Type Selection */}
        <div className="lg:col-span-1">
          <Card className="memory-block p-6">
            <h2 className="text-lg font-semibold mb-4">Memory Type</h2>
            <div className="space-y-3">
              {memoryTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setMemoryType(type.id as any)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    memoryType === type.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <type.icon className={`w-5 h-5 mt-0.5 ${
                      memoryType === type.id ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-sm text-muted-foreground">{type.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2">
          <Card className="memory-block p-8">
            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium">Title</Label>
                <Input
                  id="title"
                  placeholder="Give your memory a descriptive title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg"
                />
              </div>

              {/* Content Area */}
              <div className="space-y-2">
                <Label htmlFor="content" className="text-base font-medium">
                  {memoryType === 'text' && 'Content'}
                  {memoryType === 'voice' && 'Voice Recording'}
                  {memoryType === 'prompt' && 'AI Prompt'}
                  {memoryType === 'visual' && 'Visual Upload'}
                </Label>
                
                {memoryType === 'text' && (
                  <Textarea
                    id="content"
                    placeholder="Start writing your thoughts, ideas, or notes..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[200px] text-base leading-relaxed"
                  />
                )}

                {memoryType === 'voice' && (
                  <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                    <Mic className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Click to start recording</p>
                    <Button variant="outline">
                      <Mic className="w-4 h-4 mr-2" />
                      Start Recording
                    </Button>
                  </div>
                )}

                {memoryType === 'prompt' && (
                  <Textarea
                    id="content"
                    placeholder="Enter your AI prompt or conversation..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[200px] text-base leading-relaxed font-mono"
                  />
                )}

                {memoryType === 'visual' && (
                  <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                    <Image className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Drag and drop or click to upload</p>
                    <Button variant="outline">
                      <Image className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                )}
              </div>

              <Separator />

              {/* Tags */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    className="flex-1"
                  />
                  <Button onClick={addTag} variant="outline">
                    <Hash className="w-4 h-4" />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeTag(tag)}
                      >
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Privacy & Licensing */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Privacy & Licensing</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setPrivacy('private')}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      privacy === 'private'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Lock className={`w-5 h-5 ${
                        privacy === 'private' ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                      <div>
                        <div className="font-medium">Private</div>
                        <div className="text-sm text-muted-foreground">Keep this memory private</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setPrivacy('tokenize')}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      privacy === 'tokenize'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Globe className={`w-5 h-5 ${
                        privacy === 'tokenize' ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                      <div>
                        <div className="font-medium">Tokenize & License</div>
                        <div className="text-sm text-muted-foreground">Mint as NFT with licensing</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <Button 
                  onClick={handleSave}
                  size="lg"
                  className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Save Memory
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};