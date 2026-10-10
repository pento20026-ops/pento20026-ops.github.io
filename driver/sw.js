const C='driver-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','icon-192.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
e.respondWith(fetch(e.request).then(r=>{const x=r.clone();caches.open(C).then(c=>c.put(e.request,x));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./'))))});
