import { Process } from '../process/Process'
import { Strategy } from '../memory/Strategy'
import { CpuManager } from '../cpu/CpuManager'
import { SystemCallType } from './SystemCallType'
import { MemoryManager } from '../memory/MemoryManager'

export class SystemOperation {
  private memoryManager: MemoryManager
  private cpuManager: CpuManager
  // private scheduler: Scheduler

  constructor(strategy: Strategy) {
    this.memoryManager = new MemoryManager(strategy)
    this.cpuManager = new CpuManager()
  }

  public systemCall(
    type: SystemCallType,
    process: Process | null = null,
  ): Process | null {
    if (type === SystemCallType.OPEN_PROCESS) {
      return this.createProcess()
    }

    if (type === SystemCallType.WRITE_PROCESS && process) {
      this.memoryManager.write(process)
    }

    if (
      type === SystemCallType.CLOSE_PROCESS &&
      process &&
      process.getAddress
    ) {
      this.memoryManager.deleteProcess(process.getId, {
        start: process.getAddress!.getStart,
        end: process.getAddress!.getEnd - 1,
      })
    }

    // if (type === SystemCallType.READ_PROCESS) {}

    return null
  }

  private createProcess(): Process {
    return new Process()
  }
}
