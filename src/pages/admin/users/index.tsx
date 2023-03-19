import NewUserForm from '@/components/admin/user/new-user/NewUserForm'
import { getAdminLayout } from '@/components/layout/admin/AdminLayout'
import { User } from '@/domain/User'
import { getFetcher } from '@/hooks/useFetcher'
import { NextPageWithLayout } from '@/pages/_app'
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useState } from 'react'
import UserTable from '../../../components/admin/user/UserTable'
import useSWR from 'swr'
import config from 'config'
import AllUserPanel from '@/components/admin/user/AllUserPanel'

const fetcher = getFetcher()
const UserIndexPage: NextPageWithLayout = () => {
  console.debug('User page rerendered')
  const [tabIndex, setTabIndex] = useState(0)
  const [current, setCurrent] = useState<User | null>(null)

  const { data: statuses, isLoading } = useSWR(
    config.api.orders.status,
    fetcher
  )

  const showUserInfo = (user: User) => {
    setCurrent(user)
    setTabIndex(1)
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <Box>
      <Tabs
        index={tabIndex}
        onChange={setTabIndex}
      >
        <TabList>
          <Tab>Tất cả người dùng</Tab>
          <Tab>Thêm mới người dùng</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AllUserPanel viewDetails={showUserInfo} />
          </TabPanel>
          <TabPanel>
            <NewUserForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

UserIndexPage.getLayout = getAdminLayout
export default UserIndexPage
