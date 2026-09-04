const CACHE_NAME = 'control-financiero-v2';

const ARCHIVOS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', function (evento) {
  evento.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ARCHIVOS);
    })
  );

  self.skipWaiting();
});

self.addEventListener('activate', function (evento) {
  evento.waitUntil(
    caches.keys().then(function (nombres) {
      return Promise.all(
        nombres
          .filter(function (nombre) {
            return nombre !== CACHE_NAME;
          })
          .map(function (nombre) {
            return caches.delete(nombre);
          })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener('fetch', function (evento) {
  const solicitud = evento.request;
  const url = new URL(solicitud.url);

  if (solicitud.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  evento.respondWith(
    fetch(solicitud)
      .then(function (respuesta) {
        const copia = respuesta.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(solicitud, copia);
        });

        return respuesta;
      })
      .catch(function () {
        return caches.match(solicitud).then(function (respuestaGuardada) {
          return respuestaGuardada || caches.match('./index.html');
        });
      })
  );
});
