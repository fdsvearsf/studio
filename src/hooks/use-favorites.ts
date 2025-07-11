"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Prompt } from '@/types';

const FAVORITES_KEY = 'favorite_prompts';

export function useFavorites() {
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

  const updateLocalStorage = (updatedFavorites: Prompt[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Could not save favorites to localStorage", error);
    }
  };

  const addFavorite = useCallback((prompt: Prompt) => {
    setFavorites(prevFavorites => {
      const newFavorites = [...prevFavorites, prompt];
      updateLocalStorage(newFavorites);
      return newFavorites;
    });
  }, []);

  const removeFavorite = useCallback((promptId: number) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.filter(p => p.id !== promptId);
      updateLocalStorage(newFavorites);
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((promptId: number) => {
    return favorites.some(p => p.id === promptId);
  }, [favorites]);

  const toggleFavorite = useCallback((prompt: Prompt) => {
    if (isFavorite(prompt.id)) {
      removeFavorite(prompt.id);
    } else {
      addFavorite(prompt);
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  return { favorites, isFavorite, toggleFavorite, isLoaded };
}
