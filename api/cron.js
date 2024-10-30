import { runPreBuildTasks } from "@services/csv"

export default async function handler(req, res) {
  try {
    await runPreBuildTasks()
    res.status(200).send("CSV tasks completed successfully!")
  } catch (error) {
    res.status(500).send("Failed to complete CSV tasks: " + error.message)
  }
}
