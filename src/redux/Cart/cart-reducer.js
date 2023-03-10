import * as actionTypes from './cart-types'
// import productData * productdata;
import { useState, useEffect } from 'react';

let global = [];

const data = () => {
  const [productsData, setProductsData] = useState();
  const fetchData = () => {
    fetch('http://localhost:3003/api/products')
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then(data => ({...data}))
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
        setProductsData(data._embedded.products)
        return global;
        
      })
  }
  useEffect(() => {
    fetchData()
  }, [])
}

// console.log(global);

const initialState = {
  products: global,
  // id = productdata.id,
  // products: [
  //    {
  //     id: 1,
  //     title: "This is the COOLEST Cube Ever",
  //     description:
  //       "This cube will keep you busy the entire day and it is very fun to play with",
  //     price: 15.0,
  //     image:
  //       "https://images.unsplash.com/photo-1591991731833-b4807cf7ef94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  //   },
  //   {
  //     id: 2,
  //     title: "Large Coffee Cup",
  //     description:
  //       "Get a big cup of coffee every morning before the day starts",
  //     price: 20.0,
  //     image:
  //       "https://images.unsplash.com/photo-1572119865084-43c285814d63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  //   },
  //   {
  //     id: 3,
  //     title: "Books That CHANGED My Life",
  //     description:
  //       "These books will keep you busy all throughout the entire lockdown and give you some great advise from famous people",
  //     price: 150.0,
  //     image:
  //       "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1374&q=80",
  //   },
  // ], // Id, name, price, category
  cart: [], // id, name, price, quantity
  currentItem: null,
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // get item data from products data
      const item = state.products.find((prod) => prod.id === action.payload.id)
      // check if the cart has already been added
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      )
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      }
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      }
    case actionTypes.ADJUST_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      }
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      }
    default:
      return state
  }
}

export default cartReducer
