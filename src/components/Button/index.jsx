import { useContext } from "react";
import { AppContext } from "../Cart";

import './style.scss';

const Button = ({title}) => {
    const {addProduct} = useContext(AppContext);

    return (
        <button onClick={addProduct} className="btn-add">{title}</button>
    );
}
 
export default Button;