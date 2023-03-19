import { Spinner } from '@chakra-ui/react'

const LoadingIndicator = () => {
  return (
    <Spinner
      thickness="4px"
      speed="1s"
      emptyColor="gray.200"
      color="blue.500"
      size="md"
      mr="5px"
    />
  )
}

export default LoadingIndicator
