import { getFetcher } from './useFetcher'
import useSWR from 'swr'

const fetcher = getFetcher()
const useOrder = (keyUrl: string) => {
  const swr = useSWR(keyUrl, fetcher)
  return {
    ...swr,
  }
}
export default useOrder
