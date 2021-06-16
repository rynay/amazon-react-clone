import { firebase } from '../lib/firebase';
import * as TYPES from './TYPES';

export const init = () => (dispatch) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  const listener = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } else if (localUser) {
      setUser(localUser);
    } else {
      setUser(null);
    }
  });
  return () => listener();
};

const setUser = (payload) => ({ type: TYPES.SET_USER, payload });
