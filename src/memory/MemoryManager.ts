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
    let counterEmptyMemory = 0
    let counterMemoryInUse = 0
    let startIndex = 0
    let endIndex = 0

    for (let i = 0; i < this.physicMemory.length; i++) {
      const element = this.physicMemory[i]

      if (!element) {
        counterEmptyMemory++

        if (counterEmptyMemory >= process.getSize) {
          endIndex = startIndex + counterEmptyMemory
          break
        }
      } else {
        startIndex = i + 1
        counterMemoryInUse++
        counterEmptyMemory = 0
      }
    }

    process.setAddress({ start: startIndex, end: endIndex })
    const checkTheSize = process.getAddress.getSize >= process.getSize

    if (checkTheSize) {
      this.logInitialProcess(process.getSize, process.getId)

      for (
        let indexMemory = process.getAddress.getStart;
        indexMemory < process.getAddress.getEnd;
        indexMemory++
      ) {
        this.physicMemory[indexMemory] = process.getId
        this.logCreateProcess(indexMemory, process.getId)
      }

      this.logFinishProcess(process.getId)
    } else {
      const remainingMomory = this.physicMemory.length - counterMemoryInUse

      this.logErrorInCreateProcess(
        process.getId,
        process.getSize,
        remainingMomory,
      )
    }
  }

  private writeWithBestFit(process: Process): void {}

  private writeWithWorstFit(process: Process): void {}

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

  private logInitialProcess(size: number, id: string) {
    console.log(
      `----------------------------------------------------------------------------`,
    )
    console.log(`Process: ${id} - size: ${size}`)
    console.log(
      `----------------------------------------------------------------------------\n`,
    )
  }

  private logCreateProcess(index: number, id: string) {
    console.log(`Index: ${index} -> Value: ${id}`)
  }

  private logFinishProcess(id: string) {
    console.log(`\nProcess: ${id} initialized!\n`)
  }

  private logErrorInCreateProcess(
    id: string,
    size: number,
    remainingMomory: number,
  ) {
    console.log({
      error: 'Insuffcient memory',
      process: id,
      size,
      remainingMomory,
    })
    console.log('\n')
  }
}
