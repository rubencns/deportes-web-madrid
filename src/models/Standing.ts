export interface Standing {
  Codigo_temporada: string,
  Codigo_competicion: string,
  Codigo_fase: string,
  Codigo_grupo: string,
  Codigo_equipo: string,
  Posicion: string,
  Puntos: string,
  Partidos_jugados: string,
  Partidos_ganados: string,
  Partidos_empatados: string,
  Partidos_perdidos: string,
  Goles_favor: string,
  Goles_contra: string,
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

export interface GroupDetailsUI {
  Nombre_grupo: Standing['Nombre_grupo'],
  Nombre_fase: Standing['Nombre_fase'],
  Nombre_competicion: Standing['Nombre_competicion']
}