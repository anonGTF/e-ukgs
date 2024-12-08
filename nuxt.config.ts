export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  imports: {
    dirs: [
      'composables/**',
      'models/**',
      'components/attr/**'
    ]
  },

  hooks: {
    "prerender:routes"({ routes }) {
      routes.clear()
    }
  },

  router: {
    options: {
      hashMode: true
    }
  },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-vuefire',
    '@nuxt/icon',
    'pinia-plugin-persistedstate/nuxt',
    '@samk-dev/nuxt-vcalendar',
    '@pinia/nuxt'
  ],

  piniaPluginPersistedstate: {
    storage: 'localStorage',
    debug: true,
  },

  vuefire: {
    auth: {
      enabled: true
    },
    config: {
      apiKey: "AIzaSyB-uTGP9CGqn2QMARM_ZvJINT_0CBgWwuM",
      authDomain: "e-ukgs.firebaseapp.com",
      projectId: "e-ukgs",
      storageBucket: "e-ukgs.firebasestorage.app",
      messagingSenderId: "1067365694794",
      appId: "1:1067365694794:web:d2ab195cd96b3254b255b3"
    }
  }
})