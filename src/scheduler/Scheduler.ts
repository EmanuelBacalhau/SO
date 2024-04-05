import { CpuManager } from '../cpu/CpuManager'
import { Process } from '../process/Process'
import { SubProcess } from '../process/SubProcess'

export abstract class Scheduler {
  private cpuManager: CpuManager

  constructor() {
    this.cpuManager = new CpuManager(this)
  }

  public abstract addSubProcess(process: Process): void
  public abstract execute(): SubProcess | undefined
  public abstract close(process: Process): void

  public get getCpuManage() {
    return this.cpuManager
  }
}
