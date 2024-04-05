import { Process } from '../process/Process'
import { SubProcess } from '../process/SubProcess'
import { Scheduler } from './Scheduler'

export abstract class SchedulerQueue extends Scheduler {
  protected queue: SubProcess[]

  constructor() {
    super()
    this.queue = []
  }

  public execute(): SubProcess | undefined {
    return this.queue.shift()
  }

  public close(process: Process): void {
    let count = 0
    for (let i = 0; i < this.queue.length; i++) {
      const element = this.queue[i]
      if (element.getProcess.getId === process.getId) {
        count++
      }
    }

    this.queue.splice(0, count)
  }
}
