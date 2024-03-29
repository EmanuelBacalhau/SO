import { AddressMemory } from '../interfaces/AddressMemory'
import { Process } from '../process/Process'
import { SubProcess } from '../process/SubProcess'

export class MemoryManager {
  public physicMemory: (SubProcess | undefined)[][]

  private logicMemory: Map<string, AddressMemory>
  private pageSize: number

  constructor(pageSize = 4, memorySize = 256) {
    this.pageSize = pageSize

    const quantityPages = memorySize / this.pageSize

    this.physicMemory = new Array(quantityPages)
    for (let frame = 0; frame < this.physicMemory.length; frame++) {
      this.physicMemory[frame] = new Array(this.pageSize)
    }

    this.logicMemory = new Map<string, AddressMemory>()
  }

  public read(process: Process) {
    const subProcess: SubProcess[] = []

    for (let i = 0; i < process.getSubProcess.length; i++) {
      const subProcessId = process.getSubProcess[i]

      const addressSubProcess = this.logicMemory.get(subProcessId)

      if (
        addressSubProcess &&
        this.physicMemory[addressSubProcess.frame][addressSubProcess.index]
      ) {
        subProcess.push(
          this.physicMemory[addressSubProcess.frame][
            addressSubProcess.index
          ] as SubProcess,
        )
      }
    }

    return subProcess
  }

  public write(process: Process): void {
    this.allocateProcessWithPaging(process)
  }

  private findEmptyPages() {
    const framesIndex: number[] = []

    for (let frame = 0; frame < this.physicMemory.length; frame++) {
      const element = this.physicMemory[frame]

      if (!element[0]) {
        framesIndex.push(frame)
      }
    }

    return framesIndex
  }

  private allocateProcessWithPaging(process: Process) {
    const emptyFrames = this.findEmptyPages()

    let countSize = 0

    for (let i = 0; i < emptyFrames.length; i++) {
      const frame = emptyFrames[i]
      const page = this.physicMemory[frame]

      let indexPage = 0

      while (indexPage < page.length && countSize < process.getSize) {
        const subProcessId = process.getSubProcess[countSize]

        this.physicMemory[frame][indexPage] = new SubProcess(
          subProcessId,
          process,
        )

        this.logicMemory.set(subProcessId, {
          frame,
          index: indexPage,
        })

        countSize++
        indexPage++
      }
    }
  }

  // DELETE PROCESS
  // public deleteProcess(
  //   processId: string,
  //   address: AddressMemory | AddressMemory[],
  // ): void {
  //   const addressMemories = this.logicMemory.get(processId)

  //   for (let i = 0; i < addressMemories!.length; i++) {
  //     const element = addressMemories![i]

  //     for (let i = element.getStart; i <= element.getEnd; i++) {
  //       this.physicMemory[i] = undefined
  //     }

  //     // this.logRemoveProcess(processId, {
  //     //   start: element.getStart,
  //     //   end: element.getEnd,
  //     // })
  //   }

  //   this.logicMemory.delete(processId)
  // }
}
