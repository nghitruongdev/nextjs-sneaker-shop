import { OptionType } from '@/domain/ProductOption'
import { SelectOption } from '../ReactSelectOption'

enum ActionType {
  ADD_NEW_TYPE,
  REMOVE_TYPE,
  UPDATE_OPTION_VALUE,
}

type ReducerState = {
  types: SelectOption[]
  options: {
    type: OptionType
    values: SelectOption[]
  }[]
}

const initialState: ReducerState = {
  types: [],
  options: [],
}

type ReducerActionMeta = {
  type: ActionType
  payload: any
}

const optionReducer = (
  state: ReducerState,
  action: ReducerActionMeta
): ReducerState => {
  const { type, payload } = action
  switch (type) {
    case ActionType.ADD_NEW_TYPE: {
      const { options, types } = state
      const newType = payload.type as SelectOption
      if (options.every((item) => item.type.id !== newType.value.id))
        return {
          ...state,
          types: [...types, newType],
          options: [
            ...options,
            {
              type: newType.value,
              values: [],
            },
          ],
        }

      return {
        ...state,
        types: [...types, newType],
      }
    }
    case ActionType.REMOVE_TYPE: {
      const { typeId } = payload
      return {
        ...state,
        types: [...state.types.filter((item) => item.value.id !== typeId)],
      }
    }
    case ActionType.UPDATE_OPTION_VALUE: {
      const { type } = payload
      const { options } = state

      const idx = options.findIndex((item) => item.type.id === type.id)
      if (idx === -1) {
        return state
      }
      options[idx] = payload
      return {
        ...state,
        options: [...options],
      }
    }
  }
  return state
}
export type { ActionType }
export { initialState }
export default optionReducer
