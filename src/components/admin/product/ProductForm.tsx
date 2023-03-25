import {
  Avatar,
  AvatarBadge,
  Box,
  FormControl,
  FormLabel,
  SimpleGrid,
} from '@chakra-ui/react'
import { FieldErrors, UseFormWatch } from 'react-hook-form'
import { useState } from 'react'
import Product from '@/domain/Product'
import { ProductFormValue, ProductInputs } from '@/hooks/useProductForm'
import TransparentOverlay from '@/components/TransparentOverlay'

export type ProductFormProps = {
  current: Product | undefined
  inputs: ProductInputs
  saveProduct: () => void
  deleteProduct: () => void
  resetForm: () => void
  isSubmitting: boolean
  isDeleting: boolean
  errors: FieldErrors<ProductFormValue>
  watch: UseFormWatch<ProductFormValue>
}

const ProductForm = ({
  current,
  inputs,
  saveProduct,
  deleteProduct,
  isSubmitting,
  isDeleting,
  errors,
  watch,
  resetForm,
}: ProductFormProps) => {
  // const currentImg = config.api.image.url(current?.imageUrl)
  const currentImg = ''
  const [img, setImg] = useState<any>(currentImg)
  // const isDeleted = current?.deletedDate || false
  const isDeleted = false
  // const fileList = watch('imageFile')
  // if (fileList && fileList.length && fileList?.[0]) {
  //   const file = fileList[0]
  const reader = new FileReader()
  console.log('user form rerendered')
  reader.onload = () => {
    setImg(reader.result)
    console.log('done reading')
  }

  // reader.readAsDataURL(file)
  // }

  // const resetFormWithAvatar = () => {
  //   resetForm()
  //   setImg(currentImg)
  // }

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
          name={current?.name}
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
        {/* {!isDeleted && (
          <Button onClick={resetFormWithAvatar}>Reset Form</Button>
        )} */}
        <FormControl
          isRequired
          // isInvalid={errors('lastName')}
        >
          <FormLabel>Họ</FormLabel>
          {inputs.publishDate()}
          {/* {getUserInput('lastName')} */}
          {/* <FormErrorMessage>{errors('lastName')?.message}</FormErrorMessage> */}
        </FormControl>

        <FormControl
          isRequired
          // isInvalid={errors('firstName')}
        >
          <FormLabel>Tên</FormLabel>
          {/* {getUserInput('firstName')} */}
          {/* <FormErrorMessage>{errors('firstName')?.message}</FormErrorMessage> */}
        </FormControl>

        <FormControl
          isRequired
          // isInvalid={errors('login')}
        >
          <FormLabel>Username</FormLabel>
          {/* {getUserInput('login')} */}
          {/* <FormHelperText hidden={errors('login')?.message}>
            Nhập từ 5-15 kí tự
          </FormHelperText>
          <FormErrorMessage>{errors('login')?.message}</FormErrorMessage> */}
        </FormControl>

        {/* <FormControl hidden>{getUserInput('imageFile')}</FormControl> */}
        {/* {current?.deletedDate && (
          <Text
            colorScheme="red"
            color="red"
            align="center"
          >
            {`Người dùng đã bị xoá khỏi hệ thống vào lúc ${new Date(
              current.deletedDate
            ).toLocaleString('vi-VN')}`}
          </Text>
        )} */}
        {/* {!isDeleted && (
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
        )} */}
      </Box>
    </SimpleGrid>
  )
}
export default ProductForm
