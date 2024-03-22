import { SystemCallType } from './so/SystemCallType'
import { SystemOperation } from './so/SystemOperation'

const systemOperation = new SystemOperation()

const p1 = systemOperation.systemCall({
  typeCall: SystemCallType.OPEN_PROCESS,
  processSize: 50,
})

systemOperation.systemCall({
  typeCall: SystemCallType.WRITE_PROCESS,
  process: p1,
})

const p2 = systemOperation.systemCall({
  typeCall: SystemCallType.OPEN_PROCESS,
  processSize: 20,
})

systemOperation.systemCall({
  typeCall: SystemCallType.WRITE_PROCESS,
  process: p2,
})
