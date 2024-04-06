import { Process } from '../process/Process'
import { SubProcess } from '../process/SubProcess'
import { SystemCallType } from '../so/SystemCallType'
import { SystemOperation } from '../so/SystemOperation'
import { SchedulerQueue } from './SchedulerQueue'

export class ShortestJobFirst extends SchedulerQueue {
  private order: 'ASC' | 'DESC'

  constructor(order: 'ASC' | 'DESC' = 'ASC') {
    super()
    this.order = order
  }

  public addSubProcess(process: Process): void {
    this.queueProcess.push(process)
  }

  public execute(): SubProcess | undefined {
    this.orderListByTimeExecution()

    const element = this.queueSubProcesses.shift()

    if (element) {
      return element
    } else {
      return undefined
    }
  }

  private orderListByTimeExecution() {
    if (this.order === 'ASC') {
      this.queueProcess.sort((a, b) => a.getTimeExecution - b.getTimeExecution)

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
    } else {
      this.queueProcess.sort((a, b) => b.getTimeExecution - a.getTimeExecution)

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
}
