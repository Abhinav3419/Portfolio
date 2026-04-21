import { Reveal } from './reveal';

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display-h2 mt-4 text-ink">{title}</h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-muted">
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
