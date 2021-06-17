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
export const logout = () => {
  localStorage.removeItem('user');
  return auth.signOut();
};

export const setError = (payload) => ({ type: TYPES.SET_ERROR, payload });
const setUser = (payload) => ({ type: TYPES.SET_USER, payload });
export const addToCart = (payload) => ({ type: TYPES.ADD_TO_CART, payload });
export const removeFromCart = (payload) => ({
  type: TYPES.REMOVE_FROM_CART,
  payload,
});
export const clearCart = () => ({ type: TYPES.CLEAR_CART });
