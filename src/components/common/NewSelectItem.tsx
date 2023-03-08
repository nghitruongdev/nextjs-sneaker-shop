import { AddIcon } from '@chakra-ui/icons'
import { Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  name: string
}
const NewSelectItem = ({ name }: Props) => {
  return (
    <>
      <Text color={'blue.500'} fontSize={'md'} fontWeight={'semibold'} p={2}>
        <AddIcon boxSize={10} mx={5} />
        {name}
      </Text>
    </>
  )
}
export default NewSelectItem
