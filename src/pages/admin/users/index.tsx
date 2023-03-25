import UserForm from '@/components/admin/user/new-user/UserForm'
import { getAdminLayout } from '@/components/layout/admin/AdminLayout'
import { NextPageWithLayout } from '@/pages/_app'
import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import UserTable from '@/components/admin/user/UserTable'
import useUser from '@/hooks/useUser'

const UserIndexPage: NextPageWithLayout = () => {
  console.debug('User page rerendered')

  const { swr, form, page, tab, toggleShowDeleted, isShowDeleted } = useUser()

  const {
    getUserInput,
    getAddressInput,
    saveUser,
    isSubmitting,
    deleteUser,
    isDeleting,
    errors,
    currentUser,
    showUser,
    watchUser,
    resetForm,
  } = form

  return (
    <Box>
      <Tabs
        index={tab.index}
        onChange={tab.onChange}
      >
        <TabList>
          <Tab>Tất cả người dùng</Tab>
          <Tab>Thêm mới người dùng</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserTable
              swr={swr}
              page={page}
              viewDetails={showUser}
              isShowDeleted={isShowDeleted}
              toggleShowDeleted={toggleShowDeleted}
            />
          </TabPanel>
          <TabPanel>
            <UserForm
              current={currentUser}
              watch={watchUser}
              saveUser={saveUser}
              deleteUser={deleteUser}
              getUserInput={getUserInput}
              getAddressInput={getAddressInput}
              isSubmitting={isSubmitting}
              isDeleting={isDeleting || false}
              errors={errors}
              resetForm={resetForm}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

UserIndexPage.getLayout = getAdminLayout
export default UserIndexPage
