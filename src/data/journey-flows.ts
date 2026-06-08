export interface EntryFlow {
  entryPage: string
  userType: string
  emotion: string
  problem: string
  hookCTA: string
  quizTrigger: 'time' | 'scroll'
  quizTriggerThreshold: number
  nextSteps: string[]
  expectedPages: number
  expectedMinutes: number
}

export const entryFlows: EntryFlow[] = [
  {
    entryPage: '/tools/bmi',
    userType: 'Health-conscious beginner',
    emotion: 'Anxious, uncertain',
    problem: 'Wants quick health assessment',
    hookCTA: 'Your BMI is just the start. Get your full picture.',
    quizTrigger: 'time',
    quizTriggerThreshold: 5000,
    nextSteps: ['/quiz', '/tools/calorie', '/blog/what-bmi-really-means-for-women'],
    expectedPages: 5,
    expectedMinutes: 6,
  },
  {
    entryPage: '/tools/calorie',
    userType: 'Weight loss seeker',
    emotion: 'Frustrated, desperate',
    problem: 'Wants a specific number to follow',
    hookCTA: 'Your calorie target might be wrong. Take the quiz to verify.',
    quizTrigger: 'time',
    quizTriggerThreshold: 7000,
    nextSteps: ['/quiz', '/tools/macro', '/blog/1500-calories-stops-working-30s'],
    expectedPages: 6,
    expectedMinutes: 8,
  },
  {
    entryPage: '/tools/macro',
    userType: 'Intermediate fitness user',
    emotion: 'Curious, goal-oriented',
    problem: 'Wants precise macros for recomposition',
    hookCTA: 'Your ideal macro split depends on your body type. Find yours.',
    quizTrigger: 'time',
    quizTriggerThreshold: 8000,
    nextSteps: ['/quiz', '/tools/body-fat', '/blog/strength-training-for-fat-loss'],
    expectedPages: 5,
    expectedMinutes: 7,
  },
  {
    entryPage: '/tools/body-fat',
    userType: 'Advanced fitness user',
    emotion: 'Analytical, skeptical',
    problem: 'Wants composition data beyond weight',
    hookCTA: 'Numbers without a plan are just numbers. Get your plan.',
    quizTrigger: 'time',
    quizTriggerThreshold: 10000,
    nextSteps: ['/quiz', '/tools/bmi', '/blog'],
    expectedPages: 4,
    expectedMinutes: 6,
  },
  {
    entryPage: '/blog',
    userType: 'Information seeker',
    emotion: 'Curious, skeptical',
    problem: 'Specific pain point (plateau, cravings, etc.)',
    hookCTA: 'Reading helps. But your personalized plan is one click away.',
    quizTrigger: 'scroll',
    quizTriggerThreshold: 40,
    nextSteps: ['/quiz', '/tools/calorie', '/blog'],
    expectedPages: 4,
    expectedMinutes: 6,
  },
]

export interface LoopTrigger {
  fromPageType: string
  trigger: string
  targetPage: string
  label: string
  psychology: string
}

export const loopTriggers: LoopTrigger[] = [
  {
    fromPageType: 'calculator',
    trigger: 'after-result',
    targetPage: '/quiz',
    label: 'Get Your Personalized Plan',
    psychology: 'Curiosity gap + personalization desire',
  },
  {
    fromPageType: 'calculator',
    trigger: 'after-result',
    targetPage: '/tools/calorie',
    label: 'Calculate Your Exact Calories',
    psychology: 'Complementary utility',
  },
  {
    fromPageType: 'calculator',
    trigger: 'sidebar',
    targetPage: '/blog',
    label: 'What This Number Really Means',
    psychology: 'Authority + deeper understanding',
  },
  {
    fromPageType: 'blog',
    trigger: 'mid-content',
    targetPage: '/quiz',
    label: 'Find Out Why YOU Struggle',
    psychology: 'Curiosity gap + personalization',
  },
  {
    fromPageType: 'blog',
    trigger: 'mid-content',
    targetPage: '/tools/calorie',
    label: 'Calculate Your Real Number',
    psychology: 'Utility + action trigger',
  },
  {
    fromPageType: 'blog',
    trigger: 'end-content',
    targetPage: '/blog',
    label: 'Keep Reading: Related Article',
    psychology: 'Infinite scroll curiosity',
  },
  {
    fromPageType: 'quiz-result',
    trigger: 'hero',
    targetPage: '/tools/calorie',
    label: 'Get Your Exact Calorie Target',
    psychology: 'Precision after personalization',
  },
  {
    fromPageType: 'quiz-result',
    trigger: 'action-plan',
    targetPage: '/blog',
    label: 'Your 8-Week Transformation Guide',
    psychology: 'Actionable next step',
  },
  {
    fromPageType: 'quiz-result',
    trigger: 'retention',
    targetPage: '/my-challenge',
    label: 'Join the 7-Day Challenge',
    psychology: 'Commitment + progression',
  },
  {
    fromPageType: 'quiz-result',
    trigger: 'retention',
    targetPage: '/products',
    label: 'Shop Your Recommended Kit',
    psychology: 'Reciprocity + value exchange',
  },
  {
    fromPageType: 'product',
    trigger: 'below-review',
    targetPage: '/blog',
    label: 'Read the Full Guide',
    psychology: 'Research before purchase',
  },
  {
    fromPageType: 'product',
    trigger: 'sidebar',
    targetPage: '/tools/calorie',
    label: 'Do You Actually Need This?',
    psychology: 'Validation + utility check',
  },
]

export interface ExitPrevention {
  pageTypes: string[]
  trigger: 'mouse-leave' | 'time' | 'scroll-up'
  threshold: number
  headline: string
  ctaLabel: string
  ctaTarget: string
}

export const exitPreventionRules: ExitPrevention[] = [
  {
    pageTypes: ['bmi', 'calorie', 'macro', 'body-fat'],
    trigger: 'mouse-leave',
    threshold: 0,
    headline: 'Your personalized fat loss report is ready.',
    ctaLabel: 'See My Plan →',
    ctaTarget: '/quiz',
  },
  {
    pageTypes: ['blog'],
    trigger: 'scroll-up',
    threshold: 80,
    headline: 'Stop reading — start doing. Get your personal plan.',
    ctaLabel: 'Take the Quiz →',
    ctaTarget: '/quiz',
  },
  {
    pageTypes: ['quiz'],
    trigger: 'mouse-leave',
    threshold: 0,
    headline: 'Your answers are saved. Come back to finish your plan.',
    ctaLabel: 'Continue →',
    ctaTarget: '/quiz',
  },
  {
    pageTypes: ['product'],
    trigger: 'time',
    threshold: 30000,
    headline: 'Not sure? See which product is right for your goal.',
    ctaLabel: 'Take the Quiz →',
    ctaTarget: '/quiz',
  },
]
