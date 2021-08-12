import { FormEvent, useState } from 'react'
import s from '../SignIn-SignUp.module.scss'
import * as ROUTES from '../../constants/ROUTES'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { AppDispatch, RootStore } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../../redux/AC'
import { setError } from '../../redux/reducers/errorSlice'

const SignUp = () => {
  const dispatch: AppDispatch = useDispatch()
  const error = useSelector((store: RootStore) => store.error.value)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      password === repeatPassword &&
      name.trim() &&
      email.trim() &&
      password.trim() &&
      repeatPassword.trim()
    ) {
      dispatch(signUp({ email, password, displayName: name }))
    }
  }

  useEffect(() => {
    if (error) dispatch(setError(null))
  }, [name, email, password, repeatPassword])

  return (
    <div className={s.overlay}>
      <section className={s.container}>
        <Link to={ROUTES.HOME} className={s.logoContainer}>
          <img src="/logo-dark.svg" alt="Amazon Logo" />
        </Link>
        <div className={s.form__container}>
          <h2>Sign Up</h2>
          <div className={`${s.warning} ${error ? s.warning_open : ''}`}>
            {error}
          </div>
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
  )
}

export default SignUp
