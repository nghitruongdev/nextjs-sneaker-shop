import { OptionType, ProductOption } from '@/domain/ProductOption'

enum ActionType {
  // SET_PRODUCT,
  UPDATE_SELECTED_OPTION,
  REMOVE_OPTION_TYPE,
  CLEAR_SELECTED_OPTION,
}
interface ReducerAction {
  type: ActionType
  payload: any
}

interface ReducerState {
  // variantUrl: string | null
  // optionUrl: string | null
  // product: any
  selectedValues: ProductOption[]
}

const inititalState: ReducerState = {
  // variantUrl: null,
  // optionUrl: null,
  // product: null,
  selectedValues: [],
}

const productReducer = (
  state: ReducerState,
  action: ReducerAction
): ReducerState => {
  const { type, payload } = action
  switch (type) {
    case ActionType.UPDATE_SELECTED_OPTION: {
      const { value } = payload
      const { selectedValues: selectedValues } = state
      const idx = selectedValues.findIndex(
        (selected) => selected.type?.id === value.type?.id
      )
      if (idx === -1) {
        selectedValues.push(value)
      } else {
        selectedValues[idx] = value
      }
      return {
        ...state,
        selectedValues: [...selectedValues],
      }
    }
    case ActionType.REMOVE_OPTION_TYPE: {
      const removedType = payload.type as OptionType
      const { selectedValues } = state

      const isNotRemovedType = (value: ProductOption) =>
        value.type?.id !== removedType.id
      const filtered = selectedValues.filter(isNotRemovedType)
      return {
        ...state,
        selectedValues: [...filtered],
      }
    }
    case ActionType.CLEAR_SELECTED_OPTION: {
      return {
        ...state,
        selectedValues: [],
      }
    }
  }
}

export { inititalState, productReducer, ActionType }
export type { ReducerState, ReducerAction }
