import CustomModal from '@/components/common/CustomModal'
import Category from '@/domain/Category'
import useAxios from '@/hooks/useAxios'
import useMyToast from '@/hooks/useMyToast'
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
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { RiPencilFill } from 'react-icons/ri'
import ReactSelect from 'react-select'
import { VStack } from '@chakra-ui/react'
import SaveButton from '../../common/CloseButton'
import { mutate as globalMutate, KeyedMutator } from 'swr'
import config from 'config'
type Props = {
  category?: Category
  isOpen: boolean
  onClose: () => void
  rootCategories?: Category[]
  keyUrl: string | null
  clearCurrent: () => void
  mutate: KeyedMutator<any>
}

type FormValue = {
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
  category = { name: '' },
  rootCategories,
  keyUrl,
  mutate,
  clearCurrent,
}: Props) => {
  console.debug('Modal form rendered', count++)
  const { id, name, description, parentId, isRoot, _links } = category
  const { ok, fail } = useMyToast()
  const {
    errorText,
    isLoading: isSubmitting,
    patch,
    post,
  } = useAxios(category?._links?.self.href)

  const selectOptions = rootCategories?.map((item) => ({
    label: item.name,
    value: item,
  }))

  const parentOption = selectOptions?.find(
    (option) => option.value.id === parentId
  )

  const defaultFormValue: FormValue = {
    id: id,
    name: name,
    description: description,
    isRoot: isRoot,
    parent: parentOption,
  }
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset: resetForm,
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
    console.debug('form value', data)

    const successAction = (updatedData?: Category) => {
      console.log('isSubmitting', isSubmitting, Date.now())
      clearCurrent()
      ok({
        title: 'Category saved.',
        message: 'Category has been saved to the server',
      }).fire()
      return updatedData ? updatedData : data
    }

    if (!isDirty) {
      return successAction()
    }

    const transformRequest = (data: FormValue) => {
      const parent = data.parent?.value?._links?.self.href
      return { ...data, parent }
    }

    const options = { timeout: 3000, throwOnError: false }
    let submitHandler: () => Promise<any>
    if (!id) {
      submitHandler = async () => {
        const response = await post(transformRequest(data), {
          options,
          config: {
            url: config.api.categories.url,
          },
        })
        if (response?.status) {
          return successAction(response.data)
        }
        throw Error('Fail to create new category')
      }
    } else {
      submitHandler = async () => {
        const response = await patch(transformRequest(data), { options })
        if (response?.status) {
          return successAction(response.data)
        }
        throw Error('Failing on save category')
      }
    }

    const mutateFn = () => {
      const updateItemsFn = (saved: Category, currentData: any) => {
        if (!saved?.id) return currentData
        const items = currentData._embedded.categories
        const idx = items.findIndex((item: Category) => item.id === saved.id)
        if (idx >= 0) items[idx] = saved
        else items.unshift(saved)
        return { ...currentData, _embedded: { categories: [...items] } }
      }
      mutate(
        submitHandler()
          .then(() => {
            globalMutate(config.api.categories.root)
          })
          .catch((error) => {
            fail({ title: error.code, message: error.message }).fire()
            console.error(error)
          }),
        {
          revalidate: false,
          populateCache: (updated: Category, categories: any) => {
            return updateItemsFn(updated, categories)
          },
          rollbackOnError: true,
          throwOnError: false,
        }
      )
    }
    mutateFn()
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
            isDisabled={isRoot || isSubmitting}
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
// onChange: (event) => {
// console.log(getValues())
// const checked = event.target?.checked
// if (checked) setValue('parent', undefined)
// },
