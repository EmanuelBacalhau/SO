import { AddressMemoryProps } from './AddressMemoryProps'

interface DataProps {
  index: number
  element: string | undefined
}

interface Pages extends AddressMemoryProps {
  page: number
}

export interface ManyAddressMemoryDetailsProps {
  id: string
  size: number
  quantityOfPages: number
  pages: Pages[]
  data: DataProps[]
}
