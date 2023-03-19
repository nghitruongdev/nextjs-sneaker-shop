import useShippingAddress from '@/hooks/useShippingAddress'
import useUserForm from '@/hooks/useUserForm'
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

const NewUserForm = () => {
  const { register, user, inputs, errors, handleSubmit } = useUserForm()

  const submitForm = (event: any) => {
    console.log('info', user)
  }
  return (
    <SimpleGrid columns={3}>
      <Avatar name="hello" />
      <Box aria-colspan={2}>
        <FormControl isRequired>
          <FormLabel>Họ</FormLabel>
          <Input
            type="text"
            {...register('lastName')}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Tên</FormLabel>
          <Input
            type="text"
            {...register('firstName')}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            {...register('login')}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Địa chỉ email</FormLabel>
          <Input
            type="email"
            {...register('email')}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Số điện thoại</FormLabel>
          <Input
            type="tel"
            {...register('phone')}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Là quản trị viên</FormLabel>
          <Input type="checkbox" />
        </FormControl>

        <FormControl>
          <FormLabel>Ngày sinh</FormLabel>
          <Input
            type="date"
            {...register('birthdate')}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Ghi chú</FormLabel>
          <Textarea {...register('note')} />
        </FormControl>
        <FormControl as="legend">
          <FormLabel as="fieldset">Địa chỉ</FormLabel>
          <FormControl>
            <FormLabel>Số nhà</FormLabel>
            {inputs.streetInput}
          </FormControl>
          <FormControl>
            <FormLabel>Phường/ xã</FormLabel>
            {inputs.wardSelect}
          </FormControl>
          <FormControl>
            <FormLabel>Quận/Huyện</FormLabel>
            {inputs.districtSelect}
          </FormControl>
          <FormControl>
            <FormLabel>Tỉnh/ thành phố</FormLabel>
            {inputs.provinceSelect}
          </FormControl>
        </FormControl>

        <Button onClick={submitForm}>Thêm</Button>
      </Box>
    </SimpleGrid>
  )
}
export default NewUserForm
