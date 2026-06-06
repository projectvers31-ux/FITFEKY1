export interface Category {
  id: string
  name: string
  slug: string
  description: string
  toolIds: string[]
  relatedGoals: string[]
}

export const categories: Category[] = [
  {
    id: "weight-loss",
    name: "Weight Loss",
    slug: "weight-loss",
    description: "Tools and plans to help you lose fat sustainably while preserving muscle.",
    toolIds: ["bmi", "calorie", "macro", "body-fat", "heart-rate"],
    relatedGoals: ["fat-loss", "cardio", "caloric-deficit"],
  },
  {
    id: "muscle-gain",
    name: "Muscle Gain",
    slug: "muscle-gain",
    description: "Build lean muscle with calculated calories, protein, and progressive training.",
    toolIds: ["macro", "calorie", "bmi"],
    relatedGoals: ["bulking", "strength", "protein-intake"],
  },
  {
    id: "endurance",
    name: "Endurance",
    slug: "endurance",
    description: "Improve cardiovascular fitness and train smarter with heart rate zones.",
    toolIds: ["heart-rate", "calorie", "bmi"],
    relatedGoals: ["cardio", "zone-2", "stamina"],
  },
  {
    id: "general-fitness",
    name: "General Fitness",
    slug: "general-fitness",
    description: "Stay healthy and active with a balanced approach to fitness and nutrition.",
    toolIds: ["bmi", "calorie", "heart-rate", "body-fat", "macro"],
    relatedGoals: ["wellness", "mobility", "habit-building"],
  },
  {
    id: "strength",
    name: "Strength Training",
    slug: "strength",
    description: "Get stronger with proper nutrition, body composition, and recovery tools.",
    toolIds: ["body-fat", "macro", "bmi"],
    relatedGoals: ["powerlifting", "progressive-overload", "recovery"],
  },
]
