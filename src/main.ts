import { Strategy } from './memory/Strategy'
import { SystemCallType } from './so/SystemCallType'
import { SystemOperation } from './so/SystemOperation'

// Examples
const systemOperation = new SystemOperation(Strategy.FIRST_FIT)

const processOne = systemOperation.systemCall(SystemCallType.OPEN_PROCESS)
systemOperation.systemCall(SystemCallType.WRITE_PROCESS, processOne)

systemOperation.systemCall(SystemCallType.CLOSE_PROCESS, processOne)
