import React, {useState, useEffect} from 'react';
import useAxios from '@/hooks/useAxios';
import Card from '../Card';
import { idText } from 'typescript';

interface Item {
    id: string;
    name: string;
    price: number;
    image: string;
}

interface Props {
    item: Item;
}

const AddToCart: React.FC<Props> = ({item}) => {
    const [cart, setCart] = useState<Item[]>([]);
    const {get, post, put, remove, patch} = useAxios();
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await get({requestUrl: '/carts'});
                setCart(response?.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCart();
    }, []);


    const addToCart = async ({item: {id}} : Props) => {
        try {
            const getCartId = await get()
            const response = await post({requestUrl: `/carts/7e018582-7937-48c7-8c49-34e8ae717a15/items`, data: item});
            setCart(response?.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    const removeFromCart = async (id: string, vid: number) => {
        try {
            const response = await remove({requestUrl: `/carts/${id}/items/${vid}`})
            setCart(response?.data);    
        } catch (error) {
            console.log(error);
        }
    }

    const clearCart = async (id: string) => {
        try {
            const response = await ({requestUrl: `/carts/${id}/items`})
            setCart([]);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
        </>
    );
}
export default AddToCart;