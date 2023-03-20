import NewTable from '@/components/NewTable'
import { User } from '@/domain/User'
import { createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'
import { SWRResponse } from 'swr'
type Props = {
  swr: SWRResponse
  viewDetails: (current: any) => void
  indexPage: number
  setSize: (size: number) => void
  onChangePage: (total: number, index: number) => void
}
const util = createColumnHelper<User>()

const UserTable = ({ swr, viewDetails, indexPage, setSize }: Props) => {
  const { isLoading, error, data } = swr

  const items = data?._embedded.users

  const columns = useMemo(() => {
    return [
      util.accessor((row) => row.id, {
        header: 'User ID',
      }),
    ]
  }, [])

  if (isLoading) return <p>Loading....</p>
  if (error) return <p>{JSON.stringify(error)}</p>
  if (items?.length === 0) return <p>Không tìm thấy người dùng.</p>

  return (
    <NewTable
      columns={columns}
      data={items}
      setSize={setSize}
    />
  )
}
export default UserTable
