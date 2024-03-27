import { SubProcess } from '../process/SubProcess'

export class Core {
  private _id: number
  private _numberOfInstructionsByClock: number
  private _actuallySubProcess: SubProcess | null
  private countInstructions: number = 0

  constructor(id: number, numberOfInstructionsByClock: number) {
    this._id = id
    this._actuallySubProcess = null
    this._numberOfInstructionsByClock = numberOfInstructionsByClock
  }

  run() {
    this.countInstructions += this._numberOfInstructionsByClock
    if (this.countInstructions >= this._actuallySubProcess!.getInstruction) {
      this.finishSubProcess()
      this._actuallySubProcess?.finish()
      this._actuallySubProcess?.getProcess.finish()
    }
  }

  private finishSubProcess() {
    this._actuallySubProcess = null
    this.countInstructions = 0
  }

  public get id() {
    return this._id
  }

  public get actuallySubProcess(): SubProcess | null {
    return this._actuallySubProcess
  }

  public set actuallySubProcess(actuallySubProcess: SubProcess) {
    this._actuallySubProcess = actuallySubProcess
  }
}
