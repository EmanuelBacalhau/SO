export class Process {
  private id: string
  private size: number
  private instructions: number
  private instructionsExecuted: number
  private subProcess: string[]

  public static COUNT_PROCESS = 0

  constructor(size: number) {
    Process.COUNT_PROCESS++

    this.id = `P${Process.COUNT_PROCESS}`
    this.size = size

    this.subProcess = []
    this.insertSubProcess()

    this.instructions = this.subProcess.length * 7
    this.instructionsExecuted = 0
  }

  private insertSubProcess() {
    for (let i = 0; i < this.getSize; i++) {
      this.subProcess.push(`${this.id}-${i}`)
    }
  }

  public start() {
    this.instructionsExecuted = 0
  }

  public checkSubProcessConclusions() {
    if (this.instructionsExecuted === this.instructions) {
      console.log(`Process ${this.id} finalized`)
    }
  }

  public setInstructionsExecuted(quantity: number) {
    this.instructionsExecuted += quantity
  }

  public get getId() {
    return this.id
  }

  public get getSize() {
    return this.size
  }

  public get getInstructions() {
    return this.instructions
  }

  public get getSubProcess() {
    return this.subProcess
  }
}
