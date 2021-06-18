import * as ROUTES from '../../constants/ROUTES';
import * as AC from '../../redux/AC';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { connect } from 'react-redux';
import s from './Header.module.scss';
import { Search, Room, ShoppingCart } from '@material-ui/icons';

const Header = ({ cart, user, logout, country = 'Russian Federation' }) => {
  const [input, setInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
  };
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
                return logout();
              }
            }}
            onClick={() => logout()}>
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
              {cart.length === 0
                ? '0'
                : cart.reduce((acc, item) => acc + +item.count, 0)}
            </span>
          </span>
        </Link>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(AC.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
