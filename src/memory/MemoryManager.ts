import { Process } from '../process/Process'
import { AddressMemory } from './AddressMemory'
import { AddressMemoryProps } from './AddressMemoryProps'
import { Strategy } from './Strategy'

export class MemoryManager {
  public physicMemory: (string | undefined)[]
  private strategy: Strategy

  private logicMemory: Map<string, AddressMemory[]>
  private pageSize: number

  constructor(strategy: Strategy) {
    this.physicMemory = new Array<string>(20)
    this.strategy = strategy

    this.logicMemory = new Map<string, AddressMemory[]>()
    this.pageSize = 4
  }

  public write(process: Process): void {
    if (this.strategy === Strategy.FIRST_FIT) {
      this.writeWithFirstFit(process)
    }

    if (this.strategy === Strategy.BEST_FIT) {
      this.writeWithBestFit(process)
    }

    if (this.strategy === Strategy.WORST_FIT) {
      this.writeWithWorstFit(process)
    }

    if (this.strategy === Strategy.PAGING) {
      this.writeWithPaging(process)
    }
  }

  // UTILS
  private allocateProcess(addressMemory: AddressMemoryProps, process: Process) {
    process.setUniqueAddress({
      start: addressMemory.start,
      end: addressMemory.end,
    })

    this.initialProcess(process)
  }

  private initialProcess(process: Process) {
    this.logInitialProcess(process.getSize, process.getId)

    if (process.getAddress instanceof AddressMemory) {
      for (
        let indexMemory = process.getAddress!.getStart;
        indexMemory <= process.getAddress!.getEnd;
        indexMemory++
      ) {
        this.physicMemory[indexMemory] = process.getId
        this.logCreateProcess(indexMemory, process.getId)
      }

      this.logFinishProcess(process.getId)
    }
  }

  // FIRST-FIT
  private findFirstFit(size: number): AddressMemoryProps | null {
    let emptyMemoryCount = 0

    const memory: AddressMemoryProps = { start: 0, end: 0 }

    for (let i = 0; i < this.physicMemory.length; i++) {
      const element = this.physicMemory[i]

      if (!element) {
        emptyMemoryCount++

        if (emptyMemoryCount >= size) {
          memory.end = memory.start + size - 1
          return memory
        }
      } else {
        memory.start = i + 1
        emptyMemoryCount = 0
      }
    }

    return null
  }

  private writeWithFirstFit(process: Process): void {
    const memory = this.findFirstFit(process.getSize)

    if (memory !== null) {
      this.allocateProcess({ start: memory.start, end: memory.end }, process)
    } else {
      this.logErrorInCreateProcess(process.getId, process.getSize)
    }
  }

  // BEST-FIT
  private findBestFit(size: number): AddressMemoryProps | null {
    let start = -1
    let small = this.physicMemory.length + 1

    let memory: AddressMemoryProps | null = null

    for (let i = 0; i < this.physicMemory.length; i++) {
      let j = i

      while (!this.physicMemory[j] && j < this.physicMemory.length) {
        j++
      }

      const length = j - i
      if (length >= size && length < small) {
        start = i
        small = length
        i = j - 1
      }
    }

    if (start !== -1) {
      memory = { start, end: start + size - 1 }
    }

    return size !== -1 ? memory : null
  }

  private writeWithBestFit(process: Process): void {
    const memory = this.findBestFit(process.getSize)

    if (memory) {
      this.allocateProcess({ start: memory.start, end: memory.end }, process)
    } else {
      this.logErrorInCreateProcess(process.getId, process.getSize)
    }
  }

  // WORST-FIT
  private findWorstFit(size: number): AddressMemoryProps | null {
    let small = -1
    let big = -1

    let memory: AddressMemoryProps | null = null

    for (let i = 0; i < this.physicMemory.length; i++) {
      let j = i

      while (!this.physicMemory[j] && j < this.physicMemory.length) {
        j++
      }

      const length = j - i
      if (length >= size && length > big) {
        small = i
        big = length
        i = j - 1
      }
    }

    if (big !== -1) {
      memory = { start: small, end: small + size - 1 }
    }

    return memory
  }

