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
  processSize: 56,
})

SystemOperation.systemCall({
  typeCall: SystemCallType.WRITE,
  process: p3 as Process,
})

// const p4 = SystemOperation.systemCall({
//   typeCall: SystemCallType.CREATE,
//   processSize: 11,
// })

// SystemOperation.systemCall({
//   typeCall: SystemCallType.WRITE,
//   process: p4 as Process,
// })

// const p5 = SystemOperation.systemCall({
//   typeCall: SystemCallType.CREATE,
//   processSize: 81,
// })

// SystemOperation.systemCall({
//   typeCall: SystemCallType.WRITE,
//   process: p5 as Process,
// })

// const p6 = SystemOperation.systemCall({
//   typeCall: SystemCallType.CREATE,
//   processSize: 10,
// })

// SystemOperation.systemCall({
//   typeCall: SystemCallType.WRITE,
//   process: p6 as Process,
// })

// const p7 = SystemOperation.systemCall({
//   typeCall: SystemCallType.CREATE,
//   processSize: 179,
// })

// SystemOperation.systemCall({
//   typeCall: SystemCallType.WRITE,
//   process: p7 as Process,
// })

// SystemOperation.systemCall({
//   typeCall: SystemCallType.WAKE,
//   process: p2 as Process,
// })

// SystemOperation.systemCall({
//   typeCall: SystemCallType.WAKE,
//   process: p4 as Process,
// })
console.log(SystemOperation.hdManager.getHd)
