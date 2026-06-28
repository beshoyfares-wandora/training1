import {
  createStep,
  StepResponse,
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"

type HelloWorkflowInput = {
  name?: string
}

// A step is the unit of work in a workflow.
// The async function is the "do" logic; it must return a StepResponse.
const sayHelloStep = createStep(
  "say-hello-step",
  async (input: HelloWorkflowInput) => {
    const name = input.name || "world"

    return new StepResponse({
      message: `Hello, ${name}!`,
    })
  }
  // No compensation function here: this step has no side effects to undo.
)

// The composition function runs at LOAD time, so it must be a plain
// synchronous function — no async, no arrow fn, no if/concat here.
export const helloWorkflow = createWorkflow(
  "hello",
  function (input: HelloWorkflowInput) {
    const greeting = sayHelloStep(input)

    return new WorkflowResponse(greeting)
  }
)

export default helloWorkflow
