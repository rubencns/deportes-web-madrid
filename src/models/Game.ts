export interface Game {
  Codigo_temporada: string
  Codigo_competicion: string
  Codigo_fase: string
  Codigo_grupo: string
  Jornada: string
  Partido: string
  Codigo_equipo1: string
  Codigo_equipo2: string
  Resultado1: string
  Resultado2: string
  Codigo_campo: string
  Fecha: `${string}-${string}-${string}` // YYYY-MM-DD
  Hora: `${string}:${string}` // HH:MM
  Programado: Scheduled
  Estado: GameStatus
  Nombre_temporada: `${string}/${string}` // YYYY/YYYY
  Nombre_competicion: string
  Nombre_fase: string
  Nombre_grupo: string
  Nombre_deporte: string
  Nombre_categoria: string
  Nombre_jornada: string
  Equipo_local: string
  Equipo_visitante: string
  Campo: string
  Sexo_grupo: "M" | "F"
  Distrito: string
  Observaciones: string
  SISTEMA_COMPETICION: string
  COORD_X_CAMPO: string
  COORD_Y_CAMPO: string
  Color_Camiseta_1: string
  Color_Camiseta_2: string
}

/* A: encuentro reprogramado, es decir, encuentro que
tras haber sido suspendido o aplazado ha sido dotado
de nueva fecha, campo y hora de celebración.
> C: se emplea para encuentros, cuyas actas, antes
de darles un resultado, tienen que ser tramitadas por
los Comités de disciplina deportiva o de competición
> F: finalizado
> S: suspendido
> N: no presentado alguno de los equipos. Para saber
quién ha sido el equipo que no se ha presentado,
habría que mirar el resultado ( el equipo que ha
perdido seria el no presentado)
> O: aplazado organización
> R: se emplea para encuentros de los cuales la
organización desconoce el resultado. Lo habitual en
este caso es que el acta del encuentro no haya sido
entregada por el árbitro.  */
export type GameStatus = "A" | "C" | "F" | "S" | "N" | "O" | "R"

/* Un 1 indica que el partido ha sido programado: se le ha
asignado fecha, hora y campo. */
export type Scheduled = 1

export interface MatchDayUI {
  Jornada: string
  Nombre_jornada: string
  Fecha: `${string}-${string}-${string}` // YYYY-MM-DD
}
