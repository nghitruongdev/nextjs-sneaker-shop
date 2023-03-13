import MyTable from '@/components/common/MyTable'
import Order from '@/domain/Order'
import { Tr, Td } from '@chakra-ui/react'

type Props = {
  indexPage: number
  onChangePage: (total: number, index: number) => void
  keyUrl: string | null
  setSize: (size: number) => void
}
const OrderTable = ({ indexPage, setSize, onChangePage, keyUrl }: Props) => {
  // todo: If there is no item in the items
  // if (!items?.length) return <p>{`There's nothing`}</p>

  //todo: render the items if items exists
  const titles = ['id', 'Sub totals', 'Place at', 'status']

  return <></>
}

export default OrderTable
