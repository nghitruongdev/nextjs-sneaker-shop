import { Spinner } from '@chakra-ui/react'

const FormSpinner = ({ isShow }: { isShow: boolean }) => {
  return (
    <>
      {isShow && (
        <Spinner
          pos="absolute"
          right="0"
          m="2"
          speed="0.7s"
          thickness="2px"
          color="blue.700"
        />
      )}
    </>
  )
}

export default FormSpinner
