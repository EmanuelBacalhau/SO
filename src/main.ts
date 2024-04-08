import { Process } from './process/Process'
import { SystemCallType } from './so/SystemCallType'
import { SystemOperation } from './so/SystemOperation'

const p1 = SystemOperation.systemCall({
  typeCall: SystemCallType.CREATE,
  processSize: 100,
})

SystemOperation.systemCall({
  typeCall: SystemCallType.WRITE,
  process: p1 as Process,
})

const p2 = SystemOperation.systemCall({
  typeCall: SystemCallType.CREATE,
  processSize: 100,
})

SystemOperation.systemCall({
  typeCall: SystemCallType.WRITE,
  process: p2 as Process,
})

const p3 = SystemOperation.systemCall({
  typeCall: SystemCallType.CREATE,
  processSize: 100,
})

SystemOperation.systemCall({
  typeCall: SystemCallType.WRITE,
  process: p3 as Process,
})

const p4 = SystemOperation.systemCall({
  typeCall: SystemCallType.CREATE,
  processSize: 60,
})

SystemOperation.systemCall({
  typeCall: SystemCallType.WRITE,
  process: p4 as Process,
})

SystemOperation.systemCall({
  typeCall: SystemCallType.WAKE,
  process: p1 as Process,
})

SystemOperation.systemCall({
  typeCall: SystemCallType.WAKE,
  process: p2 as Process,
})
