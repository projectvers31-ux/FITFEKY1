export const FAQS: { q: string; a: string }[] = [
  {
    q: "Is FitFeky really free?",
    a: "Yes — every calculator, the quiz, the guides, and the newsletter are 100% free, no sign-up required. We earn a small commission if you buy a product through one of our affiliate links, but that never influences our reviews or recommendations.",
  },
  {
    q: "Why focus on women? Aren't calories just calories?",
    a: "Hormones, menstrual cycles, perimenopause, postpartum, PCOS, and thyroid health all change how your body responds to food and training. We build our calculators and guides around those realities — not around the male default most fitness apps use.",
  },
  {
    q: "Are the calculators accurate?",
    a: "They use the same validated equations (Mifflin-St Jeor, US Navy, Karvonen) you'll find in clinical settings, then layer in women-specific adjustments. They're not a replacement for bloodwork or a doctor's advice, but they give a much more useful starting point than most generic tools.",
  },
  {
    q: "I have a medical condition. Can I use your tools?",
    a: "Our tools are educational and assume a generally healthy adult. If you're pregnant, postpartum, on medication, or managing a condition like PCOS, thyroid issues, or an eating disorder, please work with your doctor or a registered dietitian alongside any plan you start here.",
  },
  {
    q: "How do you choose which products to recommend?",
    a: "Our editorial team (and a panel of women testers) actually try products for at least 30 days before we recommend them. We say no far more often than yes — and we never accept payment for placement.",
  },
  {
    q: "I tried everything. Why would this work?",
    a: "That's exactly why we built FitFeky. Most plans are designed for a 25-year-old man. Take the quiz, run your numbers, and start with one small change this week — the difference is usually the inputs, not you.",
  },
]

export function FaqSection() {
  return (
    <section
      className="border-y border-border/60 bg-gradient-to-b from-cream/30 to-background py-20 lg:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl"
          >
            Honest answers, before you start.
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Still have a question? We read every email.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-2">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-border/60 bg-card/70 px-2 open:bg-card open:shadow-md [&_summary]:marker:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-base font-semibold">
                <span>{item.q}</span>
                <span
                  aria-hidden
                  className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
