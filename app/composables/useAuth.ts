// Prevent multiple listeners
let listenerInitialized = false

export const useAuth = () => {
  const supabase = useSupabaseClient()

  // ✅ Initialize listener ONLY ONCE
  if (import.meta.client && !listenerInitialized) {
    listenerInitialized = true

    supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', {
        event,
        session,
        user: session?.user
      })
    })
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Sign in error:', error)
        return { error }
      }

      console.log('Sign in successful:', {
        user: data.user,
        session: data.session
      })

      return { error: null }
    } catch (err) {
      console.error('Unexpected sign in error:', err)
      return { error: err as Error }
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const redirectTo = import.meta.client
        ? `${window.location.origin}/confirm`
        : '/confirm'

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectTo,
        },
      })

      if (error) {
        console.error('Sign up error:', error)
        return { error }
      }

      console.log('Sign up response:', {
        user: data.user,
        session: data.session
      })

      return { error: null }
    } catch (err) {
      console.error('Unexpected sign up error:', err)
      return { error: err as Error }
    }
  }

  const signOut = async () => {
    try {
      console.log('Signing out at store...')
      const data = await supabase.auth.signOut()

      console.log('Sign out response:', data)
      if (data.error) {
        console.error('Sign out error:', data.error)
        return { error: data.error }
      }

      console.log('Sign out successful')
      return { error: null }
    } catch (err) {
      console.error('Unexpected sign out error:', err)
      return { error: err as Error }
    }
  }

  const getUser = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error) {
        console.error('Get user error:', error)
        return { user: null, error }
      }

      console.log('Current user:', user)
      return { user, error: null }
    } catch (err) {
      console.error('Unexpected get user error:', err)
      return { user: null, error: err as Error }
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const redirectTo = import.meta.client
        ? `${window.location.origin}/reset`
        : '/reset'

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      })

      if (error) {
        console.error('Reset password error:', error)
        return { error }
      }

      console.log('Password reset email sent to:', email)
      return { error: null }
    } catch (err) {
      console.error('Unexpected reset password error:', err)
      return { error: err as Error }
    }
  }

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        console.error('Update password error:', error)
        return { error }
      }

      console.log('Password updated successfully')
      return { error: null }
    } catch (err) {
      console.error('Unexpected update password error:', err)
      return { error: err as Error }
    }
  }

  const signInWithGoogle = async () => {
  try {
    const redirectTo = import.meta.client
      ? `${window.location.origin}/confirm`
      : '/confirm'

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    })

    if (error) {
      console.error('Google sign in error:', error)
      return { error }
    }

    console.log('Google sign in initiated:', data)

    return { error: null }
  } catch (err) {
    console.error('Unexpected Google sign in error:', err)
    return { error: err as Error }
  }
}

  return {
    signIn,
    signUp,
    signOut,
    getUser,
    resetPassword,
    updatePassword,
    signInWithGoogle,
  }
}