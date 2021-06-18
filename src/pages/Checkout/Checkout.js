import { connect } from 'react-redux';
import * as AC from '../../redux/AC';
import s from './Checkout.module.scss';
import FlipMove from 'react-flip-move';
import { Remove, Add } from '@material-ui/icons';
import { useState } from 'react';
import { Notification } from '../../components/Notification';

const Checkout = ({
  cart,
  addNotification,
  removeNotification,
  notifications,
  addToCart,
  removeFromCart,
  clearCart,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = 'Sorry payment does not available';
    if (
      notifications?.some((notification) => notification.message === message)
    ) {
      return;
    }
    const id = Math.random();
    addNotification({ message, id });
    const timer = setTimeout(() => {
      removeNotification(id);
    }, 5000);
    return () => clearInterval(timer);
  };

  return (
    <div className={s.checkout}>
      <Notification />
      <div className={s.checkout__left}>
        <div className={s.checkout__bannerContainer}>
          <img src="/banner.jpg" alt="" />
        </div>
        <div
          className={`${s.checkout__warning} ${
            cart.length === 0 ? s.checkout__warning_open : ''
          }`}>
          Your shopping Basket is Empty
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
                    <span>Price: </span>
                    <span className={s.item__price}>$ {item.total}</span>
                  </p>
                </div>
              </li>
            ))}
          </FlipMove>
        </ul>
      </div>
      <div className={s.checkout__right}>
        <div className={s.proceed}>
          <p className={s.proceed__subtotal}>
            Subtotal ({cart.reduce((acc, item) => acc + +item.count, 0)} item
            {cart.reduce((acc, item) => acc + +item.count, 0) === 1 ? '' : 's'}
            ): <span>$ {cart.reduce((acc, item) => acc + +item.total, 0)}</span>
          </p>
          <form onSubmit={handleSubmit} className={s.proceed__form}>
            <div>
              <input
                onChange={(e) => setIsChecked(e.target.value)}
                value={isChecked}
                type="checkbox"
                id="checkbox"
              />
              <label htmlFor="checkbox">This order contains a gift</label>
            </div>
            <button>Proceed to Payment</button>
          </form>
        </div>
        {cart.length > 0 && (
          <button
            className={s.checkout__clear}
            onClick={() => {
              clearCart();
            }}
            onKeyDown={(e) => {
              if (e.key == 'Enter') {
                clearCart();
              }
            }}>
            Clear Basket
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  notifications: state.notifications,
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
  addNotification: (notification) => dispatch(AC.addNotification(notification)),
  removeNotification: (id) => dispatch(AC.removeNotification(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
