import { useRadio, Tooltip, Box } from '@chakra-ui/react'

// 1. Create a component that consumes the `useRadio` hook
const OptionValueCheckbox = (props: any) => {
  const { uncheck, ...radioProps } = props
  const {
    state: { isDisabled, isChecked },
    htmlProps,
    getInputProps,
    getCheckboxProps,
    getLabelProps,
  } = useRadio(radioProps)

  const onClick = (event: any) => {
    if (isChecked) uncheck()
  }
  const input = getInputProps({ onClick })
  const checkbox = getCheckboxProps({})

  return (
    <Box as="label">
      <input {...input} />
      <Tooltip
        hasArrow
        label={isDisabled ? 'Không thể chọn sản phẩm' : ''}
      >
        <Box
          {...checkbox}
          cursor="pointer"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          _checked={{
            bg: 'teal.600',
            color: 'white',
            borderColor: 'teal.600',
          }}
          {...(isChecked && {
            _focus: {
              boxShadow: 'outline',
            },
          })}
          _disabled={{
            bg: 'gray.50',
            color: 'gray.500',
          }}
          px={5}
          py={3}
        >
          {props.children}
        </Box>
      </Tooltip>
    </Box>
  )
}

export default OptionValueCheckbox
