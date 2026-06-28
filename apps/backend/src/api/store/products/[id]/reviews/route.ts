import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { createReviewWorkflow } from "../../../../../workflows/create-review"
import { PostStoreReviewType } from "./validators"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const productId = req.params.id

  const query = req.scope.resolve("query")

  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "reviews.*"],
    filters: {
      id: productId,
    },
  })

  const reviews = products[0]?.reviews ?? []

  res.json({ reviews })
}

export async function POST(
  req: MedusaRequest<PostStoreReviewType>,
  res: MedusaResponse
) {
  const productId = req.params.id

  const { result } = await createReviewWorkflow(req.scope).run({
    input: {
      ...req.validatedBody,
      product_id: productId,
    },
  })

  res.json({ review: result })
}