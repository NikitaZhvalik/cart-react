import Count from '../Count';
import ButtonDelete from '../ButtonDelete';
import './style.scss';

const Product = ({product}) => {
    const {img, priceTotal, title, count, id} = product;

    const priceFormatter = new Intl.NumberFormat();

    return (
        <section className="product">
            <div className="product__img"><img src={`./img/products/${img}`} alt={title} /></div>
            <div className="product__title">{title}</div>
            <div className="product__count">
                <Count count={count} id={id}/>
            </div>
            <div className="product__price">{priceFormatter.format(priceTotal)} руб.</div>
            <div className="product__controls">
                <ButtonDelete id={id}/>
            </div>
        </section>
    );
}
 
export default Product;