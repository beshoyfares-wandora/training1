import { model } from "@medusajs/framework/utils"

export const MenuItem = model.define("menu_item", {
  id: model.id().primaryKey(),
  label: model.text(),
  url: model.text(),
  // where the link appears in the storefront
  location: model.enum(["header", "footer"]),
  // ordering within a location (lower shows first)
  rank: model.number().default(0),
  // open the link in a new browser tab
  new_tab: model.boolean().default(false),
})

export default MenuItem
