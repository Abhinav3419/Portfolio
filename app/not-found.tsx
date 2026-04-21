import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center pt-32">
      <div className="container-edge max-w-3xl">
        <p className="eyebrow">Error · 404</p>
        <h1 className="display-h1 mt-6 text-ink">
          That page <span className="italic text-accent">doesn't exist</span>.
        </h1>
        <p className="mt-8 text-[17px] leading-relaxed text-muted">
          The URL may be mistyped, or the content may have moved as the portfolio
          continues to evolve. The link below returns to the main page.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link href="/" className="btn-primary group">
            Back to portfolio
            <ArrowUpRight size={15} className="arrow-slide" />
          </Link>
          <Link href="/#work" className="btn-ghost">
            View the work
          </Link>
        </div>
      </div>
    </section>
  );
}
