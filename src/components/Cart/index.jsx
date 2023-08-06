import { useEffect, useState, createContext} from "react";

import CartHeader from "../CartHeader";
import CartFooter from "../CartFooter";
import Product from "../Product";
import Button from "../Button";

import {serverPath} from './../../helpers/variables';

export const AppContext = createContext(null);
 
const Cart = () => {
    const [cart, setCart] = useState(null);
    const [total, setTotal] = useState(null);
    const [fetchData, setFetchData] = useState(true);

    useEffect(() => {
        fetch(serverPath + 'products')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setCart(data)
        })
    }, [fetchData])

    useEffect(() => {
        if (cart) {
            setTotal({
                price: cart.reduce((prev, curr) => prev + curr.priceTotal, 0), 
                count: cart.reduce((prev, curr) => prev + curr.count, 0), 
            })
        }
    }, [cart])

    const deleteProduct = (id) => {
        fetch(serverPath + `products/${id}`, {
        method: 'DELETE'
        })
        .then((response) => {
            if (response.ok) setFetchData((value) => !value)
        })
    }

    const increase = (id) => {
        const product = cart.find((product) => product.id === id);
        const data =  {
            ...product,
            count: ++product.count,
            priceTotal: ++product.count * product.price
        }

        fetch(serverPath + `products/${id}`, {
            method: "PUT",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (response.ok) setFetchData((value) => !value)
        })
    }

    const decrease = (id) => {
        const product = cart.find((product) => product.id === id);
        const newCount = product.count - 1 > 1 ? product.count - 1 : 1;

        const data =  {
            ...product,
            count: newCount,
            priceTotal: newCount * product.price
        }

        fetch(serverPath + `products/${id}`, {
            method: "PUT",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (response.ok) setFetchData((value) => !value)
        })
    }

    const changeValue = (id, value) => {
        const product = cart.find((product) => product.id === id);
        const data =  {
            ...product,
            count: value,
            priceTotal: value * product.price
        }

        fetch(serverPath + `products/${id}`, {
            method: "PUT",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (response.ok) setFetchData((value) => !value)
        })
    }

    const addProduct = () => {
        
        const titles = ['Apple Macbook air 13', 'Apple Watch', 'Apple Macbook Pro'];
        const imgs = ['macbook.jpg', 'apple-watch.jpg', 'mac-pro.jpg'];
        const prices = [29000, 110000, 180000];
        
        const renderValue = (array) => {
            return array[Math.floor(Math.random() * array.length)]
        }
        const price = renderValue(prices)

        const data = {
            img: renderValue(imgs),
            title: renderValue(titles),
            count: 1,
            price: price,
            priceTotal: price
        }

        fetch(serverPath + `products/`, {
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (response.ok) setFetchData((value) => !value)
        })
    }

    const products = () => {
        return cart.map((product) => {
            return <Product 
                product={product} 
                key={product.id} 
            />
        })
    }

    return (
        <AppContext.Provider value={{deleteProduct, increase, decrease, changeValue, addProduct}}>
            <section className="cart">
                <Button title='Add product'/>
                <CartHeader />
                {cart && products()}
                {total && <CartFooter total={total}/>}
            </section>
        </AppContext.Provider>
    );
}
 
export default Cart;