import { SubProcess } from '../process/SubProcess'
import { Core } from './Core'

export class CpuManager {
  private cores: Core[]
  public static CLOCK: number = 500

  constructor(numberOfCores = 4, numberInstructionsByClock = 1) {
    this.cores = new Array(numberOfCores)

    for (let index = 0; index < this.cores.length; index++) {
      this.cores[index] = new Core(index, numberInstructionsByClock)
    }

    this.runClock()
  }

  public registerSubProcessInCore(index: number, subProcess: SubProcess) {
    this.cores[index].subProcess = subProcess
  }

  private runClock() {
    setInterval(() => {
      this.executeCores()
    }, CpuManager.CLOCK)
  }

  private executeCores() {
    this.cores.forEach((core) => {
      return core.run()
    })
  }
}
