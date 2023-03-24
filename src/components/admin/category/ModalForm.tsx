import CustomModal from '@/components/common/CustomModal'
import Category from '@/domain/Category'
import {
  FormControl,
  Input,
  Text,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  HStack,
  FormLabel,
  Switch,
  VStack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { RiPencilFill } from 'react-icons/ri'
import ReactSelect from 'react-select'
import SaveButton from '../../common/CloseButton'
import { UpdateProps } from '@/hooks/useCategory'

type Props = {
  category: Category
  isOpen: boolean
  isSubmitting?: boolean
  onClose: () => void
  rootCategories?: Category[]
  clearCurrent: () => void
  updateCategory: (props: UpdateProps) => void
}

export type FormValue = {
  id?: number
  name: string
  parent?: any
  description?: string
  isRoot?: boolean
}

let count = 0
const ModalForm = ({
  isOpen,
  onClose,
  category,
  rootCategories,
  isSubmitting,
  updateCategory,
  clearCurrent,
}: Props) => {
  console.debug('Modal form rendered', count++)
  const { parentId, _links, ...categoryProps } = category

  const selectOptions = rootCategories?.map((item) => ({
    label: item.name,
    value: item,
  }))

  const parentOption = selectOptions?.find(
    (option) => option.value.id === parentId
  )

  const defaultFormValue: FormValue = {
    ...categoryProps,
    parent: parentOption,
  }

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: defaultFormValue,
  })
  const rootState = watch('isRoot')

  const cancelHandler = () => {
    clearCurrent()
    onClose()
  }
  const { ref: nameRef, ...nameRegister } = register('name', {
    required: 'Name is required',
  })

  const updateHandler = (data: FormValue) => {
    updateCategory({
      data,
      current: category,
      clearCurrent,
      isFormDirty: isDirty,
    })
  }

  const saveBtn = (
    <SaveButton
      colorScheme="blue"
      mr={5}
      onClick={handleSubmit(updateHandler)}
      isLoading={isSubmitting}
      loadingText="Sending data..."
    />
  )

  return (
    <CustomModal
      initialFocusRef={nameRef}
      shouldWarn={isDirty && !isSubmitting}
      isOpen={isOpen}
      onClose={cancelHandler}
      header={
        <HStack>
          <RiPencilFill />
          <Text>Category Edit</Text>
        </HStack>
      }
      isSubmitting={isSubmitting}
      defaultCloseBtn
      buttons={saveBtn}
    >
      <VStack
        spacing={5}
        px={5}
      >
        <FormControl isInvalid={errors.name ? true : false}>
          <FormLabel>Name</FormLabel>
          <Input
            ref={nameRef}
            {...nameRegister}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Parent Category</FormLabel>
          <ReactSelect
            options={selectOptions}
            blurInputOnSelect
            tabSelectsValue
            defaultValue={watch('parent')}
            isDisabled={rootState}
            onChange={(data) => setValue('parent', data)}
          />

          {rootState && (
            <FormHelperText
              as="span"
              fontSize="xs"
              color="gray.500"
            >
              A root category cannot have parents
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          display="flex"
          alignItems="center"
        >
          <FormLabel
            htmlFor="is-root-category"
            mb="0"
          >
            Root Category
          </FormLabel>
          <Switch
            id="is-root-category"
            isDisabled={category?.isRoot || isSubmitting}
            {...register('isRoot')}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea {...register('description')} />
        </FormControl>
      </VStack>
    </CustomModal>
  )
}
export default ModalForm
