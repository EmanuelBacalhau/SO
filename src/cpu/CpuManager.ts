import { SubProcess } from '../process/SubProcess'
import { Core } from './Core'

export class CpuManager {
  private cores: Core[]
  public static CLOCK: number = 5000
  public static NUMBER_OF_INSTRUCTIONS_BY_CLOCK: number = 1
  public static NUMBER_OF_CORES: number = 1

  constructor() {
    this.cores = new Array(CpuManager.NUMBER_OF_CORES)

    for (let index = 0; index < this.cores.length; index++) {
      this.cores[index] = new Core(
        index,
        CpuManager.NUMBER_OF_INSTRUCTIONS_BY_CLOCK,
      )
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
      core.run()
    })
  }

  public get getEmptyCores() {
    const cores = []

    for (let i = 0; i < this.cores.length; i++) {
      const element = this.cores[i]

      if (element.subProcess === null) {
        cores.push(this.cores[i])
      }
    }

    return cores
  }
}
