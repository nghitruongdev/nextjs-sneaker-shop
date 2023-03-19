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
import { optionCSS } from 'react-select/dist/declarations/src/components/Option'

type Configs = {
  shouldClose?: boolean
}
type Options = UseToastOptions

type ToastProps = {
  title: string
  message?: string | null
  configs?: Configs
  options?: Options
}
let count = 0
const useMyToast = () => {
  const toast = useToast()

  const makeToast = (options: Options, config?: Configs) => {
    const id = count++
    const fire = () =>
      toast({
        id,
        ...options,
      })
    return {
      fire,
      close: toast.close.bind(this, id),
    }
  }
  const ok = ({
    title,
    message: description,
    configs,
    options = {},
  }: ToastProps) => {
    return makeToast(
      {
        title,
        description,
        status: 'success',
        position: 'top-right',
        isClosable: true,
        duration: 3000,
        ...options,
      },
      configs
    )
  }

  const fail = ({
    title,
    message: description,
    configs,
    options = {},
  }: ToastProps) => {
    return makeToast(
      {
        title,
        description,
        status: 'error',
        position: 'top-right',
        isClosable: true,
        duration: 3000,
        ...options,
      },
      configs
    )
  }
  const waiting = ({
    title,
    message: description,
    configs,
    options = {},
  }: ToastProps) => {
    return makeToast(
      {
        title,
        description,
        status: 'loading',
        position: 'top',
        ...options,
      },
      configs
    )
  }

  return {
    ok: ok,
    fail: fail,
    waiting: waiting,
  }
}

export default useMyToast
