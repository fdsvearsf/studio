import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    title: 'Mastering AI Art: A Beginner\'s Guide to Writing Effective Prompts',
    description: 'Unlock the full potential of AI image generators by learning the art and science of crafting the perfect prompt. This guide covers the basics to get you started.',
    href: '/blog/mastering-ai-art-prompts',
  },
  {
    id: 2,
    title: 'Top 5 AI Art Generators You Should Try in 2024',
    description: 'We review the most popular and powerful AI art tools available today. Find out which one is right for your creative needs.',
    href: '/blog/top-5-ai-art-generators-2024',
  },
  {
    id: 3,
    title: 'Case Study: How a Small Business Used AI Art for Their Marketing',
    description: 'Discover how AI-generated visuals helped a startup create a stunning brand identity without a big budget. A real-world example of AI in action.',
    href: '/blog/case-study-ai-art-marketing',
  }
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">PromptPix Blog</h1>
          <p className="text-center text-muted-foreground mb-12">
            Tutorials, guides, and insights into the world of AI art and prompt engineering.
          </p>
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">{post.title}</CardTitle>
                  <CardDescription className="pt-2">{post.description}</CardDescription>
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
      <Footer />
    </div>
  );
}
