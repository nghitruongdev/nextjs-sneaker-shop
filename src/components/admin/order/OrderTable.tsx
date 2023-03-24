import Order from '@/domain/Order'
import { Button } from '@chakra-ui/react'
import { useMemo, useCallback } from 'react'
import {
  createColumnHelper,
  CellContext,
  ColumnDefTemplate,
} from '@tanstack/react-table'
import NewTable from '@/components/NewTable'
import useOrder from '@/hooks/useOrder'
import Select from 'react-select'
import { getFetcher } from '../../../hooks/useFetcher'
type Props = {
  indexPage?: number
  onChangePage?: (total: number, index: number) => void
  keyUrl: string
  setSize?: (size: number) => void
  statuses: string[]
  viewOrder: (current: Order) => void
}
const util = createColumnHelper<Order>()
const fetcher = getFetcher()

const OrderTable = ({
  indexPage,
  setSize,
  onChangePage,
  keyUrl,
  statuses,
  viewOrder,
}: Props) => {
  // todo: If there is no item in the items

  //todo: render the items if items exists
  const { data, isLoading, error } = useOrder(keyUrl)

  const items = data?._embedded.orders

  const columns = useMemo(() => {
    const renderStatusCell = (props: CellContext<Order, unknown>) => (
      <StatusCell
        info={props}
        statuses={statuses}
      />
    )
    const renderViewButton = (props: CellContext<Order, unknown>) => (
      <ViewOrderButton
        info={props}
        viewOrder={viewOrder}
      />
    )

    return [
      util.accessor((row) => row.id, {
        header: 'Order ID',
        cell: (info) => info.getValue(),
      }),
      util.accessor((row) => row.shippingAddress?.name, {
        header: 'Người nhận',
      }),
      // util.accessor((row) => row.active, {
      //   header: 'Active',
      // }),
      util.accessor((row) => row.subTotal, {
        header: 'Sub Totals',
      }),
      util.accessor((row) => row.time, {
        header: 'Created At',
      }),
      util.accessor((row) => row.status, {
        header: 'Order Status',
        cell: renderStatusCell,
      }),
      util.display({
        header: 'Action',
        cell: renderViewButton,
      }),
    ]
  }, [statuses, viewOrder])

  if (isLoading) return <>Loading...</>
  if (error) return <>{error.message}</>

  if (!items?.length) return <p>{`There's nothing`}</p>

  return (
    <NewTable
      page={data.page}
      setSize={setSize}
      columns={columns}
      onChangePage={onChangePage?.bind(this, data.page.totalPages)}
      data={items}
      caption="VNCO muôn năm"
    />
  )
}

export const StatusCell = ({
  info,
  statuses,
}: {
  info: CellContext<Order, any>
  statuses?: string[]
}) => {
  // const [isClicked, setIsClicked] = useState(false)
  const statusOptions = statuses?.map((status: string) => ({
    label: status.replaceAll('_', ' '),
    value: status,
  }))
  const currentStatus = statusOptions?.find(
    (status) => status.value == info.getValue()
  )

  return (
    <>
      {
        <Select
          options={statusOptions}
          defaultValue={currentStatus}
        />
      }
      {/* {!isClicked && (
        <Badge
          cursor={'pointer'}
          // onClick={setIsClicked.bind(this, true)}
        >
          {info.getValue().replaceAll('_', ' ')}
        </Badge>
      )} */}
    </>
  )
}

const ViewOrderButton = ({
  info,
  viewOrder,
}: {
  info: any
  viewOrder: (order: Order) => void
}) => (
  <Button onClick={viewOrder.bind(this, info.row.original)}>View more</Button>
)

export default OrderTable
