import { Process } from '../process/Process'

interface Page {
  pageNumber: number
  page: (string | undefined)[]
}

export class MemoryManager {
  public physicMemory: (string | undefined)[][]

  private logicMemory: Map<string, Page[]>
  private pageSize: number

  constructor(pageSize: number = 4) {
    this.pageSize = pageSize
    this.logicMemory = new Map<string, Page[]>()

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

    const pages: Page[] = []
    const requiredPages = process.getSize / this.pageSize

    let count = 0

    for (
      let frame = 0;
      frame < emptyPages.length && pages.length < requiredPages;
      frame++
    ) {
      const element = emptyPages[frame]

      let indexPage = 0

      while (indexPage < element.page.length && count < process.getSize) {
        element.page[indexPage] = `${process.getId}-${count + 1}`
        count++
        indexPage++
      }

      pages.push(element)
      process.setPagesAddress(element.pageNumber)
    }

    this.logicMemory.set(process.getId, pages)

    console.log(this.physicMemory)
  }
}
