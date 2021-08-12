import s from './Checkout.module.scss'
import FlipMove from 'react-flip-move'
import { Remove, Add } from '@material-ui/icons'
import React, { FormEvent, useState } from 'react'
import { Notification } from '../../components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootStore } from '../../redux/store'
import {
  addNotification,
  removeNotification,
} from '../../redux/reducers/notificationSlice'
import {
  handleAddToCart,
  handleClearCart,
  handleRemoveFromCart,
} from '../../redux/AC'

const Checkout = () => {
  const dispatch: AppDispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(false)
  const notifications = useSelector(
    (store: RootStore) => store.notifications.value
  )
  const cart = useSelector((store: RootStore) => store.cart.value)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const message = 'Sorry payment does not available'
    if (
      notifications?.some((notification) => notification.message === message)
    ) {
      return
    }
    const id = Math.random()
    addNotification({ message, id })
    const timer = setTimeout(() => {
      removeNotification(id)
    }, 5000)
    return () => clearInterval(timer)
  }

  return (
    <div className={s.checkout}>
      <Notification />
      <div className={s.checkout__left}>
        <div className={s.checkout__bannerContainer}>
          <img src="/banner.jpg" alt="" />
        </div>
        <div
          className={`${s.checkout__warning} ${
            cart?.length === 0 ? s.checkout__warning_open : ''
          }`}>
          Your shopping Basket is Empty
        </div>
        <ul className={s.checkout__list}>
          <FlipMove>
            {cart?.map((item) => (
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
                        dispatch(handleRemoveFromCart(item))
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          dispatch(handleRemoveFromCart(item))
                        }
                      }}>
                      <Remove />
                    </button>
                    <p className={s.item__countNumber}>{item.count}</p>
                    <button
                      className={`${s.item__button} ${s.item__button_add}`}
                      onClick={() => {
                        dispatch(handleAddToCart(item))
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          dispatch(handleAddToCart(item))
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
            Subtotal ({cart?.reduce((acc, item) => acc + +item.count, 0)} item
            {cart?.reduce((acc, item) => acc + +item.count, 0) === 1 ? '' : 's'}
            ):{' '}
            <span>$ {cart?.reduce((acc, item) => acc + +item.total, 0)}</span>
          </p>
          <form onSubmit={handleSubmit} className={s.proceed__form}>
            <div>
              <input
                onChange={(e) => setIsChecked(e.target.checked)}
                checked={isChecked}
                type="checkbox"
                id="checkbox"
              />
              <label htmlFor="checkbox">This order contains a gift</label>
            </div>
            <button>Proceed to Payment</button>
          </form>
        </div>
        {cart && cart.length > 0 && (
          <button
            className={s.checkout__clear}
            onClick={() => {
              dispatch(handleClearCart())
            }}
            onKeyDown={(e) => {
              if (e.key == 'Enter') {
                dispatch(handleClearCart())
              }
            }}>
            Clear Basket
          </button>
        )}
      </div>
    </div>
  )
}

export default Checkout
