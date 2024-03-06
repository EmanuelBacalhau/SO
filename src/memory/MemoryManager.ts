import { Strategy } from "./Strategy"

export class MemoryManager {
  private physicMemory: string[] 
  // private logicMemory: string[]
  private strategy: Strategy

  constructor(strategy: Strategy) {
    this.physicMemory = new Array<string>(128)
    this.strategy = strategy
  }
}