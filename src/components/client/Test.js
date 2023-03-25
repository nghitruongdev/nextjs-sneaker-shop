import axios from 'axios'
import { useState, useEffect } from 'react'

let global = [];

const Test = () => {
  const [products, setProducts] = useState([]);

  const fetchData = () => {
    fetch('http://localhost:3003/api/products')
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      // .then(data => ({...data}))
      .then((data) => {
        // const items = data._embedded.products.map((item: any) => ({...item, images: [
        //   "http"
        // ]}))
        //  console.log(data._embedded.products)
        // const items = data._embedded.products.map((item: any) => {
        //   item.images = [];
        //   return item;
        global = data._embedded.products;
        //   //* hàm map() nhận 1 object, và return 1 object, convert từ object sang object khác
        //   //khai báo block {} mà không return thì nó sẽ thành undefined
        // })
        //  console.log(items);
        // console.log(global);
        setProducts(data._embedded.products)

        
      })
  }
  useEffect(() => {
    fetchData()
  }, [])
console.log(global);
  return (
    <>
      {global.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </>
  )
}
// console.log(global);
export default Test
