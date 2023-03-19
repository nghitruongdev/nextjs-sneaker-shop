import { User } from '@/domain/User'
import { useForm } from 'react-hook-form'
import useShippingAddress from './useShippingAddress'

const defaultUser: User = {
  id: 0,
  login: '',
  firstName: '',
  lastName: '',
  fullName: '',
  email: '',
  phone: '',
  birthdate: null,
  note: '',
  imageUrl: '',
  address: null,
}
const useUserForm = () => {
  const {
    getValues,
    setValue,
    formState: errors,
    register,
    control,
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: defaultUser,
  })
  const { getAddress, inputs } = useShippingAddress()

  const getUser = () => {
    return { ...getValues(), address: getAddress() }
  }
  return {
    inputs: { ...inputs },
    user: getUser(),
    setValue,
    errors,
    register,
    watch,
    handleSubmit,
  }
}
export default useUserForm
