import { Process } from './Process'

export class SubProcess {
  private id: string
  private instructions: number
  private process: Process
  private timeExecution: number

  constructor(id: string, process: Process) {
    this.id = id
    this.instructions = 7
    this.process = process
    this.timeExecution = Math.round(Math.random() * 20)
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

  public get getProcess() {
    return this.process
  }
}
