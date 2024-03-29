import { Process } from '../process/Process'
import { SystemCallType } from './SystemCallType'
import { MemoryManager } from '../memory/MemoryManager'
import { SubProcess } from '../process/SubProcess'

interface SystemCallProps {
  typeCall: SystemCallType
  processSize?: number
  process?: Process
}

export class SystemOperation {
  private memoryManager: MemoryManager

  constructor(pageSize?: number) {
    this.memoryManager = new MemoryManager(pageSize)
  }

  public systemCall({
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
