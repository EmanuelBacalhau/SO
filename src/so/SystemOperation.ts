import { Process } from '../process/Process'
import { Strategy } from '../memory/Strategy'
import { CpuManager } from '../cpu/CpuManager'
import { SystemCallType } from './SystemCallType'
import { MemoryManager } from '../memory/MemoryManager'

export class SystemOperation {
  private memoryManager: MemoryManager
  private cpuManager: CpuManager
  // private scheduler: Scheduler

  constructor() {
    this.memoryManager = new MemoryManager(Strategy.FIRST_FIT)
    this.cpuManager = new CpuManager()
  }

  public systemCall(type: SystemCallType, process: Process): Process | null {
    if (type === SystemCallType.WRITE_PROCESS) {
      this.memoryManager.write(process)
    }

    if (type === SystemCallType.CLOSE_PROCESS) {
      this.memoryManager.deleteProcess(process.getId)
    }

    // if (type === SystemCallType.READ_PROCESS) {}

    return null
  }

  public createProcess(): Process {
    return new Process()
  }
}
