export class AddressMemory {
  private start: number
  private end: number

  constructor(start: number, end: number) {
    this.start = start
    this.end = end
  }

  public get getStart(): number {
    return this.start
  }

  public get getEnd(): number {
    return this.end
  }
}
