import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="py-2 px-2 border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <Image src="https://apktek.com/wp-content/uploads/2025/07/promptx-logo.png" alt="PromptPix Logo" width={28} height={28} />
          <h1 className="text-lg font-bold">PromptPix</h1>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
