const config = {
  apiPath: process.env.NEXT_PUBLIC_API_PATH,
  api: {
    products: '/products',
    orders: {
      url: '/orders',
      status: '/orders/status',
    },
    categories: {
      url: '/categories',
      root: '/categories/search/root',
    },
  },
}

export default config
