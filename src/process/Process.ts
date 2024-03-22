import { SubProcess } from './SubProcess'

export class Process {
  private id: string
  private size: number
  private instructions: number
  private subProcess: SubProcess[] = []
  private pagesAddress: number[] = []

  private static countProcess: number = 0

  // segunda etapa
  // private time: number
  // private priority: boolean

  constructor(size: number) {
    Process.countProcess++

    this.id = `P${Process.countProcess}`
    this.size = size

    this.subProcess = this.insertSubProcess()
    this.instructions = this.size * 5
  }

  private insertSubProcess() {
    const listOfSubProcess = []

    for (let i = 0; i < this.size; i++) {
      const id = `${this.id}-${i}`
      listOfSubProcess.push(new SubProcess(id, 5))
    }

    return listOfSubProcess
  }

  public get getInstructions() {
    return this.instructions
  }

  public get getSubProcess() {
    return this.subProcess
  }

  public get getId(): string {
    return this.id
  }

  public get getSize(): number {
    return this.size
  }

  public get getPagesAddress() {
    return this.pagesAddress
  }

  public setPagesAddress(page: number) {
    this.pagesAddress.push(page)
  }
}
