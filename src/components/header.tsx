import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <Sparkles className="w-7 h-7 text-primary" />
          <h1 className="text-2xl font-bold">PromptX</h1>
        </Link>
      </div>
    </header>
  );
};
