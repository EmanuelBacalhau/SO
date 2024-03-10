import { Process } from '../process/Process'
import { AddressMemoryProps } from './AddressMemoryProps'
import { Strategy } from './Strategy'

export class MemoryManager {
  public physicMemory: (string | undefined)[]
  // private logicMemory: string[]
  private strategy: Strategy

  constructor(strategy: Strategy) {
    this.physicMemory = new Array<string>(128)
    this.strategy = strategy
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

    // if (this.strategy === Strategy.PAGING) {}
  }

  // UTILS
  private allocateProcess(addressMemory: AddressMemoryProps, process: Process) {
    process.setAddress({ start: addressMemory.start, end: addressMemory.end })

    this.initialProcess(process)
  }

  private initialProcess(process: Process) {
    this.logInitialProcess(process.getSize, process.getId)

    for (
      let indexMemory = process.getAddress!.getStart;
      indexMemory < process.getAddress!.getEnd;
      indexMemory++
    ) {
      this.physicMemory[indexMemory] = process.getId
      this.logCreateProcess(indexMemory, process.getId)
    }

    this.logFinishProcess(process.getId)
  }

  // FIRST-FIT
  private findFirstFit(size: number): AddressMemoryProps | null {
    let emptyMemoryCount = 0
    let startIndex = 0
    let endIndex = 0

    for (let i = 0; i < this.physicMemory.length; i++) {
      const element = this.physicMemory[i]

      if (!element) {
        emptyMemoryCount++

        if (emptyMemoryCount >= size) {
          endIndex = startIndex + emptyMemoryCount
          return { start: startIndex, end: endIndex }
        }
      } else {
        startIndex = i + 1
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
    let smallMemoryFits = false
    let bigMemoryFits = false

    let smallMemoryLength = 0
    let bigMemoryLength = 0

    let smallMemory: AddressMemoryProps = {
      start: 0,
      end: 0,
    }
    let bigMemory: AddressMemoryProps = { start: 0, end: 0 }

    let emptyMemoryCount = 0
    let memoryInUseCount = 0

    for (let i = 0; i < this.physicMemory.length; i++) {
      const element = this.physicMemory[i]

      if (!element) {
        emptyMemoryCount++
        const checkSize =
          emptyMemoryCount >= size && emptyMemoryCount > bigMemoryLength

        if (checkSize) {
          bigMemory = {
            start: i - emptyMemoryCount + 1,
            end: memoryInUseCount + size,
          }

          bigMemoryLength = emptyMemoryCount
          bigMemoryFits = true
        }
      } else {
        memoryInUseCount++

        const checkSize =
          emptyMemoryCount >= size && emptyMemoryCount > smallMemoryLength
        if (checkSize) {
          smallMemory = {
            start: i - emptyMemoryCount,
            end: size + memoryInUseCount,
          }

          smallMemoryFits = true
          smallMemoryLength = emptyMemoryCount
        }

        emptyMemoryCount = 0
      }
    }

    return smallMemoryFits ? smallMemory : bigMemoryFits ? bigMemory : null
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
    let memory: AddressMemoryProps = {
      start: 0,
      end: 0,
    }

    let emptyMemoryCount = 0
    let bigMemory = 0

    for (let i = 0; i < this.physicMemory.length; i++) {
      const element = this.physicMemory[i]

      if (!element) {
        emptyMemoryCount++

        if (emptyMemoryCount >= size && emptyMemoryCount > bigMemory) {
          memory = {
            start: i - emptyMemoryCount + 1,
            end: memory.start + size,
          }

          bigMemory = emptyMemoryCount
        }
      } else {
        emptyMemoryCount = 0
      }
    }

    return bigMemory > 0 ? memory : null
  }

  private writeWithWorstFit(process: Process): void {
    const memory = this.findWorstFit(process.getSize)

    if (memory) {
      this.allocateProcess({ start: memory.start, end: memory.end }, process)
    } else {
      this.logErrorInCreateProcess(process.getId, process.getSize)
    }
  }

  // DELETE PROCESS
  public deleteProcess(id: string, { start, end }: AddressMemoryProps): void {
    this.physicMemory = this.physicMemory.map((element) => {
      if (element === id) {
        return undefined
      }

      return element
    })
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

  private logErrorInCreateProcess(id: string, size: number) {
    console.log({
      error: 'Insuffcient memory',
      process: id,
      size,
    })
  }
}
