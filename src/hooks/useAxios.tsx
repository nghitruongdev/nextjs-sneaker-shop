import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import ApiConfig from 'config'
type State = {
  isLoading?: boolean
  errorText?: string
}

type Options = {
  retryCount?: number
  retryDelay?: number
  timeout?: number
  throwOnError?: boolean
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
type MethodProps = {
  requestUrl?: string
  data?: any
  options?: Options
  config?: AxiosRequestConfig<any>
}
const useAxios = (url?: string) => {
  const [state, setState] = useState<State>()

  const resetState = () => {
    setState({ ...{} })
  }

  const get = ({ requestUrl, options, config }: MethodProps = {}) =>
    makeRequest({ method: 'GET', requestUrl, options, config })

  const post = ({ requestUrl, data, options, config }: MethodProps = {}) =>
    makeRequest({ method: 'POST', requestUrl, data, options, config })

  const put = ({ requestUrl, data, options, config }: MethodProps = {}) =>
    makeRequest({ method: 'PUT', requestUrl, data, options, config })

  const patch = ({ requestUrl, data, options, config }: MethodProps = {}) => {
    return makeRequest({ method: 'PATCH', requestUrl, data, options, config })
  }

  const remove = ({ requestUrl, config }: MethodProps = {}) =>
    makeRequest({ method: 'DELETE', requestUrl, config })

  const makeRequest = async ({
    method,
    data,
    requestUrl,
    options = {},
    config = {},
  }: {
    method: HttpMethod
    requestUrl?: string
    data?: any
    options?: Options
    config?: AxiosRequestConfig
  }) => {
    const { timeout } = options
    setState((prevState) => ({ ...prevState, isLoading: true }))
    try {
      if (timeout) await sleep(timeout)
      console.log('config', config)
      const response = await axios.request({
        baseURL: ApiConfig.apiPath,
        method: method,
        data: data,
        url: requestUrl ? requestUrl : url,
        ...config,
      })

      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        data: response.data,
        status: response.status,
      }))
      return response
    } catch (error: any) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        errorText: error.message,
      }))
      if (options.throwOnError) throw error
    }
  }
  return {
    ...state,
    get,
    post,
    put,
    patch,
    remove,
    resetAxios: resetState,
  }
}

export default useAxios

const sleep = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms))
}
