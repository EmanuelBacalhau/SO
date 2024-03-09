import { Process } from '../process/Process'
import { Strategy } from './Strategy'

export class MemoryManager {
  public physicMemory: string[] | undefined[]
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

  private writeWithFirstFit(process: Process): void {
    let emptyMemoryCount = 0
    let memoryInUseCount = 0
    let startIndex = 0
    let endIndex = 0

    for (let i = 0; i < this.physicMemory.length; i++) {
      const element = this.physicMemory[i]

      if (!element) {
        emptyMemoryCount++

        if (emptyMemoryCount >= process.getSize) {
          endIndex = startIndex + emptyMemoryCount
          break
        }
      } else {
        startIndex = i + 1
        memoryInUseCount++
        emptyMemoryCount = 0
      }
    }

    process.setAddress({ start: startIndex, end: endIndex })
    const checkTheSize = process.getAddress!.getSize >= process.getSize

    if (checkTheSize) {
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
    } else {
      this.logErrorInCreateProcess(process.getId, process.getSize)
    }
  }

  private writeWithBestFit(process: Process): void {
    const memories = {
      small: {
        length: 0,
        startIndex: 0,
        endIndex: 0,
        fits: false,
      },
      big: {
        length: 0,
        startIndex: 0,
        endIndex: 0,
        fits: false,
      },
    }

    let emptyMemoryCount = 0
    let memoryInUseCount = 0

    for (let i = 0; i < this.physicMemory.length; i++) {
      const element = this.physicMemory[i]

      if (!element) {
        emptyMemoryCount++

        if (
          emptyMemoryCount > memories.big.length &&
          emptyMemoryCount >= process.getSize
        ) {
          memories.big = {
            length: emptyMemoryCount,
            startIndex: i - emptyMemoryCount + 1,
            endIndex: memoryInUseCount + process.getSize,
            fits: true,
          }

          break
        }
      } else {
        if (
          emptyMemoryCount > memories.small.length &&
          emptyMemoryCount >= process.getSize
        ) {
          memories.small = {
            length: emptyMemoryCount,
            startIndex: i - emptyMemoryCount,
            endIndex: i - 1,
            fits: true,
          }
        }
        emptyMemoryCount = 0
        memoryInUseCount++
      }
    }

    if (memories.small.fits) {
      process.setAddress({
        start: memories.small.startIndex,
        end: memories.small.endIndex,
      })

      this.initialProcess(process)
    } else if (memories.big.fits) {
      process.setAddress({
        start: memories.big.startIndex,
        end: memories.big.endIndex,
      })

      this.initialProcess(process)
    } else {
      this.logErrorInCreateProcess(process.getId, process.getSize)
    }
  }

  private writeWithWorstFit(process: Process): void {
    console.log(process.getId)
  }

  public deleteProcess(id: string): void {
    for (let i = 0; i < this.physicMemory.length; i++) {
      const element = this.physicMemory[i]

      if (element === id) {
        this.physicMemory[i] = undefined
      }
    }

    console.log(
      `----------------------------------------------------------------------------`,
    )
    console.log(`Process remove: ${id} with success!`)
    console.log(
      `----------------------------------------------------------------------------\n`,
    )
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

  private logInitialProcess(size: number, id: string) {
    console.log(
      `----------------------------------------------------------------------------`,
    )
    console.log(`Process: ${id}\nSize: ${size}\n`)
  }

  private logCreateProcess(index: number, id: string) {
    console.log(`Index: ${index} -> Value: ${id}`)
  }

  private logFinishProcess(id: string) {
    console.log(`\nProcess: ${id} initialized!\n`)
    console.log(
      `----------------------------------------------------------------------------\n`,
    )
  }

  private logErrorInCreateProcess(id: string, size: number) {
    console.log({
      error: 'Insuffcient memory',
      process: id,
      size,
    })
    console.log('\n')
  }
}
