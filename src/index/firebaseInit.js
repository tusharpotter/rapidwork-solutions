import firebase from "firebase/app";
import "firebase/messaging";

const config = {
  apiKey: "AIzaSyA9l9YgEV4Iun2cQtQNKnXhiHsjoqnMMwI",
  authDomain: "ping-test-c2aa3.firebaseapp.com",
  projectId: "ping-test-c2aa3",
  storageBucket: "ping-test-c2aa3.appspot.com",
  messagingSenderId: "1082191018954",
  appId: "1:1082191018954:web:5fb800579fc484d9fd2d33",
};

firebase.initializeApp(config);
export const messaging = firebase.messaging();

export const getFcmToken = () =>
  new Promise((resolve, reject) => {
    messaging
      .getToken({
        vapidKey: `BDlq8f4CGbCC-5pE5VbJ5MQuJfQzo34HjWAW2SGTGX0QDeRn-JXN4tOuWV0qe-s7zgzz47BoCGcSzj-FmtQDZ-4`,
      })
      .then((currToken) => {
        if (currToken) {
          resolve(currToken);
        } else {
          resolve(null);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
