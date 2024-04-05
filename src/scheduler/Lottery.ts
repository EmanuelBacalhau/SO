import { ExecuteSchedulerResponse } from '../interfaces/ExecuteSchedulerResponse'
import { Process } from '../process/Process'
import { SubProcess } from '../process/SubProcess'
import { SystemCallType } from '../so/SystemCallType'
import { SystemOperation } from '../so/SystemOperation'
import { Scheduler } from './Scheduler'
import { SchedulerType } from './SchedulerType'

export class Lottery extends Scheduler {
  private subProcess: SubProcess[]

  constructor() {
    super()
    this.subProcess = []
  }

  public addSubProcess(process: Process): void {
    const subProcess: SubProcess[] = SystemOperation.systemCall({
      typeCall: SystemCallType.READ,
      process,
    }) as SubProcess[]

    subProcess.forEach((value) => {
      this.subProcess.push(value)
    })
  }

  public execute(): ExecuteSchedulerResponse | undefined {
    const randomIndex = Math.floor(Math.random() * this.subProcess.length)
    const element = this.subProcess[randomIndex]

    this.subProcess = this.subProcess.filter((sb) => sb.getId !== element.getId)

    if (element) {
      return {
        element,
        type: SchedulerType.LOTTERY,
        index: randomIndex,
        priority: element.getPriority,
        timeExecution: element.getTimeExecution,
      }
    } else {
      return undefined
    }
  }

  public close(process: Process): void {
    this.subProcess = this.subProcess.filter(
      (sb) => sb.getProcess.getId !== process.getId,
    )
  }
}
