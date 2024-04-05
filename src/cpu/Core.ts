import { SubProcess } from '../process/SubProcess'

export class Core {
  private id: number
  private numberOfInstructionsByClock: number
  private _subProcess: SubProcess | undefined
  private countInstructions: number

  constructor(id: number, numberOfInstructionsByClock: number) {
    this.id = id
    this.numberOfInstructionsByClock = numberOfInstructionsByClock

    this._subProcess = undefined
    this.countInstructions = 0
  }

  public run() {
    console.log(`Executing ${this._subProcess?.getId}`)

    this.finish()
  }

  private finish() {
    if (this._subProcess) {
      this._subProcess.getProcess.setInstructionsExecuted(
        this._subProcess.getInstructions,
      )
      this._subProcess.getProcess.checkSubProcessConclusions()
    }
    this.countInstructions = 0
    this._subProcess = undefined
  }

  public get getId() {
    return this.id
  }

  public get subProcess(): SubProcess | undefined {
    return this._subProcess
  }

  public set subProcess(subProcess: SubProcess | undefined) {
    this._subProcess = subProcess
  }
}
