import { User } from '@/domain/User'
import { UserFormValue } from '@/hooks/useUserForm'
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { Address } from '@/domain/Address'
import { UseFormWatch } from 'react-hook-form'
import config from 'config'
import { useState } from 'react'
import TransparentOverlay from '@/components/TransparentOverlay'
type Props = {
  current: User | undefined
  getUserInput: (name: keyof UserFormValue) => JSX.Element
  getAddressInput: (name: keyof Address) => JSX.Element
  saveUser: () => void
  deleteUser: () => void
  isSubmitting: boolean
  isDeleting: boolean
  errors: (name: keyof Address | keyof UserFormValue) => any
  resetForm: () => void
  watch: UseFormWatch<UserFormValue>
}
const UserForm = ({
  current,
  getUserInput,
  getAddressInput,
  saveUser,
  deleteUser,
  isSubmitting,
  isDeleting,
  errors,
  watch,
  resetForm,
}: Props) => {
  const currentImg = config.api.image.url(current?.imageUrl)
  const [img, setImg] = useState<any>(currentImg)
  const isDeleted = current?.deletedDate || false

  const fileList = watch('imageFile')
  if (fileList && fileList.length && fileList?.[0]) {
    const file = fileList[0]
    const reader = new FileReader()
    console.log('user form rerendered')
    reader.onload = () => {
      setImg(reader.result)
      console.log('done reading')
    }

    reader.readAsDataURL(file)
  }

  const resetFormWithAvatar = () => {
    resetForm()
    setImg(currentImg)
  }

  return (
    <SimpleGrid
      columns={{
        base: 1,
        md: 3,
      }}
      pos="relative"
    >
      {isDeleted && <TransparentOverlay />}
      <Box
        display="flex"
        justifyContent="center"
      >
        <Avatar
          name={current?.firstName}
          src={img}
          role="group"
          size={{
            base: '2xl',
          }}
          {...(!img && {
            bgGradient: 'radial(green.400, green.100)',
          })}
        >
          <AvatarBadge
            // borderColor="to"
            // border="5px"
            _groupHover={{
              cursor: 'pointer',
              borderColor: 'papayawhip',
            }}
            bg="tomato"
            boxSize={'1.5em'}
          >
            <FormLabel
              htmlFor="imageFile"
              boxSize="full"
              cursor="pointer"
            ></FormLabel>
          </AvatarBadge>
        </Avatar>
      </Box>

      <Box aria-colspan={2}>
        {!isDeleted && (
          <Button onClick={resetFormWithAvatar}>Reset Form</Button>
        )}
        <FormControl
          isRequired
          isInvalid={errors('lastName')}
        >
          <FormLabel>Họ</FormLabel>
          {getUserInput('lastName')}
          <FormErrorMessage>{errors('lastName')?.message}</FormErrorMessage>
        </FormControl>

        <FormControl
          isRequired
          isInvalid={errors('firstName')}
        >
          <FormLabel>Tên</FormLabel>
          {getUserInput('firstName')}
          <FormErrorMessage>{errors('firstName')?.message}</FormErrorMessage>
        </FormControl>

        <FormControl
          isRequired
          isInvalid={errors('login')}
        >
          <FormLabel>Username</FormLabel>
          {getUserInput('login')}
          <FormHelperText hidden={errors('login')?.message}>
            Nhập từ 5-15 kí tự
          </FormHelperText>
          <FormErrorMessage>{errors('login')?.message}</FormErrorMessage>
        </FormControl>

        <FormControl
          isRequired
          isInvalid={errors('email')}
        >
          <FormLabel>Địa chỉ email</FormLabel>
          {getUserInput('email')}
          <FormErrorMessage>{errors('email')?.message}</FormErrorMessage>
        </FormControl>

        <FormControl
          isRequired
          isInvalid={errors('phone')}
        >
          <FormLabel>Số điện thoại</FormLabel>
          {getUserInput('phone')}
          <FormHelperText hidden={errors('phone')?.message}>
            Số điện thoại gồm 10 chữ số
          </FormHelperText>
          <FormErrorMessage>{errors('phone')?.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Là quản trị viên</FormLabel>
          <Input type="checkbox" />
        </FormControl>

        <FormControl
          isRequired
          isInvalid={errors('gender')}
        >
          <FormLabel>Giới tính</FormLabel>
          {getUserInput('gender')}
          <FormErrorMessage>{errors('gender')?.message}</FormErrorMessage>
        </FormControl>

        <FormControl
          isRequired
          isInvalid={errors('birthdate')}
        >
          <FormLabel>Ngày sinh</FormLabel>
          {getUserInput('birthdate')}
          <FormErrorMessage>{errors('birthdate')?.message}</FormErrorMessage>
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
        <FormControl hidden>{getUserInput('imageFile')}</FormControl>
        {current?.deletedDate && (
          <Text
            colorScheme="red"
            color="red"
            align="center"
          >
            {`Người dùng đã bị xoá khỏi hệ thống vào lúc ${new Date(
              current.deletedDate
            ).toLocaleString('vi-VN')}`}
          </Text>
        )}
        {!isDeleted && (
          <>
            <Button
              onClick={saveUser}
              isLoading={isSubmitting}
              loadingText="Đang xử lý..."
            >
              {current ? 'Cập nhật' : 'Thêm'}
            </Button>
            <Button
              onClick={deleteUser}
              isLoading={isDeleting && !isSubmitting}
              loadingText="Đang xử lý..."
            >
              Xoá
            </Button>
          </>
        )}
      </Box>
    </SimpleGrid>
  )
}

export default UserForm
