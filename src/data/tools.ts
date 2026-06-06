export interface Tool {
  id: string
  name: string
  description: string
  icon: string
  slug: string
  categories: string[]
  metaTitle: string
  metaDescription: string
  keywords: string[]
  longDescription: string
  howItWorks: { title: string; body: string }[]
  faqs: { question: string; answer: string }[]
  blogIntro: string
}

export const tools: Tool[] = [
  {
    id: "bmi",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index and understand your healthy weight range.",
    icon: "Scale",
    slug: "bmi",
    categories: ["general", "nutrition", "cardio"],
    metaTitle: "BMI Calculator for Women — Free, Instant, Private",
    metaDescription:
      "Free BMI calculator built for women's bodies. Get your Body Mass Index in 30 seconds, see your healthy weight range, and learn what your number really means for hormones, muscle, and metabolism.",
    keywords: [
      "BMI calculator",
      "BMI calculator for women",
      "female BMI calculator",
      "body mass index calculator",
      "healthy BMI range women",
      "BMI chart women",
      "BMI calculator metric",
      "ideal BMI for women",
      "women's BMI by age",
    ],
    longDescription:
      "Body Mass Index (BMI) is a quick screening tool that uses your height and weight to place you in a broad weight category. It was designed for population-level research, not individuals — but it's still the fastest way to anchor a conversation about your healthy weight range. Our BMI calculator for women uses the standard adult formula (kg/m²) and gives you context-specific guidance for female bodies, including the well-known limitation that BMI doesn't distinguish between muscle and fat.",
    howItWorks: [
      {
        title: "Enter your height and weight",
        body: "Use metric (cm + kg) or imperial (ft/in + lb). The calculator converts everything for you.",
      },
      {
        title: "Get your BMI and category",
        body: "Underweight, healthy, overweight, or obese — see exactly where you fall on the standard WHO scale.",
      },
      {
        title: "Read the women's-specific notes",
        body: "Hormonal shifts, muscle mass, and ethnicity all affect what a 'healthy' BMI means for you. We explain it in plain English.",
      },
    ],
    faqs: [
      {
        question: "What is a healthy BMI for women?",
        answer:
          "For adult women, a BMI between 18.5 and 24.9 is generally classified as a healthy weight. However, BMI doesn't account for muscle mass, bone density, age, or ethnicity, so it's a starting point — not a verdict.",
      },
      {
        question: "Is BMI accurate for muscular women?",
        answer:
          "BMI can over-estimate body fat in muscular or athletic women, because muscle weighs more than fat. If you lift weights regularly, pair BMI with a body-fat percentage for the full picture.",
      },
      {
        question: "How often should I check my BMI?",
        answer:
          "Once a month is plenty. Daily fluctuations in water weight make BMI too noisy to track more often. Pair it with a weekly weigh-in and monthly measurements for the most useful trend data.",
      },
      {
        question: "Does BMI change with age?",
        answer:
          "Slightly — muscle mass naturally declines after 30, so a stable BMI in your 40s may hide a higher body-fat percentage. That's why our calculator recommends cross-checking with a body-fat estimate after age 40.",
      },
    ],
    blogIntro:
      "The BMI guide hub — written for women who'd like to understand their number, not just calculate it. Read how hormones, muscle mass, and age change what 'healthy' actually means.",
  },
  {
    id: "calorie",
    name: "Calorie Calculator",
    description: "Find out how many calories you need daily based on your goals.",
    icon: "Flame",
    slug: "calorie",
    categories: ["nutrition", "weight-loss", "bulking"],
    metaTitle: "Calorie Calculator for Women — TDEE + Goal Plan, Free",
    metaDescription:
      "Free calorie calculator for women that uses the Mifflin-St Jeor formula to find your TDEE, then adjusts for fat loss, maintenance, or lean bulk. Built for hormonal cycles, not the average 25-year-old man.",
    keywords: [
      "calorie calculator",
      "calorie calculator for women",
      "TDEE calculator",
      "female calorie calculator",
      "calorie deficit calculator",
      "how many calories should I eat",
      "weight loss calorie calculator",
      "maintenance calories women",
      "calories to lose weight female",
    ],
    longDescription:
      "Most online calorie calculators are calibrated to a 25-year-old man. Yours isn't. Our calorie calculator for women uses the Mifflin-St Jeor BMR equation, multiplies it by your actual activity level, and then layers in your goal — fat loss, maintenance, or lean bulk. It accounts for the realities of female metabolism, including lower average lean mass, hormonal fluctuations across the menstrual cycle, and the way perimenopause shifts energy needs in your 40s.",
    howItWorks: [
      {
        title: "Enter age, height, weight, and activity",
        body: "We use Mifflin-St Jeor — the most accurate validated BMR equation — and multiply by your true activity level, not a guess.",
      },
      {
        title: "Pick your goal",
        body: "Fat loss, maintenance, or lean bulk. We apply a deficit or surplus that research shows is sustainable.",
      },
      {
        title: "Get your daily target",
        body: "See your TDEE and your goal-adjusted calorie number, with cycle-phase and life-stage notes for women.",
      },
    ],
    faqs: [
      {
        question: "How many calories should a woman eat to lose weight?",
        answer:
          "Most active women lose fat sustainably on 1,400–1,800 kcal/day — a 300–500 calorie deficit below TDEE. Going lower than 1,200 kcal risks muscle loss, hormonal disruption, and a stalled metabolism.",
      },
      {
        question: "Should I eat back my exercise calories?",
        answer:
          "Usually no. Most fitness trackers over-estimate calories burned by 20–40%. Use your TDEE from this calculator as your baseline and treat exercise as a bonus, not a license to over-eat.",
      },
      {
        question: "Do calories change during my cycle?",
        answer:
          "Yes — BMR is roughly 5–10% higher in the luteal phase (the week before your period) and lower in the follicular phase. A flat daily target works fine for most women; cycle-syncing helps if you're optimizing.",
      },
      {
        question: "Why am I not losing weight in a deficit?",
        answer:
          "The three usual suspects: (1) under-estimating portions, (2) over-estimating activity, and (3) water retention masking fat loss. Use a food scale for two weeks and re-check your trend after a full menstrual cycle.",
      },
    ],
    blogIntro:
      "Everything we've learned about calories, metabolism, and women's bodies — the science, the myths, and the practical fixes that actually move the scale.",
  },
  {
    id: "macro",
    name: "Macro Calculator",
    description: "Discover your ideal protein, carbs, and fat split.",
    icon: "Utensils",
    slug: "macro",
    categories: ["nutrition", "bulking", "cutting"],
    metaTitle: "Macro Calculator for Women — Protein, Carbs, Fat Split",
    metaDescription:
      "Free macro calculator that splits your daily calories into the right protein, carb, and fat targets for your goal — fat loss, maintenance, or muscle gain. Built for women, no sign-up required.",
    keywords: [
      "macro calculator",
      "macro calculator for women",
      "protein calculator",
      "carb calculator",
      "fat calculator",
      "IIFYM calculator",
      "female macro split",
      "macros for weight loss",
      "macros for muscle gain women",
    ],
    longDescription:
      "Macros — protein, carbs, and fat — are the lever that decides what your body does with the calories you eat. Eat enough protein and you'll keep your muscle in a deficit. Eat too little fat and your hormones will protest. Our macro calculator for women sets protein at 0.8–1.2 g per lb of bodyweight, balances carbs around your training, and keeps fat at 20–30% of total calories to support hormones.",
    howItWorks: [
      {
        title: "Start from your calorie target",
        body: "Enter the same stats you'd use for our calorie calculator — we cross-check with TDEE so your macros add up.",
      },
      {
        title: "Pick your training style",
        body: "Sedentary, lifting 3× a week, endurance, or hybrid. We adjust protein up and carbs around your workouts.",
      },
      {
        title: "Get your P/C/F gram targets",
        body: "See exact grams of protein, carbs, and fat per day — and what each macro actually does in your body.",
      },
    ],
    faqs: [
      {
        question: "How much protein do women need to lose weight?",
        answer:
          "Research supports 0.8–1.2 g of protein per pound of bodyweight to preserve muscle in a deficit. For a 150 lb woman, that's 120–180 g per day. Higher end if you're lifting heavy.",
      },
      {
        question: "Are carbs bad for weight loss?",
        answer:
          "No. Carbs are your body's preferred fuel for training and recovery. The key is timing them around workouts and matching total intake to your goal — not eliminating them.",
      },
      {
        question: "Do I need to track macros to lose fat?",
        answer:
          "Strict tracking isn't required forever, but 2–4 weeks of measuring teaches you what real portions look like. After that, most women can eyeball 80–90% of meals accurately.",
      },
      {
        question: "What's the best macro split for women?",
        answer:
          "There's no single best split. A reasonable starting point is 30% protein, 35% carbs, 25% fat for fat loss, or 30% protein, 45% carbs, 25% fat for active women and lean bulks.",
      },
    ],
    blogIntro:
      "Macro guides built for real women — the protein targets that preserve muscle, the carb timing that fuels training, and the fat floor that keeps your hormones happy.",
  },
  {
    id: "heart-rate",
    name: "Heart Rate Zone Calculator",
    description: "Find your target heart rate zones for fat burn and cardio.",
    icon: "Heart",
    slug: "heart-rate",
    categories: ["cardio", "endurance", "fat-loss"],
    metaTitle: "Heart Rate Zone Calculator — Free, Karvonen Method",
    metaDescription:
      "Free heart rate zone calculator using the Karvonen formula. Find your fat-burn, cardio, and peak zones in 30 seconds. Built for women, with notes on beta-blockers and HRV.",
    keywords: [
      "heart rate zone calculator",
      "target heart rate calculator",
      "Karvonen formula calculator",
      "fat burn zone calculator",
      "max heart rate calculator women",
      "zone 2 heart rate",
      "heart rate training zones",
      "HR zones for women",
    ],
    longDescription:
      "Heart rate training is the single best way to know if your cardio is hard enough — or too hard. Our heart rate zone calculator uses the Karvonen formula (which factors in your resting heart rate, not just your age) to give you five personalized zones: recovery, fat-burn, aerobic, threshold, and max. Train in the right zone and you'll burn more fat, build more endurance, and recover faster.",
    howItWorks: [
      {
        title: "Enter age and resting heart rate",
        body: "Resting HR is the number you measure first thing in the morning. Don't have it? We'll estimate it from your age and sex.",
      },
      {
        title: "We calculate your 5 zones",
        body: "Recovery, fat-burn, aerobic, threshold, and max — all expressed as bpm ranges you can read on a watch.",
      },
      {
        title: "Get a training plan",
        body: "See exactly how much time to spend in each zone per week, based on your goal: fat loss, endurance, or performance.",
      },
    ],
    faqs: [
      {
        question: "What is the fat-burning zone?",
        answer:
          "The fat-burning zone is roughly 60–70% of your max heart rate. You burn a higher percentage of fat here, but total calorie burn is lower. For fat loss, mix Zone 2 with one or two higher-intensity sessions per week.",
      },
      {
        question: "How do I measure resting heart rate?",
        answer:
          "Measure first thing in the morning, before you get out of bed, for three consecutive days. Use a chest strap or the average reading from your watch. The lower the number, the fitter you are — most women sit between 60 and 80 bpm.",
      },
      {
        question: "Is the 220-minus-age formula accurate?",
        answer:
        "It's a rough estimate with a standard deviation of ±10–12 bpm. The Karvonen formula we use is more accurate because it includes your resting heart rate, which reflects your actual fitness level.",
      },
      {
        question: "What if I'm on beta-blockers?",
        answer:
        "Beta-blockers lower your max heart rate significantly. Use a perceived-exertion scale (1–10) instead, or ask your doctor for a stress test to find your true max HR.",
      },
    ],
    blogIntro:
      "The heart rate training hub — Zone 2 for fat loss, threshold for endurance, and everything in between. Read the science, then go train.",
  },
  {
    id: "body-fat",
    name: "Body Fat Calculator",
    description: "Estimate your body fat percentage using the US Navy method.",
    icon: "Percent",
    slug: "body-fat",
    categories: ["general", "cutting", "strength"],
    metaTitle: "Body Fat Calculator for Women — US Navy Method, Free",
    metaDescription:
      "Free body fat calculator for women using the US Navy circumference method. Accurate to within 3–4% when measured correctly. Get your result, your healthy range, and what it means for you.",
    keywords: [
      "body fat calculator",
      "body fat calculator for women",
      "US Navy body fat calculator",
      "body fat percentage women",
      "female body fat calculator",
      "healthy body fat percentage women",
      "lean body mass calculator",
      "how to measure body fat",
    ],
    longDescription:
      "The scale only tells you your total weight — not what it's made of. Our body fat calculator for women uses the US Navy method (a validated circumference formula) to estimate your body-fat percentage from a few simple measurements. It's not as accurate as a DEXA scan, but it's free, instant, and tracks trends well. Pair it with our BMI calculator for a much fuller picture of your health.",
    howItWorks: [
      {
        title: "Take three measurements",
        body: "Neck, waist, and hip circumference in cm or inches. Use a flexible tape measure, snug but not tight.",
      },
      {
        title: "Enter your height",
        body: "We use the US Navy circumference formula, which is accurate to within 3–4% for most women.",
      },
      {
        title: "Get your body fat % and category",
        body: "Essential fat, athlete, fitness, average, or high — see where you fall and what range is healthy for your age.",
      },
    ],
    faqs: [
      {
        question: "What is a healthy body fat percentage for women?",
        answer:
          "For women 20–40, 21–33% is considered the healthy average range. 14–20% is fitness, 14% and below is athlete level. For women over 40, healthy ranges shift slightly higher due to hormonal changes.",
      },
      {
        question: "Is the US Navy method accurate?",
        answer:
          "It correlates strongly with DEXA scans (within 3–4%) when measurements are taken correctly. The biggest source of error is user measurement — a sloppy tape measure can throw results off by 5%+.",
      },
      {
        question: "How often should I measure body fat?",
        answer:
          "Once a month is ideal. Daily or weekly measurements are too noisy — water, glycogen, and digestion all cause short-term swings. Take progress photos in the same lighting for visual context.",
      },
      {
        question: "Can I lose body fat in specific areas?",
        answer:
          "No — spot reduction is a myth. Your body decides where to store and release fat, largely based on genetics and hormones. A sustained deficit plus strength training will reduce fat across your whole body.",
      },
    ],
    blogIntro:
      "Body composition guides for women — what the percentage actually means, how to lower it without losing muscle, and why the number on the scale tells you almost nothing.",
  },
]

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug)
}
