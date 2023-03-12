import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { ReactNode, Ref, RefObject, useState } from 'react'
import useAlert from '@/hooks/useAlert'
type Props = {
  header?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  buttons?: ReactNode
  defaultCloseBtn?: boolean
  finalRef?: RefObject<any>
  isOpen: boolean
  onClose: () => void
  warnOnClose?: () => boolean
  shouldWarn?: boolean
  isSubmitting?: boolean
  initialFocusRef?: any
}
let count = 0
const CustomModal = ({
  header,
  children,
  footer,
  buttons,
  defaultCloseBtn,
  finalRef,
  isOpen,
  isSubmitting,
  onClose,
  initialFocusRef,
  warnOnClose,
  shouldWarn,
}: Props) => {
  console.debug('Custom modal rendered', count++)
  const [isWarning, setIsWarning] = useState<boolean | undefined>()
  const { warning } = useAlert()
  console.log('isOpen', isOpen)

  const closeHandler = () => {
    if (!shouldWarn) {
      onClose()
      return
    }
    setIsWarning(true)
    warning({
      text: `Edits you've made will be lost!`,
      confirmButtonText: 'Yes, do it!',
      confirmAction: () => {
        setIsWarning(false)
        onClose()
      },
      dismissAction: () => setIsWarning(false),
    })
  }

  return (
    <>
      <Modal
        initialFocusRef={initialFocusRef}
        finalFocusRef={finalRef}
        isOpen={!isWarning && isOpen}
        onClose={closeHandler}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        scrollBehavior="outside"
      >
        <ModalOverlay />
        <ModalContent pointerEvents={isSubmitting ? 'none' : 'unset'}>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton isDisabled={isSubmitting} />
          <Divider />
          <ModalBody color={isSubmitting ? 'gray.500' : 'unset'}>
            {children}
          </ModalBody>

          <ModalFooter>
            {defaultCloseBtn && (
              <Button
                mr={3}
                onClick={closeHandler}
                isDisabled={isSubmitting}
              >
                Close
              </Button>
            )}
            {buttons}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default CustomModal
