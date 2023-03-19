import Card from "../client/Card";

const data = [
    {
      id: 1,
      name: 'Nike pro vip',
      price: 199,
      categories: 'Running'
    },
    {
      id: 2,
      name: 'Nike pro vip 2',
      price: 100,
      categories: 'Running'
    },
    {
      id: 3,
      name: 'Nike pro vip 2',
      price: 100,
      categories: 'Running'
    },
    {
      id: 4,
      name: 'Nike pro vip 4',
      price: 99,
      categories: 'Running'
    },
    {
      id: 5,
      name: 'Nike pro vip 4',
      price: 99,
      categories: 'Running'
    },
    {
      id: 6,
      name: 'Nike pro vip 4',
      price: 99,
      categories: 'Running'
    },
    {
      id: 7,
      name: 'Nike pro vip 4',
      price: 99,
      categories: 'Running'
    },
    
  ]
import NextLink from 'next/link'
import {Box, Flex, Stack, Grid} from "@chakra-ui/react"
export default function List() {
    const arr = data.map((item) => {
        return (
          <NextLink href="/client/overview">
            <Card key={item.id} {...item}/>
          </NextLink>
        );
    })

    return (
        <Box>
        <Grid w={'full'} gridGap={2} gridTemplateColumns="repeat( auto-fit, minmax(300px, 1fr) )" >
              {arr}
        </Grid>
        </Box>
    );
}