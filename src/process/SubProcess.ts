import { AddressSubProcess } from '../interfaces/AddressSubProcess'
import { Process } from './Process'

export class SubProcess {
  private _id: string
  private _process: Process
  private _instruction: number
  private _address: AddressSubProcess | null
  private _isEnd: boolean

  constructor(id: string, instruction: number, process: Process) {
    this._id = id
    this._isEnd = false
    this._instruction = instruction
    this._process = process
    this._address = null
  }

  start() {
    this._isEnd = false
  }

  finish() {
    this._isEnd = true
  }

  public get getId() {
    return this._id
  }

  public get getProcess() {
    return this._process
  }

  public get getInstruction() {
    return this._instruction
  }

  public get getAddress() {
    return this._address
  }

  public setAddress(address: AddressSubProcess) {
    this._address = address
  }

  public get isEnd() {
    return this._isEnd
  }
}
