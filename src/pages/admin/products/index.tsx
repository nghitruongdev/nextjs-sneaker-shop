import { NextPageWithLayout } from '@/pages/_app'
import { getAdminLayout } from '@/components/layout/admin/AdminLayout'
import ProductTable from '@/components/admin/product/ProductTable'
import { Tabs, TabList, Tab, TabPanels, TabPanel, Box } from '@chakra-ui/react'
import useProduct from '@/hooks/useProduct'
import ProductForm from '@/components/admin/product/ProductForm'

const ProductPage: NextPageWithLayout = () => {
  const { tab, tableProps, formProps } = useProduct()
  return (
    <Box>
      <Tabs
        index={tab.index}
        onChange={tab.setIndex}
      >
        <TabList>
          <Tab>Tất cả sản phẩm</Tab>
          <Tab>Thêm mới sản phẩm</Tab>
          <Tab>Phiên bản sản phẩm</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProductTable {...tableProps} />
          </TabPanel>
          <TabPanel>
            <ProductForm {...formProps} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

ProductPage.getLayout = getAdminLayout
export default ProductPage
