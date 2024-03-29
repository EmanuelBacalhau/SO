export class Process {
  private id: string
  private size: number
  private instructions: number
  private subProcess: string[]

  static COUNT_PROCESS = 0

  constructor(size: number) {
    Process.COUNT_PROCESS++

    this.id = `P${Process.COUNT_PROCESS}`
    this.size = size

    this.subProcess = this.insertSubProcess()

    this.instructions = this.subProcess.length * 7
  }

  private insertSubProcess() {
    const subProcess = []
    for (let i = 0; i < this.getSize; i++) {
      subProcess.push(`${this.id}-${i}`)
    }

    return subProcess
  }

  public get getId(): string {
    return this.id
  }

  public get getSize(): number {
    return this.size
  }

  public get getInstructions() {
    return this.instructions
  }

  public get getSubProcess() {
    return this.subProcess
  }
}
