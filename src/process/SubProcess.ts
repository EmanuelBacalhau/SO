import { Process } from './Process'

export class SubProcess {
  private id: string
  private instructions: number
  private process: Process
  private timeExecution: number
  private priority: number
  private isCompleted: boolean

  constructor(id: string, process: Process) {
    this.id = id
    this.instructions = 7
    this.process = process
    this.timeExecution = Math.round(Math.random() * 20)

    const randomPriority = Math.floor(Math.random() * 2)
    this.priority = randomPriority
    this.isCompleted = false
  }

  public start() {
    this.isCompleted = false
  }

  public finish() {
    this.isCompleted = true
  }

  public get getId(): string {
    return this.id
  }

  public get getInstructions() {
    return this.instructions
  }

  public get getTimeExecution() {
    return this.timeExecution
  }

  public get getPriority() {
    return this.priority
  }

  public get getProcess() {
    return this.process
  }

  public get getIsCompleted() {
    return this.isCompleted
  }
}
