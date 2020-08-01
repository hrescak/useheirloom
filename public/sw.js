if (!self.define) {
  const e = (e) => {
      "require" !== e && (e += ".js")
      let s = Promise.resolve()
      return (
        c[e] ||
          (s = new Promise(async (s) => {
            if ("document" in self) {
              const c = document.createElement("script")
              ;(c.src = e), document.head.appendChild(c), (c.onload = s)
            } else importScripts(e), s()
          })),
        s.then(() => {
          if (!c[e]) throw new Error(`Module ${e} didn’t register its module`)
          return c[e]
        })
      )
    },
    s = (s, c) => {
      Promise.all(s.map(e)).then((e) => c(1 === e.length ? e[0] : e))
    },
    c = { require: Promise.resolve(s) }
  self.define = (s, a, n) => {
    c[s] ||
      (c[s] = Promise.resolve().then(() => {
        let c = {}
        const i = { uri: location.origin + s.slice(1) }
        return Promise.all(
          a.map((s) => {
            switch (s) {
              case "exports":
                return c
              case "module":
                return i
              default:
                return e(s)
            }
          })
        ).then((e) => {
          const s = n(...e)
          return c.default || (c.default = s), c
        })
      }))
  }
}
define("./sw.js", ["./workbox-432e0d0b"], function (e) {
  "use strict"
  importScripts(),
    e.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/chunks/29107295.1a770439c6736fe21987.js",
          revision: "ba4cfe8e3f4441ee8e66f9ca601fb347",
        },
        {
          url:
            "/_next/static/chunks/363ad9fbe1e067d7ab975ed0de362d3074bb68f3.725227a519e621e2cd22.js",
          revision: "dca9561134492d97b6e7a705186fb672",
        },
        {
          url:
            "/_next/static/chunks/511e3314d4ccf83cab89aa4c2e44ba87804f0d1f.e52476e0f6c518a926b6.js",
          revision: "c3c72a59a64ca40aa7a0179de4619fd5",
        },
        {
          url:
            "/_next/static/chunks/5422e4e7da8ee6666778d3a0f51fc4cddc421e39.f1ec96e203d31eae16bd.js",
          revision: "e3774c6f615aaf05e17aae76ae335bf1",
        },
        {
          url:
            "/_next/static/chunks/68217a4de708aec2f82559271c4fe138a012db0c.ca974049e59cddbe4844.js",
          revision: "8f7514e985de9346a85468ab6c4e6b6c",
        },
        {
          url:
            "/_next/static/chunks/96e17f12bf10db8fea552f5979c7b1ad713c46c1.74bade93c836d23ac92a.js",
          revision: "a95c93c4997437dcc12ee37195fa1c70",
        },
        {
          url: "/_next/static/chunks/bee240a3.0996fa4612ab76c15311.js",
          revision: "bd4320f0572d093ef7af0c5c791cbdc6",
        },
        {
          url:
            "/_next/static/chunks/cc4dcefa84ffbd5dee6cb9476b0be07a5d71717e.2f7b9c95d64f7408fdae.js",
          revision: "27131713abff1af3c59f6aefb1c3ac2d",
        },
        {
          url: "/_next/static/chunks/commons.b19af3ffebb408f580f7.js",
          revision: "658e529606900ef17b274538692702ab",
        },
        {
          url: "/_next/static/chunks/framework.a5d4ffe593e18b49243e.js",
          revision: "1c8c47501f8a83e7cbef6220665aa75a",
        },
        {
          url: "/_next/static/chunks/main-ab49a3699af7188c64a9.js",
          revision: "d4e959a48b901dac539473d992a173b4",
        },
        {
          url: "/_next/static/chunks/pages/_app-56e42c5cff2877f3419c.js",
          revision: "760e93e9987ad3c0851bf97365b0bded",
        },
        {
          url: "/_next/static/chunks/pages/_error-f2091c44c4b18e991b48.js",
          revision: "e555deeab2e860c2b78831c13660c132",
        },
        {
          url: "/_next/static/chunks/pages/index-042d98350343a9471e16.js",
          revision: "28c42d012365b85caf7fc36a370217ce",
        },
        {
          url: "/_next/static/chunks/pages/letsgo-69fa1f9c43f63d26b4eb.js",
          revision: "72fe67e35faac283c1246a1c581d3109",
        },
        {
          url: "/_next/static/chunks/pages/login-309ef2e5423fee7a86fa.js",
          revision: "59ab7c8ccfcb36cecbf0e002638fe02d",
        },
        {
          url:
            "/_next/static/chunks/pages/r/%5Bslug%5D-5ba0632a46f174abac0f.js",
          revision: "697c5409c2e569d92671efa0630edd70",
        },
        {
          url:
            "/_next/static/chunks/pages/r/%5Bslug%5D/edit-16a2b15683b3e89f50c4.js",
          revision: "8b5709efd7572693860c5f620c0d88ef",
        },
        {
          url:
            "/_next/static/chunks/pages/user/settings-080f0ad5c8ab9315936a.js",
          revision: "644f92a0686c89d9244a2e59b6932ed1",
        },
        {
          url: "/_next/static/chunks/polyfills-a2ec81a3b359d83082c2.js",
          revision: "f4753f5bb3f3e8328e365bc01c1d91dd",
        },
        {
          url: "/_next/static/chunks/webpack-488dc228921f1fdbc0e7.js",
          revision: "8c19f623e8389f11131a054a7e17ff95",
        },
        {
          url: "/_next/static/oA_DB848tcWrfV8CnahLl/_buildManifest.js",
          revision: "a3f6852e3d554d50b7b4c042663fb892",
        },
        {
          url: "/_next/static/oA_DB848tcWrfV8CnahLl/_ssgManifest.js",
          revision: "abee47769bf307639ace4945f9cfd4ff",
        },
        {
          url: "/images/heirloom.svg",
          revision: "b0d14f2acf1314f320d5712bd9824e3e",
        },
        {
          url: "/images/icons/favicon-16x16.png",
          revision: "e8036d8d51b85fb2191df155cd29e289",
        },
        {
          url: "/images/icons/favicon-32x32.png",
          revision: "57de1698d370a1a35e212c95416b3524",
        },
        {
          url: "/images/icons/favicon-48x48.png",
          revision: "296e5afb221c6d0819879f694496e5f5",
        },
        {
          url: "/images/icons/favicon-96x96.png",
          revision: "7cddf624a7369a1fd8cdc01f08c73ebb",
        },
        {
          url: "/images/icons/icon-128x128.png",
          revision: "dbe74775486f25a9ee2f298740c86c9f",
        },
        {
          url: "/images/icons/icon-144x144.png",
          revision: "443566c1542a8d724d8b6cde34f47efa",
        },
        {
          url: "/images/icons/icon-152x152.png",
          revision: "945bc8d93797ab516344492971c23b1b",
        },
        {
          url: "/images/icons/icon-192x192.png",
          revision: "b69990ecf40e6fdbffe78be126163090",
        },
        {
          url: "/images/icons/icon-256x256.png",
          revision: "2e1250f1bdf7a73893ed6923fc04bc54",
        },
        {
          url: "/images/icons/icon-384x384.png",
          revision: "4ffea3b762032c2f49ed2ed93b1037dd",
        },
        {
          url: "/images/icons/icon-512x512.png",
          revision: "eb1bf238c86a44e37951a0a7cf633475",
        },
        {
          url: "/images/icons/icon-72x72.png",
          revision: "674bc901f52d6a3d4751adb6fd5c8c21",
        },
        {
          url: "/images/icons/icon-96x96.png",
          revision: "32f3b32e75891c5040fec44011c54968",
        },
        {
          url: "/images/splash/launch-1125x2436.png",
          revision: "305911b4240e76eaf1f647f90f6735ba",
        },
        {
          url: "/images/splash/launch-1242x2148.png",
          revision: "266261b37df57ba45c123284124e4e41",
        },
        {
          url: "/images/splash/launch-1536x2048.png",
          revision: "db5fbcdb3299206f6ab1ccb6d9d08524",
        },
        {
          url: "/images/splash/launch-1668x2224.png",
          revision: "85f88f49db230906150c7a243f9fc5a1",
        },
        {
          url: "/images/splash/launch-2048x2732.png",
          revision: "959a0ecd13cc46ca1c916e168a7a064b",
        },
        {
          url: "/images/splash/launch-640x1136.png",
          revision: "ef58fe48e70553f24f6e44770bf28272",
        },
        {
          url: "/images/splash/launch-750x1294.png",
          revision: "a8b6721463dbe8ba85aee59be707629c",
        },
        {
          url: "/images/welcome.svg",
          revision: "d9f5ecc27c053a04022146e9da39b70c",
        },
        { url: "/manifest.json", revision: "b3c4130c6dfe5158ac321455e00d8ec5" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 1,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 31536e3,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/api\/.*$/i,
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /.*/i,
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    )
})
