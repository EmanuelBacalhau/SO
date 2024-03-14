export class FrameMemory {
  constructor(
    private page: number,
    private displacement: number,
  ) {
    this.page = page
    this.displacement = displacement
  }

  public get getPage(): number {
    return this.page
  }

  public get getDisplacement(): number {
    return this.displacement
  }
}
