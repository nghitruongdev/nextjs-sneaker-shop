import { Address } from '@/domain/Address'
import { User } from '@/domain/User'
import { Input, Textarea } from '@chakra-ui/react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'

export type UserFormValue = {
  id: number
  login: string
  firstName: string
  lastName: string
  email: string
  phone: string
  birthdate: Date | null
  note: string
}

const defaultUser: UserFormValue = {
  id: 0,
  login: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthdate: null,
  note: '',
}

const useUserForm = () => {
  const { register, ...form } = useForm({
    defaultValues: defaultUser,
  })

  const inputs = {
    id: <></>,
    lastName: (
      <Input
        type="text"
        {...register('lastName')}
      />
    ),
    firstName: (
      <Input
        type="text"
        {...register('firstName')}
      />
    ),
    login: (
      <Input
        type="text"
        {...register('login')}
      />
    ),
    email: (
      <Input
        type="email"
        {...register('email')}
      />
    ),
    phone: (
      <Input
        type="tel"
        {...register('phone')}
      />
    ),
    birthdate: (
      <Input
        type="date"
        {...register('birthdate')}
      />
    ),
    note: <Textarea {...register('note')} />,
  }

  const getInput = (name: keyof UserFormValue) => {
    return inputs[name]
  }

  return {
    getInput,
    form,
  }
}

export default useUserForm
