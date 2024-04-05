import { Process } from '../process/Process'
import { SchedulerQueue } from './SchedulerQueue'

export class Priority extends SchedulerQueue {
  public addSubProcess(process: Process): void {
    throw new Error('Method not implemented.')
  }

  public close(process: Process): void {
    throw new Error('Method not implemented.')
  }
}
