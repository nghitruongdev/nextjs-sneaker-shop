import Category from '@/domain/Category'
import {
  Tr,
  Text,
  Td,
  Flex,
  Badge,
  Button,
  IconButton,
  Textarea,
  Input,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import Select from 'react-select'
import { useState } from 'react'
import useAxios from '../../../hooks/useAxios'
import MenuButton, { MenuButtonAction } from '../MenuButton'
import { RiFileShredLine, RiPencilFill, RiPencilLine } from 'react-icons/ri'
import { FiXCircle } from 'react-icons/fi'
import { AiOutlineCar } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/react'
import useMyToast from '@/hooks/useMyToast'
type Option = {
  label: string
  value: Category
}

type FormValue = {
  name: string
  parent?: any
  description?: string
}

const CategoryRow = ({
  id,
  name,
  isRoot,
  parentId,
  description,
  _links,
  selectOptions: options,
}: Category & { selectOptions: Option[] }) => {
  const parentOption = options.find((option) => option.value.id === parentId)
  const defaultFormValue: FormValue = {
    name: name,
    description: description,
    parent: parentOption,
  }

  const { successToast, failToast, loadingToast } = useMyToast()
  // const [selectedOption, setSelectedOption] = useState(parentOption)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const { errorText, patch } = useAxios(_links.self.href)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: defaultFormValue,
  })

  const actions: MenuButtonAction[] = [
    {
      name: 'Edit',
      onClick: () => setIsEdit(true),
      icon: <RiPencilLine />,
      colorScheme: 'green',
    },
    { name: 'Delete', icon: <RiFileShredLine />, colorScheme: 'red' },
  ]

  const saveHandler = async (data: FormValue) => {
    const toastLoading = loadingToast('Sending data to the server')

    const response = await patch(
      {
        ...data,
        parent: data.parent?.value._links.self.href,
      },
      {
        options: {
          timeout: 3000,
        },
      }
    )
    toastLoading.close()

    if (response?.status) {
      successToast('Category created.', 'Category has been saved to the server')
      setIsEdit(false)
      return
    }
    failToast('Server error', errorText)
  }

  return (
    <Tr key={id}>
      <Td>{id}</Td>
      <Td w="250px">
        {!isEdit && name}
        {isEdit && (
          <FormControl isInvalid={errors.name ? true : false}>
            <Input {...register('name', { required: 'Name is required' })} />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
        )}
      </Td>
      <Td
        minW="250px"
        w="250px"
      >
        {!isEdit && <Badge>{parentOption?.value.name}</Badge>}
        {isEdit && (
          <FormControl>
            <Select
              options={options}
              blurInputOnSelect
              tabSelectsValue
              isDisabled={isRoot}
              {...register('parent')}
              onChange={() => {}}
            />

            {isRoot && (
              <FormHelperText
                as="span"
                fontSize="xs"
                color="gray.500"
              >
                A root category cannot have parents
              </FormHelperText>
            )}
          </FormControl>
        )}
      </Td>
      <Td maxW="200px">
        {!isEdit && <Text isTruncated>{description}</Text>}
        {isEdit && (
          <FormControl>
            <Textarea {...register('description')} />
          </FormControl>
        )}
      </Td>
      <Td
        p="0"
        w="100px"
      >
        {isEdit && (
          <>
            <IconButton
              aria-label="save edit"
              colorScheme="green"
              onClick={handleSubmit(saveHandler)}
              icon={<AiOutlineCar />}
              isLoading={isSubmitting}
            />

            <IconButton
              // bg="transparent"
              aria-label="cancel edit"
              onClick={() => setIsEdit(false)}
              colorScheme="red"
              icon={<FiXCircle />}
            />
          </>
        )}
        {!isEdit && (
          <MenuButton
            actions={actions}
            buttonProps={{
              w: '100px',
            }}
          ></MenuButton>
        )}
      </Td>
    </Tr>
  )
}
export default CategoryRow
function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}
