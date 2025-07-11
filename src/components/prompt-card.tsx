"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Prompt } from '@/types';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PromptCardProps {
  prompt: Prompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const encodedPrompt = encodeURIComponent(Buffer.from(JSON.stringify(prompt)).toString('base64'));

  return (
    <Link href={`/prompt?data=${encodedPrompt}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="aspect-square relative bg-muted flex items-center justify-center">
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
      </Card>
    </Link>
  );
}
