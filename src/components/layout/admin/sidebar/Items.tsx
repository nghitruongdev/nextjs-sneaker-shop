import { AiOutlineBorderVerticle } from 'react-icons/ai'
import { FiHome, FiCompass, FiStar, FiSettings } from 'react-icons/fi'
import { SidebarItemProps } from './SidebarItem'

const Items: Array<SidebarItemProps> = [
  {
    name: 'Home',
    icon: FiHome,
    href: '/admin',
  },
  {
    name: 'Đơn hàng',
    icon: AiOutlineBorderVerticle,
    href: '/admin/orders',
    subItems: [
      {
        name: 'Tạo mới đơn hàng',
        icon: AiOutlineBorderVerticle,
        href: '/admin/orders/new',
      },
    ],
  },
  //* inline - collection, attributes, options, reviews
  { name: 'Users', icon: FiCompass, href: '/admin/users' },
  { name: 'Categories', icon: FiCompass, href: '/admin/categories' },
  { name: 'Brands', icon: FiCompass, href: '/admin/brands' },
  { name: 'Discounts', icon: FiCompass, href: '/admin/discounts' },
  { name: 'Products', icon: FiStar, href: '/admin/products' },
  { name: 'New Product', icon: FiStar, href: '/admin/products/new' },
  {
    name: 'Product Variants',
    icon: FiStar,
    href: '/admin/products/variants',
  },
  { name: 'Settings', icon: FiSettings, href: '/admin' },
]

export default Items
