import { Process } from '../process/Process'
import { SystemCallType } from './SystemCallType'
import { MemoryManager } from '../memory/MemoryManager'
import { SubProcess } from '../process/SubProcess'
import { Scheduler } from '../scheduler/Scheduler'
import { FirstComeFirstServed } from '../scheduler/FirstComeFirstServed'
// import { ShortestJobFirst } from '../scheduler/ShortestJobFirst'
// import { Priority } from '../scheduler/Priority'
// import { Lottery } from '../scheduler/Lottery'

interface SystemCallProps {
  typeCall: SystemCallType
  processSize?: number
  process?: Process
}

export class SystemOperation {
  public static memoryManager = new MemoryManager()
  public static scheduler: Scheduler = new FirstComeFirstServed()

  public static systemCall({
    typeCall,
    processSize,
    process,
  }: SystemCallProps): Process | void | SubProcess[] {
    if (typeCall === SystemCallType.CREATE && processSize && !process) {
      return new Process(processSize)
    }

    if (typeCall === SystemCallType.WRITE && process) {
      this.memoryManager.write(process)
      this.scheduler.addSubProcess(process)
    }

    if (typeCall === SystemCallType.READ && process) {
      return this.memoryManager.read(process)
    }

    if (typeCall === SystemCallType.DELETE && process) {
      return this.memoryManager.delete(process)
    }

    if (typeCall === SystemCallType.STOP && process) {
      this.scheduler.close(process)
    }

    if (typeCall === SystemCallType.AGAIN && process) {
      this.scheduler.addSubProcess(process)
    }

    if (typeCall === SystemCallType.WAKE && process) {
      console.log('swap')
    }
  }
}
