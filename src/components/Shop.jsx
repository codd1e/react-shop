import React, {useState, useEffect} from "react";
import {apiKey, apiUrl} from "../config";
import Preloader from "./Preloader";
import ItemsList from "./ItemsList";
import Cart from "./Cart";
import BasketList from "./BasketList";
import Alert from "./Alert";

function Shop () {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasket, setIsBasket] = useState(false);
    const [alertName, setAlertName] = useState('');

    const handleBasket = () => {
        setIsBasket(!isBasket);
    }

    const closeAlert = () => {
        setAlertName('')
    }

    const addToBasket = (item) => {
        const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id)

        if(itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            };
            setOrder([...order, newItem]);
        }else {
            const newOrder = order.map((orderItem, index) => {
                if(index === itemIndex){
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    };
                }else{
                    return orderItem;
                }
            });
            setOrder(newOrder)
        }
        setAlertName(item.name);
    }

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter(el => el.id !== itemId)
        setOrder(newOrder);
    }

    const incQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if(el.id === itemId) {
                const newQuantity = el.quantity + 1;
                return {
                    ...el,
                    quantity: newQuantity,
                };
            }else{
                return el;
            }
        })
        setOrder(newOrder)
    }

    const decQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if(el.id === itemId) {
                const newQuantity = el.quantity - 1;
                return {
                    ...el,
                    quantity: newQuantity >= 0? newQuantity : 0,
                };
            }else{
                return el;
            }
        })
        setOrder(newOrder)
    }


    useEffect(function getItems() {
        fetch(apiUrl, {
            headers: {
                'Authorization': apiKey
            }
        })
            .then(response => response.json())
            .then(data => {
                data.featured && setItems(data.featured);
                setLoading(false);
            })
    }, [])

    return(
        <main className="container content">
            <Cart quantity = {order.length} handleBasket={handleBasket}/>
            {
                loading ? <Preloader/> : <ItemsList items = {items} addToBasket = {addToBasket}/>
            }
            {
                isBasket && <BasketList order={order} handleBasket={handleBasket} removeFromBasket={removeFromBasket} incQuantity={incQuantity} decQuantity={decQuantity}/>
            }
            {alertName && <Alert name={alertName} closeAlert={closeAlert}/>}
        </main>
    );
}

export default Shop;