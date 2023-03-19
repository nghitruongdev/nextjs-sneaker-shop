import Swal, { SweetAlertResult } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

type AlertProps = {
  title?: string
  text?: string
  icon?: 'warning' | 'error' | 'success'
  showCancelButton?: boolean
  confirmButtonColor?: string
  cancelButtonColor?: string
  confirmButtonText?: string
}

const useAlert = () => {
  const alert = withReactContent(Swal)
  const makeAlert = () => {
    alert
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
        }
      })
  }

  const warning = async ({
    title = 'Are you sure?',
    text = `You won't be able to revert this!`,
    confirmButtonText = 'Yes!',
    confirmAction,
    deniedAction,
    dismissAction,
    ...props
  }: AlertProps & {
    confirmAction?: () => any
    deniedAction?: () => any
    dismissAction?: () => any
  }) => {
    const result = await alert.fire({
      title,
      text,
      confirmButtonText,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      ...props,
    })

    if (confirmAction && result.isConfirmed) return confirmAction()
    if (deniedAction && result.isDenied) return deniedAction()
    if (dismissAction && result.isDismissed) return dismissAction()
    return result
  }

  return {
    warning,
  }
}
export default useAlert
