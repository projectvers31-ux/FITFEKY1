export interface Reviewer {
  id: string
  name: string
  age?: number
  role: string
  photo: string
  verified: boolean
}

export interface ProductReview {
  id: string
  productId: string
  reviewerId: string
  rating: number
  title: string
  body: string
  beforeQuote: string
  afterQuote: string
  timeframe: string
  result?: string
  helpful: number
  date: string
  beforeImage?: string
  afterImage?: string
}

export const REVIEWERS: Reviewer[] = [
  {
    id: "r1",
    name: "Maya R.",
    age: 38,
    role: "Mom of 2 · Postpartum",
    photo: "/images/reviews/reviewer-1.jpg",
    verified: true,
  },
  {
    id: "r2",
    name: "Priya S.",
    age: 47,
    role: "Perimenopause",
    photo: "/images/reviews/reviewer-2.jpg",
    verified: true,
  },
  {
    id: "r3",
    name: "Elena V.",
    age: 29,
    role: "PCOS",
    photo: "/images/reviews/reviewer-3.jpg",
    verified: true,
  },
  {
    id: "r4",
    name: "Hannah K.",
    age: 34,
    role: "Beginner · Lost 18 lbs",
    photo: "/images/reviews/reviewer-4.jpg",
    verified: true,
  },
  {
    id: "r5",
    name: "Jasmine T.",
    age: 42,
    role: "Strength training",
    photo: "/images/reviews/reviewer-5.jpg",
    verified: true,
  },
  {
    id: "r6",
    name: "Olivia M.",
    age: 26,
    role: "Yoga instructor",
    photo: "/images/reviews/reviewer-6.jpg",
    verified: true,
  },
  {
    id: "r7",
    name: "Sofia D.",
    age: 51,
    role: "Menopause · Lost 22 lbs",
    photo: "/images/reviews/reviewer-7.jpg",
    verified: true,
  },
  {
    id: "r8",
    name: "Zoe L.",
    age: 31,
    role: "Runner · Endurance",
    photo: "/images/reviews/reviewer-8.jpg",
    verified: true,
  },
]

