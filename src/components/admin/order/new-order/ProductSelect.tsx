import LoadingIndicator from '@/components/LoadingIndicator'
import { OptionValue, ProductOption } from '@/domain/ProductOption'
import useAxios from '@/hooks/useAxios'
import { Text } from '@chakra-ui/react'
import config from 'config'
import { useState } from 'react'
import { ActionMeta, SingleValue } from 'react-select'
import AsyncSelect from 'react-select/async'
import { ActionType } from '../reducers/ProductSelectReducer'

export type Option = {
  label: string
  value: any
}

type Props = {
  onSelectChange: (
    option: SingleValue<Option>,
    meta: ActionMeta<Option>
  ) => void
}
const ProductSelect = ({ onSelectChange: onChange }: Props) => {
  const [currentTimeout, setCurrentTimeout] = useState<any>()
  const { get } = useAxios()

  const selectActionFactory = () => {
    const getProducts = async (inputValue?: string) => {
      const response = await get({
        requestUrl: config.api.products.search.findByNameLike(inputValue),
      })
      if (!response?.status) return []
      return response.data._embedded.products.map((p: any) => ({
        label: p.name,
        value: p,
      }))
    }

    return {
      getProducts,
    }
  }

  const { getProducts } = selectActionFactory()

  const loadOptions = (input?: string) =>
    new Promise<Option[]>((resolve) => {
      if (currentTimeout) clearTimeout(currentTimeout)
      const id = setTimeout(() => {
        return resolve(getProducts(input))
      }, 300)
      setCurrentTimeout(id)
    })
  return (
    <AsyncSelect
      instanceId="product-select"
      cacheOptions
      placeholder={<Text noOfLines={1}>{'Tên sản phẩm'}</Text>}
      loadOptions={loadOptions}
      loadingMessage={() => `Đang tìm sản phẩm ...`}
      noOptionsMessage={() => `Không tìm thấy sản phẩm`}
      isSearchable
      isClearable
      components={{ LoadingIndicator }}
      onChange={onChange}
    />
  )
}
export default ProductSelect
