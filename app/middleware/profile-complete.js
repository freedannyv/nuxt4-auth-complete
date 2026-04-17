export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  if (!authStore.initialized) {
    await authStore.initialize()
  }

  // 🚨 If NOT logged in → do nothing
  if (!authStore.user) {
    return
  }

  // Prevent loop
  if (to.path === '/profile') {
    return
  }

  // If no profile → redirect
  if (!authStore.profile) {
    return navigateTo('/profile')
  }

  const username = authStore.profile.username
  if (!username || username.trim() === '') {
    return navigateTo('/profile')
  }
})