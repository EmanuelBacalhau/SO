export class SubProcess {
  constructor(
    private id: string,
    private instruction: number,
  ) {
    this.id = id
    this.instruction = instruction
  }

  public get getId() {
    return this.id
  }

  public get getInstruction() {
    return this.instruction
  }
}
