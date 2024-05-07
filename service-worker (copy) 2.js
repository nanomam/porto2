const CACHE_NAME = 'my-site-cache-v3';
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
        return Promise.all(
          urlsToCache.map(url => {
            return fetch(url)
              .then(response => {
                // Set cache-control header for 10 minutes
                const cacheControlHeader = new Headers(response.headers);
                cacheControlHeader.set('Cache-Control', 'max-age=1');
                response = new Response(response.body, { headers: cacheControlHeader });

                // Cache the modified response
                return cache.put(url, response)
                  .then(response => {
                    console.log('Cached request:', url);
                  })
                  .catch(error => {
                    console.error('Failed to cache request:', url, error);
                  });
              })
              .catch(error => {
                console.error('Failed to fetch request:', url, error);
              });
          })
        );
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
