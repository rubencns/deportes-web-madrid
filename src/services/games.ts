import games from "@mock/games.json";
import type { Game, MatchDayUI } from "@models/Game";
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter";

export const getGames = async (): Promise<Game[]> => {
  return await games.map(game => ({
    ...game,
    Equipo_local: capitalizeFirstLetter(game.Equipo_local),
    Equipo_visitante: capitalizeFirstLetter(game.Equipo_visitante),
  })) as Game[]
}

export const getGamesByGroupCode = async (code: number): Promise<Game[]> => {
  const games = await getGames()
  const filteredGames = await games.filter((game) =>
    game.Codigo_grupo === code)

  return filteredGames as any
}

export const getMatchDaysByGroupCode = async (code: number): Promise<MatchDayUI[]> => {
  const gamesByGroupCode = await getGamesByGroupCode(code)
  const filteredMatchDays = await gamesByGroupCode.map((game) => ({
    Jornada: game.Jornada,
    Nombre_jornada: game.Nombre_jornada,
    Fecha: game.Fecha
  }))

  const uniqueMatchDays = filteredMatchDays.filter((matchDay, index, self) => {
    return index === self.findIndex((matchDay2) => matchDay.Jornada === matchDay2.Jornada)
  })

  const orderedMatchDays = uniqueMatchDays.sort((a, b) => a.Jornada - b.Jornada)

  return orderedMatchDays
}


export const getCurrentMatchDayByGroupCode = async (code: number): Promise<MatchDayUI> => {
  const gamesByGroupCode = (await getGamesByGroupCode(code)).sort((a, b) => b.Jornada - a.Jornada)
  const currentMatchDay = gamesByGroupCode.find((game) => game.Fecha < new Date().toISOString())

  return currentMatchDay as MatchDayUI
}

export const getNextMatchDayByGroupCode = async (code: number): Promise<MatchDayUI> => {
  const gamesByGroupCode = await getGamesByGroupCode(code)
  const currentMatchDay = await getCurrentMatchDayByGroupCode(code)
  const nextMatchDay = gamesByGroupCode.find((game) => game.Jornada === currentMatchDay.Jornada + 1)

  return nextMatchDay as MatchDayUI
}