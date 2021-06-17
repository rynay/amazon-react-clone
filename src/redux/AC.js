import { firestore, auth } from '../lib/firebase';
import * as TYPES from './TYPES';

export const init = () => (dispatch) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  const listener = auth.onAuthStateChanged((user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(setUser(user));
    } else if (localUser) {
      dispatch(setUser(localUser));
    } else {
      dispatch(setUser(null));
    }
  });
  return () => listener();
};

export const signIn =
  ({ email, password }) =>
  (dispatch) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => dispatch(setError(error.message)));
  };
export const signUp =
  ({ email, password, displayName }) =>
  async (dispatch) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(() =>
        auth.currentUser.updateProfile({
          displayName,
        })
      )
      .catch((error) => {
        dispatch(setError(error.message));
      });
  };
export const logout = () => (dispatch) => {
  const id = Math.random();
  localStorage.removeItem('user');
  firebaseLogout().then(() => {
    dispatch(
      addNotification({
        message: `You signed out`,
        id,
      })
    );
    const timer = setTimeout(() => {
      dispatch(removeNotification(id));
    }, 5000);
    return () => clearTimeout(timer);
  });
};

const firebaseLogout = () => {
  return auth.signOut();
};

export const setError = (payload) => ({ type: TYPES.SET_ERROR, payload });
const setUser = (payload) => ({ type: TYPES.SET_USER, payload });
export const addToCart = (payload) => (dispatch) => {
  const id = Math.random();
  dispatch({ type: TYPES.ADD_TO_CART, payload });
  dispatch(
    addNotification({
      img: payload.img,
      message: `${payload.title} was added to your cart`,
      id,
    })
  );
  const timer = setTimeout(() => {
    dispatch(removeNotification(id));
  }, 5000);
  return () => clearTimeout(timer);
};
export const removeFromCart = (payload) => ({
  type: TYPES.REMOVE_FROM_CART,
  payload,
});
export const clearCart = () => ({ type: TYPES.CLEAR_CART });

const addNotification = (payload) => ({
  type: TYPES.ADD_NOTIFICATION,
  payload,
});
export const removeNotification = (payload) => ({
  type: TYPES.REMOVE_NOTIFICATION,
  payload,
});
