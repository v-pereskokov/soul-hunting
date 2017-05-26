const CACHE_NAME = 'my-site-cache-v1';
const URLS = [
  '/',
  '/index.html',
  '/application.tsx',
  '/index.tsx',

  '/static/css/fonts.scss',
  '/static/css/main.scss',
  '/static/css/reset.scss',

  '/static/fonts/AstakhovSkin.otf',
  '/static/fonts/KeepCalm-Medium.ttf',

  '/static/images/arrows.png',
  '/static/images/background.jpg',
  '/static/images/enter_button.png',
  '/static/images/registeredtm.png',
  '/static/images/userphoto.png',
  '/static/images/bullet-icon.png',
  '/static/images/infinity-icon.png',

  '/built/style.css',
  '/built/bundle.js'
];

this.addEventListener('install', event => {
  // установка
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(URLS);
      })
  );
});

this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(response => {
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            }
          );
      })
  );
});
