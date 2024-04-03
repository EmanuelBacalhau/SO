import { CpuManager } from '../cpu/CpuManager'
import { Process } from '../process/Process'

export abstract class Scheduler {
  private cpuManager: CpuManager

  constructor() {
    this.cpuManager = new CpuManager()
  }

  public abstract execute(process: Process): void
  public abstract close(process: Process): void

  public get getCpuManage() {
    return this.cpuManager
  }
}
