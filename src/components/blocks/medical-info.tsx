import {
  Stethoscope,
  Pill,
  Heart,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Brain,
  Salad,
} from "lucide-react"

const TOPICS = [
  {
    icon: Activity,
    title: "Caloric deficit fundamentals",
    body: "A modest, sustained caloric deficit (typically 300–500 kcal/day) is the most reliable lever for fat loss in clinical literature. Extreme deficits (1,000+ kcal) raise cortisol and risk muscle loss — especially in women over 35.",
  },
  {
    icon: Salad,
    title: "Protein for satiety & lean mass",
    body: "Research supports 1.2–1.6 g of protein per kg of body weight per day for women pursuing fat loss while preserving muscle. Higher protein intake (25–30 g per meal) also improves satiety and post-meal blood sugar control.",
  },
  {
    icon: Brain,
    title: "Hormones: the missing variable",
    body: "Estrogen, progesterone, cortisol, insulin, thyroid, and leptin all influence where and how women store fat. Generic 'eat less, move more' advice often ignores these — and why so many women hit plateaus after 40 or postpartum.",
  },
  {
    icon: Heart,
    title: "Cardiovascular safety",
    body: "Before starting any new exercise program, the American Heart Association recommends a clinical assessment if you have risk factors (hypertension, diabetes, family history). Our free calculators are educational — not a substitute for medical clearance.",
  },
]

const PRINCIPLES = [
  "Sustainable over aggressive: a plan you can follow for 12 months beats a 30-day sprint every time.",
  "Whole foods first; supplements second. No pill replaces sleep, fiber, and movement.",
  "Strength training is medicine: it protects bone density (especially post-menopause) and resting metabolic rate.",
  "Sleep is non-negotiable. Less than 7 hours is associated with 55% higher risk of weight gain in women (Sleep Health, 2023).",
  "Track trends, not days. Weight fluctuates 2–5 lbs daily from water, sodium, and cycle phase.",
]

const CAUTIONS = [
  "If you are pregnant, breastfeeding, or trying to conceive, do not diet without clinical guidance.",
  "A history of disordered eating requires professional support before any calorie target.",
  "Rapid weight loss (>1% of body weight per week) can cause gallstones, hair loss, and menstrual disruption.",
  "Many supplements marketed for 'female fat loss' interact with common medications (thyroid, SSRIs, contraceptives).",
]

export function MedicalInfoSection() {
  return (
    <section
      id="medical-information"
      className="relative border-y border-border/60 bg-gradient-to-b from-background via-cream/30 to-background py-20 lg:py-28"
      aria-labelledby="medical-info-heading"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Stethoscope className="size-3" /> Medical Information
          </span>
          <h2
            id="medical-info-heading"
            className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          >
            The clinical foundation behind our advice.
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            We don&apos;t just curate. We cite, we review, and we work with a
            medical advisor. Here&apos;s what the evidence actually says about
            women&apos;s weight loss.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {TOPICS.map((t) => {
            const Icon = t.icon
            return (
              <div
                key={t.title}
                className="rounded-2xl border border-border/60 bg-card/70 p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-soft to-cream text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t.body}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-success/15 text-success">
                <CheckCircle2 className="size-5" />
              </span>
              <h3 className="text-xl font-semibold tracking-tight">
                Our clinical principles
              </h3>
            </div>
            <ul className="space-y-3">
              {PRINCIPLES.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                  <span className="text-foreground/90">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-gold/20 text-gold-foreground">
                <AlertTriangle className="size-5" />
              </span>
              <h3 className="text-xl font-semibold tracking-tight">
                When to see a clinician
              </h3>
            </div>
            <ul className="space-y-3">
              {CAUTIONS.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-sm">
                  <Pill className="mt-0.5 size-4 shrink-0 text-gold-foreground" />
                  <span className="text-foreground/90">{c}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-muted-foreground">
              FitFeky is an educational resource. It is not medical advice and
              does not establish a doctor-patient relationship.
            </p>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-muted-foreground">
          Reviewed by a member of our medical advisory board. Last reviewed:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </section>
  )
}
