import { Process } from '../process/Process'
import { SubProcess } from '../process/SubProcess'
import { SystemCallType } from '../so/SystemCallType'
import { SystemOperation } from '../so/SystemOperation'
import { SchedulerQueue } from './SchedulerQueue'

export class Priority extends SchedulerQueue {
  public addSubProcess(process: Process): void {
    this.queueProcess.push(process)
  }

  public execute(): SubProcess | undefined {
    this.orderListByPriority()
    const element = this.queueSubProcesses.shift()

    if (element) {
      return element
    } else {
      return undefined
    }
  }

  private orderListByPriority() {
    this.queueProcess.sort((a, b) => b.getPriority - a.getPriority)

    const process = this.queueProcess.shift()

    if (process) {
      const subProcess: SubProcess[] = SystemOperation.systemCall({
        typeCall: SystemCallType.READ,
        process,
      }) as SubProcess[]

      subProcess.forEach((value) => {
        this.queueSubProcesses.push(value)
      })
    }
  }
}
