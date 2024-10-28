export const isHighestScore = (score: string, scoreToCompare: string) => {
  return parseInt(score) > parseInt(scoreToCompare)
}