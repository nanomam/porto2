const CACHE_NAME = 'my-site-cache-v2';
const urlsToCache = [
  '/',
  '/sprite_30fps.svg',
  '/index.html',
  '/8.webp',
  '/website.html',
  '/responsive.js',
  '/s2.js',
  '/swiper.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', function(event) {
  // Delete old caches
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Recache every 3 hours
setInterval(function() {
  caches.open(CACHE_NAME).then(function(cache) {
    cache.addAll(urlsToCache);
  });
}, 3 * 60 * 60 * 1000); // 3 hours in milliseconds
