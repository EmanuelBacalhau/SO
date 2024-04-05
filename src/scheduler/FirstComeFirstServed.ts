import { Process } from '../process/Process'
import { SubProcess } from '../process/SubProcess'
import { SystemCallType } from '../so/SystemCallType'
import { SystemOperation } from '../so/SystemOperation'
import { SchedulerQueue } from './SchedulerQueue'

export class FirstComeFirstServed extends SchedulerQueue {
  public addSubProcess(process: Process): void {
    const subProcess: SubProcess[] = SystemOperation.systemCall({
      typeCall: SystemCallType.READ,
      process,
    }) as SubProcess[]

    subProcess.forEach((value) => {
      this.queue.push(value)
    })
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
