import {
  AddShoppingCart,
  Star,
  StarHalf,
  StarOutline,
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/ROUTES';
import s from './Product.module.scss';
import { connect } from 'react-redux';
import * as AC from '../../redux/AC';

const Product = ({ product, user, addToCart }) => {
  const history = useHistory();

  return (
    <section className={s.product}>
      <div className={s.product__imageContainer}>
        <img src={product.img} alt="" />
      </div>
      <h2 className={s.product__title}>{product.title}</h2>
      <p className={s.product__rating}>
        {new Array(Math.floor(product.rating)).fill().map((_, i) => (
          <span key={i}>
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
          .map((_, i) => (
            <span key={i}>
              <StarOutline />
            </span>
          ))}
      </p>
      <p className={s.product__price}>{product.price}$</p>
      <button
        onClick={() => {
          if (user) {
            addToCart(product);
          } else {
            history.push(ROUTES.SIGN_IN);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (user) {
              addToCart(product);
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

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(AC.addToCart(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
