import { Strategy } from './memory/Strategy'
import { SystemCallType } from './so/SystemCallType'
import { SystemOperation } from './so/SystemOperation'

// Examples
const systemOperation = new SystemOperation(Strategy.PAGING)

const p1 = systemOperation.systemCall(SystemCallType.OPEN_PROCESS)
systemOperation.systemCall(SystemCallType.WRITE_PROCESS, p1)

const p2 = systemOperation.systemCall(SystemCallType.OPEN_PROCESS)
systemOperation.systemCall(SystemCallType.WRITE_PROCESS, p2)

// const p3 = systemOperation.systemCall(SystemCallType.OPEN_PROCESS)
// systemOperation.systemCall(SystemCallType.WRITE_PROCESS, p3)

// const p4 = systemOperation.systemCall(SystemCallType.OPEN_PROCESS)
// systemOperation.systemCall(SystemCallType.WRITE_PROCESS, p4)

systemOperation.systemCall(SystemCallType.CLOSE_PROCESS, p1)
// systemOperation.systemCall(SystemCallType.CLOSE_PROCESS, p2)
// systemOperation.systemCall(SystemCallType.CLOSE_PROCESS, p4)

// const p5 = systemOperation.systemCall(SystemCallType.OPEN_PROCESS)
// systemOperation.systemCall(SystemCallType.WRITE_PROCESS, p5)
