import { PageProps } from '@/domain/PageProps'
import {
  TableContainer,
  Text,
  Flex,
  Select,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Tfoot,
  TableBodyProps,
  TableContainerProps,
  Td,
} from '@chakra-ui/react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Header,
  HeaderGroup,
  useReactTable,
} from '@tanstack/react-table'
import React, { ReactNode } from 'react'
type DataProps = {
  columns: any[]
  data: any[]
  options?: any[]
}
type TableProps = {
  caption?: string
  setSize?: (size: number) => void
  page?: PageProps
  onChangePage?: any
  additionalRows?: ReactNode
  config?: {
    containerProps?: TableContainerProps
    tableProps?: TableProps
    bodyProps?: TableBodyProps
    config?: any
  }
}
type Props = DataProps & TableProps

const NewTable = ({
  columns,
  data,
  options,
  additionalRows,
  page,
  caption,
  setSize,
  config: { containerProps, tableProps, bodyProps, config } = {},
}: Props) => {
  console.debug('Data table rendered')
  const { getHeaderGroups, getFooterGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const setSizeHandler = (event: any) => {
    const size = +event.target.value
    setSize?.(size)
  }
  if (!data) return <>Nothing to show</>
  return (
    <TableContainer
      bg="white"
      {...containerProps}
    >
      {setSize && (
        <Flex align={'center'}>
          <Select
            placeholder=""
            w={'50'}
            onChange={setSizeHandler}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </Select>
          <Text> records per page</Text>
        </Flex>
      )}
      <Table
        variant="simple"
        {...tableProps}
      >
        {caption && <TableCaption>{caption}</TableCaption>}

        {/* Headers */}
        <TableHeader groups={getHeaderGroups()} />

        {/* Body */}
        <Tbody {...bodyProps}>
          {getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
          {additionalRows}
        </Tbody>

        {/* Footer */}
        <TableHeader
          groups={getFooterGroups()}
          isFooter
        />
      </Table>
      {page && (
        <p>
          Results: {page.number + 1} - {page.totalPages} of {page.totalElements}{' '}
          entries
        </p>
      )}
    </TableContainer>
  )
}

const TableHeader = ({
  groups,
  isFooter = false,
}: {
  groups: HeaderGroup<any>[]
  isFooter?: boolean
}) => {
  const content = (header: Header<any, unknown>) => {
    const columnDef = header.column.columnDef
    return isFooter ? columnDef.footer : columnDef.header
  }
  const row = groups.map((group) => (
    <Tr key={group.id}>
      {group.headers.map((header) => (
        <Th key={header.id}>
          {header.isPlaceholder
            ? null
            : flexRender(content(header), header.getContext())}
        </Th>
      ))}
    </Tr>
  ))
  return isFooter ? <Tfoot>{row}</Tfoot> : <Thead>{row}</Thead>
}

export default React.memo(NewTable)
