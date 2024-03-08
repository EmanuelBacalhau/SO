'use-strict'

import { Process } from '../process/Process'
import { Strategy } from './Strategy'
import { AddressMemory } from './AddressMemory'

export class MemoryManager {
  public physicMemory: string[]
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
    }

    if (this.strategy === Strategy.WORST_FIT) {
    }

    // if (this.strategy === Strategy.PAGING) {}
  }

  private writeWithFirstFit(process: Process): void {
    let counterEmptyMemory = 0
    let startIndex = 0
    let endIndex = 0

    for (let i = 0; i < this.physicMemory.length; i++) {
      const element = this.physicMemory[i]

      if (!element) {
        counterEmptyMemory++

        if (counterEmptyMemory === process.getSize) {
          endIndex = startIndex + counterEmptyMemory + 1
          break
        }
      } else {
        startIndex = i + 1
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
      this.logErrorInCreateProcess(process.getId, process.getSize)
    }
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
    console.log(`\nProcess: ${id} inicializado!\n`)
  }

  private logErrorInCreateProcess(id: string, size: number) {
    console.log({
      error: 'Insuffcient memory',
      process: id,
      size,
      // remainingMomory: counter,
    })
  }
}
