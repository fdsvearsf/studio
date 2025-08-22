
import { Suspense } from 'react';
import { PromptGallery } from '@/components/prompt-gallery';
import { fetchPrompts } from '@/lib/data';
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

export default async function Home() {
  const initialPrompts = await fetchPrompts();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-2 pt-4 pb-20">
        <Suspense fallback={<GallerySkeleton />}>
          <PromptGallery initialPrompts={initialPrompts} />
        </Suspense>
      </main>
    </div>
  );
}
