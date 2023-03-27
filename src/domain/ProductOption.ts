export type ProductOption = {
  id: number
  value: string
  type?: OptionType
  _links?: any
}

export type OptionType = {
  id: number
  name: string
  _links: any
  values?: ProductOption[]
}
