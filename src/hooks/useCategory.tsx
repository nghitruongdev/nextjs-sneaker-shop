import Category from '@/domain/Category'
import useSWR from 'swr'
import useAxios from './useAxios'
import { getFetcher } from './useFetcher'
import useMyToast from './useMyToast'
import { mutate as globalMutate } from 'swr'
import config from 'config'
import { useCallback } from 'react'
import { FormValue } from '@/components/admin/category/ModalForm'
const fetcher = getFetcher()
export type UpdateProps = {
  current: Category
  clearCurrent: () => void
  data: FormValue
  // isSubmitting?: boolean
  isFormDirty: boolean
}
const useCategory = ({
  keyUrl,
}: // current,
// clearCurrent,
{
  keyUrl: string
  // current: Category
  // clearCurrent: () => void
}) => {
  const swr = useSWR(keyUrl, fetcher)
  const { post, patch, remove, isLoading: isSubmitting } = useAxios()
  const { ok, fail } = useMyToast()

  const refreshRoot = () => {
    globalMutate(config.api.categories.root)
  }

  const handleError = useCallback(
    (err: any) => {
      fail({ title: err.code, message: err.message }).fire()
      console.error(err)
    },
    [fail]
  )

  const updateCategory = ({
    current,
    data,
    clearCurrent: resetCurrent,
    // isSubmitting,
    isFormDirty,
  }: UpdateProps) => {
    console.debug('form value', data)
    const { id, _links } = current
    const successAction = (updatedData?: Category) => {
      console.log('isSubmitting', isSubmitting, Date.now())
      resetCurrent()
      ok({
        title: 'Category saved.',
        message: 'Category has been saved to the server',
      }).fire()
      return updatedData ? updatedData : data
    }

    if (!isFormDirty) {
      return successAction()
    }

    const transformRequest = (data: FormValue) => {
      const parent = data.parent?.value?._links?.self.href
      return { ...data, parent }
    }

    const options = { timeout: 3000, throwOnError: false }
    let submitHandler: () => Promise<any>
    if (!id) {
      submitHandler = async () => {
        const response = await post({
          requestUrl: config.api.categories.url,
          data: transformRequest(data),
          options,
        })
        if (response?.status) {
          return successAction(response.data)
        }
        throw Error('Fail to create new category')
      }
    } else {
      submitHandler = async () => {
        const response = await patch({
          requestUrl: _links?.self.href,
          data: transformRequest(data),
          options,
        })
        if (response?.status) {
          return successAction(response.data)
        }
        throw Error('Failing on save category')
      }
    }

    const mutateFn = () => {
      const updateItemsFn = (saved: Category, currentData: any) => {
        if (!saved?.id) return currentData
        const items = currentData._embedded.categories
        const idx = items.findIndex((item: Category) => item.id === saved.id)
        if (idx >= 0) items[idx] = saved
        else items.unshift(saved)
        return { ...currentData, _embedded: { categories: [...items] } }
      }
      swr.mutate(submitHandler().then(refreshRoot).catch(handleError), {
        revalidate: false,
        populateCache: (updated: Category, categories: any) => {
          return updateItemsFn(updated, categories)
        },
        rollbackOnError: true,
        throwOnError: false,
      })
    }
    mutateFn()
  }

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
      swr.mutate(deleter().then(refreshRoot).catch(handleError), {
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
      })
    },
    [ok, remove, swr, handleError]
  )

  return {
    ...swr,
    isSubmitting,
    updateCategory,
    deleteCategory,
  }
}
export default useCategory
