import {
  AddShoppingCart,
  Star,
  StarHalf,
  StarOutline,
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/ROUTES';
import s from './Product.module.scss';

const Product = ({ product, user, addToCart }) => {
  const history = useHistory();

  return (
    <section className={s.product}>
      <div className={s.product__imageContainer}>
        <img src={product.img} alt="" />
      </div>
      <h2 className={s.product__title}>{product.title}</h2>
      <p className={s.product__rating}>
        {new Array(Math.floor(product.rating)).fill().map(() => (
          <span>
            <Star />
          </span>
        ))}
        {Math.floor(product.rating) !== Math.ceil(product.rating) && (
          <StarHalf />
        )}
        {new Array(
          5 -
            Math.floor(product.rating) -
            (Math.floor(product.rating) !== Math.ceil(product.rating) ? 1 : 0)
        )
          .fill()
          .map(() => (
            <span>
              <StarOutline />
            </span>
          ))}
      </p>
      <p className={s.product__price}>{product.price}$</p>
      <button
        onClick={() => {
          if (user) {
            addToCart(product.id);
          } else {
            history.push(ROUTES.SIGN_IN);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (user) {
              addToCart(product.id);
            } else {
              history.push(ROUTES.SIGN_IN);
            }
          }
        }}
        className={s.product__button}>
        <span className={s.icon}>
          <AddShoppingCart />
        </span>
        <span>Add to cart</span>
      </button>
    </section>
  );
};

export default Product;
