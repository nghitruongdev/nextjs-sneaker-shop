import { OptionValue } from '@/domain/ProductOption'

enum ActionType {
  // SET_PRODUCT,
  UPDATE_SELECTED_OPTION,
  REMOVE_SELECTED_OPTION,
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
  selectedValues: OptionValue[]
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
    // case ActionType.SET_PRODUCT: {
    // const _links = payload?._links
    // return {
    // ...state,
    // product: payload,
    // optionUrl: _links?.options?.href,
    // variantUrl: _links?.variants?.href,
    // }
    // }
    case ActionType.UPDATE_SELECTED_OPTION: {
      const { value } = payload
      const { selectedValues: selectedValues } = state
      const idx = selectedValues.findIndex(
        (selected) =>
          selected._links.productOption.href === value._links.productOption.href
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
    case ActionType.REMOVE_SELECTED_OPTION: {
      const { option } = payload
      const { selectedValues } = state

      const isNotTheSameOption = (item: OptionValue) => {
        return item._links.productOption.href !== option._links.self.href
      }
      const filtered = selectedValues.filter(isNotTheSameOption)
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
  return state
}

export { inititalState, productReducer, ActionType }
export type { ReducerState, ReducerAction }
