import { Button } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

const NewUserPage = () => {
  const {
    formState: { isSubmitting },
    handleSubmit,
  } = useForm()
  const handleClick = handleSubmit(async () => {
    await new Promise((res) => {
      setTimeout(res, 3000)
    })
  })
  console.log(isSubmitting)
  return (
    <Button
      isLoading={isSubmitting}
      loadingText="Đang submit đây này"
      onClick={handleClick}
    >
      Submit form
    </Button>
  )
}
export default NewUserPage
