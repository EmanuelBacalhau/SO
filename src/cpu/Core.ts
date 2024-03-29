import { SubProcess } from '../process/SubProcess'

export class Core {
  private id: number
  private numberOfInstructionsByClock: number
  private _subProcess: SubProcess | null
  private countInstructions: number

  constructor(id: number, numberOfInstructionsByClock: number) {
    this.id = id
    this.numberOfInstructionsByClock = numberOfInstructionsByClock

    this._subProcess = null
    this.countInstructions = 0
  }

  public run() {
    this.countInstructions += this.numberOfInstructionsByClock

    if (
      this._subProcess &&
      this.countInstructions >= this._subProcess.getInstructions
    ) {
      this.finish()
    }
  }

  private finish() {
    this.countInstructions = 0
    this._subProcess = null
  }

  public get getId() {
    return this.id
  }

  public get subProcess(): SubProcess | null {
    return this._subProcess
  }

  public set subProcess(subProcess: SubProcess) {
    this._subProcess = subProcess
  }
}
