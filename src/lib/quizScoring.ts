import { archetypes, type Archetype } from "@/data/archetypes"

export type AnswerKey = keyof Archetype["scores"]

export function getResult(answers: AnswerKey[]): string {
  const scores: Record<string, number> = {}

  for (const answer of answers) {
    for (const archetype of archetypes) {
      const weight = archetype.scores[answer] ?? 0
      scores[archetype.id] = (scores[archetype.id] ?? 0) + weight
    }
  }

  const winner = archetypes.reduce((best, current) => {
    return (scores[current.id] ?? 0) > (scores[best.id] ?? 0) ? current : best
  })

  return winner.id
}

export function getArchetype(id: string): Archetype | undefined {
  return archetypes.find((a) => a.id === id)
}
