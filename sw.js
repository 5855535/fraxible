const CACHE_NAME = 'Teinco-v3';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(['/', 'index.html']);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// ==================== NOTIFICACIONES PUSH ====================
self.addEventListener('push', function(event) {
  const data = event.data.json();
  
  const options = {
    body: data.body || 'Nueva actividad en Teinco curtido',
    icon: 'img/icon (2).png',
    badge: 'img/icon-192.png',
    vibrate: [200, 100, 200],
    data: { 
      url: data.url || 'index.html' 
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Teinco', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
