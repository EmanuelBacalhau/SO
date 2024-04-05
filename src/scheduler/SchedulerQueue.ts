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
}
