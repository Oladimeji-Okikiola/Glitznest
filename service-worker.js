

// service-worker.js
self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open('v1').then((cache) => {
          return Promise.all([
              '/index.html',
              '/categories/Bathroom.html',
              '/categories/Clothing.html',
              '/categories/homeDecoration.html',
              '/categories/KitchenUtensils.html',
              '/categories/Laundary.html',
              '/categories/others.html',
              '/categories/phoneAccessories.html',
              '/shop.html',
              '/css/bootstrap.css',
              '/css/responsive.css',
              '/css/style.css',
              '/css/font-awesome.min.css',
              '/fonts/fontawesome-webfont.ttf',
              '/fonts/fontawesome-webfont.woff',
              '/fonts/fontawesome-webfont.woff2',
              '/fonts/octin_sports_rg.ttf',
              '/images/about-img.jpg',
              '/images/b1.jpg',
              '/images/b2.jpg',
              '/images/bathroom access.jpeg',
              '/images/client.jpg',
              '/images/favicon.png',
              '/images/home aceessories.jpeg',
              '/images/jeweleriesss.jpeg',
              '/images/kitchen new.jpg',
              '/images/kitchenUtensils.jpeg',
              '/images/o1.jpg',
              '/images/o2.jpg',
              '/images/o3.jpg',
              '/images/p1.png',
              '/images/p2.png',
              '/images/p3.png',
              '/images/p4.png',
              '/images/p5.png',
              '/images/p6.png',
              '/images/p7.png',
              '/images/p8.png',
              '/images/slider-bg.jpg',
              '/js/bootstrap.js',
              '/js/custom.js',
              '/js/jquery-3.4.1.min.js',
              '/about.html',
              '/admin.html',
              '/admin.js',
              '/adminFirst.html',
              '/blog.html',
              '/manifest.json'
          ].map(url => {
              return fetch(url).then(response => {
                  if (!response.ok) {
                      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
                  }
                  return cache.add(url);
              }).catch(error => {
                  console.error('Caching failed:', error);
              });
          }));
      })
  );
});
