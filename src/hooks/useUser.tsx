import useSWR from 'swr'
import { getFetcher } from './useFetcher'
import useAxios from '@/hooks/useAxios'
import useMyToast from '@/hooks/useMyToast'
import { useCallback, useState } from 'react'
import useUserForm, { UserFormValue } from './useUserForm'
import { Address } from '../domain/Address'
import useAddressForm from './useAddress'
import { User } from '@/domain/User'
import usePageable from '@/hooks/usePageable'
type Props = {
  key: string
}
const fetcher = getFetcher()

const useUser = ({ key }: Props) => {
  const [current, setCurrent] = useState<User | null>()

  const {} = useAxios()
  const { ok, fail } = useMyToast()

  const { keyUrl, ...page } = usePageable({ key })
  const swr = useSWR(keyUrl, fetcher)

  const { getInput: getUserInput, form: userForm } = useUserForm()
  const { getInput: getAddressInput, form: addressForm } = useAddressForm()

  const { handleSubmit: handleUserSubmit } = userForm
  const {} = addressForm

  const handleError = useCallback(
    (err: any) => {
      fail({ title: err.code, message: err.message }).fire()
      console.error(err)
    },
    [fail]
  )
  const mutateData = () => {}

  const saveUser = handleUserSubmit(async (data: UserFormValue, event: any) => {
    let address: Address
    await handel
    console.log('user form value', data, event)
  })

  const deleteUser = () => {}

  return {
    swr,
    getUserInput,
    getAddressInput,
    current,
    setCurrent,
    page,
    saveUser,
  }
}
export default useUser
