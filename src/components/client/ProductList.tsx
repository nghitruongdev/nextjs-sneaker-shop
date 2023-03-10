import Card from '../client/Card'
import { useEffect, useState } from 'react'
import axios from 'axios'
// const data = [
//     {
//       id: 1,
//       name: 'Nike pro vip',
//       // price: 199,
//       // categories: 'Running'
//     },
//     {
//       id: 2,
//       name: 'Nike pro vip 2',
//       // price: 100,
//       // categories: 'Running'
//     },
//     {
//       id: 3,
//       name: 'Nike pro vip 2',
//       // price: 100,
//       // categories: 'Running'
//     },
//     {
//       // id: 4,
//       // name: 'Nike pro vip 4',
//       // price: 99,
//       // categories: 'Running'
//     },

//   ]

import { Box, Flex, Stack, Grid } from '@chakra-ui/react'
import { connect } from 'react-redux';
import { addToCart } from '@/redux/Cart/cart-actions';
const List = () => {
 
  const [products, setProducts] = useState<any>([])
  const fetchData = () => {
    fetch('http://localhost:3003/api/products')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setProducts(data._embedded.products)
      })
  }
  useEffect(() => {
    fetchData();
  },[])

  // const arr = data.map((item) => {
  //     return (

  //         <Card key={item.id} addToCart={addToCart(item.id)} {...item}/>

  //     );
  // })

  return (
    <Box>
      <Grid
        w={'full'}
        gridGap={2}
        gridTemplateColumns="repeat( auto-fit, minmax(300px, 1fr) )"
      >
        {products.map((product: any) => (
          <Card key={product.id} {...product}/>
         ))}
        {/* {arr} */}
      </Grid>
    </Box>
  )
}

// const mapStateToProps = ((state: any) => {
//   return {
//     products: state.cart.products,
//   }
// })

// export default connect (mapStateToProps)(List);
export default List;
