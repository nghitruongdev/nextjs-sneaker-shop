module.exports = () => {
  const routes = require('./_routes.json')
  const api = Object.keys(routes).map((key) => ({
    name: `${routes[key]}`.replace('/', ''),
    path: key,
  }))
  return {
    api: {
      api,
    },
    products: require('./products.json'),
    users: require('./users.json'),
    carts: require('./carts.json'),
    categories: require('./categories.json'),
    'product-variants': require('./variants.json'),
    orders: require('./orders.json'),
    orderItems: require('./orderItems.json'),
    'order-status': require('./order-status.json'),
  }
}
