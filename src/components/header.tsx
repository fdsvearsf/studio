import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <Image src="https://apktek.com/wp-content/uploads/2025/07/promptx-logo.png" alt="PromptX Logo" width={32} height={32} />
          <h1 className="text-2xl font-bold">PromptX</h1>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
};
