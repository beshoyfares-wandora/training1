import {
  defineMiddlewares,
  validateAndTransformBody,
} from "@medusajs/framework/http"
import { PostStoreReviewSchema } from "./store/products/[id]/reviews/validators"
import {
  PostAdminMenuItemSchema,
  PostAdminUpdateMenuItemSchema,
} from "./admin/store-content/menus/validators"

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/products/:id/reviews",
      method: "POST",
      middlewares: [validateAndTransformBody(PostStoreReviewSchema)],
    },
    {
      matcher: "/admin/store-content/menus",
      method: "POST",
      middlewares: [validateAndTransformBody(PostAdminMenuItemSchema)],
    },
    {
      matcher: "/admin/store-content/menus/:id",
      method: "POST",
      middlewares: [validateAndTransformBody(PostAdminUpdateMenuItemSchema)],
    },
  ],
})
