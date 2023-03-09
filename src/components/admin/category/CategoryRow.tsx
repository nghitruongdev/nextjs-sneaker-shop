import Category from '@/domain/Category'
import { Tr, Td, Checkbox } from '@chakra-ui/react'
import Select from 'react-select'
import { useState, ChangeEvent } from 'react'
import useAxios from '../../../hooks/useAxios'
import useSWR from 'swr'
import axios from 'axios'
type Option = {
  label: string
  value: Category
}
const CategoryRow = ({
  id,
  name,
  isRoot,
  parentId,
  description,
  _links,
  selectOptions: options,
}: Category & { selectOptions: Option[] }) => {
  const parentOption = options.find((option) => option.value.id === parentId)
  const [selectedOption, setSelectedOption] = useState(parentOption)
  const { isLoading, errorText, patch } = useAxios(_links.self.href)

  console.log('rendered', Date.now())

  const parentChangeHandler = async (option: any, action: any) => {
    if (option === selectedOption) return
    console.log('SetUpdating', Date.now())
    const parentHref = option.value._links.self.href
    console.log('parentHref', parentHref)
    const response = await patch({ parent: parentHref })

    if (response?.status) {
      console.log('set selected option')
      setSelectedOption(option)
    }
  }

  return (
    <Tr key={id}>
      <Td>{id}</Td>
      <Td w="250px">{name}</Td>
      <Td
        minW="250px"
        w="250px"
        bg={isRoot ? 'gray.50' : 'inherit'}
      >
        {!isRoot && (
          <Select
            options={options}
            value={selectedOption}
            onChange={parentChangeHandler}
            isLoading={isLoading}
          />
        )}
      </Td>
      <Td>{description}</Td>
    </Tr>
  )
}
export default CategoryRow
function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}
