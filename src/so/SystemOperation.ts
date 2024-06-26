import { Process } from '../process/Process'
import { SystemCallType } from './SystemCallType'
import { MemoryManager } from '../memory/MemoryManager'
import { SubProcess } from '../process/SubProcess'
import { Scheduler } from '../scheduler/Scheduler'
import { FirstComeFirstServed } from '../scheduler/FirstComeFirstServed'
import { Lottery } from '../scheduler/Lottery'
import { ShortestJobFirst } from '../scheduler/ShortestJobFirst'
import { Priority } from '../scheduler/Priority'
import { HDManager } from '../memory/HDManager'
import { RoundRobin } from '../scheduler/RoundRobin'

interface SystemCallProps {
  typeCall: SystemCallType
  processSize?: number
  process?: Process
  priority?: number
  timeExecution?: number
}

export class SystemOperation {
  public static memoryManager = new MemoryManager()
  public static hdManager = new HDManager()
  public static scheduler: Scheduler = new ShortestJobFirst()

  public static systemCall({
    typeCall,
    processSize,
    process,
    priority,
    timeExecution,
  }: SystemCallProps): Process | void | SubProcess[] {
    if (typeCall === SystemCallType.CREATE && processSize && !process) {
      return new Process(processSize, priority, timeExecution)
    }

    if (typeCall === SystemCallType.WRITE && process) {
      const checkWrite = this.memoryManager.checkWrite(process)

      if (checkWrite) {
        this.memoryManager.write(process)
        this.scheduler.addProcess(process)
      } else {
        const processes = this.memoryManager.swap(process)

        for (let i = 0; i < processes.length; i++) {
          const element = processes[i]
          this.hdManager.write(element)
          this.scheduler.close(element)
        }

        this.memoryManager.write(process)
        this.scheduler.addProcess(process)
        // console.log('Page fault')
      }
    }

    if (typeCall === SystemCallType.READ && process) {
      return this.memoryManager.read(process)
    }

    if (typeCall === SystemCallType.DELETE && process) {
      this.scheduler.close(process)
      this.memoryManager.delete(process)
    }

    if (typeCall === SystemCallType.STOP && process) {
      this.scheduler.close(process)
    }

    if (typeCall === SystemCallType.WAKE && process) {
      const checkWrite = this.memoryManager.checkWrite(process)

      if (checkWrite) {
        this.memoryManager.write(process)
        this.scheduler.addProcess(process)
        this.hdManager.remove(process)
      } else {
        const processes = this.memoryManager.swap(process)

        for (let i = 0; i < processes.length; i++) {
          const element = processes[i]
          this.hdManager.write(element)
          this.scheduler.close(element)
        }

        process.setInputMemory(Date.now())

        this.memoryManager.write(process)
        this.scheduler.addProcess(process)
        this.hdManager.remove(process)
      }
    }
  }
}
