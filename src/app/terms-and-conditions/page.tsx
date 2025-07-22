import { Header } from '@/components/header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TermsAndConditionsPage() {
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
          <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
          <div className="space-y-4 text-muted-foreground">
            <h2 className="text-xl font-semibold pt-4">1. Introduction</h2>
            <p>
              These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, PromptPix accessible at this domain. These Terms will be applied fully and affect your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here.
            </p>
            <h2 className="text-xl font-semibold pt-4">2. Intellectual Property Rights</h2>
            <p>
              Other than the content you own, under these Terms, PromptPix and/or its licensors own all the intellectual property rights and materials contained in this Website.
            </p>
            <h2 className="text-xl font-semibold pt-4">3. Restrictions</h2>
            <p>
              You are specifically restricted from all of the following: publishing any Website material in any other media; selling, sublicensing and/or otherwise commercializing any Website material; publicly performing and/or showing any Website material; using this Website in any way that is or may be damaging to this Website.
            </p>
            <h2 className="text-xl font-semibold pt-4">4. Limitation of liability</h2>
            <p>
              In no event shall PromptPix, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.
            </p>
            <h2 className="text-xl font-semibold pt-4">5. Governing Law & Jurisdiction</h2>
            <p>
              These Terms will be governed by and interpreted in accordance with the laws of the jurisdiction in which the company is established, and you submit to the non-exclusive jurisdiction of the state and federal courts located in that jurisdiction for the resolution of any disputes.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
