importScripts('https://www.gstatic.com/firebasejs/7.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.0/firebase-messaging.js');

firebase.initializeApp({
 apiKey: "AIzaSyBaF48YoJuAiKgZoAFpyBmhFVSKgqJ5XdY",
 authDomain: "my-project-tenge.firebaseapp.com",
 databaseURL: "https://my-project-tenge-default-rtdb.asia-southeast1.firebasedatabase.app",
 projectId: "my-project-tenge",
 storageBucket: "my-project-tenge.appspot.com",
 messagingSenderId: "426851727180",
 appId: "1:426851727180:web:622af49795d0eea81a81e9"
});

const messaging = firebase.messaging();


// messaging.onBackgroundMessage(function(payload) {
//   console.log('Received background message ', payload);

  // const notificationTitle = payload.notification.title;
  // const notificationOptions = {
  //   body: payload.notification.body,
  // };
  // self.registration.showNotification(notificationTitle,
  //   notificationOptions);
// });


