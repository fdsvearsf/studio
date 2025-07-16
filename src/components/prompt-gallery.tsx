"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Prompt } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PromptCard } from '@/components/prompt-card';
import { PromptCardSkeleton } from '@/components/prompt-card-skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw, Heart, Loader2, Search } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import { Input } from '@/components/ui/input';

const API_URL = "https://script.google.com/macros/s/AKfycbzz476jq3qOdi4TdjeEg4-b_LaVi_68QXfkDZJ1m0DNUH-B2_UamzxUJLOJMg0DwTWEqw/exec";
const INITIAL_LOAD_COUNT = 10;
const LOAD_MORE_COUNT = 10;

export function PromptGallery() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { favorites, isLoaded } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCounts, setVisibleCounts] = useState({
    all: INITIAL_LOAD_COUNT,
    new: INITIAL_LOAD_COUNT,
    trending: INITIAL_LOAD_COUNT,
    favorites: INITIAL_LOAD_COUNT,
  });
  const [activeTab, setActiveTab] = useState('all');

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Omit<Prompt, 'id'>[] = await response.json();
      const validCategories = ["New", "Trending"];
      const processedData = data
        .filter(p => p.prompt && p.image_url && (validCategories.includes(p.category) || !p.category))
        .map((p, index) => ({ 
          ...p, 
          id: index + 1, 
          category: p.category || 'New' 
        }));
      setPrompts(processedData.slice().reverse());
    } catch (e: any) {
      setError(e.message || "Failed to fetch prompts.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredPrompts = useMemo(() => {
    if (!searchQuery) {
      return prompts;
    }
    return prompts.filter(p => p.id.toString().includes(searchQuery));
  }, [prompts, searchQuery]);

  const newPrompts = useMemo(() => filteredPrompts.filter(p => p.category === 'New'), [filteredPrompts]);
  const trendingPrompts = useMemo(() => filteredPrompts.filter(p => p.category === 'Trending'), [filteredPrompts]);
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
    if (items.length === 0) {
        return (
            <div className="text-center py-12">
                <Search className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">{noResultsMessage}</h3>
                {searchQuery && <p className="mt-1 text-sm text-muted-foreground">Try a different search ID.</p>}
            </div>
        );
    }
    const visibleItems = items.slice(0, visibleCounts[category]);
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {visibleItems.map(prompt => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
        {visibleItems.length < items.length && (
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <PromptCardSkeleton key={i} />
      ))}
    </div>
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight">AI Photo Editing</h2>
         <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                />
            </div>
            <Button variant="outline" size="icon" onClick={fetchData} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="sr-only">Refresh</span>
            </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Fetching Prompts</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          {isLoading ? renderSkeleton() : renderGrid(filteredPrompts, 'all')}
        </TabsContent>
        <TabsContent value="new" className="mt-6">
          {isLoading ? renderSkeleton() : renderGrid(newPrompts, 'new')}
        </TabsContent>
        <TabsContent value="trending" className="mt-6">
          {isLoading ? renderSkeleton() : renderGrid(trendingPrompts, 'trending')}
        </TabsContent>
        <TabsContent value="favorites" className="mt-6">
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
