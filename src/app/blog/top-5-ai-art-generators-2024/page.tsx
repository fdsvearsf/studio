import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function BlogPostPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <article className="max-w-2xl mx-auto">
          <Link href="/blog" passHref>
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Top 5 AI Art Generators You Should Try in 2024</h1>
          <p className="text-muted-foreground mb-6">Posted on {new Date().toLocaleDateString()}</p>

          <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
             <Image
                src="https://placehold.co/600x400.png"
                alt="AI generated colorful abstract"
                fill
                className="object-cover"
                data-ai-hint="colorful abstract"
              />
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-4 text-muted-foreground">
            <p>
              The field of AI art generation is exploding with new tools and technologies. It can be hard to know where to start. In this article, we'll review the top 5 AI art generators that are making waves in 2024.
            </p>
            <h2 className="text-2xl font-semibold pt-4 text-foreground">1. Midjourney</h2>
            <p>
              Known for its artistic and often painterly style, Midjourney is a favorite among artists for its high-quality, aesthetic outputs. It operates through Discord, which can be a bit unusual for new users, but its results are consistently impressive.
            </p>
            <h2 className="text-2xl font-semibold pt-4 text-foreground">2. Stable Diffusion</h2>
            <p>
              Stable Diffusion is an open-source model, which means you can run it on your own computer if you have a powerful enough GPU. It's incredibly flexible and has a massive community building tools and custom models on top of it.
            </p>
            <h2 className="text-2xl font-semibold pt-4 text-foreground">3. DALL-E 3</h2>
            <p>
             Developed by OpenAI and integrated into ChatGPT Plus, DALL-E 3 excels at understanding natural language and creating coherent, detailed scenes that follow instructions very closely. It's great for beginners and for creating specific compositions.
            </p>
            <h2 className="text-2xl font-semibold pt-4 text-foreground">4. Leonardo.Ai</h2>
            <p>
              Leonardo.Ai is a full platform built for creators. It offers not just image generation but also tools for training your own models and a community of users sharing their creations. It has a variety of fine-tuned models for different styles, from photorealism to fantasy art.
            </p>
            <h2 className="text-2xl font-semibold pt-4 text-foreground">5. Ideogram</h2>
            <p>
              One of the biggest challenges for AI image generators has been accurately rendering text. Ideogram has made significant progress in this area, making it an excellent choice for creating logos, posters, or any image that needs to include words.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
