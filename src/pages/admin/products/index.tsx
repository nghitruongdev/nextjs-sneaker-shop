import AdminLayout from '@/components/layout/admin/AdminLayout'
import useAxios from '@/hooks/useAxios'
import { NextPageWithLayout } from '@/pages/_app'
import { ReactElement } from 'react'
import { getAdminLayout } from '../../../components/layout/admin/AdminLayout'
import useSWR from 'swr'
import ProductTable from '../../../components/admin/product/ProductTable'

const ProductPage: NextPageWithLayout = () => {
  const transformArray = (data: any) =>
    data?._embedded?.products.map((item: any) => item)

  const { fetcher, api } = useAxios({ transform: transformArray })
  const { data, isLoading, error } = useSWR(api.productsUrl, fetcher)

  if (isLoading) return <>Loading...</>
  if (error) return <>{error}</>

  return (
    <>
      {/* //todo: you will have a table */}
      <ProductTable items={data} />

      {/* //todo: Update row, Delete Row */}
    </>
  )
}

ProductPage.getLayout = getAdminLayout
export default ProductPage
