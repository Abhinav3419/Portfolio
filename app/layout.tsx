import type { Metadata } from 'next';
import { Fraunces, IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { profile } from '@/lib/content';

/*
 * Typography pairing:
 *  - Fraunces: editorial display serif with optical sizing. High-character.
 *  - IBM Plex Sans: refined, neutral body face with excellent legibility.
 *  - JetBrains Mono: technical numerics + UI eyebrows.
 */
const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['SOFT', 'opsz'],
});

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://abhinav-pandey.dev'),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description:
    'Portfolio of Abhinav Pandey: ML engineering, physics-informed modelling, and applied research. ENSO free-energy prediction, cultural-calendar demand forecasting, and six original product case studies.',
  keywords: [
    'Machine Learning Engineer',
    'AI Engineer',
    'ML Portfolio',
    'ENSO prediction',
    'Demand forecasting',
    'Product case studies',
    'Abhinav Pandey',
  ],
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  openGraph: {
    type: 'website',
    title: `${profile.name} — ${profile.role}`,
    description:
      'Physics-informed machine learning, demand forecasting with cultural features, and six original product case studies.',
    siteName: `${profile.name} Portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name}`,
    description: 'Machine Learning Engineer · AI Systems · Quantitative Research',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Set initial theme before first paint to avoid FOUC */}
       <script
  dangerouslySetInnerHTML={{
    __html: `
      (function(){
        try {
          var stored = localStorage.getItem('theme');
          var theme = stored || 'dark';
          if (theme === 'dark') document.documentElement.classList.add('dark');
        } catch (_) {
          document.documentElement.classList.add('dark');
        }
      })();
    `,
  }}
/>
      </head>
      <body className="grain font-sans antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
