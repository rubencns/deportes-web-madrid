export interface Standing {
  Codigo_temporada: number,
  Codigo_competicion: number,
  Codigo_fase: number,
  Codigo_grupo: number,
  Codigo_equipo: number,
  Posicion: number,
  Puntos: number,
  Partidos_jugados: number,
  Partidos_ganados: number,
  Partidos_empatados: number,
  Partidos_perdidos: number,
  Goles_favor: number,
  Goles_contra: number,
  Nombre_temporada: `${string}/${string}`, // YYYY/YYYY
  Nombre_competicion: string,
  Nombre_fase: string,
  Nombre_grupo: string,
  Nombre_deporte: string,
  Nombre_categoria: string,
  Nombre_equipo: string,
  'Nombre-Sexo': "MIXTO",
  Nombre_distrito: string
}

export type gender = "MASCULINO" | "FEMENINO" | "MIXTO"