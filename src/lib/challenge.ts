export interface ChallengeDay {
  day: number
  title: string
  description: string
  action: string
  targetPage: string
  ctaLabel: string
  estimatedMinutes: number
}

export const challengeDays: ChallengeDay[] = [
  {
    day: 1,
    title: 'Know Your Numbers',
    description:
      'Calculate your exact calorie target. Most women eat either too much or too little without knowing their real number.',
    action: 'Calculate your TDEE and set your calorie target.',
    targetPage: '/tools/calorie',
    ctaLabel: 'Calculate My Calories →',
    estimatedMinutes: 3,
  },
  {
    day: 2,
    title: 'Fuel Your Body Right',
    description:
      'Learn what your macros should be. Protein, carbs, and fat ratios change based on your goal.',
    action: 'Get your personalized macro split.',
    targetPage: '/tools/macro',
    ctaLabel: 'Get My Macros →',
    estimatedMinutes: 3,
  },
  {
    day: 3,
    title: 'Move Your Body',
    description:
      'You don\'t need a gym. A 20-minute walk or yoga session is enough when done consistently.',
    action: 'Try a beginner-friendly movement routine.',
    targetPage: '/category/yoga',
    ctaLabel: 'Start Moving →',
    estimatedMinutes: 25,
  },
  {
    day: 4,
    title: 'Protein Check',
    description:
      'Are you eating enough protein? Most women under-eat protein by 40%, which slows metabolism.',
    action: 'Calculate your protein target and read the guide.',
    targetPage: '/tools/protein',
    ctaLabel: 'Check My Protein →',
    estimatedMinutes: 5,
  },
  {
    day: 5,
    title: 'Sleep & Stress',
    description:
      'Sleep is when your body burns fat. Poor sleep = slower metabolism. Learn the connection.',
    action: 'Read about sleep optimization for weight loss.',
    targetPage: '/blog',
    ctaLabel: 'Read the Guide →',
    estimatedMinutes: 8,
  },
  {
    day: 6,
    title: 'Mindful Eating',
    description:
      'Most overeating happens on autopilot. One simple mindset shift can cut 300+ calories daily.',
    action: 'Practice one mindful eating technique today.',
    targetPage: '/blog',
    ctaLabel: 'Learn the Technique →',
    estimatedMinutes: 6,
  },
  {
    day: 7,
    title: 'Weigh-In & Recalculate',
    description:
      'Your body has changed this week. Recalculate your numbers and see your progress.',
    action: 'Re-enter your stats and compare with Day 1.',
    targetPage: '/my-progress',
    ctaLabel: 'Check My Progress →',
    estimatedMinutes: 5,
  },
]

export interface ChallengeState {
  currentDay: number
  completedDays: number[]
  startedAt: number | null
  finishedAt: number | null
}

const CHALLENGE_KEY = 'fitfeky_challenge'

export function getChallengeState(): ChallengeState {
  if (typeof window === 'undefined') {
    return { currentDay: 1, completedDays: [], startedAt: null, finishedAt: null }
  }
  try {
    const stored = localStorage.getItem(CHALLENGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return { currentDay: 1, completedDays: [], startedAt: null, finishedAt: null }
}

export function startChallenge(): void {
  const state: ChallengeState = {
    currentDay: 1,
    completedDays: [],
    startedAt: Date.now(),
    finishedAt: null,
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem(CHALLENGE_KEY, JSON.stringify(state))
  }
}

export function completeDay(day: number): void {
  const state = getChallengeState()
  if (!state.completedDays.includes(day)) {
    state.completedDays.push(day)
    state.currentDay = day < 7 ? day + 1 : 7
    if (state.completedDays.length === 7) {
      state.finishedAt = Date.now()
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(CHALLENGE_KEY, JSON.stringify(state))
    }
  }
}

export function getCompletionPercentage(): number {
  const state = getChallengeState()
  return Math.round((state.completedDays.length / 7) * 100)
}

export function getDay(day: number): ChallengeDay | undefined {
  return challengeDays.find(d => d.day === day)
}
