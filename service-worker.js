const CACHE_NAME = 'catatan-cache-v1';
const urlsToCache = [
    "./",
    "./index.html",
    "./manifest.json",
    "./service-worker.js",
    "./favicon.ico",
    "./icon-192x192.png",
    "./icon-512x512.png",
  
];

// Install service worker dan cache file
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Menyajikan cache jika offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Jika cache ada, gunakan cache
        return response || fetch(event.request);
      })
  );
});

// Menghapus cache lama saat service worker baru diaktifkan
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
});
