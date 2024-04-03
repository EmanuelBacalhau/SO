import { SubProcessList } from '../interfaces/SubProcessList'

export class Process {
  private id: string
  private size: number
  private instructions: number
  private subProcess: SubProcessList[]
  private isCompleted: boolean

  static COUNT_PROCESS = 0

  constructor(size: number) {
    Process.COUNT_PROCESS++

    this.id = `P${Process.COUNT_PROCESS}`
    this.size = size
    this.isCompleted = false

    this.subProcess = this.insertSubProcess()

    this.instructions = this.subProcess.length * 7
  }

  private insertSubProcess() {
    const subProcess: SubProcessList[] = []
    for (let i = 0; i < this.getSize; i++) {
      subProcess.push({ id: `${this.id}-${i}`, status: false })
    }

    return subProcess
  }

  public checkSubProcessConclusions() {
    const isCompleted = this.subProcess.some((sp) => sp.status === true)

    if (isCompleted) {
      this.isCompleted = true
      console.log(`Process: ${this.id} finalized`)
    }
  }

  public get getIsCompleted() {
    return this.isCompleted
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
