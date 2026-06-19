// 定义缓存名称
let cacheVersion = "default-" + new Date().getTime();
if (self.registration.active && self.registration.active.scriptURL && self.registration.active.scriptURL.match(/[?&]version=([^&#]*)/)) {
    cacheVersion = self.registration.active.scriptURL.match(/[?&]version=([^&#]*)/)[1];
}
var AYOME_CACHE_NAME = "ayome-cache-" + cacheVersion;

// 定义需要缓存的静态资源列表,"/"表示缓存整个网站的资源
var urlsToCache = ["/"];
var cacheExt = ["css", "js", "jpg", "jpeg", "mp4", "html", "png", "ico", "svg", "svga", "ts", "gif", "webp", "txt", "apng", "amr"]; //需要缓存的url文件后缀

//检测这个url是否需要缓存
function checkCacheUrl(url) {
    if (!url || typeof url !== "string") {
        return false;
    }
    for (let i = 0; i < cacheExt.length; i++) {
        if (url.includes("." + cacheExt[i])) {
            return true;
        }
    }
    return false;
}
// 监听 install 事件，进行初始化缓存操作
self.addEventListener("install", event => {
    self.skipWaiting().then(r => {}); //立刻激活此service-worker，旧的service-worker将立刻失效
    event.waitUntil(
        caches.open(AYOME_CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// 监听 fetch 事件，拦截请求并从缓存中返回响应
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            var checkCache = checkCacheUrl(event.request.url);
            // console.log(checkCache, event.request.url);
            // 如果缓存中有匹配的资源，则直接返回缓存
            if (response && checkCache) {
                return response;
            }

            // 否则，发起网络请求并将结果缓存
            return fetch(event.request).then(response => {
                // 检查是否为有效的响应
                if (!response || response.status !== 200 || response.type !== "basic" || !checkCache) {
                    return response;
                }

                // 克隆响应并将其添加到缓存
                const responseToCache = response.clone();
                caches.open(AYOME_CACHE_NAME).then(cache => {
                    if (responseToCache && responseToCache.url.indexOf("http") >= 0) {
                        cache.put(event.request, responseToCache);
                    }
                });

                return response;
            });
        })
    );
});

// 监听 activate 事件，清理旧缓存
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            // console.log("激活 Service worker 事件，cacheNames：" + cacheNames.join(","));
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== AYOME_CACHE_NAME) {
                        return caches.delete(cacheName); //删除不是当前缓存名称的缓存
                    }
                })
            );
        })
    );
});
