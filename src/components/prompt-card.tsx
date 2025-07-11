"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Prompt } from '@/types';
import { useState } from 'react';
import { Loader2, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFavorites } from '@/hooks/use-favorites';
import { Button } from './ui/button';

interface PromptCardProps {
  prompt: Prompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(prompt.id);
  
  const encodedPrompt = encodeURIComponent(Buffer.from(JSON.stringify(prompt)).toString('base64'));

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(prompt);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 group">
      <Link href={`/prompt?data=${encodedPrompt}`} className="block">
        <CardContent className="p-0">
          <div className="aspect-square relative bg-muted flex items-center justify-center">
             <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 z-20 h-9 w-9 text-white bg-black/30 hover:bg-black/50 hover:text-white"
                onClick={handleFavoriteClick}
              >
                <Heart className={cn("h-5 w-5", isFav ? "fill-red-500 text-red-500" : "text-white")} />
                <span className="sr-only">Favorite</span>
              </Button>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            <Image
              src={prompt.image_url}
              alt={prompt.prompt.slice(0, 50)}
              fill
              className={cn(
                "object-cover transition-all duration-300 group-hover:scale-105",
                isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
              )}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              data-ai-hint="abstract art"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
