import * as ROUTES from '../../constants/ROUTES';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import s from './Header.module.scss';
import { Search, Room, ShoppingCart } from '@material-ui/icons';

const Header = ({ user, logout, country = 'Russian Federation' }) => {
  const [input, setInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
  };
  return (
    <header className={s.header}>
      <Link to={ROUTES.HOME}>
        <div className={s.header__logoContainer}>
          <img src="/logo.png" alt="Amazon Logo" />
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
          <button className={s.header__navItem} onClick={() => logout()}>
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
          className={s.header__navItem}
          to={user ? ROUTES.RETURNS_AND_ORDERS : ROUTES.SIGN_IN}>
          <span>Returns</span>
          <span>& Orders</span>
        </Link>
        <Link
          className={`${s.header__navItem} ${s.header__navCart}`}
          to={user ? ROUTES.CHECKOUT : ROUTES.SIGN_IN}
          aria-label="Shopping cart">
          <span>
            <ShoppingCart />
            <span>5</span>
          </span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
