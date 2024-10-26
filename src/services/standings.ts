import standings from "@mock/standings.json";
import type { Standing } from "@models/Standing";
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter";

export const getStandings = async (): Promise<Standing[]> => {
  return await standings.map(standing => ({
    ...standing,
    Nombre_equipo: capitalizeFirstLetter(standing.Nombre_equipo),
  })) as Standing[]
};

export const getStandingsByGroupCode = async (code: number): Promise<Standing[]> => {
  const standings = await getStandings()
  const filteredStandings = await standings.filter((standing) =>
    standing.Codigo_grupo === code)

  return filteredStandings as any
}

export const getGroupDetailsByCode = async (code: number) => {
  const standings = await getStandingsByGroupCode(code)

  if (standings.length === 0) return null

  const { Nombre_grupo, Nombre_fase, Nombre_competicion } = standings[0]
  return await { Nombre_grupo, Nombre_fase, Nombre_competicion }
}