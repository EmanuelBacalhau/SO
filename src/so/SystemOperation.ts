import { Process } from '../process/Process'
import { SystemCallType } from './SystemCallType'
import { MemoryManager } from '../memory/MemoryManager'
import { SubProcess } from '../process/SubProcess'
import { Scheduler } from '../scheduler/Scheduler'
import { FirstComeFirstServed } from '../scheduler/FirstComeFisrtServed'

interface SystemCallProps {
  typeCall: SystemCallType
  processSize?: number
  process?: Process
}

export class SystemOperation {
  public static memoryManager = new MemoryManager()
  private scheduler: Scheduler = new FirstComeFirstServed()

  public static systemCall({
    typeCall,
    processSize,
    process,
  }: SystemCallProps): Process | void | SubProcess[] {
    if (typeCall === SystemCallType.OPEN_PROCESS && processSize && !process) {
      return new Process(processSize)
    }

    if (typeCall === SystemCallType.WRITE_PROCESS && process) {
      this.memoryManager.write(process)
    }

    if (typeCall === SystemCallType.READ_PROCESS && process) {
      return this.memoryManager.read(process)
    }

    if (typeCall === SystemCallType.CLOSE_PROCESS && process) {
      return this.memoryManager.delete(process)
    }
  }
}
