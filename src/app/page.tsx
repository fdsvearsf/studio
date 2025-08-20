
"use client";

import { Suspense, useEffect, useState } from 'react';
import { PromptGallery } from '@/components/prompt-gallery';
import { fetchPrompts } from '@/lib/data';
import type { Prompt } from '@/types';
import { PromptCardSkeleton } from '@/components/prompt-card-skeleton';

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <PromptCardSkeleton key={`skeleton-${i}`} />
      ))}
    </div>
  );
}

export default function Home() {
  const [initialPrompts, setInitialPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPrompts() {
      try {
        const prompts = await fetchPrompts();
        setInitialPrompts(prompts);
      } catch (error) {
        console.error("Failed to fetch initial prompts", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadPrompts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-2 pt-4 pb-20">
        <Suspense fallback={<GallerySkeleton />}>
          {isLoading ? (
            <GallerySkeleton />
          ) : (
            <PromptGallery initialPrompts={initialPrompts} />
          )}
        </Suspense>
      </main>
    </div>
  );
}
