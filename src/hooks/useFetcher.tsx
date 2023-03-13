import axios, {
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import config from 'config'
import useSWR from 'swr'

const axiosInstance = axios.create({
  baseURL: config.apiPath,
})

type OptionProps = {
  transform?: (data: any) => any
  responseInterceptor?: (
    resposne: AxiosResponse<any>
  ) => AxiosResponse | Promise<AxiosResponse>
}
export const getFetcher = ({
  options: { transform, responseInterceptor } = {},
  config: requestConfig = {},
}: {
  options?: OptionProps
  config?: AxiosRequestConfig
} = {}) => {
  return async (url: string) => {
    // const timeout = await new Promise((res) => setTimeout(res, 500))
    console.debug('axios fetch', url, config.apiPath)
    const res = await axiosInstance.get(url)

    return transform ? transform(res.data) : res.data
  }
}
const useFetcher = (url: string, fetcher: any) => {
  const { data, isLoading, error } = useSWR(url, fetcher)
  return {
    axios: axiosInstance,
    fetcher,
    data,
    isLoading,
    error,
  }
}

export default useFetcher
