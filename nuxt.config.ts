export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@nuxt/icon',
    '@pinia/nuxt'
  ],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    // PRIVATE (server-only)
    supabaseSecretKey: process.env.NUXT_SUPABASE_SECRET_KEY,
    bggApiToken: process.env.NUXT_BGG_API_TOKEN,
    bggUsername: process.env.NUXT_BGG_USERNAME,
    bggPassword: process.env.NUXT_BGG_PASSWORD,

    public: {
      // PUBLIC (client-safe)
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY,
      environment: 'development',
      netlifyContext: 'development'
    }
  },

  supabase: {
    // 🔥 HARD FORCE VALUES HERE (bypass runtimeConfig confusion)
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY,

    types: false,
    useSsrCookies: true,
    redirectOptions: {
      login: '/auth',
      callback: '/confirm',
      exclude: ['/', '/reset', '/update'],
      saveRedirectToCookie: true
    }
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit'
      ]
    }
  }
})