import { Strategy } from './memory/Strategy'
import { Process } from './process/Process'
import { SystemCallType } from './so/SystemCallType'
import { SystemOperation } from './so/SystemOperation'

// Examples
const systemOperation = new SystemOperation(Strategy.FIRST_FIT)

const p2 = new Process(38)

// const p1 = systemOperation.systemCall(SystemCallType.OPEN_PROCESS)
systemOperation.systemCall(SystemCallType.WRITE_PROCESS, new Process(20))

systemOperation.systemCall(SystemCallType.WRITE_PROCESS, p2)

systemOperation.systemCall(SystemCallType.WRITE_PROCESS, new Process(38))

systemOperation.systemCall(SystemCallType.WRITE_PROCESS, new Process(20))

systemOperation.systemCall(SystemCallType.CLOSE_PROCESS, p2)

systemOperation.systemCall(SystemCallType.WRITE_PROCESS, new Process(8))

// systemOperation.systemCall(SystemCallType.READ_PROCESS, p1)
