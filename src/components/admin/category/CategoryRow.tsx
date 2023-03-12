// import Category from '@/domain/Category'
// import { Tr, Text, Td, Badge, IconButton } from '@chakra-ui/react'
// import { useState } from 'react'
// import useAxios from '../../../hooks/useAxios'
// import Menu from '../Menu'
// import { RiFileShredLine, RiPencilLine } from 'react-icons/ri'
// import { FiXCircle } from 'react-icons/fi'
// import { AiOutlineCar } from 'react-icons/ai'
// import { useForm } from 'react-hook-form'
// import useMyToast from '@/hooks/useMyToast'
// import useAlert from '../../../hooks/useAlert'
// type Option = {
//   label: string
//   value: Category
// }

// type FormValue = {
//   name: string
//   parent?: any
//   description?: string
// }

// const CategoryRow = ({
//   id,
//   name,
//   isRoot,
//   parentId,
//   description,
//   _links,
//   isNew = false,
//   cancelAddingHandler,
//   selectOptions: options,
// }: Category & {
//   selectOptions: Option[]
//   isNew?: boolean
//   cancelAddingHandler?: () => void
// }) => {
//   const parentOption = options.find((option) => option.value.id === parentId)
//   const defaultFormValue: FormValue = {
//     name: name,
//     description: description,
//     parent: parentOption,
//   }

//   const { ok, fail, waiting } = useMyToast()
//   const { warning } = useAlert()
//   const [isEdit, setIsEdit] = useState<boolean>(isNew)
//   const { errorText, patch } = useAxios(_links?.self.href)

//   const {
//     register,
//     handleSubmit,
//     reset: resetForm,
//     formState: { errors, isSubmitting, isDirty },
//   } = useForm({
//     mode: 'onBlur',
//     reValidateMode: 'onChange',
//     defaultValues: defaultFormValue,
//   })

//   const toast = {
//     loading: waiting({ title: 'Sending data to the server' }),
//     success: ok({
//       title: 'Category saved.',
//       message: 'Category has been saved to the server',
//     }),
//     fail: fail({ title: 'Server error', message: errorText }),
//   }

//   const actions: MenuButtonAction[] = [
//     {
//       name: 'Edit',
//       onClick: () => setIsEdit(true),
//       icon: <RiPencilLine />,
//       colorScheme: 'green',
//     },
//     { name: 'Delete', icon: <RiFileShredLine />, colorScheme: 'red' },
//   ]

//   const saveHandler = async (data: FormValue) => {
//     const successAction = () => {
//       toast.success.fire()
//       setIsEdit(false)
//     }

//     if (!isDirty) {
//       successAction()
//       return
//     }

//     toast.loading.fire()
//     const parent = data.parent.value._links.self.href
//     const response = await patch(
//       { ...data, parent },
//       {
//         options: { timeout: 1500 },
//       }
//     )
//     toast.loading.close()
//     ;(response?.status && successAction()) || toast.fail.fire()
//   }

//   const cancelHandler = () => {
//     const cancelAction = () => {
//       if (isNew) {
//         cancelAddingHandler?.()
//         return
//       }
//       setIsEdit(false)
//       resetForm(defaultFormValue)
//     }
//     if (!isDirty) cancelAction()
//     else
//       warning({
//         text: `Edits you've made will be lost!`,
//         confirmButtonText: 'Yes, do it!',
//         confirmAction: cancelAction,
//       })
//   }

//   return (
//     <Tr>
//       <Td>{id}</Td>
//       <Td w="250px">
//         {!isEdit && name}
//         {isEdit && <></>}
//       </Td>
//       <Td
//         minW="250px"
//         w="250px"
//       >
//         {!isEdit && <Badge>{parentOption?.value.name}</Badge>}
//         {isEdit && <></>}
//       </Td>
//       <Td maxW="200px">
//         {!isEdit && <Text isTruncated>{description}</Text>}
//         {isEdit && <></>}
//       </Td>
//       <Td
//         p="0"
//         w="100px"
//       >
//         {isEdit && (
//           <>
//             <IconButton
//               aria-label="save edit"
//               colorScheme="green"
//               onClick={handleSubmit(saveHandler)}
//               icon={<AiOutlineCar />}
//               isLoading={isSubmitting}
//             />

//             <IconButton
//               // bg="transparent"
//               aria-label="cancel edit"
//               onClick={cancelHandler}
//               colorScheme="red"
//               icon={<FiXCircle />}
//             />
//           </>
//         )}
//         {!isEdit && (
//           <Menu
//             actions={actions}
//             buttonProps={{
//               w: '100px',
//             }}
//           ></Menu>
//         )}
//       </Td>
//     </Tr>
//   )
// }
// export default CategoryRow
// function sleep(ms: number) {
//   return new Promise((res) => setTimeout(res, ms))
// }
