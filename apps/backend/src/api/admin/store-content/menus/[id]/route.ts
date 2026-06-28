import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import {
  updateMenuItemWorkflow,
  deleteMenuItemWorkflow,
} from "../../../../../workflows/menu-item"
import { PostAdminUpdateMenuItemType } from "../validators"

export async function POST(
  req: MedusaRequest<PostAdminUpdateMenuItemType>,
  res: MedusaResponse
) {
  const { result } = await updateMenuItemWorkflow(req.scope).run({
    input: { id: req.params.id, ...req.validatedBody },
  })

  res.json({ menu_item: result })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  await deleteMenuItemWorkflow(req.scope).run({
    input: { id: req.params.id },
  })

  res.json({ id: req.params.id, object: "menu_item", deleted: true })
}
