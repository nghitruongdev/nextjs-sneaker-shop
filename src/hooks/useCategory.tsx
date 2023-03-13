import useSWR from 'swr'
import useAxios from './useAxios'
import { getFetcher } from './useFetcher'
import useMyToast from './useMyToast'
const fetcher = getFetcher()
const useCategory = (keyUrl: string) => {
  const { isLoading, error, mutate, data } = useSWR(keyUrl, fetcher)
  const { remove } = useAxios()
  const { ok, fail } = useMyToast()

  const deleteCategory = useCallback(
    (deleteItem: Category) => {
      //// get deleter from axios
      const deleter = async () => {
        const url = deleteItem._links.self.href
        const response = await remove({
          requestUrl: url,
          options: {
            throwOnError: true,
          },
        })
        if (response?.status) {
          //todo: perform some success action like send a toast
          ok({
            title: 'Delete success',
            message: 'Category has been deleted',
          }).fire()
          return
        }
        ////throw errror when status is not okay
        throw Error('Không thể xoá danh mục')
      }
      mutate(
        deleter()
          .then(refreshRoot)
          .catch(({ code: title, message }) => {
            fail({ title, message }).fire()
          }),
        {
          revalidate: false,
          populateCache: (result: any, currentData: any) => {
            const filtered = currentData._embedded.categories.filter(
              (item: Category) => item.id !== deleteItem.id
            )

            return {
              ...currentData,
              _embedded: {
                categories: [...filtered],
              },
            }
          },
        }
      )
    },
    [ok, remove, fail, mutate]
  )
  return {}
}
export default useCategory
