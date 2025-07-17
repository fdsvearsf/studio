import { Header } from '@/components/header';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    title: 'How to Generate AI Image Editing Prompts on PromptPix',
    description: 'Learn the step-by-step process of finding, generating, and using high-quality prompts from PromptPix to create stunning AI images.',
    href: '/blog/how-to-generate-prompts-on-promptpix',
  },
  {
    id: 2,
    title: 'PromptPix Review: What It Is and How It Works',
    description: 'An in-depth look at PromptPix, a powerful directory for AI image prompts. Discover its features and how it can streamline your creative workflow.',
    href: '/blog/promptpix-review',
  },
  {
    id: 3,
    title: 'How to Edit Photos Using PromptPix Prompts in ChatGPT, Grok, and Other AI Tools',
    description: 'A practical guide on taking prompts from PromptPix and using them effectively in popular AI tools like ChatGPT (DALL-E 3), Grok, and more.',
    href: '/blog/how-to-edit-photos-with-prompts',
  }
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/" passHref>
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-center">PromptPix Blog</h1>
          <p className="text-sm sm:text-base text-center text-muted-foreground mb-12">
            Tutorials, guides, and insights into the world of AI art and prompt engineering.
          </p>
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">{post.title}</CardTitle>
                  <CardDescription className="pt-2 text-sm">{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline">
                    <Link href={post.href}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
