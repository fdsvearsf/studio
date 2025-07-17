import { Header } from '@/components/header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function HowToGeneratePromptsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-4 sm:py-8">
        <article className="max-w-2xl mx-auto">
          <Link href="/blog" passHref>
            <Button variant="outline" className="mb-4 sm:mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold mb-4">How to Generate AI Image Editing Prompts on PromptPix</h1>
          <p className="text-muted-foreground mb-6 text-xs sm:text-base">Posted on {new Date().toLocaleDateString()}</p>
          
          <div className="relative aspect-video w-full mb-6 sm:mb-8 rounded-lg overflow-hidden">
             <Image
                src="https://bjndyu4zavci6r2z.public.blob.vercel-storage.com/images/promptpix%20bd%20AI%20Photo%20Editing%20%281%29.png"
                alt="PromptPix AI Photo Editor"
                fill
                className="object-cover"
                data-ai-hint="logo brand"
              />
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-3 text-xs sm:text-base text-muted-foreground">
            <p>
              PromptPix is designed to be your go-to source for high-quality AI image prompts. Our goal is to make the process of creating stunning AI art as simple as possible. This guide will walk you through how to find and generate prompts on our platform.
            </p>
            <h2 className="text-lg sm:text-2xl font-semibold pt-2 sm:pt-4 text-foreground">Step 1: Browse the Gallery</h2>
            <p>
              The home page of PromptPix features a vast gallery of AI-generated images. You can scroll through categories like "New" and "Trending" to discover different styles and concepts. Each image is a direct result of a specific prompt, giving you a preview of what you can create.
            </p>
            <h2 className="text-lg sm:text-2xl font-semibold pt-2 sm:pt-4 text-foreground">Step 2: Select an Image</h2>
            <p>
              When you find an image that inspires you, simply click on it. This will take you to the prompt detail page, where you'll see a larger version of the image.
            </p>
            <h2 className="text-lg sm:text-2xl font-semibold pt-2 sm:pt-4 text-foreground">Step 3: Generate the Prompt</h2>
            <p>
              On the detail page, you'll find a prominent "Generate Prompt" button. Clicking this button initiates a short animation, and then the exact prompt used to create the image is revealed. This ensures you get the precise instructions needed to replicate or modify the art style.
            </p>
             <h2 className="text-lg sm:text-2xl font-semibold pt-2 sm:pt-4 text-foreground">Step 4: Copy and Use</h2>
            <p>
              Once the prompt is revealed, a "Copy Prompt" button will appear. With one click, the text is copied to your clipboard, ready to be pasted into your favorite AI art generator like Midjourney, DALL-E 3, or Stable Diffusion. It's that easy!
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
