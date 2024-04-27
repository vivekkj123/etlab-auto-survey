import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  name: 'ETLAB Auto Survey Filler',
  description: 'Simple chrome extension for filling all surveys at one click',
  version: '1.0.0',
  manifest_version: 3,
  icons: {
    16: 'img/logo-16.png',
    32: 'img/logo-34.png',
    48: 'img/logo-48.png',
    128: 'img/logo-128.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/logo-48.png',
  },
  background: {
    service_worker: 'src/background/index.js',
    type: 'module',
  },
  host_permissions: ['http://*.etlab.in/survey/*/*', 'https://*.etlab.in/survey/*/*'],
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/content/index.js'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['img/logo-16.png', 'img/logo-34.png', 'img/logo-48.png', 'img/logo-128.png'],
      matches: [],
    },
  ],
  permissions: ['tabs', 'activeTab', 'scripting'],
})
