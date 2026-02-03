import React from 'react';
import Link from 'next/link';
import DonateButton from './DonateButton';
import type { Locale } from '@/i18n-config';

interface FooterProps {
  locale: Locale;
  dictionary: {
    nav: {
      blog: string;
    };
    footer: {
      copyright: string;
      privacyPolicy: string;
      termsOfService: string;
      contactUs: string;
      brandDescription: string;
    };
    donate: {
      title: string;
      description: string;
      koFi: string;
      paypal: string;
      buyMeACoffee: string;
    };
  };
}

const Footer: React.FC<FooterProps> = ({ locale, dictionary }) => {
  return (
    <footer className="bg-white border-t border-stone-100 py-20 mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">

          {/* Brand */}
          <div className="max-w-sm">
            <h4 className="font-serif text-2xl text-zen-text mb-6 font-bold tracking-wide">SERENE MIND</h4>
            <p className="text-zen-text/60 text-sm font-light leading-relaxed mb-6">
              {dictionary.footer.brandDescription}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
            {/* Donate Section */}
            <div className="w-full md:w-auto p-8 bg-gradient-to-br from-zen-accent/5 to-zen-accent/10 rounded-2xl border border-zen-accent/20">
              <DonateButton locale={locale} dictionary={dictionary} />
            </div>
          </div>
        </div>

        <div className="border-t border-stone-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zen-muted">
          <p>
            &copy; {new Date().getFullYear()} Serene Mind Blog. {dictionary.footer.copyright}{' '}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zen-accent transition-colors font-medium"
            >
              CC BY 4.0
            </a>
          </p>
          <div className="flex gap-8 mt-4 md:mt-0 font-medium">
            <Link href={`/${locale}/privacy-policy`} className="hover:text-zen-accent transition-colors">
              {dictionary.footer.privacyPolicy}
            </Link>
            <Link href={`/${locale}/terms-of-service`} className="hover:text-zen-accent transition-colors">
              {dictionary.footer.termsOfService}
            </Link>
            <Link href={`/${locale}/contact`} className="hover:text-zen-accent transition-colors">
              {dictionary.footer.contactUs}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;