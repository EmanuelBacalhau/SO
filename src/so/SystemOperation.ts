import { Process } from "../process/Process";
import { Strategy } from "../memory/Strategy";
import { CpuManager } from "../cpu/CpuManager";
import { SystemCallType } from "./SystemCallType";
import { Scheduler } from "../scheduler/Scheduler";
import { MemoryManager } from "../memory/MemoryManager";

export class OperationalSystem {
  private static memoryManager: MemoryManager
  private static cpuManager: CpuManager
  private static scheduler: Scheduler

  public static createProcess(): Process {
    if (!this.memoryManager) {
      this.memoryManager = new MemoryManager(Strategy.FIRST_FIT)
    }

    if (!this.cpuManager) {
      this.cpuManager = new CpuManager()
    }

    return new Process()
  }

  public static systemCall(type: SystemCallType, p: Process): void {
    if (type === SystemCallType.OPEN_PROCESS) {}

    if (type === SystemCallType.CLOSE_PROCESS) {}
  }
}