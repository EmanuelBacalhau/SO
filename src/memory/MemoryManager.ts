import { AddressMemory } from '../interfaces/AddressMemory'
import { Process } from '../process/Process'
import { SubProcess } from '../process/SubProcess'

export class MemoryManager {
  public physicMemory: (SubProcess | undefined)[][]

  private logicMemory: Map<string, AddressMemory>

  public static PAGE_SIZE = 4
  public static MEMORY_SIZE = 256

  constructor() {
    const quantityPages = MemoryManager.MEMORY_SIZE / MemoryManager.PAGE_SIZE

    this.physicMemory = new Array(quantityPages)
    for (let frame = 0; frame < this.physicMemory.length; frame++) {
      this.physicMemory[frame] = new Array<undefined>(MemoryManager.PAGE_SIZE)
    }

    this.logicMemory = new Map<string, AddressMemory>()
  }

  public read(process: Process) {
    const subProcess: SubProcess[] = []

    for (let i = 0; i < process.getSubProcess.length; i++) {
      const subProcessIdSelected = process.getSubProcess[i]

      const addressSubProcess = this.logicMemory.get(subProcessIdSelected)

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

    if (emptyFrames.length < process.getSize / MemoryManager.PAGE_SIZE) {
      // swap
      console.log('Page fault')
    } else {
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

      this.printMemory()
    }
  }

  public delete(process: Process): void {
    const subProcess = process.getSubProcess

    this.physicMemory.forEach((page, index, array) => {
      if (page[0]?.getProcess.getId === process.getId) {
        array[index] = new Array(MemoryManager.PAGE_SIZE)
      }
    })

    subProcess.forEach((sb) => {
      this.logicMemory.delete(sb)
    })

    this.printMemory()
  }

  private printMemory() {
    console.log(
      '----------------------------------------------------------------------',
    )
    for (let page = 0; page < this.physicMemory.length; page++) {
      const element = this.physicMemory[page].map(
        (subProcess) => subProcess?.getId,
      )

      console.log(element)
    }
  }
}
