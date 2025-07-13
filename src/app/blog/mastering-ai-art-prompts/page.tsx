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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Mastering AI Art: A Beginner's Guide to Writing Effective Prompts</h1>
          <p className="text-muted-foreground mb-6">Posted on {new Date().toLocaleDateString()}</p>
          
          <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
             <Image
                src="https://placehold.co/600x400.png"
                alt="AI generated abstract art"
                fill
                className="object-cover"
                data-ai-hint="abstract art"
              />
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-4 text-muted-foreground">
            <p>
              Welcome to the exciting world of AI art! At the heart of every stunning AI-generated image is a well-crafted prompt. A prompt is the text instruction you give to the AI model, and learning how to write them effectively is the key to unlocking your creative potential. This guide will walk you through the fundamentals.
            </p>
            <h2 className="text-2xl font-semibold pt-4 text-foreground">1. Start with a Clear Subject</h2>
            <p>
              The most important part of your prompt is the subject. What do you want to create? Be as specific as you can. Instead of "a dog," try "a golden retriever puppy playing in a field of flowers."
            </p>
            <h2 className="text-2xl font-semibold pt-4 text-foreground">2. Add Style and Medium</h2>
            <p>
              Do you want a photograph, a painting, or a cartoon? Specify the style. For example: "a portrait of a queen, oil painting," or "a futuristic city, anime style." You can also mention specific artists, like "in the style of Van Gogh."
            </p>
            <h2 className="text-2xl font-semibold pt-4 text-foreground">3. Describe the Environment and Lighting</h2>
            <p>
              Where is your subject? What is the mood? Use descriptive words for lighting and environment. Examples include: "a lone hiker on a mountain peak at sunset," or "a cozy library with warm, volumetric lighting."
            </p>
            <h2 className="text-2xl font-semibold pt-4 text-foreground">4. Use Modifiers for Quality</h2>
            <p>
              Finally, add keywords that guide the AI towards a high-quality result. Common modifiers include: "4k," "8k," "highly detailed," "cinematic," "masterpiece," and "photorealistic."
            </p>
            <p>
              Putting it all together, a simple prompt like "a car" can become "A cinematic photo of a vintage red sports car driving on a coastal road at dusk, highly detailed, 8k."
            </p>
            <p>
              Experimentation is key! Don't be afraid to try different combinations and see what the AI creates. Happy prompting!
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
