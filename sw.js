// sw.js - K-Path v3.5
// 캐시 버전이 바뀌어도 localStorage 데이터는 절대 삭제되지 않음
const CACHE_NAME = 'kpath-v3.5';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // 오래된 캐시만 삭제 — localStorage는 건드리지 않음
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(c => c || fetch(e.request)));
});
