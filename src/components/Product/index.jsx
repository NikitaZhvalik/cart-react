import Count from '../Count';
import ButtonDelete from '../ButtonDelete';
import './style.scss';

const Product = ({product, deleteProduct, increase, decrease, changeValue}) => {
    const {img, priceTotal, title, count, id} = product;
    return (
        <section className="product">
            <div className="product__img"><img src={`./img/products/${img}`} alt={title} /></div>
            <div className="product__title">{title}</div>
            <div className="product__count">
                <Count count={count} increase={increase} decrease={decrease} changeValue={changeValue} id={id}/>
            </div>
            <div className="product__price">{priceTotal}руб.</div>
            <div className="product__controls">
                <ButtonDelete deleteProduct={deleteProduct} id={id}/>
            </div>
        </section>
    );
}
 
export default Product;