export const REVIEWS: ProductReview[] = [
  {
    id: "rev-1",
    productId: "resistance-bands-set",
    reviewerId: "r1",
    rating: 5,
    title: "Finally — a workout that fits between nap times",
    body: "I bought these after my second baby because I couldn't justify a gym membership with two under 3. The bands pack into a diaper bag. I do 20-min glute and arm circuits during nap time and have visible muscle tone in 6 weeks. The door anchor is genius — turns the bathroom doorway into a cable machine. My only complaint: I wish I'd bought the set sooner.",
    beforeQuote: "I was so tired of doing the same 3 exercises with no progress. My arms felt soft and my back ached from carrying the kids.",
    afterQuote: "My arms are visibly stronger, my posture is better, and I actually look forward to my 'quiet 20' while they nap.",
    timeframe: "6 weeks",
    result: "Visible muscle tone · Better posture",
    helpful: 247,
    date: "2026-04-12",
    beforeImage: "/images/reviews/before-1.jpg",
    afterImage: "/images/reviews/after-1.jpg",
  },
  {
    id: "rev-2",
    productId: "resistance-bands-set",
    reviewerId: "r4",
    rating: 5,
    title: "Lost 18 lbs without stepping on a treadmill",
    body: "I'm a true beginner. I was intimidated by free weights, but bands felt approachable. I paired the workouts with the FitFeky macro calculator and dropped 18 lbs in 3 months. The 5 resistance levels mean I never 'graduate' — I just move up. Worth every dollar.",
    beforeQuote: "I avoided working out because I didn't know what to do and felt overwhelmed at the gym.",
    afterQuote: "I have a routine I actually enjoy. Strength is up, weight is down, and I don't dread it.",
    timeframe: "12 weeks",
    result: "-18 lbs",
    helpful: 412,
    date: "2026-03-28",
  },
  {
    id: "rev-3",
    productId: "yoga-mat-premium",
    reviewerId: "r6",
    rating: 5,
    title: "I teach 6 classes a week on this mat",
    body: "Bought it for home practice, ended up using it more than my studio mat. The 6mm cushion is the sweet spot — my knees can do 60-minute flows without going numb. The alignment lines on top are a small thing that makes a real difference for beginners I teach.",
    beforeQuote: "I was using a thin $15 mat. My wrists and knees always hurt by the end of class.",
    afterQuote: "No more joint pain. I bought a second one for my partner so we could flow together at home.",
    timeframe: "Daily use · 4 months",
    helpful: 189,
    date: "2026-05-02",
    beforeImage: "/images/reviews/before-2.jpg",
    afterImage: "/images/reviews/after-2.jpg",
  },
  {
    id: "rev-4",
    productId: "whey-protein",
    reviewerId: "r2",
    rating: 4,
    title: "Cravings finally under control at 47",
    body: "I added one scoop to my morning smoothie during perimenopause when cravings were out of control. 25g of protein in the morning kept me full for hours. I went from constant grazing to three real meals. Down 14 lbs in 8 weeks. The vanilla is the best — chocolate is fine but a bit chalky.",
    beforeQuote: "I was snacking every 90 minutes. No amount of willpower was working — it felt hormonal.",
    afterQuote: "Stable energy, fewer cravings, and I actually look forward to my breakfast now.",
    timeframe: "8 weeks",
    result: "-14 lbs",
    helpful: 356,
    date: "2026-04-22",
  },
  {
    id: "rev-5",
    productId: "kitchen-scale",
    reviewerId: "r3",
    rating: 5,
    title: "Made macro tracking finally click for me",
    body: "I'd been 'eyeballing' for years and overestimating everything. The first week I used the scale I was shocked — my 'half cup' of oats was actually a full cup. That single change is what broke my PCOS plateau. Tare function is fast, the unit conversion is one tap, and it tucks into a drawer.",
    beforeQuote: "I was eating the 'right' foods but the wrong portions. My weight hadn't moved in 4 months.",
    afterQuote: "-8 lbs in 6 weeks without feeling deprived. The scale is the unsexy hero of my journey.",
    timeframe: "6 weeks",
    result: "-8 lbs · Broke plateau",
    helpful: 521,
    date: "2026-05-09",
  },
  {
    id: "rev-6",
    productId: "foam-roller",
    reviewerId: "r5",
    rating: 5,
    title: "My IT band issues are 80% gone",
    body: "I was foam rolling 3x/week for tight quads and IT band from running. The high-density version is no joke — you feel it work, not just a gentle rub. After 3 weeks my knees stopped hurting on long runs. Game changer for the price.",
    beforeQuote: "I had constant knee tightness that cut my runs short.",
    afterQuote: "I can run 5 miles without knee pain. Sleep better too — less tossing from tight legs.",
    timeframe: "3 weeks",
    helpful: 198,
    date: "2026-04-30",
  },
  {
    id: "rev-7",
    productId: "jump-rope",
    reviewerId: "r8",
    rating: 5,
    title: "Burns more than my old 30-min runs",
    body: "I was plateaued on long, slow runs. Switched to 15-min jump rope intervals and the weight finally budged. Bearings are buttery smooth — no tangling. 300 calories in 20 minutes, in my living room, while watching TV.",
    beforeQuote: "I was doing 30-min runs 4x/week and not losing weight. Boredom was killing my consistency.",
    afterQuote: "-6 lbs in 4 weeks, plus my cardio capacity is up. I look forward to it.",
    timeframe: "4 weeks",
    result: "-6 lbs · Better cardio",
    helpful: 287,
    date: "2026-05-15",
  },
  {
    id: "rev-8",
    productId: "fitness-tracker",
    reviewerId: "r7",
    rating: 5,
    title: "Caught a sleep issue my doctor missed",
    body: "I'm 51 and the tracker flagged that my resting heart rate was climbing week over week. I mentioned it to my doctor and we found an underactive thyroid. Caught it early. Beyond the medical win, the sleep tracking helped me realize my late-night wine was destroying my REM.",
    beforeQuote: "I felt tired all the time and just assumed it was 'menopause'.",
    afterQuote: "I have data, not guesses. I sleep better, move more, and caught a real health issue.",
    timeframe: "3 months",
    helpful: 678,
    date: "2026-03-18",
  },
  {
    id: "rev-9",
    productId: "adjustable-dumbbells",
    reviewerId: "r5",
    rating: 5,
    title: "One purchase replaced my whole gym",
    body: "I was paying $89/month for a gym I used twice a week. Bought the adjustable set, set up a corner of my garage, and now I lift 4x/week. Build quality is solid — my partner drops them and they don't budge.",
    beforeQuote: "I kept paying for a membership I wasn't using because of guilt.",
    afterQuote: "I cancelled the membership, lift more than ever, and broke a 2-year strength plateau.",
    timeframe: "8 weeks",
    result: "4x/week strength training · Plateau broken",
    helpful: 445,
    date: "2026-04-05",
  },
  {
    id: "rev-10",
    productId: "pre-workout",
    reviewerId: "r3",
    rating: 4,
    title: "Works, but the tingle is real",
    body: "I was skeptical of pre-workout — I drink coffee and figured it was redundant. The 200mg caffeine is a noticeable bump without jitters, and the beta-alanine tingle is something you get used to. Pushed my lifts by 5-10 lbs in 3 weeks. Wish it had a non-stim version for evenings.",
    beforeQuote: "I was plateaued on my lifts and dragging through afternoon sessions.",
    afterQuote: "PR'd my squat and deadlift in 3 weeks. Energy is cleaner than coffee.",
    timeframe: "3 weeks",
    helpful: 167,
    date: "2026-05-20",
  },
  {
    id: "rev-11",
    productId: "kettlebell",
    reviewerId: "r4",
    rating: 5,
    title: "20 lbs is the perfect starting weight",
    body: "I've never been strong — always the smallest weights at the gym. The 20lb kettlebell let me do swings, goblet squats, and Turkish get-ups at home without intimidation. Vinyl didn't scratch my floors. After 10 weeks I upgraded to a 25lb and felt like a different person.",
    beforeQuote: "I felt weak and avoided strength work because it felt complicated and intimidating.",
    afterQuote: "Stronger than I've ever been. My partner notices. I notice. Confidence is up.",
    timeframe: "10 weeks",
    helpful: 234,
    date: "2026-04-19",
  },
  {
    id: "rev-12",
    productId: "resistance-bands-set",
    reviewerId: "r2",
    rating: 4,
    title: "Great for travel, slightly less for home",
    body: "I bought these for hotel-room workouts on work trips. For that purpose — 10/10. They pack flat and the door anchor works in any room. At home, I prefer my dumbbells for heavier work, but the bands still get used for warm-ups and mobility daily.",
    beforeQuote: "Hotel gyms are unpredictable and I kept skipping workouts on the road.",
    afterQuote: "I never miss a workout when I travel now. Consistency is the whole game.",
    timeframe: "3 months",
    helpful: 142,
    date: "2026-05-04",
  },
]

export function getReviewsForProduct(productId: string): ProductReview[] {
  return REVIEWS.filter((r) => r.productId === productId)
}

export function getReviewerById(id: string): Reviewer | undefined {
  return REVIEWERS.find((r) => r.id === id)
}

export function getAverageUserRating(productId: string): {
  rating: number
  count: number
} {
  const list = getReviewsForProduct(productId)
  if (list.length === 0) return { rating: 0, count: 0 }
  const avg = list.reduce((sum, r) => sum + r.rating, 0) / list.length
  return { rating: Math.round(avg * 10) / 10, count: list.length }
}
