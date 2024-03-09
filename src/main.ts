import { Strategy } from './memory/Strategy'
import { SystemCallType } from './so/SystemCallType'
import { SystemOperation } from './so/SystemOperation'

const systemOperation = new SystemOperation(Strategy.BEST_FIT)

const processOne = systemOperation.createProcess()
systemOperation.systemCall(SystemCallType.WRITE_PROCESS, processOne)

const processTwo = systemOperation.createProcess()
systemOperation.systemCall(SystemCallType.WRITE_PROCESS, processTwo)

systemOperation.systemCall(SystemCallType.CLOSE_PROCESS, processOne)

const processThree = systemOperation.createProcess()
systemOperation.systemCall(SystemCallType.WRITE_PROCESS, processThree)

const processFour = systemOperation.createProcess()
systemOperation.systemCall(SystemCallType.WRITE_PROCESS, processFour)
