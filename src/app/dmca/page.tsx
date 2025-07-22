import { Header } from '@/components/header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function DmcaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 pb-20">
        <div className="max-w-2xl mx-auto">
          <Link href="/" passHref>
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-4">DMCA Policy</h1>
          <div className="space-y-4 text-muted-foreground">
            <p>
              PromptPix respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond promptly to notices of alleged copyright infringement that are duly reported to our Designated Copyright Agent.
            </p>
            <p>
              If you are a copyright owner, or are authorized to act on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement, please submit your claim via email to <a href="mailto:support@promptpix.org" className="text-primary hover:underline">support@promptpix.org</a>, with the subject line: "DMCA Takedown Request".
            </p>
            <p>
              Your claim must include the following information:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>A description of the copyrighted work that you claim has been infringed.</li>
              <li>The URL(s) of the allegedly infringing material on our site.</li>
              <li>Your full name, address, telephone number, and email address.</li>
              <li>A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
              <li>A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or are authorized to act on the copyright owner's behalf.</li>
              <li>An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
