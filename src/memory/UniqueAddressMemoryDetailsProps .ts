import { AddressMemoryProps } from './AddressMemoryProps'

interface DataProps {
  index: number
  element: string | undefined
}

export interface UniqueAddressMemoryDetailsProps {
  id: string
  size: number
  address: AddressMemoryProps
  data: DataProps[]
}
