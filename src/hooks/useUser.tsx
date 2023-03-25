import useSWR from 'swr'
import { getFetcher } from './useFetcher'
import useAxios, { AxiosOptions } from '@/hooks/useAxios'
import useMyToast from '@/hooks/useMyToast'
import { useCallback, useState } from 'react'
import useUserForm, { UserFormValue } from './useUserForm'
import { Address } from '../domain/Address'
import useAddressForm, { AddressForm } from './useAddress'
import { User } from '@/domain/User'
import usePageable from '@/hooks/usePageable'
import config from 'config'
import { useForm } from 'react-hook-form'
import axios, { AxiosRequestConfig, toFormData } from 'axios'
import { userInfo } from 'os'
type Props = {
  key?: string
}
const fetcher = getFetcher()

const useUser = ({}: Props) => {
  const [tabIndex, setTabIndex] = useState(0)
  const [current, setCurrent] = useState<User>()
  const [isShowDeleted, setIsShowDeleted] = useState<boolean>(false)

  const { get, post, patch, remove, isLoading } = useAxios()
  const { ok, fail } = useMyToast()
  const key = config.api.users.search.byDeletedDate(isShowDeleted)
  const { keyUrl, ...page } = usePageable({ key })
  const swr = useSWR(keyUrl, fetcher)

  const { getInput: getUserInput, form: userForm } = useUserForm({ current })
  const { getInput: getAddressInput, form: addressForm } = useAddressForm({
    address: current?.address,
  })

  const {
    handleSubmit: handleUserSubmit,
    getValues: getUserValues,
    formState: { isSubmitting, errors: userErrors },
    resetUserForm,
    watch: watchUser,
  } = userForm
  const {
    handleSubmit: handleAddressSubmit,
    formState: { errors: addressErrors },
    resetAddressForm,
  } = addressForm

  const showUser = useCallback(
    (user: User) => {
      setCurrent(user)
      setTabIndex(1)
    },
    [setCurrent]
  )

  const handleError = useCallback(
    (err: any) => {
      const { message, response: { data = {} } = {} } = err
      fail({
        title: message,
        message: data?.detail + JSON.stringify(data?.errors),
      }).fire()
      console.error(err)
    },
    [fail]
  )
  const mutateData = (data: any) => {
    const updateCache = (result: User, currentData: any) => {
      const {
        _embedded: { users },
        page,
      } = currentData
      const idx = users.findIndex((u: User) => u.id === result.id)
      if (idx) {
        users[idx] = result
        page.totalElements++
      } else users.unshift(result)
    }

    // swr.mutate(data, {
    //   revalidate: false,
    //   populateCache: updateCache,
    //   rollbackOnError: true,
    //   throwOnError: false,
    // })
    swr.mutate()
  }

  const options: AxiosOptions = { throwOnError: true }
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  const saveUser = handleUserSubmit(async (data: UserFormValue, event: any) => {
    if (current?.deletedDate) {
      return
    }
    let address: Address | null = null
    await handleAddressSubmit((value: AddressForm) => {
      const { id, street, ward, district, province } = value
      address = {
        id: value.id,
        street: value.street,
        ward: value.ward?.label || '',
        district: value.district?.label || '',
        province: value.province?.label || '',
      }
    })()
    const userData = {
      ...data,
      address,
      imageFile: undefined,
    }

    console.log('userData', userData)

    const formData = new FormData()

    if (data.imageFile && data.imageFile?.[0]) {
      const file = data.imageFile[0]
      formData.append('imageFile', file, file.name)
    }

    const successAction = (responseData: User) => {
      // ?: do you want to clear the current data

      //send a notification
      ok({
        title: 'Lưu người dùng thành công.',
        message: 'Người dùng đã được lưu vào hệ thống',
      }).fire()
      //fetch data from server
      if (responseData) {
        get({ requestUrl: `${config.api.users.url}/${responseData}` }).then(
          (user: any) => setCurrent(user.data)
        )
      }
    }

    let submitHandler: () => Promise<any>
    if (current) {
      formData.append(
        'info',
        new Blob([JSON.stringify(userData)], { type: 'application/json' })
      )
      submitHandler = async () => {
        const response = await patch({
          requestUrl: current._links?.self.href,
          data: formData,
          options,
          config: axiosConfig,
        })
        if (response?.status) return successAction(response.data)
        throw Error('Lỗi cập nhật người dùng trong hệ thống')
      }
    } else {
      formData.append(
        'request',
        new Blob([JSON.stringify({ info: userData })], {
          type: 'application/json',
        })
      )
      submitHandler = async () => {
        const response = await post({
          requestUrl: config.api.users.url,
          data: formData,
          options,
          config: axiosConfig,
        })
        if (response?.status) return successAction(response.data)
        throw Error('Lỗi thêm mới người dùng')
      }
    }

    await submitHandler().then(mutateData).catch(handleError)
  })

  const toggleShowDeleted = () => setIsShowDeleted((prev) => !prev)
  const resetForm = () => {
    console.log('resetForm')
    resetUserForm(current)
    resetAddressForm(current?.address)
  }

  const deleteUser = () => {
    const removeHandler = async () => {
      console.log('current?._links.self.href', current?._links.self.href)
      const response = await remove({
        requestUrl: current?._links.self.href,
        options,
      })
      console.log('response', response)
      if (response?.status) {
        ok({
          title: 'Xoá người dùng thành công',
          message: 'Người dùng đã được xoá khỏi hệ thống',
        }).fire()
        setCurrent(undefined)
        setTabIndex(0)
      } else {
        throw Error('Lỗi xoá người dùng khỏi hệ thống - 500')
      }
    }
    removeHandler().then(mutateData).catch(handleError)
  }
  const errors = {
    ...addressErrors,
    ...userErrors,
  }
  const getErrors = (name: keyof Address | keyof UserFormValue) => {
    return errors[name]
  }

  return {
    swr,
    page,
    tab: {
      index: tabIndex,
      onChange: setTabIndex,
    },
    form: {
      getUserInput,
      getAddressInput,
      resetForm,
      errors: getErrors,
      watchUser,
      saveUser,
      deleteUser,
      isSubmitting,
      isDeleting: isLoading,
      showUser,
      currentUser: current,
    },
    toggleShowDeleted,
    isShowDeleted,
  }
}

export default useUser
