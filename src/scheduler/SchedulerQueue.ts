import { Process } from '../process/Process'
import { SubProcess } from '../process/SubProcess'
import { Scheduler } from './Scheduler'

export abstract class SchedulerQueue extends Scheduler {
  protected queue: Process[]
  protected subProcessList: SubProcess[] = []

  constructor() {
    super()
    this.queue = []
  }

  public close(process: Process): void {
    this.queue = this.queue.filter((p) => p.getId !== process.getId)
    this.subProcessList = this.subProcessList.filter(
      (sb) => sb.getProcess.getId !== process.getId,
    )
  }
}
