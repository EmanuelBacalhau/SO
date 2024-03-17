import { Strategy } from './memory/Strategy'
import { Process } from './process/Process'
import { SystemCallType } from './so/SystemCallType'
import { SystemOperation } from './so/SystemOperation'

// Examples
// * PAGING
const systemOperation = new SystemOperation(Strategy.PAGING)

const p1 = new Process(10)
const p3 = new Process(5)
const p5 = new Process(11)

systemOperation.systemCall(SystemCallType.WRITE_PROCESS, p1)

systemOperation.systemCall(SystemCallType.WRITE_PROCESS, new Process(20))

systemOperation.systemCall(SystemCallType.WRITE_PROCESS, p3)

systemOperation.systemCall(SystemCallType.WRITE_PROCESS, new Process(20))

systemOperation.systemCall(SystemCallType.WRITE_PROCESS, p5)

systemOperation.systemCall(SystemCallType.CLOSE_PROCESS, p1)
systemOperation.systemCall(SystemCallType.CLOSE_PROCESS, p3)
systemOperation.systemCall(SystemCallType.CLOSE_PROCESS, p5)

systemOperation.systemCall(SystemCallType.WRITE_PROCESS, new Process(50))

// * FIRST-FIT
// const systemOperation = new SystemOperation(Strategy.FIRST_FIT)

// const p2 = new Process(38)

// systemOperation.systemCall(SystemCallType.WRITE_PROCESS, new Process(20))

// systemOperation.systemCall(SystemCallType.WRITE_PROCESS, p2)

// systemOperation.systemCall(SystemCallType.WRITE_PROCESS, new Process(38))

// systemOperation.systemCall(SystemCallType.WRITE_PROCESS, new Process(20))

// systemOperation.systemCall(SystemCallType.CLOSE_PROCESS, p2)

// systemOperation.systemCall(SystemCallType.WRITE_PROCESS, new Process(40))

// * BEST-FIT AND WORST-FIT
// const systemOperation = new SystemOperation(Strategy.WORST_FIT)
// const systemOperation = new SystemOperation(Strategy.BEST_FIT)

// const p2 = new Process(38)

// systemOperation.systemCall(SystemCallType.WRITE_PROCESS, new Process(20))

// systemOperation.systemCall(SystemCallType.WRITE_PROCESS, p2)

// systemOperation.systemCall(SystemCallType.WRITE_PROCESS, new Process(38))

// systemOperation.systemCall(SystemCallType.WRITE_PROCESS, new Process(20))

// systemOperation.systemCall(SystemCallType.CLOSE_PROCESS, p2)

// systemOperation.systemCall(SystemCallType.WRITE_PROCESS, new Process(8))

// * READ
// const systemOperation = new SystemOperation(Strategy.PAGING)

// const p1 = new Process(10)
// const p3 = new Process(5)
// const p5 = new Process(11)
// const p6 = new Process(50)

// systemOperation.systemCall(SystemCallType.WRITE_PROCESS, p1)

// systemOperation.systemCall(SystemCallType.WRITE_PROCESS, new Process(20))

// systemOperation.systemCall(SystemCallType.WRITE_PROCESS, p3)

// systemOperation.systemCall(SystemCallType.WRITE_PROCESS, new Process(20))

// systemOperation.systemCall(SystemCallType.WRITE_PROCESS, p5)

// systemOperation.systemCall(SystemCallType.CLOSE_PROCESS, p1)
// systemOperation.systemCall(SystemCallType.CLOSE_PROCESS, p3)
// systemOperation.systemCall(SystemCallType.CLOSE_PROCESS, p5)

// systemOperation.systemCall(SystemCallType.WRITE_PROCESS, p6)

// systemOperation.systemCall(SystemCallType.READ_PROCESS, p6)
