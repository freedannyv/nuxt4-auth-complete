export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  // Initialize store if not already initialized
  if (!authStore.initialized) {
    await authStore.initialize()
  }

  // Prevent redirect loop and enforce auth
  if (!authStore.user && to.path !== '/auth') {
    return navigateTo('/auth')
  }
})