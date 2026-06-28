import {
  createStep,
  StepResponse,
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"
import { REVIEW_MODULE } from "../modules/review"
import ReviewModuleService from "../modules/review/service"

type CreateReviewInput = {
  rating: number
  content: string
  product_id: string
}

const createReviewStep = createStep(
  "create-review-step",
  async (input: CreateReviewInput, { container }) => {
    const reviewModuleService: ReviewModuleService =
      container.resolve(REVIEW_MODULE)
    const link = container.resolve("link")

    const { product_id, ...reviewData } = input

    // 1. create the review
    const review = await reviewModuleService.createReviews(reviewData)

    // 2. link it to the product
    await link.create({
      [Modules.PRODUCT]: { product_id },
      [REVIEW_MODULE]: { review_id: review.id },
    })

    return new StepResponse(review, { reviewId: review.id, product_id })
  },
  // compensation: undo both the link and the review on failure
  async (data, { container }) => {
    if (!data) return
    const reviewModuleService: ReviewModuleService =
      container.resolve(REVIEW_MODULE)
    const link = container.resolve("link")

    await link.dismiss({
      [Modules.PRODUCT]: { product_id: data.product_id },
      [REVIEW_MODULE]: { review_id: data.reviewId },
    })
    await reviewModuleService.deleteReviews(data.reviewId)
  }
)

export const createReviewWorkflow = createWorkflow(
  "create-review",
  (input: CreateReviewInput) => {
    const review = createReviewStep(input)
    return new WorkflowResponse(review)
  }
)
