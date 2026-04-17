export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  const supabase = useSupabaseClient()

  console.log('Initializing auth plugin')

  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth event:', event)

    if (session?.user) {
      authStore.setUser(session.user)

      // 🔥 DO NOT await here
      authStore.fetchProfile()
    } else {
      authStore.clearUser()
    }

    authStore.initialized = true
  })

  console.log('Auth plugin initialized')
})