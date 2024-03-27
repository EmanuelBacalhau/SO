import { SubProcessLogic } from '../interfaces/SubProcessLogic'
import { Process } from '../process/Process'

interface Page {
  pageNumber: number
  page: (string | undefined)[]
}

export class MemoryManager {
  private physicMemory: (string | undefined)[][]

  private logicMemory: Map<string, SubProcessLogic>
  private pageSize: number

  constructor(pageSize: number = 4) {
    this.pageSize = pageSize
    this.logicMemory = new Map<string, SubProcessLogic>()

    const pages = 256 / this.pageSize
    this.physicMemory = new Array(pages)
    for (let frame = 0; frame < this.physicMemory.length; frame++) {
      this.physicMemory[frame] = new Array(this.pageSize)
    }
  }

  public write(process: Process): void {
    this.writeWithPaging(process)
  }

  private findPages() {
    const emptyPages: Page[] = []

    for (let frame = 0; frame < this.physicMemory.length; frame++) {
      const element = this.physicMemory[frame]

      if (!element[0]) {
        emptyPages.push({ pageNumber: frame, page: element })
      }
    }

    return emptyPages
  }

  private writeWithPaging(process: Process) {
    const emptyPages = this.findPages()
    const requiredPages = process.getSize / this.pageSize

    if (emptyPages.length < requiredPages) {
      console.log('Page fault')
    } else {
      const pages: Page[] = []

      let count = 0

      for (
        let frame = 0;
        frame < emptyPages.length && pages.length < requiredPages;
        frame++
      ) {
        const element = emptyPages[frame]

        let indexPage = 0

        while (indexPage < element.page.length && count < process.getSize) {
          const subProcess = process.getSubProcess[count]
          subProcess.setAddress({ frame, index: indexPage })

          element.page[indexPage] = subProcess.getId

          this.logicMemory.set(process.getSubProcess[count].getId, {
            id: subProcess.getId,
            instructions: subProcess.getInstruction,
            processId: subProcess.getProcess.getId,
          })

          count++
          indexPage++
        }

        pages.push(element)
      }
    }

    console.log(
      '---------------------------------------------------------------',
    )
    console.log(this.physicMemory)
    console.log(
      '---------------------------------------------------------------',
    )
  }
}
