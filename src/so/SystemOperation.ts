import { Process } from '../process/Process'
import { SystemCallType } from './SystemCallType'
import { MemoryManager } from '../memory/MemoryManager'
import { SubProcess } from '../process/SubProcess'
import { Scheduler } from '../scheduler/Scheduler'
import { FirstComeFirstServed } from '../scheduler/FirstComeFirstServed'
import { Lottery } from '../scheduler/Lottery'
import { ShortestJobFirst } from '../scheduler/ShortestJobFirst'
import { Priority } from '../scheduler/Priority'
import { RoundRobin } from '../scheduler/RoundRobin'

interface SystemCallProps {
  typeCall: SystemCallType
  processSize?: number
  process?: Process
}

export class SystemOperation {
  public static memoryManager = new MemoryManager()
  public static scheduler: Scheduler = new RoundRobin(4)

  public static systemCall({
    typeCall,
    processSize,
    process,
  }: SystemCallProps): Process | void | SubProcess[] {
    if (
      typeCall === SystemCallType.CREATE_IN_MEMORY &&
      processSize &&
      !process
    ) {
      return new Process(processSize)
    }

    if (typeCall === SystemCallType.WRITE_IN_MEMORY && process) {
      this.memoryManager.write(process)
      this.scheduler.addSubProcess(process)
    }

    if (typeCall === SystemCallType.READ_IN_MEMORY && process) {
      return this.memoryManager.read(process)
    }

    if (typeCall === SystemCallType.DELETE_IN_MEMORY && process) {
      this.scheduler.close(process)
      return this.memoryManager.delete(process)
    }

    if (typeCall === SystemCallType.WAKE) {
      // this.scheduler.execute()
    }
  }
}
