import { Header } from '@/components/header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function HowToUsePromptsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-4 pb-20">
        <article className="max-w-2xl mx-auto">
          <Link href="/blog" passHref>
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
          <h1 className="text-2xl font-bold mb-4">How to Edit Photos Using PromptPix Prompts in ChatGPT, Grok, and Other AI Tools</h1>
          <p className="text-muted-foreground mb-6 text-xs">Posted on {new Date().toLocaleDateString()}</p>
          
          <div className="relative aspect-video w-full mb-6 rounded-lg overflow-hidden">
             <Image
                src="https://bjndyu4zavci6r2z.public.blob.vercel-storage.com/images/promptpix%20bd%20AI%20Photo%20Editing%20%281%29.png"
                alt="PromptPix AI Photo Editor"
                fill
                className="object-cover"
                data-ai-hint="logo brand"
              />
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-3 text-xs text-muted-foreground">
            <p>
              Getting a great prompt from PromptPix is just the first step. The real magic happens when you use that prompt in a powerful AI model. This guide explains how to use your copied prompts in popular tools.
            </p>
            <h2 className="text-lg font-semibold pt-2 text-foreground">Using Prompts in ChatGPT (with DALL-E 3)</h2>
            <p>
              For users with a ChatGPT Plus subscription, DALL-E 3 is directly integrated. The process is simple:
            </p>
            <ol className="list-decimal list-inside space-y-1">
                <li>Generate and copy a prompt from PromptPix.</li>
                <li>Open a new conversation in ChatGPT.</li>
                <li>Paste the prompt directly into the message box. You can use it as-is or modify it. For example, you could add "Create an image of..." to the beginning of the prompt.</li>
                <li>Send the message, and ChatGPT will generate the image for you.</li>
            </ol>
            
            <h2 className="text-lg font-semibold pt-2 text-foreground">Using Prompts in Grok, Gemini, and Other Chatbots</h2>
            <p>
              Many modern AI chatbots, including Grok and Google's Gemini, have image generation capabilities. While the exact interface may vary, the core principle is the same.
            </p>
            <p>
                Simply paste the prompt you copied from PromptPix into the chat interface. These models are designed to understand natural language requests, and a well-structured prompt from our site will give them clear instructions on what to create.
            </p>
            
            <h2 className="text-lg font-semibold pt-2 text-foreground">Tips for Best Results</h2>
            <ul className="list-disc list-inside space-y-1">
                <li><strong>Don't Be Afraid to Modify:</strong> Think of prompts from PromptPix as a starting point. Change colors, subjects, or styles to make the creation your own. For example, change "a red car" to "a blue spaceship."</li>
                <li><strong>Combine Prompts:</strong> Take elements from multiple prompts to create something entirely new and unique.</li>
                <li><strong>Iterate:</strong> Your first result might not be perfect. Tweak the prompt and try again. Sometimes a small change can make a big difference.</li>
            </ul>
            <p>
              By leveraging the high-quality prompts from PromptPix, you can save time and effort, allowing you to focus on the creative aspect of AI art generation across any platform you choose.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
