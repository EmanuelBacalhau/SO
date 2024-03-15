import { Process } from '../process/Process'
import { Strategy } from '../memory/Strategy'
import { CpuManager } from '../cpu/CpuManager'
import { SystemCallType } from './SystemCallType'
import { MemoryManager } from '../memory/MemoryManager'
import { AddressMemory } from '../memory/AddressMemory'

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
      if (
        process.getAddress instanceof AddressMemory ||
        process.getAddress instanceof Array
      ) {
        this.memoryManager.deleteProcess(process.getId, process.getAddress)
      }
    }

    // if (type === SystemCallType.READ_PROCESS) {}

    return null
  }

  private createProcess(): Process {
    return new Process()
  }
}
