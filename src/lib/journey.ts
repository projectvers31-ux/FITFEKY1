export type PageType =
  | 'bmi'
  | 'calorie'
  | 'macro'
  | 'body-fat'
  | 'heart-rate'
  | 'bmr'
  | 'protein'
  | 'ideal-weight'
  | 'water-intake'
  | 'blog'
  | 'quiz'
  | 'quiz-result'
  | 'product'
  | 'category'
  | 'challenge'
  | 'my-results'
  | 'my-progress'

export interface UserJourneyState {
  currentPage: PageType
  pagesVisited: PageType[]
  sessionStart: number
  quizCompleted: boolean
  quizArchetype: string | null
  savedResults: boolean
  challengeDay: number
  challengeCompleted: boolean
  affiliateClicks: number
  lastReturnDate: number | null
  returnCount: number
}

const STORAGE_KEY = 'fitfeky_journey'

export function getUserJourneyState(): UserJourneyState {
  if (typeof window === 'undefined') {
    return defaultState()
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...defaultState(), ...JSON.parse(stored) }
    }
  } catch {}
  return defaultState()
}

export function saveUserJourneyState(state: UserJourneyState): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

function defaultState(): UserJourneyState {
  return {
    currentPage: 'bmi',
    pagesVisited: [],
    sessionStart: Date.now(),
    quizCompleted: false,
    quizArchetype: null,
    savedResults: false,
    challengeDay: 0,
    challengeCompleted: false,
    affiliateClicks: 0,
    lastReturnDate: null,
    returnCount: 0,
  }
}

export function recordPageVisit(pageType: PageType): void {
  const state = getUserJourneyState()
  if (!state.pagesVisited.includes(pageType)) {
    state.pagesVisited.push(pageType)
  }
  state.currentPage = pageType
  saveUserJourneyState(state)
}

export function recordQuizCompletion(archetype: string): void {
  const state = getUserJourneyState()
  state.quizCompleted = true
  state.quizArchetype = archetype
  saveUserJourneyState(state)
}

export function recordSaveResults(): void {
  const state = getUserJourneyState()
  state.savedResults = true
  saveUserJourneyState(state)
}

export function recordAffiliateClick(): void {
  const state = getUserJourneyState()
  state.affiliateClicks++
  saveUserJourneyState(state)
}

export function recordReturnVisit(): void {
  const state = getUserJourneyState()
  state.lastReturnDate = Date.now()
  state.returnCount++
  saveUserJourneyState(state)
}

export function getSessionDurationMinutes(): number {
  const state = getUserJourneyState()
  return (Date.now() - state.sessionStart) / 60000
}

export function getPagesThisSession(): number {
  const state = getUserJourneyState()
  return state.pagesVisited.length
}

type JourneyTrigger = {
  type: 'time' | 'scroll' | 'exit'
  threshold: number
  pageTypes: PageType[]
  component: string
}

export const journeyTriggers: JourneyTrigger[] = [
  {
    type: 'time',
    threshold: 5000,
    pageTypes: ['bmi', 'calorie', 'macro', 'body-fat'],
    component: 'QuizEntryPoint',
  },
  {
    type: 'scroll',
    threshold: 40,
    pageTypes: ['blog'],
    component: 'QuizEntryPoint',
  },
  {
    type: 'scroll',
    threshold: 70,
    pageTypes: ['blog'],
    component: 'ProductSuggestion',
  },
  {
    type: 'exit',
    threshold: 0,
    pageTypes: ['bmi', 'calorie', 'blog', 'quiz'],
    component: 'ExitIntent',
  },
]

export function getNextRecommendedPage(
  state: UserJourneyState,
): string | null {
  const visited = state.pagesVisited
  const hasDoneQuiz = state.quizCompleted

  if (!hasDoneQuiz) {
    if (
      visited.includes('bmi') ||
      visited.includes('calorie') ||
      visited.includes('blog')
    ) {
      return '/quiz'
    }
  }

  if (hasDoneQuiz && !visited.includes('calorie')) {
    return '/tools/calorie'
  }

  if (hasDoneQuiz && visited.includes('calorie') && !visited.includes('macro')) {
    return '/tools/macro'
  }

  if (hasDoneQuiz && state.challengeDay === 0) {
    return '/my-challenge'
  }

  if (state.savedResults && visited.includes('my-results')) {
    return '/my-progress'
  }

  if (visited.length < 4) {
    return '/blog'
  }

  return null
}

export function shouldShowReturnWelcome(): boolean {
  const state = getUserJourneyState()
  if (!state.lastReturnDate) return false
  const hoursSinceReturn = (Date.now() - state.lastReturnDate) / 3600000
  return hoursSinceReturn > 24 && state.returnCount < 5
}

export function getReturnWelcomeMessage(): {
  title: string
  subtitle: string
} {
  const state = getUserJourneyState()
  const day = state.challengeDay

  if (day > 0 && !state.challengeCompleted) {
    return {
      title: `Welcome back! You're on Day ${day} of your challenge.`,
      subtitle: 'Continue where you left off.',
    }
  }

  if (state.quizCompleted) {
    return {
      title: 'Ready to recalculate?',
      subtitle: 'Your numbers may have changed since your last visit.',
    }
  }

  return {
    title: 'Great to see you again!',
    subtitle: 'We have new articles and tools for you.',
  }
}

export function estimateBmiFromAnswers(answers: Record<string, string>): number | null {
  const age = parseInt(answers['age'] || '0', 10)
  const goal = answers['goal'] || ''
  if (!age) return null
  let estimate = 27
  if (age > 45) estimate += 2
  if (goal.includes('quick') || goal.includes('now')) estimate += 1
  return estimate
}

export function estimateCaloriesFromAnswers(answers: Record<string, string>): number | null {
  const age = parseInt(answers['age'] || '0', 10)
  const activity = answers['activity'] || ''
  if (!age) return null
  let cals = 1850
  if (age > 40) cals -= 100
  if (activity.includes('4') || activity.includes('5')) cals += 200
  if (activity.includes('6') || activity.includes('7')) cals += 350
  return cals
}
