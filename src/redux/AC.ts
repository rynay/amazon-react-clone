import { AppDispatch, RootStore } from './store'
import { firestore, auth } from '../lib/firebase'
import {
  addNotification,
  removeNotification,
} from './reducers/notificationSlice'
import {
  addToCart,
  clearCart,
  removeFromCart,
  setCart,
} from './reducers/cartSlice'
import { setError } from './reducers/errorSlice'
import { setUser } from './reducers/userSlice'

export const init = () => (dispatch: AppDispatch) => {
  const listener = auth.onAuthStateChanged((user: TUser) => {
    const localUser = JSON.parse(localStorage.getItem('user') || '')
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
      dispatch(setUser(user))
      firestore
        .collection('carts')
        .doc(user.uid)
        .get()
        .then(
          (doc: { exists: boolean; data: () => { items: TCartItem[] } }) => {
            if (doc.exists) {
              dispatch(setCart([...doc.data().items]))
            } else {
              firestore.collection('carts').doc(user.uid).set({ items: [] })
              dispatch(clearCart())
            }
          }
        )
    } else if (localUser) {
      dispatch(setUser(localUser))
      firestore
        .collection('carts')
        .doc(localUser.uid)
        .get()
        .then(
          (doc: { exists: boolean; data: () => { items: TCartItem[] } }) => {
            if (doc.exists) {
              dispatch(setCart([...doc.data().items]))
            } else {
              firestore
                .collection('carts')
                .doc(localUser.uid)
                .set({ items: [] })
              dispatch(clearCart())
            }
          }
        )
    } else {
      dispatch(setUser(null))
      dispatch(clearCart())
    }
  })
  return () => listener()
}

export const signIn =
  ({ email, password }: { email: string; password: string }) =>
  (dispatch: AppDispatch) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .catch((error: { message: string }) => dispatch(setError(error.message)))
  }
export const signUp =
  ({
    email,
    password,
    displayName,
  }: {
    email: string
    password: string
    displayName: string
  }) =>
  async (dispatch: AppDispatch) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(() =>
        auth.currentUser.updateProfile({
          displayName,
        })
      )
      .catch((error: { message: string }) => {
        dispatch(setError(error.message))
      })
  }
export const logout = () => {
  localStorage.removeItem('user')
  return (dispatch: Function) => {
    const id = Math.random()
    firebaseLogout().then(() => {
      dispatch(
        addNotification({
          message: `You signed out`,
          id,
        })
      )
      const timer = setTimeout(() => {
        dispatch(removeNotification(id))
      }, 5000)
      return () => clearTimeout(timer)
    })
  }
}

const firebaseLogout = () => {
  return auth.signOut()
}

export const handleAddToCart =
  (payload: TCartItem) =>
  (dispatch: AppDispatch, getState: () => RootStore) => {
    const { path, user } = getState()
    const id = Math.random()
    let timer: any
    dispatch(addToCart(payload))
    if (user.value) {
      firestore
        .collection('carts')
        .doc(user.value.uid)
        .set({ items: getState().cart })
    }
    if (path) {
      dispatch(
        addNotification({
          img: payload.img,
          message: `${payload.title} was added to your cart`,
          id,
        })
      )
      timer = setTimeout(() => {
        dispatch(removeNotification(id))
      }, 5000)
    }
    return () => clearTimeout(timer)
  }
export const handleRemoveFromCart =
  (payload: any) => (dispatch: AppDispatch, getState: () => RootStore) => {
    const { user } = getState()
    dispatch(removeFromCart(payload))
    if (user.value) {
      firestore
        .collection('carts')
        .doc(user.value.uid)
        .set({ items: getState().cart })
    }
  }
export const handleClearCart =
  () => (dispatch: Function, getState: Function) => {
    const { user } = getState()
    dispatch(clearCart())
    firestore.collection('carts').doc(user.uid).set({ items: [] })
  }
