const CACHE_NAME = "qr-pwa-v1.0.0";
const urlsToCache = [
  "/",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/manifest.json",
  "/favicon.ico",
  "/logo192.png",
  "/logo512.png",
];

// Install event - cache resources
self.addEventListener("install", (event) => {
  console.log("[SW] Install event");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[SW] Caching app shell");
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log("[SW] App shell cached");
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activate event");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("[SW] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("[SW] All old caches deleted");
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with fallback to network
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip external requests (different origin)
  if (!request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches
      .match(request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          console.log("[SW] Serving from cache:", request.url);
          return response;
        }

        // Fetch from network and cache for future use
        console.log("[SW] Fetching from network:", request.url);
        return fetch(request).then((response) => {
          // Don't cache if not a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        });
      })
      .catch(() => {
        // Return offline fallback for navigation requests
        if (request.mode === "navigate") {
          return caches.match("/");
        }
        return new Response("Offline - Content not available", {
          status: 503,
          statusText: "Service Unavailable",
        });
      })
  );
});

// Background sync for offline actions (future enhancement)
self.addEventListener("sync", (event) => {
  if (event.tag === "qr-sync") {
    console.log("[SW] Background sync triggered");
    // Handle background sync operations
  }
});

// Push notification handling (future enhancement)
self.addEventListener("push", (event) => {
  console.log("[SW] Push notification received");
  // Handle push notifications
});
