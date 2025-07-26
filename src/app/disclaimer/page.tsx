import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function DisclaimerPage() {
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
          <h1 className="text-3xl font-bold mb-4">Disclaimer</h1>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The information and tools provided by PromptPix are for general informational and educational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information or tools on the site.
            </p>
            <p>
              The AI tools and generated content featured on PromptPix are intended for research, inspiration, and educational use. Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.
            </p>
            <p>
              The site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
