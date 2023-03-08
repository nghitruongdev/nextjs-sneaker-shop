interface Product {
  id: number
  name: string
  shortDesc?: string
  fullDesc?: string
  minPrice?: number
  publishDate?: Date
  status: string
  discount?: any
  attributes?: any[]
  _links?: any
}

export default Product
