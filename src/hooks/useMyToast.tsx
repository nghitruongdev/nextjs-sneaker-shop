import {
  Button,
  ToastId,
  ToastOptions,
  ToastPosition,
  useToast,
  UseToastOptions,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'

const useMyToast = () => {
  const notify = useToast()

  const makeToast = (options?: UseToastOptions) => {
    const id = notify(options)
    return {
      id: id,
      close: close.bind(this, id),
    }
  }
  const successToast = (
    title: string,
    description?: string | null,
    options?: UseToastOptions
  ) => {
    return makeToast({
      title,
      description,
      status: 'success',
      position: 'top-right',
      isClosable: true,
      duration: 3000,
      ...options,
    })
  }

  const failToast = (
    title: string,
    description?: string | null,
    options?: UseToastOptions
  ) => {
    return makeToast({
      title,
      description,
      status: 'error',
      position: 'top',
      isClosable: true,
      duration: 3000,
      ...options,
    })
  }
  const loadingToast = (
    title: string,
    description?: string | null,
    options?: UseToastOptions
  ) => {
    return makeToast({
      title,
      description,
      status: 'loading',
      position: 'top',
      ...options,
    })
  }
  const close = (id: ToastId) => {
    notify.close(id)
  }

  return {
    successToast,
    failToast,
    loadingToast,
  }
}

export default useMyToast
