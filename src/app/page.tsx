import { Suspense } from 'react';
import { PromptGallery } from '@/components/prompt-gallery';
import { fetchPrompts } from '@/lib/data';

export default async function Home() {
  const initialPrompts = await fetchPrompts();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-2 pt-4 pb-20">
        <Suspense fallback={<p className="text-center">Loading Gallery...</p>}>
          <PromptGallery initialPrompts={initialPrompts} />
        </Suspense>
      </main>
    </div>
  );
}
