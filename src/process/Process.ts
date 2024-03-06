import { randomUUID } from 'node:crypto'

export class Process {
  private id: string  
  private size: number
  private address: string

  constructor () {
    this.id = randomUUID()
  }

}