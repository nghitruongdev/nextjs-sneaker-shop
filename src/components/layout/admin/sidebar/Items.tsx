import { AiOutlineBorderVerticle } from 'react-icons/ai'
import { FiHome, FiCompass, FiStar, FiSettings } from 'react-icons/fi'
import { SidebarItemProps } from './SidebarItem'

const productsHref = '/admin/products'
const categoriesHref = '/admin/categories'

const Items: Array<SidebarItemProps> = [
  {
    name: 'Home',
    icon: FiHome,
    href: '/admin',
  },
  {
    name: 'Đơn hàng',
    icon: AiOutlineBorderVerticle,
    href: '#',
    subItems: [
      {
        name: 'Tạo đơn hàng',
        icon: AiOutlineBorderVerticle,
        href: '/admin/orders/new',
      },
      {
        name: 'Tất cả đơn hàng',
        icon: AiOutlineBorderVerticle,
        href: '/admin/orders',
      },
    ],
  },
  //* inline - collection, attributes, options, reviews
  {
    name: 'Người dùng',
    icon: FiCompass,
    href: '#',
    subItems: [
      { name: 'Tất cả người dùng', icon: FiCompass, href: '/admin/users' },
      { name: 'Quản lý nhân viên', icon: FiCompass, href: '' },
      { name: 'Quản lý khách hàng', icon: FiCompass, href: '' },
    ],
  },
  {
    name: 'Sản phẩm',
    icon: FiStar,
    href: '#',
    subItems: [
      { name: 'Tất cả sản phẩm', icon: FiSettings, href: `/admin/products` },
      { name: 'Thêm sản phẩm', icon: FiStar, href: `/admin/products/new` },
      {
        name: 'Biến thể sản phẩm',
        icon: FiStar,
        href: `/admin/productVariants`,
      },
      { name: 'Thương hiệu', icon: FiStar, href: `/admin/brands` },
      { name: 'Danh mục', icon: FiStar, href: `/admin/categories` },
      { name: 'Giảm giá', icon: FiStar, href: `/admin/discounts` },
    ],
  },
  { name: 'Settings', icon: FiSettings, href: '/admin' },
]

export default Items
