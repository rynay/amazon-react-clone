import { connect } from 'react-redux';
import { useState } from 'react';
import s from '../SignIn-SignUp.module.scss';
import * as AC from '../../redux/AC';
import * as ROUTES from '../../constants/ROUTES';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const SignIn = ({ error, setError, signIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      signIn({ email, password });
    }
  };

  useEffect(() => {
    if (error) setError(null);
  }, [email, password]);

  return (
    <div className={s.overlay}>
      <section className={s.container}>
        <Link to={ROUTES.HOME} className={s.logoContainer}>
          <img src="/logo-dark.svg" alt="Amazon Logo" />
        </Link>
        <div className={s.form__container}>
          <h2>Sign In</h2>
          <div className={`${s.warning} ${error ? s.warning_open : ''}`}>
            {error}
          </div>
          <form className={s.form} onSubmit={handleSubmit}>
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
            <button className={s.form__button}>Continue</button>
          </form>
          <p className={s.agreement}>
            By continuing, you agree to Amazon's
            <a href="#1">Conditions of Use</a> and{' '}
            <a href="#1">Privacy Notice</a>.
          </p>
        </div>
        <div className={s.alternative}>
          <p className={s.alternative__title}>
            <span className={s.alternative__title_decoration}></span>
            <span>New to Amazon?</span>
            <span className={s.alternative__title_decoration}></span>
          </p>
          <Link className={s.alternative__button} to={ROUTES.SIGN_UP}>
            Create your Amazon account
          </Link>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (data) => dispatch(AC.signIn(data)),
  setError: (data) => dispatch(AC.setError(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
