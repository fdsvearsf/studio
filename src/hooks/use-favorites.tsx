"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { Prompt } from '@/types';

const FAVORITES_KEY = 'favorite_prompts';

interface FavoritesContextType {
  favorites: Prompt[];
  isFavorite: (promptId: number) => boolean;
  toggleFavorite: (prompt: Prompt) => void;
  isLoaded: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Prompt[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Could not load favorites from localStorage", error);
      setFavorites([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error("Could not save favorites to localStorage", error);
      }
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = useCallback((prompt: Prompt) => {
    setFavorites(currentFavorites => {
      const isCurrentlyFavorite = currentFavorites.some(p => p.id === prompt.id);
      if (isCurrentlyFavorite) {
        return currentFavorites.filter(p => p.id !== prompt.id);
      } else {
        return [...currentFavorites, prompt];
      }
    });
  }, []);

  const isFavorite = useCallback((promptId: number) => {
    return favorites.some(p => p.id === promptId);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite, isLoaded }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
