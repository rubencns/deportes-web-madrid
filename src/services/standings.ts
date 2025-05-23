import type { GroupDetailsUI, Standing } from '@models/Standing'
import { capitalizeFirstLetterOfEachWord } from '@utils/capitalizeLetters'
import { getTeamGamesByCode } from './games'
import type { Game } from '@models/Game'
import rawStandings from '@database/standings.json'

const standings = rawStandings as unknown as Standing[]

export const getStandings = async (): Promise<Standing[]> => {
  return standings.map((standing) => ({
    ...standing,
    Nombre_equipo: capitalizeFirstLetterOfEachWord(standing.Nombre_equipo),
  }))
}

export const getStandingsByGroupCode = async (code: string): Promise<Standing[]> => {
  const standings = await getStandings()

  const filteredStandings = standings.filter((standing) => standing.Codigo_grupo === code)

  return filteredStandings
}

export const getGroupDetailsByCode = async (code: string): Promise<Nullable<GroupDetailsUI>> => {
  const standings = await getStandingsByGroupCode(code)

  if (standings.length === 0) return null

  const { Nombre_grupo, Nombre_fase, Nombre_competicion } = standings[0]
  return { Nombre_grupo, Nombre_fase, Nombre_competicion }
}

export const getTeamStandingsByCode = async (code: string): Promise<Nullable<Standing>> => {
  const standings = await getStandings()
  const teamStandings = standings.find(
    (standing) => standing.Codigo_equipo.toString() === code.toString(),
  )

  if (!teamStandings) return null

  return teamStandings
}

export const getJerseyColorByTeamCode = async (teamCode: string): Promise<string[]> => {
  const games = await getTeamGamesByCode(teamCode)

  const getTeamJerseyColorsInAllGames = games.map((game) => {
    const isHomeTeam = game.Codigo_equipo1.toString() === teamCode.toString()

    return isHomeTeam ? game.Color_Camiseta_1 : game.Color_Camiseta_2
  })

  const teamJerseyColorsWithoutDuplicates = [...new Set(getTeamJerseyColorsInAllGames)]

  return teamJerseyColorsWithoutDuplicates
}

const isWinner = (game: Game, teamCode: string) => {
  const winner = game.Resultado1 > game.Resultado2 ? game.Codigo_equipo1 : game.Codigo_equipo2
  const isWinnerTeam = winner.toString() === teamCode.toString()

  return isWinnerTeam
}

export const getWinningStreakByTeamCode = async (teamCode: string): Promise<number> => {
  const games = await getTeamGamesByCode(teamCode)
  const gamesFinished = games
    .filter((game) => game.Estado === 'F')
    .sort((a, b) => parseInt(b.Jornada) - parseInt(a.Partido))

  let winningStreak = 0
  let isStreakFinished = false

  gamesFinished.forEach((game) => {
    if (isWinner(game, teamCode) && !isStreakFinished) winningStreak += 1
    else isStreakFinished = true
  })

  return winningStreak
}

export const getResultsHistoryByTeamCode = async (teamCode: string): Promise<('V' | 'D')[]> => {
  const games = await getTeamGamesByCode(teamCode)
  const gamesFinished = games.filter((game) => game.Estado === 'F')

  const gamesFormatted = gamesFinished.map((game) => (isWinner(game, teamCode) ? 'V' : 'D'))

  return gamesFormatted
}
