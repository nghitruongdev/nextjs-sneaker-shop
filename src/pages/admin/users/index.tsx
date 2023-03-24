import UserForm from '@/components/admin/user/new-user/UserForm'
import { getAdminLayout } from '@/components/layout/admin/AdminLayout'
import { User } from '@/domain/User'
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
import { useForm } from 'react-hook-form'
import useAxios from '@/hooks/useAxios'

const UserIndexPage: NextPageWithLayout = () => {
  console.debug('User page rerendered')

  const { swr, form, page, tab, toggleShowDeleted, isShowDeleted } = useUser({})

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
  const { pageIndex, setSize, changePageHandler } = page

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
              isShowDeleted={isShowDeleted}
              toggleShowDeleted={toggleShowDeleted}
              swr={swr}
              viewDetails={showUser}
              indexPage={pageIndex}
              setSize={setSize}
              onChangePage={changePageHandler}
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

// <>
{
  /* <input
        type="file"
        {...register('imageFile')}
      />
      <Button onClick={handleSubmit(handleClick)}>Submit</Button>F */
}
{
  /* </> */
}
