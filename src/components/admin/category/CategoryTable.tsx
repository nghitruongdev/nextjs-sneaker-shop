import Category from '@/domain/Category'
import { Badge, Button, useDisclosure, useToast } from '@chakra-ui/react'
import { useCallback, useMemo, useState } from 'react'
import { createColumnHelper, CellContext } from '@tanstack/react-table'
import ModalForm from './ModalForm'
import NewTable from '@/components/NewTable'
import { DeleteButtonItem, EditButtonItem } from '../MenuItem'
import Menu from '../Menu'
import { getFetcher } from '@/hooks/useFetcher'
import useSWR, { mutate as globalMutate } from 'swr'
import useAxios from '@/hooks/useAxios'
import useMyToast from '@/hooks/useMyToast'
import config from 'config'
import useCategory from '@/hooks/useCategory'
let count = 0
type Props = {
  indexPage: number
  onChangePage: (total: number, index: number) => void
  keyUrl: string
  setSize: (size: number) => void
}
const util = createColumnHelper<Category>()
const fetcher = getFetcher()

const CategoryTable = ({ setSize, keyUrl, onChangePage, ...props }: Props) => {
  const [current, setCurrent] = useState<Category>({ name: '' })
  const clearCurrent = setCurrent.bind(this, { name: '' })
  const {
    isLoading,
    isSubmitting,
    error,
    data,
    updateCategory,
    deleteCategory,
  } = useCategory({
    keyUrl,
  })

  const { data: rootData } = useSWR(config.api.categories.root, fetcher, {
    refreshInterval: 60 * 1000,
    revalidateIfStale: true,
  })
  const items = data?._embedded.categories
  const { isOpen, onOpen, onClose } = useDisclosure()

  const rootCategories: Category[] = useMemo(() => {
    return rootData?._embedded?.categories
  }, [rootData])

  const columns = useMemo(() => {
    console.log('columns created use memo')
    const editHandler = (info: CellContext<Category, any>) => {
      setCurrent(info.row.original)
      onOpen()
    }
    const deleteHandler = (info: CellContext<Category, any>) => {
      deleteCategory(info.row.original)
    }

    const menu = (info: any) => (
      <CategoryMenu
        onEdit={editHandler.bind(this, info)}
        onDelete={deleteHandler.bind(this, info)}
      />
    )

    return [
      util.accessor((row) => row.name, {
        header: 'Name',
      }),
      util.accessor((row) => row.parentId, {
        header: 'Parent Category',
        cell: (info: CellContext<Category, any>) => {
          const isRoot = info.row.original.isRoot
          const parentName = rootCategories?.find(
            (item) => item.id === info?.getValue()
          )?.name
          return (
            <>
              {isRoot && <Badge colorScheme="yellow">Root Category</Badge>}
              {!isRoot && <Badge colorScheme="blackAlpha">{parentName}</Badge>}
            </>
          )
        },
      }),
      util.accessor((row) => row.description, {
        header: 'Description',
      }),
      util.display({
        header: 'Actions',
        cell: (info) => menu(info),
      }),
    ]
  }, [deleteCategory, onOpen, rootCategories])

  if (isLoading) return <>Loading...</>
  if (error) return <>{JSON.stringify(error.message)}</>

  // todo: If there is no item in the items
  if (!items?.length) return <p>{`There's nothing`}</p>

  //todo: render the items if items exists
  return (
    <>
      {current && (
        <ModalForm
          category={current}
          updateCategory={updateCategory}
          rootCategories={rootCategories}
          isOpen={isOpen}
          isSubmitting={isSubmitting}
          onClose={onClose}
          clearCurrent={clearCurrent}
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
        page={data.page}
        setSize={setSize}
        columns={columns}
        onChangePage={onChangePage.bind(this, data.page.totalPages)}
        data={items}
        caption="VNCO muôn năm"
      />
    </>
  )
}
const CategoryMenu = ({
  onEdit,
  onDelete,
}: {
  onEdit: () => void
  onDelete: () => void
}) => {
  return (
    <Menu>
      <EditButtonItem onClick={onEdit} />
      <DeleteButtonItem onClick={onDelete} />
    </Menu>
  )
}
export default CategoryTable
