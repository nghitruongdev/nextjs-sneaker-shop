import MyTable from '@/components/common/MyTable'
import Category from '@/domain/Category'
import { Tr, Td } from '@chakra-ui/react'
import Select from 'react-select'
import CategoryRow from './CategoryRow'
const CategoryTable = ({ items }: { items: Category[] }) => {
  // todo: If there is no item in the items
  if (!items?.length) return <p>{`There's nothing`}</p>

  //todo: render the items if items exists
  const titles = ['id', 'Name', 'Parent', 'Description']

  const selectOptions = items
    .filter((item) => item.isRoot)
    .map<any>((item) => ({
      value: item,
      label: item.name,
    }))
  console.log('table rendered')

  return (
    <MyTable
      headers={titles}
      caption="VNCO muôn năm"
    >
      {items.map((item) => (
        <CategoryRow
          key={item.id}
          selectOptions={selectOptions}
          {...item}
        />
      ))}
    </MyTable>
  )
}
export default CategoryTable
