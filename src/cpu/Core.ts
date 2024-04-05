import { ExecuteSchedulerResponse } from '../interfaces/ExecuteSchedulerResponse'
import { SubProcess } from '../process/SubProcess'
import { SchedulerType } from '../scheduler/SchedulerType'

export class Core {
  private id: number
  private numberOfInstructionsByClock: number
  private _subProcess: SubProcess | undefined

  constructor(id: number, numberOfInstructionsByClock: number) {
    this.id = id
    this.numberOfInstructionsByClock = numberOfInstructionsByClock

    this._subProcess = undefined
  }

  public run({
    index,
    timeExecution,
    priority,
    type,
  }: ExecuteSchedulerResponse) {
    if (type === SchedulerType.FIRST_COME_FIRST_SERVED) {
      console.log(`Executing ${this._subProcess?.getId}`)
    }

    if (type === SchedulerType.PRIORITY) {
      console.log(
        `Executing ${this._subProcess?.getId} - Priority: ${priority !== 0}`,
      )
    }

    if (type === SchedulerType.SHORTEST_JOB_FIRST) {
      console.log(
        `Executing ${this._subProcess?.getId} - Time executing: ${timeExecution}`,
      )
    }

    if (type === SchedulerType.LOTTERY) {
      console.log(
        `Executing ${this._subProcess?.getId} - Random index: ${index}`,
      )
    }

    this.finish()
  }

  private finish() {
    if (this._subProcess) {
      this._subProcess.getProcess.setInstructionsExecuted(
        this._subProcess.getInstructions,
      )
      this._subProcess.getProcess.checkSubProcessConclusions()
    }

    this._subProcess = undefined
  }

  public get getId() {
    return this.id
  }

  public get subProcess(): SubProcess | undefined {
    return this._subProcess
  }

  public set subProcess(subProcess: SubProcess | undefined) {
    this._subProcess = subProcess
  }
}
