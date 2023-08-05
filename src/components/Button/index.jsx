import './style.scss';

const Button = ({title, onClick}) => {
    return (
        <button onClick={onClick} className="btn-add">{title}</button>
    );
}
 
export default Button;