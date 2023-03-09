import axios from 'axios'
import config from 'config'
import useSWR from 'swr'

const axiosInstance = axios.create({
  baseURL: config.apiPath,
})

type OptionProps = {
  transform?: (data: any) => any
}
const useFetcher = (url: string, options?: OptionProps) => {
  const fetcher = async (url: string) => {
    console.debug('axios fetch', url, config.apiPath)
    const res = await axiosInstance.get(url)

    return options?.transform ? options.transform(res.data) : res.data
  }

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
