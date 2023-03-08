import axios from 'axios'
import config from 'config'

const api = {
  productsUrl: '/products',
  ordersUrl: '/orders',
}

const axiosInstance = axios.create({
  baseURL: config.apiPath,
})

type OptionProps = {
  transform?: (data: any) => any
}
const useAxios = (options?: OptionProps) => {
  const fetcher = async (url: string) => {
    console.debug('axios fetch', url, config.apiPath)
    const res = await axiosInstance.get(url)

    return options?.transform ? options.transform(res.data) : res.data
  }

  return {
    axios: axiosInstance,
    api: api,
    fetcher: fetcher,
  }
}

export default useAxios
