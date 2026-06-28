import { MedusaService } from "@medusajs/framework/utils"
import MenuItem from "./models/menu-item"

class StoreContentModuleService extends MedusaService({
  MenuItem,
}) {}

export default StoreContentModuleService
