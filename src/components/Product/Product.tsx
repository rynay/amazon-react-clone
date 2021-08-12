import React from 'react'
import {
  AddShoppingCart,
  Star,
  StarHalf,
  StarOutline,
} from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import * as ROUTES from '../../constants/ROUTES'
import s from './Product.module.scss'
import { handleAddToCart } from '../../redux/AC'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootStore } from '../../redux/store'

type Props = {
  product: TProduct
}

const Product = ({ product }: Props) => {
  const history = useHistory()
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((store: RootStore) => store.user.value)

  return (
    <section className={s.product}>
      <div className={s.product__imageContainer}>
        <img src={product.img} alt="" />
      </div>
      <h2 className={s.product__title}>{product.title}</h2>
      <p className={s.product__rating}>
        {new Array(Math.floor(product.rating)).fill(null).map((_, i) => (
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
          .fill(null)
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
            dispatch(handleAddToCart(product))
          } else {
            history.push(ROUTES.SIGN_IN)
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (user) {
              dispatch(handleAddToCart(product))
            } else {
              history.push(ROUTES.SIGN_IN)
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
  )
}

export default Product
