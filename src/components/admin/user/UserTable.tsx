import NewTable from '@/components/NewTable'
import { User } from '@/domain/User'
import { Pageable } from '@/hooks/usePageable'
import { Button, Checkbox, Menu, TableRowProps } from '@chakra-ui/react'
import { CellContext, createColumnHelper, Row } from '@tanstack/react-table'
import { useMemo } from 'react'
import { SWRResponse } from 'swr'
type Props = {
  swr: SWRResponse
  viewDetails: (current: any) => void
  page: Pageable
  toggleShowDeleted: () => void
  isShowDeleted: boolean
}
const util = createColumnHelper<User>()

const UserTable = ({
  swr,
  viewDetails,
  page,
  isShowDeleted,
  toggleShowDeleted,
}: Props) => {
  const { isLoading, error, data } = swr

  let items: User[] = data?._embedded.users

  const columns = useMemo(() => {
    return [
      util.accessor((row) => row.id, {
        header: 'User ID',
      }),
      util.accessor((row) => row.imageUrl, {
        header: 'Avatar',
      }),
      util.accessor((row) => row.login, {
        header: 'Username',
      }),
      util.accessor((row) => row.fullName, {
        header: 'Họ và tên',
      }),
      util.accessor((row) => row.gender, {
        header: 'Giới tính',
        cell: (info) => info.getValue(),
      }),
      util.accessor((row) => row.birthdate, {
        header: 'Ngày sinh',
      }),
      util.accessor((row) => row.email, {
        header: 'Email',
      }),
      util.accessor((row) => row.phone, {
        header: 'Số điện thoại',
      }),
      util.display({
        header: 'Action',
        cell: (info) => (
          <UserMenu
            info={info}
            onEdit={viewDetails.bind(null, info.row.original)}
          />
        ),
      }),
    ]
  }, [viewDetails])

  if (isLoading) return <p>Loading....</p>
  if (error) return <p>{JSON.stringify(error)}</p>
  if (items?.length === 0) return <p>Không tìm thấy người dùng.</p>

  const getRowProps = (row?: Row<User>): TableRowProps | undefined => {
    if (row && row.original.deletedDate) {
      return {
        // bgColor: 'red.50',
        textColor: 'red.500',
        opacity: '0.7',
        bg: 'rgba(0, 0, 0, 0.05)',
      }
    }
    return
  }
  return (
    <>
      <Checkbox
        onChange={toggleShowDeleted}
        isChecked={isShowDeleted}
      >
        Hiển thị đã xoá
      </Checkbox>
      <NewTable
        columns={columns}
        data={items}
        setSize={page.setSize}
        config={{
          rowProps: getRowProps,
        }}
      />
    </>
  )
}

const UserMenu = ({
  onEdit,
  info,
}: // onDelete,
{
  onEdit: () => void
  info: CellContext<User, unknown>
  // onDelete: () => void
}) => {
  const deletedDate = info.row.original.deletedDate
  return (
    <Button
      onClick={onEdit}
      colorScheme={deletedDate ? 'red' : 'green'}
      variant="outline"
    >
      Xem chi tiết
    </Button>
  )
}

export default UserTable
