import { connect } from 'react-redux';
import { useState } from 'react';
import s from '../SignIn-SignUp.module.scss';
import * as AC from '../../redux/AC';
import * as ROUTES from '../../constants/ROUTES';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={s.overlay}>
      <section className={s.container}>
        <Link to={ROUTES.HOME} className={s.logoContainer}>
          <img src="/logo-dark.svg" alt="Amazon Logo" />
        </Link>
        <div className={s.form__container}>
          <h2>Sign Up</h2>
          <form className={s.form} onSubmit={handleSubmit}>
            <label htmlFor="name" className={s.form__label}>
              Your Name
            </label>
            <input
              id="name"
              className={s.form__input}
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
            />
            <label htmlFor="email" className={s.form__label}>
              Email address
            </label>
            <input
              id="email"
              className={s.form__input}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
            />
            <label htmlFor="password" className={s.form__label}>
              Password
            </label>
            <input
              id="password"
              className={s.form__input}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
            <label htmlFor="repeatPassword" className={s.form__label}>
              Repeat password
            </label>
            <input
              id="repeatPassword"
              className={s.form__input}
              onChange={(e) => setRepeatPassword(e.target.value)}
              value={repeatPassword}
              type="password"
            />
            <button className={s.form__button}>Continue</button>
          </form>
          <p className={s.agreement}>
            By continuing, you agree to Amazon's{' '}
            <a href="#1">Conditions of Use</a> and{' '}
            <a href="#1">Privacy Notice</a>.
          </p>
        </div>
        <div className={s.alternative}>
          <p className={s.alternative__title}>
            <span className={s.alternative__title_decoration}></span>
            <span>Already have an account?</span>
            <span className={s.alternative__title_decoration}></span>
          </p>
          <Link className={s.alternative__button} to={ROUTES.SIGN_IN}>
            Sign In
          </Link>
        </div>
      </section>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signIn: (data) => dispatch(AC.signUp(data)),
});

export default connect(null, mapDispatchToProps)(SignUp);
