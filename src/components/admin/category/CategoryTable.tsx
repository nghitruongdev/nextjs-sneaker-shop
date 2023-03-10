import MyTable from '@/components/common/MyTable'
import Category from '@/domain/Category'
import { Tr, Td } from '@chakra-ui/react'
import { useState } from 'react'
import Select from 'react-select'
import CategoryRow from './CategoryRow'
import index from '../../../pages/admin/users/index'
const CategoryTable = ({
  items,
  ...props
}: {
  items: Category[]
  isAdding?: boolean
  cancelAddingHandler?: () => void
}) => {
  // todo: If there is no item in the items
  if (!items?.length) return <p>{`There's nothing`}</p>

  //todo: render the items if items exists
  const titles = ['id', 'Name', 'Parent', 'Description', 'Menu']

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
      {props.isAdding && (
        <CategoryRow
          name=""
          selectOptions={selectOptions}
          isNew
          cancelAddingHandler={props.cancelAddingHandler}
        />
      )}
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
