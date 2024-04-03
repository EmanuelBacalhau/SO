import { Process } from '../process/Process'
import { SubProcess } from '../process/SubProcess'
import { SystemCallType } from '../so/SystemCallType'
import { SystemOperation } from '../so/SystemOperation'
import { Scheduler } from './Scheduler'

export class FirstComeFirstServed extends Scheduler {
  private queue: SubProcess[]

  constructor() {
    super()
    this.queue = []
  }

  public execute(process: Process): void {
    const subProcess: SubProcess[] = SystemOperation.systemCall({
      typeCall: SystemCallType.READ_PROCESS,
      process,
    }) as SubProcess[]

    subProcess.forEach((value) => {
      this.queue.push(value)
    })

    while (this.queue.length) {
      const cores = this.getCpuManage.getEmptyCores
      cores.forEach((core) => {
        const firstElement = this.queue.shift()
        core.subProcess = firstElement || null
      })
    }
  }

  public close(process: Process): void {
    throw new Error('Method not implemented.')
  }
}
