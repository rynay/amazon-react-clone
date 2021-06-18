import { connect } from 'react-redux';
import * as AC from '../../redux/AC';
import s from './Checkout.module.scss';
import FlipMove from 'react-flip-move';
import { Remove, Add } from '@material-ui/icons';

const Checkout = ({ cart, addToCart, removeFromCart, clearCart }) => {
  return (
    <div className={s.checkout}>
      <div className={s.checkout__left}>
        <div className={s.checkout__bannerContainer}>
          <img src="/banner.jpg" alt="" />
        </div>
        <ul className={s.checkout__list}>
          <FlipMove>
            {cart.map((item) => (
              <li key={item.id} className={s.item}>
                <div className={s.item__imageContainer}>
                  <img src={item.img} alt="" />
                </div>
                <div className={s.item__content}>
                  <h3>{item.title}</h3>
                </div>
                <div className={s.item__checkout}>
                  <div className={s.item__count}>
                    <button
                      className={`${s.item__button} ${s.item__button_remove}`}
                      onClick={() => {
                        removeFromCart(item);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          removeFromCart(item);
                        }
                      }}>
                      <Remove />
                    </button>
                    <p className={s.item__countNumber}>{item.count}</p>
                    <button
                      className={`${s.item__button} ${s.item__button_add}`}
                      onClick={() => {
                        addToCart(item);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addToCart(item);
                        }
                      }}>
                      <Add />
                    </button>
                  </div>
                  <p className={s.item__total}>
                    <span>Subtotal: </span>
                    <span className={s.item__price}>{item.total} $</span>
                  </p>
                </div>
              </li>
            ))}
          </FlipMove>
        </ul>
      </div>
      <div className={s.checkout__right}>
        <button
          className={s.checkout__removeAll}
          onClick={() => {
            clearCart();
          }}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              clearCart();
            }
          }}>
          Remove All
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});
const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => {
    dispatch(AC.addToCart(item));
  },
  removeFromCart: (item) => {
    dispatch(AC.removeFromCart(item));
  },
  clearCart: () => {
    dispatch(AC.clearCart());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
