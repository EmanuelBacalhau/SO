import { AddressMemoryProps } from './AddressMemoryProps'

interface DataProps {
  index: number
  element: string | undefined
}

export interface ManyAddressMemoryDetailsProps {
  id: string
  size: number
  pages: AddressMemoryProps[]
  data: DataProps[]
}
