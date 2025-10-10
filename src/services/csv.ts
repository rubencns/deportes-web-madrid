import { competitionCode, gamesCsvUrl, standingsCsvUrl } from '@constants/common'
import type { Game } from '@models/Game'
import type { Standing } from '@models/Standing'
import { convertCsvToJson } from '@utils/convertCsvToJson'
import fs from 'fs/promises'
import path from 'path'

const gamesJsonPath = path.join(process.cwd(), '/src/database/games.json')
const standingsJsonPath = path.join(process.cwd(), '/src/database/standings.json')

const getCsvByUrl = async (url: string) => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    // Leer los datos como ArrayBuffer
    const arrayBuffer = await response.arrayBuffer()

    // Decodificar los datos manualmente
    const decoder = new TextDecoder('iso-8859-1')
    const csvData = decoder.decode(arrayBuffer)

    return csvData
  } catch (error) {
    console.error('Fetching CSV failed:', error)
    throw error
  }
}

const generateGamesJsonFile = async () => {
  const csvData = await getCsvByUrl(gamesCsvUrl)
  const games = await convertCsvToJson<Game>(csvData)

  const filteredGamesByCompetition = games.filter(
    (game) => game.Codigo_competicion.trim() === competitionCode,
  )

  const gamesJson = JSON.stringify(filteredGamesByCompetition, null, 2)

  await fs.writeFile(gamesJsonPath, gamesJson, 'utf-8')
}

const generateStandingsJsonFile = async () => {
  const csvData = await getCsvByUrl(standingsCsvUrl)
  const standings = await convertCsvToJson<Standing>(csvData)

  const filteredStandingsByCompetition = standings.filter(
    (standing) => standing.Codigo_competicion.trim() === competitionCode,
  )

  const standingsJson = JSON.stringify(filteredStandingsByCompetition, null, 2)

  await fs.writeFile(standingsJsonPath, standingsJson, 'utf-8')
}

async function runPreBuildTasks() {
  try {
    await generateGamesJsonFile()
    await generateStandingsJsonFile()
    console.log('Database files generated successfully!')
  } catch (error) {
    console.error('Failed to generate database files:', error)
    process.exit(1)
  }
}

runPreBuildTasks()
