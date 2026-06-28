import {
  createStep,
  StepResponse,
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { STORE_CONTENT_MODULE } from "../modules/store-content"
import StoreContentModuleService from "../modules/store-content/service"

type MenuItemLocation = "header" | "footer"

/* ----------------------------- CREATE ----------------------------- */

export type CreateMenuItemInput = {
  label: string
  url: string
  location: MenuItemLocation
  rank?: number
  new_tab?: boolean
}

const createMenuItemStep = createStep(
  "create-menu-item-step",
  async (input: CreateMenuItemInput, { container }) => {
    const service: StoreContentModuleService =
      container.resolve(STORE_CONTENT_MODULE)
    const item = await service.createMenuItems(input)
    return new StepResponse(item, item.id)
  },
  async (id, { container }) => {
    if (!id) return
    const service: StoreContentModuleService =
      container.resolve(STORE_CONTENT_MODULE)
    await service.deleteMenuItems(id)
  }
)

export const createMenuItemWorkflow = createWorkflow(
  "create-menu-item",
  (input: CreateMenuItemInput) => {
    const item = createMenuItemStep(input)
    return new WorkflowResponse(item)
  }
)

/* ----------------------------- UPDATE ----------------------------- */

export type UpdateMenuItemInput = {
  id: string
  label?: string
  url?: string
  location?: MenuItemLocation
  rank?: number
  new_tab?: boolean
}

const updateMenuItemStep = createStep(
  "update-menu-item-step",
  async (input: UpdateMenuItemInput, { container }) => {
    const service: StoreContentModuleService =
      container.resolve(STORE_CONTENT_MODULE)
    // snapshot the current values so we can roll back on failure
    const before = await service.retrieveMenuItem(input.id)
    const updated = await service.updateMenuItems(input)
    return new StepResponse(updated, before)
  },
  async (before, { container }) => {
    if (!before) return
    const service: StoreContentModuleService =
      container.resolve(STORE_CONTENT_MODULE)
    await service.updateMenuItems({
      id: before.id,
      label: before.label,
      url: before.url,
      location: before.location,
      rank: before.rank,
      new_tab: before.new_tab,
    })
  }
)

export const updateMenuItemWorkflow = createWorkflow(
  "update-menu-item",
  (input: UpdateMenuItemInput) => {
    const item = updateMenuItemStep(input)
    return new WorkflowResponse(item)
  }
)

/* ----------------------------- DELETE ----------------------------- */

const deleteMenuItemStep = createStep(
  "delete-menu-item-step",
  async (id: string, { container }) => {
    const service: StoreContentModuleService =
      container.resolve(STORE_CONTENT_MODULE)
    // snapshot before deleting so we can recreate on rollback
    const item = await service.retrieveMenuItem(id)
    await service.deleteMenuItems(id)
    return new StepResponse(id, item)
  },
  async (item, { container }) => {
    if (!item) return
    const service: StoreContentModuleService =
      container.resolve(STORE_CONTENT_MODULE)
    await service.createMenuItems({
      label: item.label,
      url: item.url,
      location: item.location,
      rank: item.rank,
      new_tab: item.new_tab,
    })
  }
)

export const deleteMenuItemWorkflow = createWorkflow(
  "delete-menu-item",
  (input: { id: string }) => {
    const result = deleteMenuItemStep(input.id)
    return new WorkflowResponse(result)
  }
)
