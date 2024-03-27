import { SubProcess } from '../process/SubProcess'
import { Core } from './Core'

export class CpuManager {
  private _cores: Core[]
  static CLOCK: number = 500

  constructor(numberOfCores: number, numberInstructionsByClock: number) {
    this._cores = new Array<Core>(numberOfCores)
    for (let i = 0; i < this._cores.length; i++) {
      this._cores[i] = new Core(i, numberInstructionsByClock)
    }
  }

  registerProcess(coreIndex: number, subProcess: SubProcess) {
    this._cores[coreIndex].actuallySubProcess = subProcess
  }

  clock() {
    setTimeout(() => {
      this._executeProcesses()
    }, CpuManager.CLOCK)
  }

  private _executeProcesses() {
    this._cores.forEach((core) => {
      if (core.actuallySubProcess !== null) core.run()
    })
  }
}
