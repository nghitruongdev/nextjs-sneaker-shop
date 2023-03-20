import { User } from '@/domain/User'
import useAddressForm from '@/hooks/useAddress'
import useUserForm from '@/hooks/useUserForm'
import { UserFormValue } from '../../../../hooks/useUserForm'
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Textarea,
} from '@chakra-ui/react'
import { Address } from '@/domain/Address'
type Props = {
  current?: User
  getUserInput: (name: keyof UserFormValue) => JSX.Element
  getAddressInput: (name: keyof Address) => JSX.Element
  saveUser: () => void
}

const UserForm = ({
  current,
  getUserInput,
  getAddressInput,
  saveUser,
}: Props) => {
  const submitForm = (event: any) => {}

  const resetHandler = () => {}

  return (
    <SimpleGrid columns={3}>
      <Avatar name="hello" />
      <Box aria-colspan={2}>
        <FormControl isRequired>
          <FormLabel>Họ</FormLabel>
          {getUserInput('lastName')}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Tên</FormLabel>
          {getUserInput('firstName')}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          {getUserInput('login')}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Địa chỉ email</FormLabel>
          {getUserInput('email')}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Số điện thoại</FormLabel>
          {getUserInput('phone')}
        </FormControl>

        <FormControl>
          <FormLabel>Là quản trị viên</FormLabel>
          <Input type="checkbox" />
        </FormControl>

        <FormControl>
          <FormLabel>Ngày sinh</FormLabel>
          {getUserInput('birthdate')}
        </FormControl>

        <FormControl>
          <FormLabel>Ghi chú</FormLabel>
          {getUserInput('note')}
        </FormControl>
        <FormControl as="legend">
          <FormLabel as="fieldset">Địa chỉ</FormLabel>
          <FormControl>
            <FormLabel>Số nhà</FormLabel>
            {getAddressInput('street')}
          </FormControl>
          <FormControl>
            <FormLabel>Phường/ xã</FormLabel>
            {getAddressInput('ward')}
          </FormControl>
          <FormControl>
            <FormLabel>Quận/Huyện</FormLabel>
            {getAddressInput('district')}
          </FormControl>
          <FormControl>
            <FormLabel>Tỉnh/ thành phố</FormLabel>
            {getAddressInput('province')}
          </FormControl>
        </FormControl>

        <Button onClick={saveUser}>Thêm</Button>
      </Box>
    </SimpleGrid>
  )
}
export default UserForm
