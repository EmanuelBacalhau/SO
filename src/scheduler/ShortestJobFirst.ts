import { SchedulerQueue } from './SchedulerQueue'

import { Process } from '../process/Process'
import { SubProcess } from '../process/SubProcess'

import { SystemCallType } from '../so/SystemCallType'
import { SystemOperation } from '../so/SystemOperation'

export class ShortestJobFirst extends SchedulerQueue {
  private order: 'ASC' | 'DESC'

  constructor(order: 'ASC' | 'DESC' = 'ASC') {
    super()
    this.order = order
  }

  public addSubProcess(process: Process): void {
    const subProcess: SubProcess[] = SystemOperation.systemCall({
      typeCall: SystemCallType.READ,
      process,
    }) as SubProcess[]

    subProcess.forEach((value) => {
      this.queue.push(value)
    })

    if (this.order === 'ASC') {
      this.queue.sort((a, b) => a.getTimeExecution - b.getTimeExecution)
    } else {
      this.queue.sort((a, b) => b.getTimeExecution - a.getTimeExecution)
    }
  }
}
