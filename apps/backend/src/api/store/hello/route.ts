import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { helloWorkflow } from "../../../workflows/hello"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const name = req.query.name as string | undefined

  // Run the workflow. req.scope is the request's DI container.
  const { result } = await helloWorkflow(req.scope).run({
    input: { name },
  })

  return res.json(result)
}
