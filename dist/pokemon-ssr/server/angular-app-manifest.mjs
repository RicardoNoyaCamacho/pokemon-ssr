
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-LUXKYBXK.js"
    ],
    "route": "/about"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-BY6JNOWZ.js"
    ],
    "route": "/pricing"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-VXZEHHVQ.js"
    ],
    "route": "/contact"
  },
  {
    "renderMode": 2,
    "redirectTo": "/about",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 3283, hash: '7a080287a5f947b986dcfe1295984cfede3c881c914e0dc67258ace36b0470dc', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1002, hash: '97d6f62810c19b01d52fc7358e845ed67acb995c2b2c335031e037dc63d6fe03', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 6641, hash: '9f8e9f534d06cfc92ee8da10afe0310a180021519f5003ae663223175ca2b227', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'pricing/index.html': {size: 6657, hash: 'e6f103a46d76c77f887fc73cfad9ca529454cc3049b6d11367f55d396c81c42a', text: () => import('./assets-chunks/pricing_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 6667, hash: '06d5414f597125245ca0f3cc7a84d5e6275d356309da43927c9ce1f8cce3cb2b', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'styles-LPQ6PDRH.css': {size: 6546, hash: 'q6CXhuuvaHs', text: () => import('./assets-chunks/styles-LPQ6PDRH_css.mjs').then(m => m.default)}
  },
};
