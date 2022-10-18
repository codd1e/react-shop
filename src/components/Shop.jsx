import React, {useState, useEffect, useContext} from "react";
import {ShopContext} from "../context";
import {apiKey, apiUrl} from "../config";
import Preloader from "./Preloader";
import ItemsList from "./ItemsList";
import Cart from "./Cart";
import BasketList from "./BasketList";
import Alert from "./Alert";

function Shop () {
    const {loading, order, isBasket, alertName, setItems} = useContext(ShopContext);

    useEffect(function getItems() {
        fetch(apiUrl, {
            headers: {
                'Authorization': apiKey
            }
        })
            .then(response => response.json())
            .then(data => {
                setItems(data.featured);
            })
    }, [])

    return(
        <main className="container content">
            <Cart quantity = {order.length}/>
            {
                loading ? <Preloader/> : <ItemsList />
            }
            {
                isBasket && <BasketList />
            }
            {alertName && <Alert />}
        </main>
    );
}

export default Shop;