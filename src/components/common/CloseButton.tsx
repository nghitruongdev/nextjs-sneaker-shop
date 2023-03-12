import { Button, ButtonProps } from '@chakra-ui/button'

type Props = ButtonProps & {}
const SaveButton = ({ children, ...props }: Props) => {
  return <Button {...props}>{children || `Save`}</Button>
}
export default SaveButton
