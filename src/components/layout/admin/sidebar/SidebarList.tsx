import { Accordion, AccordionProps } from '@chakra-ui/react'
import SidebarItem, { SidebarItemProps } from './SidebarItem'
import { useEffect, useState } from 'react'

const SidebarList = ({
  items,
  isParentActive,
  ...rest
}: {
  items: Array<SidebarItemProps>
  isParentActive?: boolean
} & AccordionProps) => {
  const [list, setList] = useState(items)

  const setSelectedItem = (
    list: Array<SidebarItemProps>,
    index: number | undefined
  ) => {
    list.forEach((item) => (item.active = false))
    if (index || index === 0) {
      list[index].active = true
    }
    return [...list]
  }

  const selectItemHandler = (index: number) => {
    setList((previousList) => setSelectedItem(previousList, index))
  }

  useEffect(() => {
    if (!isParentActive) {
      setList((previousList) => setSelectedItem(previousList, undefined))
    }
  }, [isParentActive])

  return (
    <Accordion
      allowToggle
      {...rest}
    >
      {list.map((item, index) => (
        <SidebarItem
          key={item.name}
          selectItemHandler={selectItemHandler.bind(this, index)}
          {...item}
        />
      ))}
    </Accordion>
  )
}
export default SidebarList
