export interface Archetype {
  id: string
  title: string
  emoji: string
  description: string
  productIds: string[]
  scores: Record<string, number>
}

export const archetypes: Archetype[] = [
  {
    id: "warrior",
    title: "The Warrior",
    emoji: "⚔️",
    description: "You're all about intensity and pushing limits. Strength, power, and discipline are your superpowers.",
    productIds: ["adjustable-dumbbells", "pre-workout", "kettlebell"],
    scores: { strength: 3, intensity: 3, discipline: 2, cardio: 0, flexibility: 0, recovery: 0, nutrition: 1 },
  },
  {
    id: "endurance-runner",
    title: "The Endurance Runner",
    emoji: "🏃",
    description: "You love the long game. Cardio, stamina, and mental toughness define your training.",
    productIds: ["fitness-tracker", "jump-rope", "yoga-mat-premium"],
    scores: { strength: 0, intensity: 1, discipline: 2, cardio: 3, flexibility: 1, recovery: 1, nutrition: 1 },
  },
  {
    id: "yogi",
    title: "The Yogi",
    emoji: "🧘",
    description: "Mind-body balance is your priority. Flexibility, mindfulness, and recovery are your craft.",
    productIds: ["yoga-mat-premium", "foam-roller", "fitness-tracker"],
    scores: { strength: 0, intensity: 0, discipline: 1, cardio: 1, flexibility: 3, recovery: 3, nutrition: 1 },
  },
  {
    id: "calisthenics-athlete",
    title: "The Calisthenics Athlete",
    emoji: "🤸",
    description: "You move with control and grace. Bodyweight mastery and mobility are your thing.",
    productIds: ["resistance-bands-set", "yoga-mat-premium", "foam-roller"],
    scores: { strength: 2, intensity: 1, discipline: 2, cardio: 1, flexibility: 2, recovery: 1, nutrition: 1 },
  },
  {
    id: "bulker",
    title: "The Bulker",
    emoji: "💪",
    description: "You live for muscle growth. Calories, protein, and progressive overload are your religion.",
    productIds: ["whey-protein", "adjustable-dumbbells", "kitchen-scale", "pre-workout"],
    scores: { strength: 2, intensity: 2, discipline: 3, cardio: 0, flexibility: 0, recovery: 1, nutrition: 3 },
  },
  {
    id: "fat-loss-fighter",
    title: "The Fat-Loss Fighter",
    emoji: "🔥",
    description: "You're on a mission to shed fat and feel great. Cardio, nutrition, and consistency fuel you.",
    productIds: ["jump-rope", "fitness-tracker", "kitchen-scale", "whey-protein"],
    scores: { strength: 1, intensity: 2, discipline: 2, cardio: 2, flexibility: 0, recovery: 1, nutrition: 2 },
  },
  {
    id: "balanced-beginner",
    title: "The Balanced Beginner",
    emoji: "🌱",
    description: "You're just starting your journey and want a balanced approach. Welcome — consistency is everything.",
    productIds: ["resistance-bands-set", "yoga-mat-premium", "fitness-tracker"],
    scores: { strength: 1, intensity: 1, discipline: 1, cardio: 1, flexibility: 1, recovery: 1, nutrition: 1 },
  },
]