  private writeWithWorstFit(process: Process): void {
    const memory = this.findWorstFit(process.getSize)

    if (memory) {
      this.allocateProcess({ start: memory.start, end: memory.end }, process)
    } else {
      this.logErrorInCreateProcess(process.getId, process.getSize)
    }
  }

  // PAGING
  private findPaging(size: number): null | AddressMemory[] {
    const quantityPages = Math.round(size / this.pageSize)

    const addressesMemory: AddressMemory[] = []

    let emptyCountInPage = 0

    for (
      let page = this.pageSize;
      page <= this.physicMemory.length;
      page += this.pageSize
    ) {
      const start = page - this.pageSize
      const end = page - 1

      for (let i = start; i <= end; i++) {
        if (!this.physicMemory[i]) {
          emptyCountInPage++

          if (emptyCountInPage === this.pageSize) {
            addressesMemory.push(new AddressMemory({ start, end }))
          }

          if (addressesMemory.length === quantityPages) {
            break
          }

          if (i === end) {
            emptyCountInPage = 0
          }
        } else {
          emptyCountInPage = 0
        }
      }
    }

    return addressesMemory.length === quantityPages ? addressesMemory : null
  }

  private allocateProcessWithPaging(
    memories: AddressMemory[],
    process: Process,
  ) {
    process.setManyAddresses(memories)

    if (process.getSize % 2 === 1) {
      const element = memories[memories.length - 1]

      memories[memories.length - 1] = new AddressMemory({
        start: element.getStart,
        end: element.getEnd - 1,
      })
    }

    for (let memory = 0; memory < memories.length; memory++) {
      const element = memories[memory]

      for (let i = element.getStart; i <= element.getEnd; i++) {
        this.physicMemory[i] = process.getId
        this.logCreateProcess(i, process.getId)
      }
    }
  }

  private writeWithPaging(process: Process) {
    const addressMemories = this.findPaging(process.getSize)

    if (addressMemories) {
      this.allocateProcessWithPaging(addressMemories, process)
      this.logicMemory.set(process.getId, addressMemories)
    } else {
      this.logErrorInCreateProcess(process.getId, process.getSize)
    }
  }

  // DELETE PROCESS
  public deleteProcess(
    id: string,
    address: AddressMemory | AddressMemory[],
  ): void {
    if (address instanceof AddressMemory) {
      for (let i = 0; i < this.physicMemory.length; i++) {
        const element = this.physicMemory[i]

        if (element === id) {
          this.physicMemory[i] = undefined
        }
      }

      this.logRemoveProcess(id, {
        start: address.getStart,
        end: address.getEnd,
      })
    }

    if (address instanceof Array) {
      const addressMemories = this.logicMemory.get(id)

      for (let i = 0; i < addressMemories!.length; i++) {
        const element = addressMemories![i]

        for (let i = element.getStart; i <= element.getEnd; i++) {
          this.physicMemory[i] = undefined
        }

        this.logRemoveProcess(id, {
          start: element.getStart,
          end: element.getEnd,
        })
      }
    }
  }

  // LOGS
  private logInitialProcess(size: number, id: string) {
    console.log(
      `--------------------------------------------------------------------------`,
    )
    console.log(`Process: ${id}\nSize: ${size}\n`)
  }

  private logCreateProcess(index: number, id: string) {
    console.log(`Index: ${index} -> Value: ${id}`)
  }

  private logFinishProcess(id: string) {
    console.log(`\nProcess: ${id} initialized!\n`)
  }

  private logRemoveProcess(id: string, { start, end }: AddressMemoryProps) {
    console.log(
      `--------------------------------------------------------------------------`,
    )
    console.log(
      `Process remove: ${id} with success!\nReleased size: ${start} - ${end}`,
    )
    console.log(
      `--------------------------------------------------------------------------\n`,
    )
  }

  private logErrorInCreateProcess(id: string, size: number) {
    console.log({
      error: 'Insuffcient memory',
      process: id,
      size,
    })
  }
}
