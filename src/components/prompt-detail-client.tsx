
"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Copy, Check, ArrowLeft, Loader2, Heart } from 'lucide-react';
import type { Prompt } from '@/types';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';

const TypingIndicator = () => (
    <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Generating prompt... please wait.</span>
    </div>
);

const BlinkingCursor = () => (
    <span className="inline-block w-2 h-5 bg-foreground animate-pulse ml-1" />
);


export default function PromptDetailClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [animatedPrompt, setAnimatedPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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

  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = prompt ? isFavorite(prompt.id) : false;

  useEffect(() => {
    if (isGenerating) {
      const timer = setTimeout(() => {
        setIsGenerating(false);
        setIsRevealed(true);
        setIsTyping(true);
      }, 3000); // 3 second delay for "generation"
      return () => clearTimeout(timer);
    }
  }, [isGenerating]);

  useEffect(() => {
    if (isTyping && prompt?.prompt) {
      if (animatedPrompt.length < prompt.prompt.length) {
        const timeoutId = setTimeout(() => {
          setAnimatedPrompt(prompt.prompt.slice(0, animatedPrompt.length + 1));
        }, 10); 
        return () => clearTimeout(timeoutId);
      } else {
        setIsTyping(false);
      }
    }
  }, [isTyping, animatedPrompt, prompt?.prompt]);


  const handleCopy = () => {
    if (!prompt?.prompt) return;
    navigator.clipboard.writeText(prompt.prompt);
    toast({
        title: "Copied to clipboard!",
        description: "You can now use the prompt.",
    });
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  if (!prompt) {
    return (
      <div className="container mx-auto px-2 py-8 text-center">
        <p className="text-destructive">Could not load prompt details. The link may be invalid.</p>
        <Button onClick={() => router.push('/')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Gallery
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 py-4 max-w-4xl space-y-4">
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
      
      <div className={cn(
          "flex items-center justify-center p-4 bg-card rounded-lg",
          !isRevealed && "min-h-[80px]"
        )}>
        {!isRevealed && !isGenerating && (
          <Button size="lg" onClick={() => setIsGenerating(true)}>
            <Wand2 className="mr-2 h-5 w-5" />
            Generate Prompt
          </Button>
        )}
        {isGenerating && <TypingIndicator />}
        {isRevealed && (
          <div className="w-full">
            <p className="text-sm font-mono p-4 border rounded-md bg-muted/50 text-foreground">
              {animatedPrompt}
              {isTyping && <BlinkingCursor />}
            </p>
            {!isTyping && (
              <div className="flex flex-col gap-2 mt-3">
                <Button size="lg" onClick={handleCopy} disabled={isCopied}>
                    {isCopied ? (
                        <Check className="mr-2 h-5 w-5" />
                    ) : (
                        <Copy className="mr-2 h-5 w-5" />
                    )}
                    {isCopied ? 'Copied!' : 'Copy Prompt'}
                </Button>
                <Button size="lg" variant="outline" onClick={() => toggleFavorite(prompt)}>
                  <Heart className={cn("mr-2 h-5 w-5", isFav && "fill-red-500 text-red-500")} />
                  {isFav ? 'Favorited' : 'Favorite'}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
