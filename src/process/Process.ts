import { randomUUID } from 'node:crypto'
import { AddressMemory } from '../memory/AddressMemory'
import { AddressMemoryProps } from '../memory/AddressMemoryProps'

export class Process {
  private id: string
  private size: number
  private address: AddressMemory | AddressMemory[] | null = null

  // segunda etapa
  // private time: number
  // private instructions: number
  // private process: Process[]
  // private priority: boolean

  constructor(size?: number) {
    this.id = randomUUID()
    this.size = size ?? Math.round(Math.random() * 128 + 1)
  }

  public get getId(): string {
    return this.id
  }

  public get getSize(): number {
    return this.size
  }

  public get getAddress(): AddressMemory | AddressMemory[] | null {
    return this.address
  }

  public setUniqueAddress({ start, end }: AddressMemoryProps) {
    this.address = new AddressMemory({ start, end })
  }

  public setManyAddresses(addresses: AddressMemory[]) {
    this.address = addresses
  }
}
