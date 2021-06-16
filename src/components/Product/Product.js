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
          <span>⭐</span>
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
        Add to cart
      </button>
    </section>
  );
};

export default Product;
