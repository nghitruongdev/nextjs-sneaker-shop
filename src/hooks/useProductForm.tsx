import { Input, Textarea } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useForm, UseFormReset } from 'react-hook-form'
import useAxios from './useAxios'
import useMyToast from '@/hooks/useMyToast'
import Product from '@/domain/Product'

export type ProductFormValue = {
  id: number | undefined
  name: string | undefined
  shortDesc: string | undefined
  fullDesc: string | undefined
  minPrice: number | undefined
  images: string[] | undefined
  publishDate: Date | undefined
  status: string | undefined
  discount: any | undefined
  attributes: any[] | undefined
}

export type ProductInputs = {
  [key in keyof ProductFormValue]: (props?: any) => JSX.Element
}

// type Timeout = {
//   isValidating: boolean
//   id?: ReturnType<typeof setTimeout>
// }
// type State = {
//   phone: Timeout
//   email: Timeout
//   login: Timeout
// }
// const defaultState: State = {
//   phone: {
//     isValidating: false,
//   },
//   email: {
//     isValidating: false,
//   },
//   login: {
//     isValidating: false,
//   },
// }
const resetForm = (reset: UseFormReset<ProductFormValue>, data?: Product) => {
  reset({
    // id: data?.id,
    // login: data?.login,
    // firstName: data?.firstName,
    // lastName: data?.lastName,
    // email: data?.email,
    // phone: data?.phone,
    // birthdate: data?.birthdate || null,
    // gender: toGender(data?.gender as keyof typeof Gender),
    // note: data?.note,
    // imageFile: null,
  })
}

const useProductForm = ({ current }: { current?: Product }) => {
  // const [state, setState] = useState<State>(defaultState)
  const form = useForm<ProductFormValue>({
    mode: 'onBlur',
    // reValidateMode: 'onChange',
  })

  const { get } = useAxios()
  const { fail } = useMyToast()

  const {
    register,
    getValues,
    setValue,
    setError,
    clearErrors,
    trigger,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = form

  useEffect(() => {
    if (current) resetForm(reset, current)
  }, [current, reset])

  const patterns = {
    phone: /^[0-9]{10}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    login: /^[\w\d]{5,15}$/,
  }
  // const existsErrors = (name: keyof State): ErrorOption => {
  //   switch (name) {
  //     case 'email':
  //       return {
  //         type: 'alreadyExists',
  //         message: 'Địa chỉ email đã được sử dụng rồi nhe',
  //       }
  //     case 'phone':
  //       return {
  //         type: 'alreadyExists',
  //         message: 'Số điện thoại đã được sử dụng rồi nhe',
  //       }
  //     case 'login':
  //       return {
  //         type: 'alreadyExists',
  //         message: 'Username đã được sử dụng rồi nhe',
  //       }
  //     default:
  //       return {}
  //   }
  // }

  // const stopValidating = (name: keyof State) => {
  //   setState((prev) => ({
  //     ...prev,
  //     [name]: {
  //       isValidating: false,
  //     },
  //   }))
  // }

  // const validateRequest = async (
  //   name: keyof State,
  //   value?: string
  // ): Promise<ValidateResult> => {
  //   if (current?.[name] === value) return
  //   console.log(`Validating ${name} with timeout`, Date.now())
  //   let result: ValidateResult
  //   try {
  //     const validateUrl = config.api.users.search.existsBy[name]?.(value || '')
  //     const response = await get({
  //       requestUrl: validateUrl,
  //       options: {
  //         throwOnError: true,
  //       },
  //     })
  //     if (response?.data) {
  //       console.log('Already exists')
  //       // setError(name, existsErrors(name))
  //       result = existsErrors(name).message
  //     }
  //   } catch (error: any) {
  //     fail({
  //       title: `Không thể kiểm tra ${name}`,
  //       message: error.message,
  //     }).fire()
  //     result = false
  //   } finally {
  //     const { [name]: current } = state
  //     if (current.isValidating) stopValidating(name)
  //     return result
  //   }
  // }

  // const validateTimer = async (
  //   name: keyof State,
  //   value: string
  // ): Promise<ValidateResult> => {
  //   const { [name]: currentTimeout } = state

  //   if (currentTimeout.id) {
  //     clearTimeout(currentTimeout.id)
  //   }

  //   if (!patterns[name].test(value) || current?.[name] === value) {
  //     stopValidating(name)
  //     return
  //   }

  //   const timeout = setTimeout(() => {
  //     trigger(name, {
  //       // shouldFocus: true,
  //     })
  //   }, 3000)

  //   setState((prevState) => ({
  //     ...prevState,
  //     [name]: {
  //       isValidating: true,
  //       id: timeout,
  //     },
  //   }))
  // }

  // const isValidating = (name: keyof State) => state[name]?.isValidating

  const inputs: ProductInputs = {
    id: () => <></>,
    name: () => <Input />,
    shortDesc: () => <Input />,
    fullDesc: () => <Textarea />,
    minPrice: () => (
      <Input
        type="number"
        inputMode="decimal"
      />
    ),
    images: () => <>Images input</>,
    publishDate: () => <>publish date input</>,
    status: () => <>status input</>,
    discount: () => <>discount input</>,
    attributes: () => <>attributes input</>,
  }
  return {
    inputs,
    resetForm: resetForm.bind(null, reset),
    errors,
    handleSubmit,
    isSubmitting,
    watch,
  }
}

export default useProductForm
