import { SubProcess } from '../process/SubProcess'
import { SchedulerType } from '../scheduler/SchedulerType'

export interface ExecuteSchedulerResponse {
  element: SubProcess
  type: SchedulerType
  index: number
  priority: number
  timeExecution: number
}
