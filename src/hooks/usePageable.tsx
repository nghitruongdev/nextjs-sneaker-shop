import { useState } from 'react'

type Props = {
  key: string
  config?: {
    defaultPageIndex?: number
    defaultSize?: number
    sort?: string
    sortDir?: string
  }
}
const usePageable = ({ key, config = {} }: Props) => {
  const { defaultPageIndex = 0, defaultSize = 5, sort, sortDir } = config

  const [size, setSize] = useState<number>(defaultSize)
  const [pageIndex, setPageIndex] = useState(defaultPageIndex)
  key.includes('?')
  const keyUrl = `${key}${
    key.includes('?') ? '&' : '?'
  }sort=${sort},${sortDir}&page=${pageIndex}&size=${size}`

  const changePageHandler = (total: number, index: number) => {
    if (index) return
    if (pageIndex === index) return
    if (index >= total) return
    if (index < 0) return
    setPageIndex(index)
  }

  return {
    changePageHandler,
    keyUrl,
    setSize,
    setPageIndex,
    size,
    pageIndex,
  }
}
export default usePageable
