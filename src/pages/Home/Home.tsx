import s from './Home.module.scss'
import Slider from '../../components/sliders/Home'
import Product from '../../components/Product'
import { Notification } from '../../components/Notification'
import { products } from '../../products'
import { useRouteMatch } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPath } from '../../redux/reducers/pathSlice'

const Home = () => {
  const dispatch = useDispatch()
  const { path } = useRouteMatch()
  useEffect(() => {
    dispatch(setPath(path))

    return () => {
      dispatch(setPath(null))
    }
  }, [path])

  return (
    <div className={s.home}>
      <Slider />
      <Notification />
      <article className={s.home__products}>
        {[...products]
          .sort((a, b) => b.price - a.price)
          .map((item) => (
            <Product key={item.id} product={item} />
          ))}
      </article>
    </div>
  )
}
export default Home
