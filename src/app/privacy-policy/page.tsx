import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <div className="space-y-4 text-muted-foreground">
            <p>
              This Privacy Policy describes how your personal information is collected, used, and shared when you visit or use PromptPix (the "Site").
            </p>
            <h2 className="text-xl font-semibold pt-4">Information We Collect</h2>
            <p>
              When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
            </p>
            <h2 className="text-xl font-semibold pt-4">Advertising and Analytics</h2>
            <p>
              We use third-party services like Google AdMob and Google Analytics to help us understand how our users use the Site and to serve advertisements. These services may use cookies and other tracking technologies to collect information about your use of the Site and other websites, including your IP address, web browser, pages viewed, time spent on pages, and links clicked.
            </p>
            <p>
              This information is used to, among other things, analyze and track data, determine the popularity of certain content, and deliver advertising targeted to your interests.
            </p>
            <h2 className="text-xl font-semibold pt-4">Your Rights</h2>
            <p>
              You have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
            </p>
            <h2 className="text-xl font-semibold pt-4">Contact Us</h2>
            <p>
              For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <a href="mailto:support@promptpix.org" className="text-primary hover:underline">support@promptpix.org</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
