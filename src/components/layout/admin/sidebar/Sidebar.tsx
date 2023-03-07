import { Box, Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react'
import SidebarContent from './SidebarContent'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Sidebar when fullscreen */}
      <SidebarContent
        display={{
          base: 'none',
          md: 'unset',
        }}
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
