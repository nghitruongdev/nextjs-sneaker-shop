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
          clickHandler={setCurrentName.bind(this, item.name)}
          active={item.name === currentName}
          {...item}
        />
      ))}
    </Accordion>
  )
}
export default SidebarList
