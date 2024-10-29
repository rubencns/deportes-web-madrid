import type { Game, MatchDayUI } from "@models/Game";
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter";
import gamesMock from "@mock/games.json";
import { gamesCsvUrl } from "@constants/common";
import { convertCsvToJson } from "@utils/convertCsvToJson";
import { getCsvByUrl } from "@services/csv";

export const getGames = async (): Promise<Game[]> => {
  let games: Game[]

  if (process.env.NODE_ENV === "development") {
    games = gamesMock as unknown as Game[]
  } else {
    const csvData = await getCsvByUrl(gamesCsvUrl);
    games = await convertCsvToJson<Game>(csvData);
  }

  return games.map(game => ({
    ...game,
    Equipo_local: capitalizeFirstLetter(game.Equipo_local),
    Equipo_visitante: capitalizeFirstLetter(game.Equipo_visitante),
  })) as Game[]
}

export const getGamesByGroupCode = async (code: string): Promise<Game[]> => {
  const games = await getGames()

  const filteredGames = games.filter((game) =>
    game.Codigo_grupo === code)

  return filteredGames
}

export const getMatchDaysByGroupCode = async (code: string): Promise<MatchDayUI[]> => {
  const gamesByGroupCode = await getGamesByGroupCode(code)
  const filteredMatchDays = gamesByGroupCode.map((game) => ({
    Jornada: game.Jornada,
    Nombre_jornada: game.Nombre_jornada,
    Fecha: game.Fecha
  }))

  const uniqueMatchDays = filteredMatchDays.filter((matchDay, index, self) => {
    return index === self.findIndex((matchDay2) => matchDay.Jornada === matchDay2.Jornada)
  })

  const orderedMatchDays = uniqueMatchDays.sort((a, b) => parseInt(a.Jornada) - parseInt(b.Jornada))

  return orderedMatchDays
}


export const getCurrentMatchDayByGroupCode = async (code: string): Promise<MatchDayUI> => {
  const gamesByGroupCode = (await getGamesByGroupCode(code)).sort((a, b) => parseInt(b.Jornada) - parseInt(a.Jornada))
  const currentMatchDay = gamesByGroupCode.find((game) => game.Fecha < new Date().toISOString())

  return currentMatchDay as MatchDayUI
}

export const getNextMatchDayByGroupCode = async (code: string): Promise<MatchDayUI> => {
  const gamesByGroupCode = await getGamesByGroupCode(code)
  const currentMatchDay = await getCurrentMatchDayByGroupCode(code)

  const nextMatchDay = gamesByGroupCode.find((game) => parseInt(game.Jornada) === parseInt(currentMatchDay.Jornada) + 1)

  return nextMatchDay as MatchDayUI
}

export const getTeamGamesByCode = async (code: string): Promise<Game[]> => {
  const games = await getGames()
  const teamGames = games.filter((game) => {
    const isTeamInGame = (game.Codigo_equipo1.toString() === code.toString() || game.Codigo_equipo2.toString() === code.toString())
    return isTeamInGame
  })

  return teamGames
}