import { SubProcess } from './SubProcess'

export class Process {
  private _id: string
  private _size: number
  private _instructions: number
  private _isEnd: boolean
  private _subProcess: SubProcess[] = []

  static COUNT_PROCESS: number = 0

  constructor(size: number) {
    Process.COUNT_PROCESS++

    this._size = size
    this._isEnd = false
    this._id = `P${Process.COUNT_PROCESS}`

    this._subProcess = this.insertSubProcess()
    this._instructions = this.calculateInstructions()
  }

  start() {
    this._isEnd = false

    for (let i = 0; i < this._subProcess.length; i++) {
      const element = this._subProcess[i]
      element.start()
    }
  }

  finish() {
    const result = this._subProcess.some((value) => value.isEnd === true)

    if (result) {
      this._isEnd = true
    }
  }

  private insertSubProcess() {
    const listOfSubProcess = []

    for (let i = 0; i < this._size; i++) {
      const id = `${this._id}-${i}`
      listOfSubProcess.push(new SubProcess(id, 7, this))
    }

    return listOfSubProcess
  }

  private calculateInstructions() {
    return this._size * 5
  }

  public get getInstructions() {
    return this._instructions
  }

  public get getSubProcess() {
    return this._subProcess
  }

  public get getId(): string {
    return this._id
  }

  public get getSize(): number {
    return this._size
  }

  public get isEnd() {
    return this._isEnd
  }
}
