import { Process } from '../process/Process'
import { SystemCallType } from './SystemCallType'
import { MemoryManager } from '../memory/MemoryManager'

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

  public systemCall({ typeCall, processSize, process }: SystemCallProps) {
    if (typeCall === SystemCallType.OPEN_PROCESS && processSize) {
      return new Process(processSize)
    }

    if (typeCall === SystemCallType.WRITE_PROCESS && process) {
      this.memoryManager.write(process)
    }
  }
}
