import { Process } from './process/Process'
import { SystemCallType } from './so/SystemCallType'
import { SystemOperation } from './so/SystemOperation'

const systemOperation = new SystemOperation()

const p1 = systemOperation.systemCall({
  typeCall: SystemCallType.OPEN_PROCESS,
  processSize: 5,
})

systemOperation.systemCall({
  typeCall: SystemCallType.WRITE_PROCESS,
  process: p1 as Process,
})

const p2 = systemOperation.systemCall({
  typeCall: SystemCallType.OPEN_PROCESS,
  processSize: 10,
})

systemOperation.systemCall({
  typeCall: SystemCallType.WRITE_PROCESS,
  process: p2 as Process,
})

systemOperation.systemCall({
  typeCall: SystemCallType.CLOSE_PROCESS,
  process: p2 as Process,
})
