import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  SimpleGrid,
  Stack,
  StackDivider,
} from '@chakra-ui/react'
import { FieldErrors, UseFormWatch } from 'react-hook-form'
import { useState } from 'react'
import Product from '@/domain/Product'
import { ProductFormValue, ProductInputs } from '@/hooks/useProductForm'
import TransparentOverlay from '@/components/TransparentOverlay'
import OptionItem from '@/components/common/OptionItem'
import Select from 'react-select'
import ReactSelect from 'react-select'

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
  console.log('user form rerendered')
  // const currentImg = config.api.image.url(current?.imageUrl)
  const currentImg = ''
  const [img, setImg] = useState<any>(currentImg)
  // const isDeleted = current?.deletedDate || false
  const isDeleted = false
  // const fileList = watch('imageFile')
  // if (fileList && fileList.length && fileList?.[0]) {
  //   const file = fileList[0]
  // const reader = new FileReader()
  // reader.onload = () => {
  //   setImg(reader.result)
  //   console.log('done reading')
  // }

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
        // md: 3,
      }}
      pos="relative"
    >
      {isDeleted && <TransparentOverlay />}
      <Box aria-colspan={2}>
        {!isDeleted && <Button onClick={resetForm}>Reset Form</Button>}
        <FormControl
          isRequired
          isInvalid={!!errors.name}
        >
          <FormLabel>Tên sản phẩm</FormLabel>
          {inputs.name()}
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.shortDesc}>
          <FormLabel>Mô tả</FormLabel>
          {inputs.shortDesc()}
          <FormErrorMessage>{errors.shortDesc?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.fullDesc}>
          <FormLabel>Chi tiết</FormLabel>
          {inputs.fullDesc()}
          <FormErrorMessage>{errors.fullDesc?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.publishDate}>
          <FormLabel>
            Thời gian công bố
            <FormHelperText
              fontSize={'xs'}
              transform="auto-gpu"
              m="2"
            >
              * Sau thời gian công bố, sản phẩm sẽ không thể xoá hay cập nhật
              tuỳ chọn.
            </FormHelperText>
          </FormLabel>
          {inputs.publishDate()}
          <FormErrorMessage>{errors.publishDate?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.fullDesc}>
          <FormLabel>Tuỳ chọn</FormLabel>
          {}
          <FormErrorMessage>{errors.fullDesc?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.discount}>
          <FormLabel>Giảm giá</FormLabel>
          {inputs.discount()}
          <FormErrorMessage>{errors.discount?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.brand}>
          <FormLabel>Thương hiệu</FormLabel>
          {inputs.brand()}
          <FormErrorMessage>{errors.brand?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.collection}>
          <FormLabel>Bộ sưu tập</FormLabel>
          {inputs.collection()}
          <FormErrorMessage>{errors.collection?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.category}>
          <FormLabel>Danh mục</FormLabel>
          {inputs.category()}
          <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
        </FormControl>

        <Card>
          <CardHeader>
            <Heading size="md">Option sản phẩm</Heading>
          </CardHeader>

          <CardBody>
            <FormControl isInvalid={!!errors.optionTypes}>
              {/* <FormLabel>Tuỳ chọn sản phẩm</FormLabel> */}
              {inputs.optionTypes()}
              <FormErrorMessage>{errors.optionTypes?.message}</FormErrorMessage>
            </FormControl>
          </CardBody>
        </Card>

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
