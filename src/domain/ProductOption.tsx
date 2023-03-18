export type ProductOption = {
  id: number
  type: {
    id: number
    name: string
  }
  values?: OptionValue[]
  _links?: any
}

export type OptionValue = {
  id: number
  name: string
  _links?: any
}
