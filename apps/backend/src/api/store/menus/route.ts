import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { STORE_CONTENT_MODULE } from "../../../modules/store-content"
import StoreContentModuleService from "../../../modules/store-content/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const service: StoreContentModuleService =
    req.scope.resolve(STORE_CONTENT_MODULE)

  const items = await service.listMenuItems({}, { order: { rank: "ASC" } })

  res.json({
    header: items.filter((i) => i.location === "header"),
    footer: items.filter((i) => i.location === "footer"),
  })
}
