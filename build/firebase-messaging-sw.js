importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

const config = {
  apiKey: "AIzaSyA9l9YgEV4Iun2cQtQNKnXhiHsjoqnMMwI",
  authDomain: "ping-test-c2aa3.firebaseapp.com",
  projectId: "ping-test-c2aa3",
  storageBucket: "ping-test-c2aa3.appspot.com",
  messagingSenderId: "1082191018954",
  appId: "1:1082191018954:web:5fb800579fc484d9fd2d33",
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "/firebase-logo.png",
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  console.log(event);
  return event;
});
