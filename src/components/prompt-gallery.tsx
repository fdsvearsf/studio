"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Prompt } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PromptCard } from '@/components/prompt-card';
import { PromptCardSkeleton } from '@/components/prompt-card-skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from 'lucide-react';

const API_URL = "https://api.sheetbest.com/sheets/128569d1-3e34-4e6f-b5bd-0a37b7bf53b9";

export function PromptGallery() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        .filter(p => p.prompt && p.image_url && validCategories.includes(p.category))
        .map((p, index) => ({ ...p, id: index }));
      setPrompts(processedData);
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

  const { newPrompts, trendingPrompts } = useMemo(() => {
    return {
      newPrompts: prompts.filter(p => p.category === 'New'),
      trendingPrompts: prompts.filter(p => p.category === 'Trending'),
    };
  }, [prompts]);

  const renderGrid = (items: Prompt[]) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map(prompt => (
        <PromptCard key={prompt.id} prompt={prompt} />
      ))}
    </div>
  );

  const renderSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <PromptCardSkeleton key={i} />
      ))}
    </div>
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Welcome to the Gallery</h2>
        <Button variant="outline" size="icon" onClick={fetchData} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="sr-only">Refresh</span>
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Fetching Prompts</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          {isLoading ? renderSkeleton() : renderGrid(prompts)}
        </TabsContent>
        <TabsContent value="new" className="mt-6">
          {isLoading ? renderSkeleton() : renderGrid(newPrompts)}
        </TabsContent>
        <TabsContent value="trending" className="mt-6">
          {isLoading ? renderSkeleton() : renderGrid(trendingPrompts)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
