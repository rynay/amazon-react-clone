import firebase from 'firebase/app';

const config = {
  apiKey: 'AIzaSyARm11HTINNQy9RJ008o86EILr9a3dUwKM',
  authDomain: 'amazo-react-clone.firebaseapp.com',
  projectId: 'amazo-react-clone',
  storageBucket: 'amazo-react-clone.appspot.com',
  messagingSenderId: '191799515558',
  appId: '1:191799515558:web:06599e8c94b2acbd9c1767',
};

const app = firebase.initializeApp(config);

export { app as firebase };
