import UserForm from '@/components/admin/user/new-user/UserForm'
import { getAdminLayout } from '@/components/layout/admin/AdminLayout'
import { User } from '@/domain/User'
import { getFetcher } from '@/hooks/useFetcher'
import { NextPageWithLayout } from '@/pages/_app'
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useState } from 'react'
import UserTable from '@/components/admin/user/UserTable'
import config from 'config'
import useUser from '@/hooks/useUser'

const UserIndexPage: NextPageWithLayout = () => {
  console.debug('User page rerendered')
  const [tabIndex, setTabIndex] = useState(0)

  const {
    swr,
    getUserInput,
    getAddressInput,
    current,
    setCurrent,
    page,
    saveUser,
  } = useUser({ key: config.api.users.url })
  const { pageIndex, setSize, changePageHandler } = page

  const showUserInfo = (user: User) => {
    setCurrent(user)
    setTabIndex(1)
  }
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
            <UserTable
              swr={swr}
              viewDetails={showUserInfo}
              indexPage={pageIndex}
              setSize={setSize}
              onChangePage={changePageHandler}
            />
          </TabPanel>
          <TabPanel>
            <UserForm
              saveUser={saveUser}
              getUserInput={getUserInput}
              getAddressInput={getAddressInput}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

UserIndexPage.getLayout = getAdminLayout
export default UserIndexPage
