import { ExecuteSchedulerResponse } from '../interfaces/ExecuteSchedulerResponse'
import { Process } from '../process/Process'
import { SubProcess } from '../process/SubProcess'
import { Scheduler } from './Scheduler'

export abstract class SchedulerQueue extends Scheduler {
  protected queue: SubProcess[]

  constructor() {
    super()
    this.queue = []
  }

  public close(process: Process): void {
    this.queue = this.queue.filter(
      (sb) => sb.getProcess.getId !== process.getId,
    )
  }
}
