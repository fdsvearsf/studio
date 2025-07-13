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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Case Study: How a Small Business Used AI Art for Their Marketing</h1>
          <p className="text-muted-foreground mb-6">Posted on {new Date().toLocaleDateString()}</p>
          
          <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
             <Image
                src="https://placehold.co/600x400.png"
                alt="Marketing materials with AI art"
                fill
                className="object-cover"
                data-ai-hint="marketing materials"
              />
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-4 text-muted-foreground">
            <p>
              For small businesses and startups, creating high-quality marketing visuals can be a major expense. Professional photography, graphic design, and stock photo licenses can quickly add up. This case study explores how a fictional coffee startup, "Quantum Brew," leveraged AI art to build a compelling brand identity on a shoestring budget.
            </p>
            <h2 className="text-2xl font-semibold pt-4 text-foreground">The Challenge</h2>
            <p>
              Quantum Brew needed a logo, social media content, packaging designs, and website graphics. Their budget for visual assets was virtually zero. They needed a solution that was fast, affordable, and could produce unique, high-quality images.
            </p>
            <h2 className="text-2xl font-semibold pt-4 text-foreground">The Solution: Prompt Engineering</h2>
            <p>
              The founders turned to AI art generators. By learning the basics of prompt engineering, they were able to create a whole suite of brand assets. Their key prompt combined elements of their brand name with a desired aesthetic: "A minimalist logo for a coffee brand named Quantum Brew, featuring a coffee bean and an atom symbol, vector art, clean lines."
            </p>
            <p>
              For their social media, they generated an endless stream of creative images with prompts like: "A steaming cup of coffee on a table in a futuristic cafe, cinematic lighting, photorealistic."
            </p>
            <h2 className="text-2xl font-semibold pt-4 text-foreground">The Results</h2>
            <p>
              Within a week, Quantum Brew had a complete set of visual assets that looked professional and cohesive. They saved thousands of dollars in design and licensing fees. Their unique, AI-generated images helped them stand out on social media, attracting early customers and building a strong brand presence from day one.
            </p>
            <p>
              This case study demonstrates that AI art is not just a novelty; it's a powerful tool that can level the playing field, allowing small businesses to compete with larger companies in the visual-first world of online marketing.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
