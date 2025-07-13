import { Suspense } from 'react';
import PromptDetailClient from '@/components/prompt-detail-client';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Skeleton } from '@/components/ui/skeleton';

export default function PromptDetailPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<PromptDetailSkeleton />}>
          <PromptDetailClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function PromptDetailSkeleton() {
  return (
    <div className="container mx-auto px-2 py-8 md:px-4 max-w-4xl space-y-8">
      <Skeleton className="h-10 w-24" />
      <Skeleton className="relative aspect-video w-full rounded-lg" />
      <div className="flex justify-center p-6">
        <Skeleton className="h-12 w-48" />
      </div>
    </div>
  );
}
