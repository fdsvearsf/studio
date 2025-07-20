import type { Prompt } from '@/types';

const API_URL = "https://script.google.com/macros/s/AKfycbzz476jq3qOdi4TdjeEg4-b_LaVi_68QXfkDZJ1m0DNUH-B2_UamzxUJLOJMg0DwTWEqw/exec";

// This function can now be called from the server or client
export async function fetchPrompts(): Promise<Prompt[]> {
  try {
    const response = await fetch(API_URL, { next: { revalidate: 3600 } }); // Revalidate every hour
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
    return processedData.slice().reverse(); // Show newest first
  } catch (e) {
    console.error("Failed to fetch prompts:", e);
    return []; // Return empty array on error
  }
}
