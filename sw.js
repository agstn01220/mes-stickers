// Service worker : garde l'app disponible hors ligne (les photos, elles, sont dans IndexedDB).
const CACHE = "mes-stickers-v17";
const SHELL = [
  "./", "./index.html", "./manifest.webmanifest", "./icon.svg", "./icon-192.png", "./icon-512.png", "./countries.geojson",
  "https://cdnjs.cloudflare.com/ajax/libs/maplibre-gl/5.24.0/maplibre-gl.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/maplibre-gl/5.24.0/maplibre-gl.min.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// App et librairies : réseau d'abord (pour recevoir les mises à jour), cache si hors ligne.
// Si le site répond par une erreur (page introuvable, panne GitHub…), on garde la dernière
// version qui marchait au lieu de la remplacer par la page d'erreur.
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  if (url.origin !== location.origin && url.hostname !== "cdnjs.cloudflare.com") return;
  const cached = () => caches.match(e.request, { ignoreSearch: true });
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; }
        return cached().then(c => c || res);
      })
      .catch(cached)
  );
});
