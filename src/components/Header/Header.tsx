import * as ROUTES from '../../constants/ROUTES'
import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import s from './Header.module.scss'
import { Search, Room, ShoppingCart } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootStore } from '../../redux/store'
import { logout } from '../../redux/AC'

const Header = ({ country = 'Russian Federation' }) => {
  const cart = useSelector((store: RootStore) => store.cart.value)
  const user = useSelector((store: RootStore) => store.user.value)
  const dispatch: AppDispatch = useDispatch()

  const history = useHistory()
  const [input, setInput] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false)
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      history.push(`/search/${input.trim()}`)
    } else {
      history.push(`/`)
    }
  }
  return (
    <header className={s.header}>
      <Link to={ROUTES.HOME}>
        <div className={s.header__logoContainer}>
          <img src="/logo-light.png" alt="Amazon Logo" />
        </div>
      </Link>
      {country && (
        <div className={s.header__location}>
          <div>
            <Room />
          </div>
          <div>
            <span>Deliver to</span>
            <span>{country}</span>
          </div>
        </div>
      )}
      <form
        className={`${s.header__form} ${
          isInputFocused ? s.header__form_focused : ''
        }`}
        onSubmit={handleSearch}>
        <input
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="search"
          aria-label="Search request"
        />
        <button aria-label="search button">
          <Search />
        </button>
      </form>
      <nav className={s.header__nav}>
        {user ? (
          <button
            className={s.header__navItem}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                return dispatch(logout())
              }
            }}
            onClick={() => dispatch(logout())}>
            <span>Hello, {user.displayName}</span>
            <span>Sign Out</span>
          </button>
        ) : (
          <Link className={s.header__navItem} to={ROUTES.SIGN_IN}>
            <span>Hello, Guest!</span>
            <span>Sign In</span>
          </Link>
        )}

        <Link
          className={`${s.header__navItem} ${s.header__navCart}`}
          to={ROUTES.CHECKOUT}
          aria-label="Shopping cart">
          <span>
            <ShoppingCart />
            <span className={s.header__cartCount}>
              {cart && cart.length === 0
                ? '0'
                : !cart
                ? '0'
                : cart.reduce((acc, item) => {
                    if (item.count) {
                      return acc + +item.count
                    } else {
                      return acc
                    }
                  }, 0)}
            </span>
          </span>
        </Link>
      </nav>
    </header>
  )
}

export default Header
