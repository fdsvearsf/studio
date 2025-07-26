import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8 pb-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Search Prompts</h1>
          <div className="flex w-full items-center space-x-2">
            <Input type="search" placeholder="Enter keywords to search..." />
            <Button type="submit">
              <SearchIcon className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
          <div className="mt-8 text-center text-muted-foreground">
            <p>Search functionality is coming soon.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
