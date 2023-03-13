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
  isAdding?: boolean
  cancelAddingHandler?: () => void
}
const util = createColumnHelper<Category>()
const fetcher = getFetcher()

const CategoryTable = ({ setSize, keyUrl, onChangePage, ...props }: Props) => {
  const {} = useCategory(keyUrl)
  const { isLoading, error, mutate, data } = useSWR(keyUrl, fetcher)

  const { data: rootData } = useSWR(config.api.categories.root, fetcher, {
    refreshInterval: 60 * 1000,
    revalidateIfStale: true,
  })
  const items = data?._embedded.categories
  // console.debug('Category Table rendered', count++)
  const { remove } = useAxios()
  const { ok, fail } = useMyToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [current, setCurrent] = useState<Category>()

  const rootCategories: Category[] = useMemo(() => {
    return rootData?._embedded?.categories
  }, [rootData])

  const clearCurrentCategory = () => {
    setCurrent(undefined)
  }
  const refreshRoot = () => {
    globalMutate(config.api.categories.root)
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

  const columns = useMemo(() => {
    console.log('columns created use memo')
    const editHandler = (info: CellContext<Category, any>) => {
      setCurrent(info.row.original)
      onOpen()
    }
    const deleteHandler = (info: CellContext<Category, any>) => {
      const category: Category = info.row.original
      deleteCategory(category)
      console.log('Deleted info', info.row.original)
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
          keyUrl={keyUrl}
          mutate={mutate}
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
