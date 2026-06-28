import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { STORE_CONTENT_MODULE } from "../../../../modules/store-content"
import StoreContentModuleService from "../../../../modules/store-content/service"
import { createMenuItemWorkflow } from "../../../../workflows/menu-item"
import { PostAdminMenuItemType } from "./validators"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const service: StoreContentModuleService =
    req.scope.resolve(STORE_CONTENT_MODULE)

  const [menu_items, count] = await service.listAndCountMenuItems(
    {},
    { order: { location: "ASC", rank: "ASC" } }
  )

  res.json({ menu_items, count })
}

export async function POST(
  req: MedusaRequest<PostAdminMenuItemType>,
  res: MedusaResponse
) {
  const { result } = await createMenuItemWorkflow(req.scope).run({
    input: req.validatedBody,
  })

  res.json({ menu_item: result })
}
