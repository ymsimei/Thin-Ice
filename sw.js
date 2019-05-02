importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('thinice').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/main.css',
       '/app.js',
       '/audio/theme.mp3'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
