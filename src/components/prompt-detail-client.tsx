
"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wand2, Copy, Check, ArrowLeft, Heart, Loader2 } from 'lucide-react';
import type { Prompt } from '@/types';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PromptDetailClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [displayedPrompt, setDisplayedPrompt] = useState('');
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

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
    if (isRevealed && prompt?.prompt) {
      if (displayedPrompt.length < prompt.prompt.length) {
        const timer = setTimeout(() => {
          setDisplayedPrompt(prompt.prompt.slice(0, displayedPrompt.length + 1));
          if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
          }
        }, 100); 
        return () => clearTimeout(timer);
      } else {
        setIsAnimationComplete(true);
      }
    }
  }, [isRevealed, displayedPrompt, prompt]);

  const handleCopy = () => {
    if (!prompt?.prompt) return;
    navigator.clipboard.writeText(prompt.prompt);
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
          <div className="relative aspect-video w-full bg-secondary">
             {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            <Image
              src={prompt.image_url}
              alt={prompt.prompt.slice(0, 50)}
              fill
              className={cn(
                "object-contain transition-opacity duration-300",
                isImageLoading ? "opacity-0" : "opacity-100"
              )}
              sizes="100vw"
              data-ai-hint="futuristic design"
              onLoad={() => setIsImageLoading(false)}
              priority
            />
          </div>
        </CardContent>
      </Card>
      
      <div className={cn(
          "flex items-center justify-center p-6 bg-secondary/30 rounded-lg",
          !isRevealed && "min-h-[96px]"
        )}>
        {!isRevealed && (
          <Button variant="secondary" size="lg" onClick={() => setIsRevealed(true)} className="w-full max-w-xs text-base py-6">
            <Wand2 className="mr-2 h-5 w-5" />
            Generate Prompt
          </Button>
        )}
        {isRevealed && (
          <div className="w-full">
             <ScrollArea className="w-full h-48 rounded-md border bg-background/50" viewportRef={scrollAreaRef}>
                <p className="text-sm font-mono p-4 text-foreground/90">
                    {displayedPrompt}
                </p>
             </ScrollArea>

            {isAnimationComplete && (
                <div className="flex items-center gap-2 mt-3">
                    <Button variant="secondary" onClick={handleCopy} disabled={isCopied} className="flex-1 text-base py-6">
                        {isCopied ? (
                            <Check className="mr-2 h-5 w-5" />
                        ) : (
                            <Copy className="mr-2 h-5 w-5" />
                        )}
                        {isCopied ? 'Copied!' : 'Copy Prompt'}
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => toggleFavorite(prompt)} className="h-[52px] w-[52px]">
                      <Heart className={cn("h-6 w-6", isFav && "fill-red-500 text-red-500")} />
                      <span className="sr-only">Favorite</span>
                    </Button>
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
