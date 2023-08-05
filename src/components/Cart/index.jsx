import CartHeader from "../CartHeader";
import CartFooter from "../CartFooter";
import Product from "../Product";
import data from './../../data';
import { useState } from "react";

const Cart = () => {
    const [cart, setCart] = useState(data);

    const products = cart.map((product) => {
        return <Product product={product} key={product.id} />
    });

    return (
        <section className="cart">
            <CartHeader />
            {products}
            <CartFooter />
        </section>
    );
}
 
export default Cart;