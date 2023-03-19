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


    const addToCart = async (item: Item) => {
        try {
            const response = await post({requestUrl: '/carts', data: item});
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
        <Card>

        </Card>
    );
}
export default AddToCart;