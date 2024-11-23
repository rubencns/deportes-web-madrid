const deployUrl =
  "https://api.vercel.com/v1/integrations/deploy/prj_UsBxg4nHTtpZZJ9NNnBJrhs3thBX/B9iPUdxZlv"

type Request = {
  method: string
  json: () => Promise<any>
}

type Response = {
  status: (statusCode: number) => Response
  json: (body: any) => void
}

export default async function handler(req: Request, res: Response) {
  if (req.method === "POST") {
    try {
      const response = await fetch(deployUrl, {
        method: "POST",
      })

      if (response.ok) {
        res.status(200).json({ message: "Deployment triggered successfully!" })
      } else {
        const error = await response.json()
        res
          .status(response.status)
          .json({ error: error.message || "Failed to trigger deployment" })
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" })
  }
}
