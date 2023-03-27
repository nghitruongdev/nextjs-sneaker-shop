import { ReactNode, useEffect } from 'react'

import ReactSelect, {
  defaultTheme,
  ActionMeta,
  StylesConfig,
  FormatOptionLabelMeta,
} from 'react-select'
import { Box, Button, useDisclosure } from '@chakra-ui/react'
import {
  Controller,
  FieldValues,
  PathValue,
  useController,
  UseControllerProps,
  useWatch,
} from 'react-hook-form'

const { colors } = defaultTheme

export type Option = {
  label: string
  value: any
}

type Props<T extends FieldValues = FieldValues> = {
  controller: UseControllerProps<T, any>
  stateLabel: {
    defaultEmpty: ReactNode
    onSelected?: (value: string) => ReactNode
  }
  props: {
    placeHolder?: ReactNode
    onChange?: (newValue?: any, meta?: ActionMeta<any>) => any
    noOptionsMessage?: string | ((value: string) => ReactNode)
    isMulti?: boolean
    value?: Option
    options: Option[]
    formatOptionLabel?:
      | ((
          data: Option | PathValue<T, any>,
          formatOptionLabelMeta: FormatOptionLabelMeta<
            Option | PathValue<T, any>
          >
        ) => ReactNode)
      | undefined
  }
}
let count = 0
const SelectPopout = <T extends FieldValues = FieldValues>({
  controller,
  stateLabel: { defaultEmpty, onSelected },
  props: { placeHolder, noOptionsMessage, ...props },
}: Props<T>) => {
  const { isOpen, onOpen, onClose, isControlled } = useDisclosure()

  const valueWatch = useWatch({
    control: controller.control,
    name: controller.name,
  })
  const { isMulti = false } = props

  useEffect(onClose, [valueWatch, onClose])
  const selectStyles: StylesConfig<Option, typeof isMulti> = {
    container: (provided, state) => ({
      ...provided,
      minWidth: 250,
      margin: 8,
    }),
    control: (provided, state) => ({
      ...provided,
      margin: '8px 10px',
      borderColor: 'transparent',
      borderStyle: 'none',
      borderWidth: 0,
      boxShadow: 'none',
    }),
    option: (provided) => ({
      ...provided,
      padding: '8px 18px',
    }),
    menu: () => ({ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)' }),
  }

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={onClose}
      target={
        <Button
          rightIcon={<ChevronDown />}
          onClick={() => (isOpen ? onClose() : onOpen())}
          {...(isOpen && { bg: 'blue.700', color: 'white' })}
        >
          {!!!valueWatch?.label.length
            ? defaultEmpty
            : onSelected?.(valueWatch?.label || '') || valueWatch.label}
        </Button>
      }
    >
      <Controller
        {...controller}
        render={({ field }) => (
          <ReactSelect
            {...field}
            {...props}
            instanceId={`PopoutSelect ${count++}`}
            autoFocus
            backspaceRemovesValue={false}
            components={{ DropdownIndicator, IndicatorSeparator: null }}
            controlShouldRenderValue={false}
            hideSelectedOptions={true}
            isClearable={false}
            menuIsOpen
            placeholder={placeHolder || 'Tìm kiếm...'}
            styles={selectStyles}
            tabSelectsValue={false}
            noOptionsMessage={({ inputValue }) => {
              if (typeof noOptionsMessage === 'string') {
                return noOptionsMessage
              }
              return noOptionsMessage?.(inputValue)
            }}
          />
        )}
      />
    </Dropdown>
  )
}

// styled components

const Menu = (props: JSX.IntrinsicElements['div']) => {
  const shadow = 'hsla(218, 50%, 10%, 0.1)'
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: 4,
        boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
        marginTop: 8,
        position: 'absolute',
        zIndex: 2,
      }}
      {...props}
    />
  )
}
const Blanket = (props: JSX.IntrinsicElements['div']) => (
  <Box
    style={{
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
      position: 'fixed',
      zIndex: 1,
    }}
    {...props}
  />
)

const Dropdown = ({
  children,
  isOpen,
  target,
  onClose,
}: {
  children?: ReactNode
  readonly isOpen: boolean
  readonly target: ReactNode
  readonly onClose: () => void
}) => (
  <Box
    pos="relative"
    maxW="50%"
  >
    {target}
    {isOpen ? <Menu>{children}</Menu> : null}
    {isOpen ? <Blanket onClick={onClose} /> : null}
  </Box>
)
const Svg = (p: JSX.IntrinsicElements['svg']) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    focusable="false"
    role="presentation"
    {...p}
  />
)
const DropdownIndicator = () => (
  <div style={{ color: colors.neutral20, height: 24, width: 32 }}>
    <Svg>
      <path
        d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </Svg>
  </div>
)
const ChevronDown = () => (
  <Svg style={{ marginRight: -6 }}>
    <path
      d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </Svg>
)

export default SelectPopout
