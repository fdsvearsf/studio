import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function ContactUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link href="/" passHref>
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <div className="space-y-4 text-muted-foreground">
            <p>
              We'd love to hear from you! If you have any questions, feedback, or inquiries, please don't hesitate to get in touch with us.
            </p>
            <p>
              For general support, questions about our tools, or any other issues, you can reach us via email. We strive to respond to all inquiries within 48 hours.
            </p>
            <p>
              <strong>Support Email:</strong> <a href="mailto:support@promptpix.org" className="text-primary hover:underline">support@promptpix.org</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
