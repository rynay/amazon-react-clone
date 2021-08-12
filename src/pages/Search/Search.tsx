import React, { useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { products } from '../../products'
import Product from '../../components/Product'
import { Notification } from '../../components/Notification'
import s from './Search.module.scss'
import { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { setPath } from '../../redux/reducers/pathSlice'

const Search = () => {
  const dispatch: AppDispatch = useDispatch()
  const {
    path,
    params: { query },
  }: {
    path: string
    params: {
      query: string
    }
  } = useRouteMatch()
  useEffect(() => {
    dispatch(setPath(path))

    return () => {
      dispatch(setPath(null))
    }
  }, [path])

  const result = products.filter(
    (product) =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.info.toLowerCase().includes(query.toLowerCase())
  )
  return (
    <>
      <Notification />
      {result.length === 0 && (
        <h3 className={s.warning}>
          No results were found for this request.
          <br /> Try again
        </h3>
      )}
      <article className={s.products}>
        {result.map((item) => (
          <Product key={item.id} product={item} />
        ))}
      </article>
    </>
  )
}

export default Search
