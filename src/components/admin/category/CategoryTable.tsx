import Category from '@/domain/Category'
import { Button, useDisclosure } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { createColumnHelper, CellContext } from '@tanstack/react-table'
import ModalForm from './ModalForm'
import { RiPencilLine, RiFileShredLine } from 'react-icons/ri'
import NewTable from '@/components/NewTable'
import { DeleteButtonItem, EditButtonItem } from '../MenuItem'
import Menu from '../Menu'
import { Page } from '@/pages/admin/categories'
let count = 0
type Props = {
  items: Category[]
  page?: Page
  setSize: (size: number) => void
  isAdding?: boolean
  cancelAddingHandler?: () => void
}
const util = createColumnHelper<Category>()

const CategoryTable = ({ items, setSize, ...props }: Props) => {
  console.debug('Category Table rendered', count++)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [current, setCurrent] = useState<Category>()
  const rootCategories = useMemo(() => {
    return items?.filter((item: Category) => item?.isRoot)
  }, [items])

  const clearCurrentCategory = () => {
    setCurrent(undefined)
  }

  const columns = useMemo(() => {
    const menu = (info: any) => (
      <CategoryMenu
        info={info}
        openEditForm={onOpen}
        setCurrent={setCurrent}
      />
    )

    return [
      // util.accessor((row) => row.id, {
      //   header: 'ID',
      // }),
      util.accessor((row) => row.name, {
        header: 'Name',
      }),
      util.accessor((row) => row.parentId, {
        header: 'Parent Category',
        cell: (info) =>
          rootCategories?.find((item) => item.id === info?.getValue())?.name,
      }),
      util.accessor((row) => row.description, {
        header: 'Description',
      }),
      util.display({
        header: 'Actions',
        cell: (info) => menu(info),
      }),
    ]
  }, [rootCategories, onOpen])

  // todo: If there is no item in the items
  if (!items?.length) return <p>{`There's nothing`}</p>

  //todo: render the items if items exists

  return (
    <>
      {current && (
        <ModalForm
          category={current}
          rootCategories={rootCategories}
          isOpen={isOpen}
          onClose={onClose}
          clearCurrent={clearCurrentCategory}
        />
      )}

      <Button
        onClick={() => {
          setCurrent({ name: '' })
          onOpen()
        }}
        colorScheme={'blue'}
      >
        Add New Category
      </Button>
      <NewTable
        setSize={setSize}
        columns={columns}
        data={items}
        caption="VNCO muôn năm"
      />
    </>
  )
}
const CategoryMenu = ({
  info,
  openEditForm,
  setCurrent,
}: {
  info: CellContext<Category, any>
  openEditForm: () => void
  setCurrent: (item: Category) => void
}) => {
  const editHandler = (info: CellContext<Category, any>) => {
    setCurrent(info.row.original)
    openEditForm()
  }
  const deleteHandler = (info: CellContext<Category, any>) => {
    //* delete using index
    console.log('Deleted info', info.row.original)
  }
  return (
    <Menu>
      <EditButtonItem onClick={() => editHandler(info)} />
      <DeleteButtonItem onClick={() => deleteHandler(info)} />
    </Menu>
  )
}
export default CategoryTable
