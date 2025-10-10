import type { Game, MatchDayUI } from '@models/Game'
import { capitalizeFirstLetterOfEachWord } from '@utils/capitalizeLetters'
import rawGames from '@database/games.json'

const games = rawGames as unknown as Game[]

export const getGames = async (): Promise<Game[]> => {
  return games.map((game) => ({
    ...game,
    Equipo_local: capitalizeFirstLetterOfEachWord(game.Equipo_local),
    Equipo_visitante: capitalizeFirstLetterOfEachWord(game.Equipo_visitante),
  }))
}

export const getGamesByGroupCode = async (code: string): Promise<Game[]> => {
  const games = await getGames()

  const filteredGames = games.filter((game) => game.Codigo_grupo === code)

  return filteredGames
}

export const getMatchDaysByGroupCode = async (code: string): Promise<MatchDayUI[]> => {
  const gamesByGroupCode = await getGamesByGroupCode(code)
  const filteredMatchDays = gamesByGroupCode.map((game) => ({
    Jornada: game.Jornada,
    Nombre_jornada: game.Nombre_jornada,
    Fecha: game.Fecha,
  }))

  const uniqueMatchDays = filteredMatchDays.filter((matchDay, index, self) => {
    return index === self.findIndex((matchDay2) => matchDay.Jornada === matchDay2.Jornada)
  })

  const orderedMatchDays = uniqueMatchDays.sort((a, b) => parseInt(a.Jornada) - parseInt(b.Jornada))

  return orderedMatchDays
}

export const getCurrentMatchDayByGroupCode = async (code: string): Promise<MatchDayUI> => {
  const gamesByGroupCode = (await getGamesByGroupCode(code)).sort(
    (a, b) => parseInt(b.Jornada) - parseInt(a.Jornada),
  )
  const currentMatchDay = gamesByGroupCode.find((game) => game.Fecha < new Date().toISOString())!

  return currentMatchDay
}

export const getNextMatchDayByGroupCode = async (code: string): Promise<MatchDayUI> => {
  const gamesByGroupCode = await getGamesByGroupCode(code)
  const currentMatchDay = await getCurrentMatchDayByGroupCode(code)

  const nextMatchDay = gamesByGroupCode.find(
    (game) => parseInt(game.Jornada) === parseInt(currentMatchDay?.Jornada) + 1,
  )!

  return nextMatchDay
}

export const getTeamGamesByCode = async (code: string): Promise<Game[]> => {
  const games = await getGames()
  const teamGames = games.filter((game) => {
    const isTeamInGame =
      game.Codigo_equipo1.toString() === code.toString() ||
      game.Codigo_equipo2.toString() === code.toString()
    return isTeamInGame
  })

  return teamGames
}
