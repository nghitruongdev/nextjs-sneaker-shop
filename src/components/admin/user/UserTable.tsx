import NewTable from '@/components/NewTable'
import { User } from '@/domain/User'
import { createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'
type Props = {
  viewDetails: (current: any) => void
}
const util = createColumnHelper<User>()
const UserTable = ({ viewDetails }: Props) => {
  const columns = useMemo(() => {
    return []
  }, [])
  return (
    <NewTable
      columns={columns}
      data={[]}
    />
  )
}
export default UserTable
