import NewTable from '@/components/NewTable'
import Product from '@/domain/Product'
import { Pageable } from '@/hooks/usePageable'
import { TableRowProps, Button } from '@chakra-ui/react'
import { CellContext, createColumnHelper, Row } from '@tanstack/react-table'
import { User } from 'next-auth'
import { useMemo } from 'react'
import { SWRResponse } from 'swr'

export type ProductTableProps = {
  swr: SWRResponse
  viewDetails: (current: any) => void
  page: Pageable
  // toggleShowDeleted: () => void
  // isShowDeleted: boolean
}
const util = createColumnHelper<Product>()
const ProductTable = ({
  swr,
  viewDetails,
  page,
}: // isShowDeleted,
// toggleShowDeleted,
ProductTableProps) => {
  const { isLoading, error, data } = swr

  let items: Product[] = data?._embedded.products

  const columns = useMemo(() => {
    return [
      util.accessor(({ id }) => id, {
        header: '#',
      }),
      util.accessor(({ images }) => images, {
        header: 'Hình ảnh',
      }),
      util.accessor(({ status }) => status, {
        header: 'Username',
      }),
      util.accessor(({ name }) => name, {
        header: 'Họ và tên',
      }),
      util.display({
        header: 'Menu',
        cell: (info) => (
          <ProductMenu
            info={info}
            onEdit={viewDetails.bind(null, info.row.original)}
          />
        ),
      }),
    ]
  }, [viewDetails])

  if (isLoading) return <p>Loading....</p>
  if (error) return <p>{JSON.stringify(error)}</p>
  if (items?.length === 0) return <p>Không tìm thấy sản phẩm.</p>

  const getRowProps = (row?: Row<User>): TableRowProps | undefined => {
    // if (row && row.original.deletedDate) {
    return {
      // bgColor: 'red.50',
      textColor: 'red.500',
      opacity: '0.7',
      bg: 'rgba(0, 0, 0, 0.05)',
    }
    // }
    return
  }
  return (
    <>
      {/* <Checkbox
        onChange={toggleShowDeleted}
        isChecked={isShowDeleted}
      >
        Hiển thị đã xoá
      </Checkbox> */}
      <NewTable
        columns={columns}
        data={items}
        setSize={page.setSize}
        // config={{
        //   rowProps: getRowProps,
        // }}
      />
    </>
  )
}

const ProductMenu = ({
  onEdit,
  info,
}: // onDelete,
{
  onEdit: () => void
  info: CellContext<Product, unknown>
  // onDelete: () => void
}) => {
  return (
    <Button
      onClick={onEdit}
      colorScheme={'green'}
      variant="outline"
    >
      Xem chi tiết
    </Button>
  )
}

export default ProductTable
