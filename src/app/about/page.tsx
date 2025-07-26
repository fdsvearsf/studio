import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8 pb-20">
        <div className="max-w-2xl mx-auto">
          <Link href="/" passHref>
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Welcome to PromptPix! We are a premier destination for AI enthusiasts, developers, and creative professionals. Our mission is to provide a comprehensive directory of cutting-edge AI tools and an inspiring showcase of AI-generated art and applications.
            </p>
            <p>
              At PromptPix, we believe in the transformative power of artificial intelligence. We are dedicated to curating a high-quality collection of prompts, tools, and resources that empower our users to explore the limitless possibilities of AI. Whether you're a seasoned developer looking for the latest models or an artist seeking new inspiration, PromptPix is your trusted guide in the world of AI.
            </p>
            <p>
              Our platform is designed to be user-friendly, fast, and accessible to everyone. We are committed to fostering a vibrant community and adhering to the highest standards of quality and compliance.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
