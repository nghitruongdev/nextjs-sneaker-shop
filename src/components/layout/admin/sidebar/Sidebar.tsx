import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react'
import SidebarContent from './SidebarContent'

interface SidebarProps {
  isOpen: boolean
  isExpanded: boolean
  onClose: () => void
}

const Sidebar = ({ isOpen, onClose, isExpanded }: SidebarProps) => {
  return (
    <>
      {/* Sidebar when fullscreen */}
      <SidebarContent
        display={{
          base: 'none',
          md: isOpen ? 'none' : 'unset',
        }}
        isExpanded={isExpanded}
      />

      {/* Sidebar when below mid screen */}
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent
            w="full"
            borderRight="none"
          />
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Sidebar
