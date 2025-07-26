
"use client";

import { useState, useMemo, useCallback } from 'react';
import type { Prompt } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PromptCard } from '@/components/prompt-card';
import { PromptCardSkeleton } from '@/components/prompt-card-skeleton';
import { Button } from '@/components/ui/button';
import { Heart, Loader2, Search } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import { fetchPrompts } from '@/lib/data';

const INITIAL_LOAD_COUNT = 10;
const LOAD_MORE_COUNT = 10;

interface PromptGalleryProps {
  initialPrompts: Prompt[];
}

export function PromptGallery({ initialPrompts }: PromptGalleryProps) {
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialPrompts.length === 0 ? "Could not load initial prompts." : null);
  const { favorites, isLoaded } = useFavorites();
  const [visibleCounts, setVisibleCounts] = useState({
    all: INITIAL_LOAD_COUNT,
    new: INITIAL_LOAD_COUNT,
    trending: INITIAL_LOAD_COUNT,
    dpMaker: INITIAL_LOAD_COUNT,
    stickerMaker: INITIAL_LOAD_COUNT,
    favorites: INITIAL_LOAD_COUNT,
  });
  const [activeTab, setActiveTab] = useState('all');

  const allPrompts = useMemo(() => prompts.filter(p => p.category !== 'DP Maker' && p.category !== 'Sticker Maker'), [prompts]);
  const newPrompts = useMemo(() => prompts.filter(p => p.category === 'New'), [prompts]);
  const trendingPrompts = useMemo(() => prompts.filter(p => p.category === 'Trending'), [prompts]);
  const dpMakerPrompts = useMemo(() => prompts.filter(p => p.category === 'DP Maker'), [prompts]);
  const stickerMakerPrompts = useMemo(() => prompts.filter(p => p.category === 'Sticker Maker'), [prompts]);
  const favoritePrompts = useMemo(() => {
    const favIds = new Set(favorites.map(f => f.id));
    return prompts.filter(p => favIds.has(p.id)).slice().reverse();
  }, [prompts, favorites]);


  const handleLoadMore = (category: keyof typeof visibleCounts) => {
    setVisibleCounts(prev => ({
      ...prev,
      [category]: prev[category] + LOAD_MORE_COUNT,
    }));
  };

  const renderGrid = (items: Prompt[], category: keyof typeof visibleCounts, noResultsMessage: string = "No prompts found.") => {
    if (items.length === 0 && !isLoading) {
        return (
            <div className="text-center py-12">
                <Search className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">{noResultsMessage}</h3>
            </div>
        );
    }
    const visibleItems = items.slice(0, visibleCounts[category]);
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-2">
          {visibleItems.map(prompt => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
          {isLoading && Array.from({ length: 2 }).map((_, i) => <PromptCardSkeleton key={`loading-${i}`} />)}
        </div>
        {visibleItems.length < items.length && !isLoading && (
          <div className="flex justify-center">
            <Button onClick={() => handleLoadMore(category)}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Load More
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderSkeleton = () => (
    <div className="grid grid-cols-2 gap-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <PromptCardSkeleton key={i} />
      ))}
    </div>
  );
  
  return (
    <div>
      {error && !isLoading && (
        <Alert variant="destructive" className="mb-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setActiveTab(value)}>
         <div className="sticky top-0 z-10 bg-background py-2">
            <div className="relative w-full overflow-hidden">
                <div className="overflow-x-auto no-scrollbar">
                    <TabsList className="min-w-max justify-start bg-transparent p-0 gap-1">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="new">New</TabsTrigger>
                        <TabsTrigger value="trending">Trending</TabsTrigger>
                        <TabsTrigger value="dpMaker">DP Maker</TabsTrigger>
                        <TabsTrigger value="stickerMaker">Sticker Maker</TabsTrigger>
                        <TabsTrigger value="favorites">Favorites</TabsTrigger>
                    </TabsList>
                </div>
                <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
            </div>
         </div>
        <TabsContent value="all" className="mt-4">
          {renderGrid(allPrompts, 'all')}
        </TabsContent>
        <TabsContent value="new" className="mt-4">
          {renderGrid(newPrompts, 'new')}
        </TabsContent>
        <TabsContent value="trending" className="mt-4">
          {renderGrid(trendingPrompts, 'trending')}
        </TabsContent>
        <TabsContent value="dpMaker" className="mt-4">
          {renderGrid(dpMakerPrompts, 'dpMaker', 'No DP Maker prompts found.')}
        </TabsContent>
        <TabsContent value="stickerMaker" className="mt-4">
          {renderGrid(stickerMakerPrompts, 'stickerMaker', 'No Sticker Maker prompts found.')}
        </TabsContent>
        <TabsContent value="favorites" className="mt-4">
          {!isLoaded ? (
            renderSkeleton()
          ) : favorites.length > 0 ? (
            renderGrid(favoritePrompts, 'favorites', 'No favorites match your search.')
          ) : (
             <div className="text-center py-12">
                <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Favorites Yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Click the heart icon on any prompt to save it here.
                </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
