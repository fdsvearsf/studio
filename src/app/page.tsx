import { Suspense } from 'react';
import { PromptGallery } from '@/components/prompt-gallery';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-2 py-4">
        <Suspense fallback={<p className="text-center">Loading Gallery...</p>}>
          <PromptGallery />
        </Suspense>
      </main>
    </div>
  );
}
