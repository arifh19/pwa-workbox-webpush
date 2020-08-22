importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

var urlsToCache = [
  { url: '', revision: '1' },
  { url: 'nav.html"', revision: '1' },
  { url: 'index.html', revision: '1' },
  { url: 'css/materialize.min.css', revision: '1' },
  { url: 'js/materialize.min.js', revision: '1' },
  { url: 'manifest.json', revision: '1' },
  { url: 'js/init.js', revision: '1' },
  { url: 'js/idb.js', revision: '1' },
  { url: 'js/db.js', revision: '1' },
  { url: 'js/nav.js', revision: '1' },
  { url: 'js/api.js', revision: '1' },
  { url: 'js/app.js', revision: '1' },
  { url: 'img/icon.png', revision: '1' },
  { url: 'img/logo.png', revision: '1' },
  { url: 'img/null.png', revision: '1' },
  { url: 'img/icon-144px.png', revision: '1' },
  { url: 'img/icon-192px.png', revision: '1' },
]

if(workbox){
  workbox.precaching.precacheAndRoute(urlsToCache);
  workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ]
    })
  );
  
  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.networkFirst({
      cacheName: 'api-data',
    })
  )
  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts',
    })
  );
}

self.addEventListener('push', (event) => {
  var body;

  console.log(event);

  if(event.data) {
    body = event.data.text()
  } else {
    body = "This is push message"
  }

  var options = {
    body: body,
    icon: '/img/ball.png',
    vibrate: [500, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  }

  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});