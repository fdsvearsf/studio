"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Copy, Check, ArrowLeft, Loader2 } from 'lucide-react';
import type { Prompt } from '@/types';

const TypingIndicator = () => (
    <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Generating prompt... please wait.</span>
    </div>
);

export default function PromptDetailClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [displayedPrompt, setDisplayedPrompt] = useState("");

  const prompt: Prompt | null = useMemo(() => {
    const data = searchParams.get('data');
    if (!data) return null;
    try {
      const decodedData = decodeURIComponent(data);
      return JSON.parse(Buffer.from(decodedData, 'base64').toString('utf8'));
    } catch (error) {
      console.error("Failed to parse prompt data:", error);
      return null;
    }
  }, [searchParams]);

  useEffect(() => {
    if (isGenerating) {
      const timer = setTimeout(() => {
        setIsGenerating(false);
        setIsRevealed(true);
      }, 3000); // 3 second delay for "generation"
      return () => clearTimeout(timer);
    }
  }, [isGenerating]);

  useEffect(() => {
    if (isRevealed && prompt?.prompt) {
      setDisplayedPrompt(""); // Reset on reveal
      const fullPrompt = prompt.prompt;
      const promptLength = fullPrompt.length;
      // Aim for a total duration of ~10 seconds, but faster for very short prompts
      const typingDuration = Math.max(promptLength * 30, 10000);
      const delay = typingDuration / promptLength;

      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayedPrompt((prev) => prev + fullPrompt.charAt(i));
        i++;
        if (i >= promptLength) {
          clearInterval(intervalId);
        }
      }, delay);

      return () => clearInterval(intervalId);
    }
  }, [isRevealed, prompt?.prompt]);


  const handleCopy = () => {
    if (!prompt?.prompt) return;
    navigator.clipboard.writeText(prompt.prompt);
    setIsCopied(true);
    toast({
        title: "Copied to clipboard!",
        description: "You can now use the prompt.",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  if (!prompt) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-destructive">Could not load prompt details. The link may be invalid.</p>
        <Button onClick={() => router.push('/')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Gallery
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <Button variant="outline" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-0">
          <div className="relative aspect-video w-full">
            <Image
              src={prompt.image_url}
              alt={prompt.prompt.slice(0, 50)}
              fill
              className="object-contain"
              sizes="100vw"
              data-ai-hint="futuristic design"
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-center p-6 bg-card rounded-lg min-h-[80px]">
        {!isRevealed && !isGenerating && (
          <Button size="lg" onClick={() => setIsGenerating(true)}>
            <Wand2 className="mr-2 h-5 w-5" />
            Generate Prompt
          </Button>
        )}
        {isGenerating && <TypingIndicator />}
        {isRevealed && (
          <div className="w-full space-y-4">
            <p className="text-lg font-mono p-4 border rounded-md bg-muted/50 text-foreground min-h-[6rem]">
              {displayedPrompt}
              <span className="inline-block w-0.5 h-6 bg-foreground animate-ping ml-1" />
            </p>
            <Button size="lg" onClick={handleCopy} disabled={isCopied || displayedPrompt.length !== prompt.prompt.length} className="w-full sm:w-auto">
              {isCopied ? (
                <Check className="mr-2 h-5 w-5" />
              ) : (
                <Copy className="mr-2 h-5 w-5" />
              )}
              {isCopied ? 'Copied!' : 'Copy Prompt'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
