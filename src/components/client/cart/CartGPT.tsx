// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, Button } from "react-bootstrap";

// interface Item {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
// }

// interface Props {
//   item: Item;
// }

// const AddToCart: React.FC<Props> = ({ item }) => {
//   const [cart, setCart] = useState<Item[]>([]);

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.get("/api/cart");
//         setCart(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchCart();
//   }, []);

//   const addToCart = async (item: Item) => {
//     try {
//       const response = await axios.post("/api/cart", item);
//       setCart(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const removeFromCart = async (id: number) => {
//     try {
//       const response = await axios.delete(`/api/cart/${id}`);
//       setCart(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const clearCart = async () => {
//     try {
//       const response = await axios.delete("/api/cart");
//       setCart([]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Card style={{ width: "18rem" }}>
//       <Card.Img variant="top" src={item.image} />
//       <Card.Body>
//         <Card.Title>{item.name}</Card.Title>
//         <Card.Text>{item.price}</Card.Text>
//         {cart.some((cartItem) => cartItem.id === item.id) ? (
//           <Button variant="danger" onClick={() => removeFromCart(item.id)}>
//             Remove from Cart
//           </Button>
//         ) : (
//           <Button variant="primary" onClick={() => addToCart(item)}>
//             Add to Cart
//           </Button>
//         )}
//       </Card.Body>
//       {cart.length > 0 && (
//         <Card.Footer>
//           <Button variant="link" onClick={clearCart}>
//             Clear Cart
//           </Button>
//         </Card.Footer>
//       )}
//     </Card>
//   );
// };

// export default AddToCart;
const Chat = () => {
    return (
        <div>
            hello from GPT
        </div>
    );
}

export default Chat;