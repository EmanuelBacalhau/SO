import { Process } from './process/Process'
import { SystemCallType } from './so/SystemCallType'
import { SystemOperation } from './so/SystemOperation'

const p1 = SystemOperation.systemCall({
  typeCall: SystemCallType.CREATE,
  processSize: 10,
})

SystemOperation.systemCall({
  typeCall: SystemCallType.WRITE,
  process: p1 as Process,
})

const p2 = SystemOperation.systemCall({
  typeCall: SystemCallType.CREATE,
  processSize: 10,
})

SystemOperation.systemCall({
  typeCall: SystemCallType.WRITE,
  process: p2 as Process,
})

const p3 = SystemOperation.systemCall({
  typeCall: SystemCallType.CREATE,
  processSize: 10,
})

SystemOperation.systemCall({
  typeCall: SystemCallType.WRITE,
  process: p3 as Process,
})

SystemOperation.systemCall({
  typeCall: SystemCallType.WRITE,
  process: p1 as Process,
})

// SystemOperation.systemCall({
//   typeCall: SystemCallType.STOP,
//   process: p1 as Process,
// })
