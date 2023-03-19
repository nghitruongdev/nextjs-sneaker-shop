import { Accordion, AccordionProps } from '@chakra-ui/react'
import SidebarItem, { SidebarItemProps } from './SidebarItem'
import { useEffect, useState } from 'react'
import Items from './Items'

const SidebarList = ({
  items,
  isParentActive,
  isExpanded,
  ...rest
}: {
  isParentActive?: boolean
  isExpanded?: boolean
  items: Array<SidebarItemProps>
} & AccordionProps) => {
  const [currentName, setCurrentName] = useState('')
  useEffect(() => {
    !isParentActive && setCurrentName('')
  }, [isParentActive])

  return (
    <Accordion
      allowToggle
      {...rest}
    >
      {items.map((item) => (
        <SidebarItem
          key={item.name}
          isSidebarExpanded={isExpanded}
          // clickHandler={clickHandler}
          clickHandler={setCurrentName.bind(this, item.name)}
          active={item.name === currentName}
          {...item}
        />
      ))}
    </Accordion>
  )
}
export default SidebarList
