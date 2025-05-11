import csvParser from 'csv-parser'
import { Readable } from 'stream'

export const convertCsvToJson = async <T>(csvContent: string): Promise<T[]> => {
  const results: T[] = []
  const stream = new Readable()
  stream.push(csvContent)
  stream.push(null)

  return new Promise<T[]>((resolve, reject) => {
    stream
      .setEncoding('utf8')
      .pipe(csvParser({ separator: ';' }))
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results)
      })
      .on('error', (error) => {
        reject(error)
      })
  })
}
