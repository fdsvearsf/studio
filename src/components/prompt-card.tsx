"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Prompt } from '@/types';

interface PromptCardProps {
  prompt: Prompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  const encodedPrompt = encodeURIComponent(Buffer.from(JSON.stringify(prompt)).toString('base64'));

  return (
    <Link href={`/prompt?data=${encodedPrompt}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="aspect-square relative">
            <Image
              src={prompt.image_url}
              alt={prompt.prompt.slice(0, 50)}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              data-ai-hint="abstract art"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
