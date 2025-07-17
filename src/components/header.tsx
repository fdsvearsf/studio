import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import { Rss } from 'lucide-react';

export function Header() {
  return (
    <header className="py-2 px-2 sm:px-6 lg:px-8 border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <Image src="https://apktek.com/wp-content/uploads/2025/07/promptx-logo.png" alt="PromptPix Logo" width={28} height={28} className="sm:w-8 sm:h-8" />
          <h1 className="text-lg sm:text-2xl font-bold">PromptPix</h1>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <nav>
            <Button asChild variant="outline">
                <Link href="/blog">
                    <Rss className="h-4 w-4" />
                    <span className="hidden sm:inline-block ml-2">Blog</span>
                    <span className="sr-only">Blog</span>
                </Link>
            </Button>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
