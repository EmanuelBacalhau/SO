import { ExecuteSchedulerResponse } from '../interfaces/ExecuteSchedulerResponse'
import { Process } from '../process/Process'
import { SubProcess } from '../process/SubProcess'
import { SystemCallType } from '../so/SystemCallType'
import { SystemOperation } from '../so/SystemOperation'
import { SchedulerQueue } from './SchedulerQueue'
import { SchedulerType } from './SchedulerType'

export class Priority extends SchedulerQueue {
  public addSubProcess(process: Process): void {
    const subProcess: SubProcess[] = SystemOperation.systemCall({
      typeCall: SystemCallType.READ,
      process,
    }) as SubProcess[]

    subProcess.forEach((value) => {
      this.queue.push(value)
    })

    this.queue.sort((a, b) => b.getPriority - a.getPriority)
  }

  public execute(): ExecuteSchedulerResponse | undefined {
    const element = this.queue.shift()

    if (element) {
      return {
        element,
        index: 0,
        priority: element?.getPriority,
        timeExecution: element?.getTimeExecution,
        type: SchedulerType.PRIORITY,
      }
    } else {
      return undefined
    }
  }
}
