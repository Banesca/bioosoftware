importScripts(
  "https://www.gstatic.com/firebasejs/9.9.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.9.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  messagingSenderId: "963548514145",
});
const messaging = firebase.messaging();

// Opcional: Añade un manejador para recibir los mensajes en segundo plano
messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "/firebase-logo.png",
    data: payload.data,
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  let navigateUrl = event.notification.data.click_action;
  event.waitUntil(clients.openWindow(navigateUrl));
});
