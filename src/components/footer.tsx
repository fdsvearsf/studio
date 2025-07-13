import Link from 'next/link';

const footerLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-and-conditions', label: 'Terms & Conditions' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/dmca', label: 'DMCA' },
];

export function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {footerLinks.map(link => (
            <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="text-center text-xs text-muted-foreground mt-6">
          <p>&copy; {new Date().getFullYear()} PromptPix. All Rights Reserved.</p>
          <p>
            Contact us: <a href="mailto:support@promptpix.org" className="hover:text-primary">support@promptpix.org</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
