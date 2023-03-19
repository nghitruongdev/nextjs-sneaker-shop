import { User } from '@/domain/User'
import UserTable from './UserTable'

type Props = {
  viewDetails: (user: User) => void
}
const AllUserPanel = ({ viewDetails }: Props) => {
  return <UserTable viewDetails={viewDetails} />
}
export default AllUserPanel
