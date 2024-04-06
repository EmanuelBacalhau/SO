import { Process } from '../process/Process'
import { SubProcess } from '../process/SubProcess'
import { SystemCallType } from '../so/SystemCallType'
import { SystemOperation } from '../so/SystemOperation'
import { SchedulerQueue } from './SchedulerQueue'

export class FirstComeFirstServed extends SchedulerQueue {
  public addSubProcess(process: Process): void {
    this.queueProcess.push(process)

    const subProcesses = SystemOperation.systemCall({
      typeCall: SystemCallType.READ,
      process,
    }) as SubProcess[]

    subProcesses.forEach((sp) => {
      this.queueSubProcesses.push(sp)
    })
  }
}
