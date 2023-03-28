import Card
// , { CardType } \
 from '../client/Card'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useAxios from '@/hooks/useAxios';
import { Box, Flex, Stack, Grid, HStack } from '@chakra-ui/react'
import NextLink from 'next/link';
// import ProductOverview, {Product} from '../../components/client/Overview';
// type Item  = {
//   id: string
//   name: string
//   minPrice: number
//   image: string
// }
// interface Props {
//   item: Item;
// }
const List = () => {
  

  // fetch data from api
  const [products, setProducts] = useState<any[]>([])
  const fetchData = () => {
    fetch('http://localhost:8080/api/products')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        setProducts(data._embedded.products)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])
  // methods
  // const [cart, setCart] = useState<Item[]>([]);
  //   const {get, post, put, remove, patch} = useAxios();
  //   useEffect(() => {
  //       const fetchCart = async () => {
  //           try {
  //               const response = await get({requestUrl: '/carts'});
  //               setCart(response?.data);
  //           } catch (error) {
  //               console.log(error);
  //           }
  //       }
  //       fetchCart();
  //   }, []);

  //   const addToCart = async ({item} : Props) => {
  //     try {
  //         const response = await post({requestUrl: `/carts/7e018582-7937-48c7-8c49-34e8ae717a15/items`, data: item});
  //         setCart(response?.data);
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }
  //   const removeFromCart = async (id: string, vid: number) => {
  //       try {
  //           const response = await remove({requestUrl: `/carts/${id}/items/${vid}`})
  //           setCart(response?.data);    
  //       } catch (error) {
  //           console.log(error);
  //       }
  //   }

  //   const clearCart = async (id: string) => {
  //       try {
  //           const response = await ({requestUrl: `/carts/${id}/items`})
  //           setCart([]);
  //       } catch (error) {
  //           console.log(error);
  //       }
  //   }

  return (
      <Box>
      <HStack wrap={'wrap'}>
        {products.map((product: any) => {
          return (
            <Box key={product.id}>
              <NextLink href={`/client/products/${product.id}`}>
              <Card item={product} 
                // addToCart={addToCart.bind(this, product)} 
                />
              </NextLink>
                
  
            </Box>
          )
        })}
      </HStack>
      {/* <ProductOverview/> */}
    </Box>

  )
  return (
      <Box>
      <HStack wrap={'wrap'}>
        {products.map((product: any) => {
          return (
            <Box key={product.id}>
              <NextLink href={`/client/products/${product.id}`}>
              <Card item={product} 
                // addToCart={addToCart.bind(this, product)} 
                />
              </NextLink>
                
  
            </Box>
          )
        })}
      </HStack>
      {/* <ProductOverview/> */}
    </Box>

  )
}
export default List

