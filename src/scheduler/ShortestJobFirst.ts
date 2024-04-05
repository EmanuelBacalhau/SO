import { SchedulerQueue } from './SchedulerQueue'

import { Process } from '../process/Process'
import { SubProcess } from '../process/SubProcess'

import { SystemCallType } from '../so/SystemCallType'
import { SystemOperation } from '../so/SystemOperation'
import { ExecuteSchedulerResponse } from '../interfaces/ExecuteSchedulerResponse'
import { SchedulerType } from './SchedulerType'

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

  public execute(): ExecuteSchedulerResponse | undefined {
    const element = this.queue.shift()

    if (element) {
      return {
        element,
        index: 0,
        priority: element?.getPriority,
        timeExecution: element?.getTimeExecution,
        type: SchedulerType.SHORTEST_JOB_FIRST,
      }
    } else {
      return undefined
    }
  }
}
