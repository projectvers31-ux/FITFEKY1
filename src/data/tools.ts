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
    description: "Check your BMI and what it means for fat loss, hormones, and health.",
    icon: "Scale",
    slug: "bmi",
    categories: ["general", "nutrition", "cardio"],
    metaTitle: "BMI Calculator for Women: Check Your Healthy Weight Range",
    metaDescription:
      "What your BMI really says about belly fat, hormones, and metabolism. Free BMI calculator for women — get your number in 30 seconds, no email needed.",
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
      "BMI for weight loss",
      "healthy weight range women",
      "am I overweight calculator",
      "BMI for women over 40",
      "BMI vs body fat",
    ],
    longDescription:
      "Body Mass Index (BMI) is a quick screening tool that uses your height and weight to place you in a broad weight category. It was designed for population-level research, not individuals — but it's still the fastest way to anchor a conversation about your healthy weight range. Our BMI calculator for women uses the standard adult formula (kg/m²) and gives you context-specific guidance for female bodies, including the well-known limitation that BMI doesn't distinguish between muscle and fat. For women, factors like hormonal shifts during menopause, pregnancy history, and natural muscle-to-fat ratio differences mean your BMI needs to be interpreted with context — which is exactly what our calculator does.",
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
          "For adult women, a BMI between 18.5 and 24.9 is generally classified as a healthy weight. However, BMI doesn't account for muscle mass, bone density, age, or ethnicity, so it's a starting point — not a verdict. Women over 40 may have a higher body fat percentage at the same BMI due to hormonal changes.",
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
      {
        question: "Can I have a healthy BMI and still have belly fat?",
        answer:
          "Yes — this is called 'normal weight obesity.' You can have a BMI in the healthy range but a high body-fat percentage, especially around the midsection. That's why we recommend using our body fat calculator alongside BMI for the real picture.",
      },
    ],
    blogIntro:
      "The BMI guide hub — written for women who'd like to understand their number, not just calculate it. Read how hormones, muscle mass, and age change what 'healthy' actually means.",
  },
  {
    id: "calorie",
    name: "Calorie Calculator",
    description: "How many calories to lose belly fat — based on your body, not a formula.",
    icon: "Flame",
    slug: "calorie",
    categories: ["nutrition", "weight-loss", "bulking"],
    metaTitle: "Calorie Calculator for Women: How Many Calories to Lose Weight",
    metaDescription:
      "Stop guessing. Get your exact daily calories for fat loss based on your age, height, activity, and goal. Free TDEE calculator built for women's bodies. 30 seconds, no sign-up.",
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
      "calorie calculator to lose belly fat",
      "TDEE calculator for women",
      "how many calories to lose weight",
      "calorie deficit for women",
      "Mifflin St Jeor calculator",
    ],
    longDescription:
      "Most online calorie calculators are calibrated to a 25-year-old man. Yours isn't. Our calorie calculator for women uses the Mifflin-St Jeor BMR equation — the most accurate validated formula — multiplies it by your actual activity level, and then layers in your goal: fat loss, maintenance, or lean bulk. It accounts for the realities of female metabolism, including lower average lean mass, hormonal fluctuations across the menstrual cycle, and the way perimenopause shifts energy needs in your 40s. If you've been eating 1,200 calories and wondering why you're not losing weight, this calculator will show you why — and what to do instead.",
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
      {
        question: "What's the minimum calories for a woman per day?",
        answer:
          "Generally 1,200 kcal for sedentary women and 1,400–1,500 for active women. Below these levels, it becomes very difficult to meet your micronutrient needs, and your body can down-regulate metabolism in response.",
      },
    ],
    blogIntro:
      "Everything we've learned about calories, metabolism, and women's bodies — the science, the myths, and the practical fixes that actually move the scale.",
  },
  {
    id: "macro",
    name: "Macro Calculator",
    description: "Your exact protein, carbs, and fat grams to burn fat and keep muscle.",
    icon: "Utensils",
    slug: "macro",
    categories: ["nutrition", "bulking", "cutting"],
    metaTitle: "Macro Calculator for Women: Lose Fat Without Losing Muscle",
    metaDescription:
      "The exact protein, carbs, and fat grams to burn fat and keep muscle. Personalized macro calculator for women — free, instant, no sign-up.",
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
      "macros for fat loss female",
      "protein carb fat calculator",
      "best macros for women",
      "macro counting for women",
      "how to count macros",
    ],
    longDescription:
      "Macros — protein, carbs, and fat — are the lever that decides what your body does with the calories you eat. Eat enough protein and you'll keep your muscle in a deficit. Eat too little fat and your hormones will protest. Our macro calculator for women sets protein at 0.8–1.2 g per lb of bodyweight, balances carbs around your training, and keeps fat at 20–30% of total calories to support hormonal health. Unlike generic macro calculators, ours accounts for the fact that women need a higher fat minimum for hormone production and that protein requirements increase with age. Whether your goal is fat loss, muscle definition, or maintenance, you'll get exact gram targets you can use immediately.",
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
      {
        question: "How many grams of fat should a woman eat per day?",
        answer:
          "At minimum, 0.3–0.4 g per lb of bodyweight to support hormone production. For a 150 lb woman, that's 45–60 g of fat per day. Dropping below this can disrupt menstrual cycles and mood.",
      },
    ],
    blogIntro:
      "Macro guides built for real women — the protein targets that preserve muscle, the carb timing that fuels training, and the fat floor that keeps your hormones happy.",
  },
  {
    id: "heart-rate",
    name: "Heart Rate Zone Calculator",
    description: "Find your exact fat-burning heart rate zone in seconds.",
    icon: "Heart",
    slug: "heart-rate",
    categories: ["cardio", "endurance", "fat-loss"],
    metaTitle: "Fat Burn Heart Rate Zone Calculator: Train Smarter, Lose Faster",
    metaDescription:
      "Find your exact fat-burning heart rate zone in 30 seconds. Stop wasting time on cardio that doesn't work. Karvonen formula, built for women. Free and instant.",
    keywords: [
      "heart rate zone calculator",
      "target heart rate calculator",
      "Karvonen formula calculator",
      "fat burn zone calculator",
      "max heart rate calculator women",
      "zone 2 heart rate",
      "heart rate training zones",
      "HR zones for women",
      "fat burning heart rate",
      "zone 2 training for women",
      "cardio heart rate zones",
      "heart rate for fat loss",
    ],
    longDescription:
      "Heart rate training is the single best way to know if your cardio is hard enough — or too hard. Our heart rate zone calculator uses the Karvonen formula (which factors in your resting heart rate, not just your age) to give you five personalized zones: recovery, fat-burn, aerobic, threshold, and max. Train in the right zone and you'll burn more fat, build more endurance, and recover faster. Most women spend their cardio time in 'no-man's land' — too hard for fat-burn adaptation, too easy for aerobic improvement. This calculator eliminates that guesswork and gives you exact bpm targets for every workout.",
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
      {
        question: "What zone should I train in for fat loss?",
        answer:
          "Zone 2 (60–70% max HR) is your fat-burn sweet spot. Aim for 150–300 minutes per week in this zone. Add 1–2 sessions of Zone 4–5 intervals per week for metabolic boost.",
      },
    ],
    blogIntro:
      "The heart rate training hub — Zone 2 for fat loss, threshold for endurance, and everything in between. Read the science, then go train.",
  },
  {
    id: "body-fat",
    name: "Body Fat Calculator",
    description: "What's your real body fat percentage? Stop guessing, start measuring.",
    icon: "Percent",
    slug: "body-fat",
    categories: ["general", "cutting", "strength"],
    metaTitle: "Body Fat Calculator for Women: What's Your Real Fat Percentage?",
    metaDescription:
      "The scale lies. Get your real body fat % in 30 seconds with the validated US Navy method. Free calculator built for women — track what matters.",
    keywords: [
      "body fat calculator",
      "body fat calculator for women",
      "US Navy body fat calculator",
      "body fat percentage women",
      "female body fat calculator",
      "healthy body fat percentage women",
      "lean body mass calculator",
      "how to measure body fat",
      "body fat percentage calculator",
      "what is my body fat",
      "body fat for weight loss",
      "body composition calculator",
      "female body fat percentage chart",
    ],
    longDescription:
      "The scale only tells you your total weight — not what it's made of. Our body fat calculator for women uses the US Navy method (a validated circumference formula) to estimate your body-fat percentage from a few simple measurements. It's not as accurate as a DEXA scan, but it's free, instant, and tracks trends well. For women, healthy body fat ranges are significantly higher than for men due to essential fat required for reproductive health. Our calculator gives you age-adjusted ranges so you know whether you're in the essential, athlete, fitness, average, or high category — and what to do next.",
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
      {
        question: "What's the difference between BMI and body fat?",
        answer:
          "BMI estimates weight relative to height; body fat measures actual fat percentage. Two women can have the same BMI but completely different body compositions. That's why we recommend using both calculators together.",
      },
    ],
    blogIntro:
      "Body composition guides for women — what the percentage actually means, how to lower it without losing muscle, and why the number on the scale tells you almost nothing.",
  },
  {
    id: "bmr",
    name: "BMR Calculator",
    description: "How many calories you burn at rest — your metabolism number explained.",
    icon: "Flame",
    slug: "bmr",
    categories: ["nutrition", "weight-loss"],
    metaTitle: "BMR Calculator for Women: Your Resting Metabolism, Calculated",
    metaDescription:
      "Your metabolism at rest — calculated in seconds. Use your BMR to build the perfect calorie deficit for fat loss. Free BMR calculator built for women. No email required.",
    keywords: [
      "BMR calculator",
      "BMR calculator for women",
      "basal metabolic rate calculator",
      "female BMR",
      "resting metabolism calculator",
      "BMR vs TDEE",
      "how many calories do I burn at rest",
      "Mifflin St Jeor BMR",
      "BMR for weight loss",
      "basal metabolic rate women",
      "resting energy expenditure",
      "metabolism calculator",
    ],
    longDescription:
      "Your Basal Metabolic Rate (BMR) is the number of calories your body burns at complete rest — just keeping your heart beating, lungs breathing, and cells functioning. It accounts for 60–75% of your total daily energy expenditure. Our BMR calculator uses the Mifflin-St Jeor equation, the most accurate validated formula for the general population, and is calibrated specifically for women's physiology. Knowing your BMR is the foundation of any fat loss plan — it tells you the absolute floor below which you should never drop your calories. Use it alongside our TDEE calculator to build a deficit that burns fat without shutting down your metabolism.",
    howItWorks: [
      {
        title: "Enter your age, height, and weight",
        body: "The Mifflin-St Jeor equation uses these three factors to calculate your resting energy expenditure with the highest accuracy.",
      },
      {
        title: "We calculate your BMR",
        body: "Your basal metabolic rate is displayed in calories per day — this is what you burn without moving a muscle.",
      },
      {
        title: "Get your personalized guidelines",
        body: "Learn how your BMR changes with age, muscle mass, and hormonal cycles — and how to use it for fat loss.",
      },
    ],
    faqs: [
      {
        question: "What is a normal BMR for a woman?",
        answer:
          "For most adult women, BMR falls between 1,200 and 1,600 calories per day. It decreases with age (roughly 1–2% per decade after 30) and increases with muscle mass.",
      },
      {
        question: "What's the difference between BMR and TDEE?",
        answer:
          "BMR is what you burn at rest. TDEE (Total Daily Energy Expenditure) is BMR plus all your movement, exercise, and digestion. TDEE is what you use to set your calorie target; BMR is the floor below which you should not eat.",
      },
      {
        question: "Can I increase my BMR?",
        answer:
          "Yes — building muscle is the most effective way. Each pound of muscle burns 6–7 calories per day at rest. Strength training 3× per week can raise your BMR by 5–10% over several months.",
      },
      {
        question: "Does BMR change during menstrual cycle?",
        answer:
          "Yes — BMR can increase 5–10% during the luteal phase (the 10–14 days before your period). This is normal and temporary. Your BMR from this calculator gives you a reliable baseline for the rest of your cycle.",
      },
      {
        question: "How do I use my BMR for weight loss?",
        answer:
          "Never eat below your BMR. Your calorie target for fat loss should be set between your BMR and TDEE — typically a 300–500 calorie deficit. Eating below BMR risks muscle loss and metabolic adaptation.",
      },
    ],
    blogIntro:
      "Everything about basal metabolic rate — what it is, how to calculate it, and why eating below it sabotages your fat loss. Written for women.",
  },
  {
    id: "protein",
    name: "Protein Intake Calculator",
    description: "Exactly how much protein you need daily to lose fat and build muscle.",
    icon: "Utensils",
    slug: "protein",
    categories: ["nutrition", "weight-loss", "strength"],
    metaTitle: "Protein Calculator for Women: How Much to Lose Fat & Build Muscle",
    metaDescription:
      "How much protein do you really need to lose belly fat and reveal muscle? Get your personalized daily target in 30 seconds. Free protein calculator for women.",
    keywords: [
      "protein calculator",
      "protein calculator for women",
      "how much protein do I need",
      "daily protein intake calculator",
      "protein for weight loss",
      "protein for women over 40",
      "protein intake for fat loss",
      "protein grams per day",
      "how much protein to lose belly fat",
      "protein for muscle gain women",
      "female protein requirements",
      "protein per pound of bodyweight",
    ],
    longDescription:
      "Protein is the single most important nutrient for women trying to lose fat without losing muscle. It keeps you full, preserves lean mass in a calorie deficit, and supports the muscle growth that gives you that 'toned' look. Our protein intake calculator gives you a personalized daily target based on your weight, activity level, and goal — whether that's fat loss, muscle definition, or maintenance. The research is clear: women need 0.8–1.2 g of protein per pound of bodyweight when in a deficit, with higher intakes needed during perimenopause and beyond to combat age-related muscle loss.",
    howItWorks: [
      {
        title: "Enter your weight",
        body: "Enter your current bodyweight. We use pounds as the standard for protein calculations.",
      },
      {
        title: "Select your goal",
        body: "Fat loss, muscle gain, or maintenance. Each goal adjusts your protein ratio for optimal results.",
      },
      {
        title: "Get your daily protein target",
        body: "See exactly how many grams of protein you need per day, plus meal-by-meal breakdown suggestions.",
      },
    ],
    faqs: [
      {
        question: "How much protein does a woman need to lose weight?",
        answer:
          "Research supports 0.8–1.2 g of protein per pound of bodyweight to preserve muscle in a deficit. For a 150 lb woman, that's 120–180 g per day. Higher end if you're lifting heavy or over 40.",
      },
      {
        question: "Can too much protein be harmful?",
        answer:
          "For healthy women with normal kidney function, up to 2 g per pound of bodyweight is safe. Excess protein is simply used as energy or stored as fat — it doesn't damage kidneys unless you have pre-existing kidney disease.",
      },
      {
        question: "What are the best protein sources for women?",
        answer:
          "Lean poultry, fish, eggs, Greek yogurt, cottage cheese, tofu, and quality protein powder. Aim for 25–40 g of protein per meal spread across 3–4 meals for optimal muscle protein synthesis.",
      },
      {
        question: "Do protein needs increase with age?",
        answer:
          "Yes — after age 40, women need more protein to combat sarcopenia (age-related muscle loss). Aim for the higher end of the range (1.0–1.2 g per lb) and prioritize leucine-rich sources like whey, eggs, and chicken.",
      },
      {
        question: "Can I get enough protein without supplements?",
        answer:
          "Absolutely. A 150 g protein target can be met with food alone: 3 eggs (18g), 6 oz chicken (50g), 1 cup Greek yogurt (20g), 6 oz salmon (40g), and 1 cup lentils (18g). Protein powder is convenient, not required.",
      },
    ],
    blogIntro:
      "Protein guides for women — how much you actually need, when to eat it, and how to hit your target without living on chicken breast and protein shakes.",
  },
  {
    id: "ideal-weight",
    name: "Ideal Weight Calculator",
    description: "What should you actually weigh? Find your healthy weight range.",
    icon: "Scale",
    slug: "ideal-weight",
    categories: ["general", "nutrition"],
    metaTitle: "Ideal Weight Calculator for Women: Healthy Weight by Height & Age",
    metaDescription:
      "What should you actually weigh? Get your healthy weight range based on height, age, and frame size. Free ideal weight calculator for women — science-backed, instant.",
    keywords: [
      "ideal weight calculator",
      "ideal weight for women",
      "how much should I weigh",
      "healthy weight range",
      "ideal body weight calculator",
      "weight for height women",
      "healthy weight by age",
      "ideal weight for height female",
      "what should my weight be",
      "average weight for women",
      "healthy body weight calculator",
      "ideal body weight for height",
    ],
    longDescription:
      "What should you actually weigh? It's a simple question with a surprisingly nuanced answer. Our ideal weight calculator uses multiple validated methods — including the Hamwi formula, BMI healthy range, and body-frame adjustments — to give you a realistic healthy weight range, not just a single number. We show you the range where most healthy women at your height and frame size fall, so you can set a goal that's both aspirational and achievable. The number on the scale is just one data point — we pair it with context about body composition, bone density, and individual variation so you can focus on what actually matters: your health, not a number.",
    howItWorks: [
      {
        title: "Enter your height",
        body: "Enter your height in feet/inches or centimeters.",
      },
      {
        title: "Select your frame size",
        body: "Small, medium, or large frame based on your wrist circumference. Frame size adjusts your healthy weight range.",
      },
      {
        title: "Get your healthy weight range",
        body: "See a range of healthy weights for your height, frame, and age — plus the BMI validation for each endpoint.",
      },
    ],
    faqs: [
      {
        question: "What is the ideal weight for a 5'4 woman?",
        answer:
          "For a 5'4 woman with a medium frame, a healthy weight range is 110–145 lbs. The exact number depends on your muscle mass, bone density, and body composition. Use this range as a guide, not a target.",
      },
      {
        question: "Is there a difference between ideal weight and healthy weight?",
        answer:
          "Yes. 'Ideal' weights from historical formulas (like Hamwi) often set targets lower than what's actually healthy. Our calculator uses multiple methods to give you a realistic healthy range — one that supports hormonal health, energy levels, and muscle preservation.",
      },
      {
        question: "Does frame size really affect ideal weight?",
        answer:
          "Yes — wrist circumference and elbow breadth correlate with skeletal frame size. A woman with a large frame can be 10–15 lbs heavier at the same height than a small-framed woman, simply due to bone density differences.",
      },
      {
        question: "How does age affect ideal weight?",
        answer:
          "Healthy weight ranges shift slightly with age due to hormonal changes, muscle loss, and bone density changes. Our calculator adjusts for age, because what's healthy at 25 is different at 55.",
      },
      {
        question: "Should I use ideal weight or body fat to set my goal?",
        answer:
          "Body fat percentage is a better metric for health and appearance. Use ideal weight as a rough starting point, but rely on body fat % and how you feel to determine your actual goal weight.",
      },
    ],
    blogIntro:
      "Healthy weight guides for women — what the number actually means, how to find your real healthy range, and why the scale is just one piece of the puzzle.",
  },
  {
    id: "water-intake",
    name: "Water Intake Calculator",
    description: "How much water should you drink daily for fat loss and energy?",
    icon: "Sparkles",
    slug: "water-intake",
    categories: ["general", "nutrition"],
    metaTitle: "Water Intake Calculator: How Much Water to Drink for Fat Loss & Energy",
    metaDescription:
      "Dehydration mimics hunger. Find your exact daily water target based on weight, activity level, and climate. Free hydration calculator for women — takes 10 seconds.",
    keywords: [
      "water intake calculator",
      "how much water should I drink",
      "daily water intake calculator",
      "hydration calculator",
      "how much water to drink for weight loss",
      "water intake for women",
      "daily hydration needs",
      "water for fat loss",
      "how many ounces of water per day",
      "hydration for women",
      "water intake by weight",
      "drink water calculator",
    ],
    longDescription:
      "Dehydration is one of the most overlooked factors in weight loss. The brain often confuses thirst signals with hunger cues, leading to unnecessary snacking and overeating. Our water intake calculator gives you a personalized daily hydration target based on your weight, activity level, and climate. Proper hydration supports your metabolism, improves exercise performance, reduces water retention, and helps your body burn fat more efficiently. Most women walk around in a state of chronic mild dehydration — this calculator shows you exactly how much water you need and how to fit it into your day without constantly running to the bathroom.",
    howItWorks: [
      {
        title: "Enter your weight",
        body: "Enter your bodyweight. We calculate your baseline water needs based on the standard 30–35 mL per kg formula.",
      },
      {
        title: "Select your activity level",
        body: "More activity means more water loss through sweat. We add 12–16 oz per 30 minutes of exercise.",
      },
      {
        title: "Get your daily water target",
        body: "See your total daily water intake in ounces, cups, or liters — plus tips for actually hitting your target.",
      },
    ],
    faqs: [
      {
        question: "How much water should a woman drink per day?",
        answer:
          "The general guideline is 8–12 cups (64–96 oz) per day for women, but this varies by weight, activity, and climate. Our calculator personalizes this to your specific body and lifestyle.",
      },
      {
        question: "Can drinking water help with weight loss?",
        answer:
          "Yes — drinking water before meals reduces calorie intake by 13–20%, increases resting energy expenditure by 24–30% for 60 minutes, and helps your body mobilize stored fat for energy.",
      },
      {
        question: "What's the best way to track water intake?",
        answer:
          "Use a 32 oz water bottle and aim to finish it 3 times per day. Add a squeeze of lemon or a pinch of salt for electrolytes if you're active or in a hot climate.",
      },
      {
        question: "Does coffee and tea count toward water intake?",
        answer:
          "Yes — moderate caffeine intake (up to 400 mg/day) doesn't dehydrate you. Coffee and tea count toward your daily fluid needs, though plain water is still the best choice.",
      },
      {
        question: "How do I know if I'm drinking enough water?",
        answer:
          "The simplest test: your urine should be pale yellow (like lemonade). Dark yellow or amber means you're dehydrated. Clear means you may be over-hydrating. Aim for pale yellow throughout the day.",
      },
    ],
    blogIntro:
      "Hydration guides for women — how much water you actually need, why it matters for fat loss, and simple strategies to drink more without forcing it.",
  },
]

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug)
}
