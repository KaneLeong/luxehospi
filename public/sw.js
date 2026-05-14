const CACHE_NAME = 'luxehospi-v1';
const PRECACHE_URLS = [
  '/',
  '/fonts/fonts.css',
  '/fonts/inter-400.woff2',
  '/fonts/inter-500.woff2',
  '/fonts/inter-600.woff2',
  '/fonts/inter-700.woff2',
  '/fonts/montserrat-600.woff2',
  '/fonts/montserrat-700.woff2',
  '/logo-icon.webp',
  '/logo-icon.png',
];

// Cache-first: fonts, JS, CSS, images (all hashed or immutable)
const CACHE_FIRST_EXTENSIONS = [
  '.woff2', '.woff', '.ttf', '.otf',
  '.js', '.css',
  '.webp', '.avif', '.jpg', '.jpeg', '.png', '.gif', '.svg',
];

// Network-first: HTML pages and API calls
const NETWORK_FIRST = [
  '/', '/index.html',
];

// Install: precache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch strategy
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET and cross-origin
  if (event.request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;

  // Network-first for HTML
  if (NETWORK_FIRST.some((path) => url.pathname === path)) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // Cache-first for static assets
  if (CACHE_FIRST_EXTENSIONS.some((ext) => url.pathname.endsWith(ext))) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // Network-first for API calls
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(event.request, 3000)); // 3s timeout
    return;
  }
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('', { status: 408, statusText: 'Offline' });
  }
}

async function networkFirst(request, timeout = 5000) {
  try {
    const response = await Promise.race([
      fetch(request),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), timeout)
      ),
    ]);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}
