import { Address } from '@/domain/Address'
import { User } from '@/domain/User'
import {
  Input,
  InputGroup,
  InputRightAddon,
  Textarea,
  Spinner,
  Box,
  Select,
} from '@chakra-ui/react'
import config from 'config'
import { useState, ChangeEventHandler, ChangeEvent, useEffect } from 'react'
import {
  ErrorOption,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormReset,
  ValidateResult,
} from 'react-hook-form'
import useAxios from './useAxios'
import useMyToast from '@/hooks/useMyToast'
import { Gender, toGender } from '@/domain/Gender'

export type UserFormValue = {
  id: number | undefined
  login: string | undefined
  firstName: string | undefined
  lastName: string | undefined
  gender?: Gender | null
  email: string | undefined
  phone: string | undefined
  birthdate: Date | string | null
  note: string | undefined
  imageFile?: FileList | null
}

type Timeout = {
  isValidating: boolean
  id?: ReturnType<typeof setTimeout>
}
type State = {
  phone: Timeout
  email: Timeout
  login: Timeout
}
const defaultState: State = {
  phone: {
    isValidating: false,
  },
  email: {
    isValidating: false,
  },
  login: {
    isValidating: false,
  },
}
const resetForm = (reset: UseFormReset<UserFormValue>, data?: User) => {
  reset({
    id: data?.id,
    login: data?.login,
    firstName: data?.firstName,
    lastName: data?.lastName,
    email: data?.email,
    phone: data?.phone,
    birthdate: data?.birthdate || null,
    gender: toGender(data?.gender as keyof typeof Gender),
    note: data?.note,
    imageFile: null,
  })
}

const useUserForm = ({ current }: { current?: User }) => {
  const [state, setState] = useState<State>(defaultState)
  const { register, ...form } = useForm<UserFormValue>({
    mode: 'onBlur',
    // reValidateMode: 'onChange',
  })

  const { get } = useAxios()
  const { fail } = useMyToast()

  const {
    getValues,
    setValue,
    setError,
    clearErrors,
    trigger,
    reset,
    formState: { errors },
  } = form

  useEffect(() => {
    if (current) resetForm(reset, current)
  }, [current, reset])

  const patterns = {
    phone: /^[0-9]{10}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    login: /^[\w\d]{5,15}$/,
  }
  const existsErrors = (name: keyof State): ErrorOption => {
    switch (name) {
      case 'email':
        return {
          type: 'alreadyExists',
          message: 'Địa chỉ email đã được sử dụng rồi nhe',
        }
      case 'phone':
        return {
          type: 'alreadyExists',
          message: 'Số điện thoại đã được sử dụng rồi nhe',
        }
      case 'login':
        return {
          type: 'alreadyExists',
          message: 'Username đã được sử dụng rồi nhe',
        }
      default:
        return {}
    }
  }

  const stopValidating = (name: keyof State) => {
    setState((prev) => ({
      ...prev,
      [name]: {
        isValidating: false,
      },
    }))
  }

  const validateRequest = async (
    name: keyof State,
    value?: string
  ): Promise<ValidateResult> => {
    if (current?.[name] === value) return
    console.log(`Validating ${name} with timeout`, Date.now())
    let result: ValidateResult
    try {
      const validateUrl = config.api.users.search.existsBy[name]?.(value || '')
      const response = await get({
        requestUrl: validateUrl,
        options: {
          throwOnError: true,
        },
      })
      if (response?.data) {
        console.log('Already exists')
        // setError(name, existsErrors(name))
        result = existsErrors(name).message
      }
    } catch (error: any) {
      fail({
        title: `Không thể kiểm tra ${name}`,
        message: error.message,
      }).fire()
      result = false
    } finally {
      const { [name]: current } = state
      if (current.isValidating) stopValidating(name)
      return result
    }
  }

  const validateTimer = async (
    name: keyof State,
    value: string
  ): Promise<ValidateResult> => {
    const { [name]: currentTimeout } = state

    if (currentTimeout.id) {
      clearTimeout(currentTimeout.id)
    }

    if (!patterns[name].test(value) || current?.[name] === value) {
      stopValidating(name)
      return
    }

    const timeout = setTimeout(() => {
      trigger(name, {
        // shouldFocus: true,
      })
    }, 3000)

    setState((prevState) => ({
      ...prevState,
      [name]: {
        isValidating: true,
        id: timeout,
      },
    }))
  }

  const isValidating = (name: keyof State) => state[name]?.isValidating

  const inputs = {
    id: <></>,
    imageFile: (
      <input
        type="file"
        id="imageFile"
        {...register('imageFile')}
      />
    ),
    lastName: (
      <Input
        type="text"
        {...register('lastName', {
          required: true,
        })}
      />
    ),
    firstName: (
      <Input
        type="text"
        {...register('firstName', {
          required: true,
        })}
      />
    ),
    login: (
      <Box>
        <Input
          pr="10"
          type="text"
          {...register('login', {
            onChange: (event) => validateTimer('login', event.target.value),
            required: true,
            pattern: {
              value: patterns.login,
              message: 'Username không đúng định dạng',
            },
            validate: {
              exists: (value) =>
                validateRequest('login', value) ||
                'Không thể kiểm tra username',
            },
          })}
        />
        <FormSpinner isShow={isValidating('login')} />
      </Box>
    ),
    email: (
      <Box>
        <Input
          pr="10"
          isRequired
          type="email"
          inputMode="email"
          {...register('email', {
            onChange: (event) => validateTimer('email', event.target.value),
            required: true,
            pattern: {
              value: patterns.email,
              message: 'Email không đúng định dạng',
            },
            validate: {
              exists: (value) =>
                validateRequest('email', value) || 'Không thể kiểm tra email',
            },
          })}
        />
        <FormSpinner isShow={isValidating('email')} />
      </Box>
    ),
    phone: (
      <Box>
        <Input
          pr="10"
          isRequired
          inputMode="tel"
          {...register('phone', {
            onChange: (event) => validateTimer('phone', event.target.value),
            required: true,
            pattern: {
              value: patterns.phone,
              message: 'Số điện thoại không hợp lệ',
            },
            validate: {
              exists: (value) =>
                validateRequest('phone', value) ||
                'Không thể kiểm tra số điện thoại',
            },
          })}
        />
        <FormSpinner isShow={isValidating('phone')} />
      </Box>
    ),
    gender: (() => {
      const items = [
        { value: Gender.MALE, label: 'Nam' },
        { value: Gender.FEMALE, label: 'Nữ' },
        { value: Gender.OTHER, label: 'Khác' },
      ]
      return (
        <Select
          placeholder="Chọn giới tính"
          {...register('gender', {
            required: true,
            valueAsNumber: true,
          })}
        >
          {items.map(({ value, label }) => (
            <option
              key={value}
              value={value}
            >
              {label}
            </option>
          ))}
        </Select>
      )
    })(),
    birthdate: (
      <Input
        type="date"
        {...register('birthdate', {
          required: true,
          valueAsDate: true,
        })}
      />
    ),
    note: <Textarea {...register('note')} />,
  }

  const getInput = (name: keyof UserFormValue) => {
    return inputs[name]
  }

  return {
    getInput,
    form: {
      ...form,
      resetUserForm: resetForm.bind(null, reset),
    },
  }
}

const FormSpinner = ({ isShow }: { isShow: boolean }) => {
  return (
    <>
      {isShow && (
        <Spinner
          pos="absolute"
          right="0"
          m="2"
          speed="0.7s"
          thickness="2px"
          color="blue.700"
        />
      )}
    </>
  )
}
export default useUserForm
