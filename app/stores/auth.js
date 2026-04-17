import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const supabase = useSupabaseClient()

  const user = ref(null)
  const profile = ref(null)
  const loading = ref(false)
  const initialized = ref(false)

  const setUser = (newUser) => {
    user.value = newUser
  }

  const setProfile = (newProfile) => {
    profile.value = newProfile
  }

  const clearUser = () => {
    user.value = null
    profile.value = null
  }

  const fetchUser = async () => {
    const { getUser } = useAuth()
    const { user: fetchedUser, error } = await getUser()

    setUser(fetchedUser)

    console.log('fetchUser result:', { fetchedUser, error })
    return { user: fetchedUser, error }
  }

  const fetchProfile = async () => {
    if (!user.value) {
      console.log('No user found, cannot fetch profile')
      return { profile: null, error: new Error('No user') }
    }

    loading.value = true

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.value.id)
        .maybeSingle()

      if (error) {
        console.error('fetchProfile error:', error)
        return { profile: null, error }
      }

      setProfile(data)

      console.log('fetchProfile result:', { profile: data })
      return { profile: data, error: null }
    } catch (err) {
      console.error('fetchProfile unexpected error:', err)
      return { profile: null, error: err }
    } finally {
      loading.value = false
    }
  }

  const createProfile = async (data) => {
    if (!user.value) {
      console.log('No user found, cannot create profile')
      return { profile: null, error: new Error('No user') }
    }

    loading.value = true

    try {
      const profileData = {
        id: user.value.id,
        ...data,
        created_at: new Date().toISOString()
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .upsert(profileData)
        .select()
        .single()

      if (error) {
        console.error('createProfile error:', error)
        return { profile: null, error }
      }

      setProfile(profile)

      console.log('createProfile result:', { profile })
      return { profile, error: null }
    } catch (err) {
      console.error('createProfile unexpected error:', err)
      return { profile: null, error: err }
    } finally {
      loading.value = false
    }
  }

  const updateProfile = async (data) => {
    if (!user.value) {
      console.log('No user found, cannot update profile')
      return { profile: null, error: new Error('No user') }
    }

    loading.value = true

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.value.id)
        .select()
        .single()

      if (!data) {
        console.log('No profile found (new user)')
      }

      if (error) {
        console.error('updateProfile error:', error)
        return { profile: null, error }
      }

      setProfile(profile)

      console.log('updateProfile result:', { profile })
      return { profile, error: null }
    } catch (err) {
      console.error('updateProfile unexpected error:', err)
      return { profile: null, error: err }
    } finally {
      loading.value = false
    }
  }

  const initialize = async () => {
    if (initialized.value) {
      console.log('Auth store already initialized')
      return
    }

    console.log('Initializing auth store...')

    const { user: fetchedUser } = await fetchUser()

    if (fetchedUser) {
      await fetchProfile()
    }

    initialized.value = true
    console.log('Auth store initialization complete')
  }

  return {
    user,
    profile,
    loading,
    initialized,
    setUser,
    setProfile,
    clearUser,
    fetchUser,
    fetchProfile,
    createProfile,
    updateProfile,
    initialize
  }
})