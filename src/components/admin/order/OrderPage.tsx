import Order from '@/domain/Order'
import { getFetcher } from '@/hooks/useFetcher'
import { createColumnHelper } from '@tanstack/react-table'
import { StatusCell } from './OrderTable'
import { useMemo } from 'react'
import { Button } from '@chakra-ui/react'

type Props = {
  indexPage: number
  onChangePage: (total: number, index: number) => void
  keyUrl: string
  setSize: (size: number) => void
  statuses: string[]
  viewOrder: (current: Order) => void
}

const OrderPage = ({ statuses }: Props) => {
  return <div>OrderPage</div>
}
export default OrderPage
