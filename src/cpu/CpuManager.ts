import { Scheduler } from '../scheduler/Scheduler'
import { Core } from './Core'

export class CpuManager {
  private cores: Core[]
  public static CLOCK: number = 1000
  public static NUMBER_OF_INSTRUCTIONS_BY_CLOCK: number = 7
  public static NUMBER_OF_CORES: number = 1
  private Scheduler: Scheduler

  constructor(scheduler: Scheduler) {
    this.Scheduler = scheduler
    this.cores = new Array(CpuManager.NUMBER_OF_CORES)

    for (let index = 0; index < this.cores.length; index++) {
      this.cores[index] = new Core(
        index,
        CpuManager.NUMBER_OF_INSTRUCTIONS_BY_CLOCK,
      )
    }

    this.runClock()
  }

  private runClock() {
    setInterval(() => {
      this.executeCores()
    }, CpuManager.CLOCK)
  }

  private executeCores() {
    const firstElement = this.Scheduler.execute()
    if (firstElement) {
      this.cores.forEach((core) => {
        if (!core.subProcess) {
          core.subProcess = firstElement
          core.run()
        }
      })
    }
  }
}
