<script setup>
// Page metadata
definePageMeta({
  title: 'Profile',
  description: 'Manage your profile and settings',
  middleware: 'auth'
})

// Store
const authStore = useAuthStore()
const { signOut } = useAuth()

// ==========================
// USER DATA (YOUR ORIGINAL STRUCTURE)
// ==========================
const userData = ref({
  username: '',
  displayName: '',
  bio: '',
  location: '',
  avatar: null,
  email: '',
  currency: 'USD',
  language: 'en',
  timeFormat: '12h',
  profileVisibility: 'public',
  collectionVisibility: 'public',
  activityVisibility: true,
  emailNotifications: true,
  inAppNotifications: true,
  friendActivity: false,
  wishlistAlerts: true
})

// UI state
const loading = ref(false)
const errorMessage = ref('')

// ==========================
// SYNC FROM STORE (SAFE MAPPING)
// ==========================
watch(
  () => authStore.profile,
  (profile) => {
    if (profile) {
      userData.value.username = profile.username || ''
      userData.value.displayName = profile.full_name || ''
      userData.value.bio = profile.bio || ''
    }
  },
  { immediate: true }
)

// ==========================
// SYNC FROM AUTH USER (GOOGLE / EMAIL)
// ==========================
watch(
  () => authStore.user,
  (user) => {
    if (!user) return

    userData.value.email = user.email || ''
    userData.value.avatar =
      user.user_metadata?.avatar_url || null
  },
  { immediate: true }
)

// ==========================
// TAB STATE (FIX)
// ==========================
const activeTab = ref('profile')

function handleTabChange(tab) {
  activeTab.value = tab
}

// ==========================
// PROFILE EDITING STATE (FIX)
// ==========================
const isEditingProfile = ref(false)

const editedProfile = ref({
  displayName: '',
  bio: '',
  location: ''
})

function startEditingProfile() {
  editedProfile.value = {
    displayName: userData.value.displayName,
    bio: userData.value.bio,
    location: userData.value.location
  }
  isEditingProfile.value = true
}

function cancelEditingProfile() {
  isEditingProfile.value = false
}

function saveProfile() {
  userData.value.displayName = editedProfile.value.displayName
  userData.value.bio = editedProfile.value.bio
  userData.value.location = editedProfile.value.location
  isEditingProfile.value = false
}

// ==========================
// SETTINGS OPTIONS (FIX)
// ==========================
const currencies = ['USD', 'EUR', 'GBP', 'KHR']

const languages = [
  { value: 'en', label: 'English' },
  { value: 'km', label: 'Khmer' }
]

// ==========================
// PLACEHOLDER HANDLERS (FIX)
// ==========================
function changeEmail() {
  console.log('Change email')
}

function changePassword() {
  console.log('Change password')
}

function handleAvatarUpload(event) {
  const file = event.target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      userData.value.avatar = e.target?.result
    }
    reader.readAsDataURL(file)
  }
}

// ==========================
// SIGN OUT (FIXED)
// ==========================
async function handleSignOut() {
  loading.value = true
  errorMessage.value = ''

  try {
    const { error } = await signOut()

    if (error) {
      errorMessage.value = error.message || 'Sign out failed'
      return
    }

    // 🔥 Force clear state immediately
    authStore.$reset()

    // 🔥 Hard redirect (important)
    window.location.href = '/auth'

  } catch (err) {
    console.error(err)
    window.location.href = '/auth'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <!-- Identity Section -->
    <div class="card mb-6">
      <div class="flex items-start gap-6">
        <!-- Avatar -->
          <div class="relative">
            <div class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <img 
                v-if="userData.avatar" 
                :src="userData.avatar" 
                :alt="userData.displayName"
                class="w-full h-full object-cover"
              />
              <Icon 
                v-else 
                name="mdi:account" 
                class="w-24 h-24 text-gray-400"
              />
            </div>
            <label class="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors">
              <Icon name="mdi:camera" class="w-4 h-4" />
              <input 
                type="file" 
                class="hidden" 
                accept="image/*"
                @change="handleAvatarUpload"
              />
            </label>
          </div>

        <!-- Basic Info -->
        <div class="w-full">
          <div class="mb-2">
            <h1 class="text-2xl font-bold text-gray-900">@{{ userData.username }}</h1>
            <p class="text-lg text-gray-700">{{ userData.displayName }}</p>
          </div>
          
          <div class="space-y-2">
            <p v-if="userData.bio" class="text-gray-600">{{ userData.bio }}</p>
            <p v-if="userData.location" class="text-gray-500 text-sm flex items-center gap-1">
              <Icon name="mdi:map-marker" class="w-4 h-4" />
              {{ userData.location }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
     <TabsMenu :tabs="['profile', 'settings']" @tab-change="handleTabChange" />

    <!-- Tab Content -->
    <div class="space-y-6">
      <!-- Profile Tab -->
      <div v-if="activeTab === 'profile'" class="space-y-6">
        <div class="card">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-900">Profile Information</h2>
            <button
              v-if="!isEditingProfile"
              @click="startEditingProfile"
              class="btn-blue"
            >
              Edit Profile
            </button>
          </div>

          <!-- View Mode -->
          <div v-if="!isEditingProfile" class="space-y-4">
            <div>
              <label class="label-title-secondary">Display Name</label>
              <p class="text-gray-900">{{ userData.displayName || 'Not set' }}</p>
            </div>
            <div>
              <label class="label-title-secondary">Bio</label>
              <p class="text-gray-900">{{ userData.bio || 'No bio set' }}</p>
            </div>
            <div>
              <label class="label-title-secondary">Location</label>
              <p class="text-gray-900">{{ userData.location || 'Not set' }}</p>
            </div>
          </div>

          <!-- Edit Mode -->
          <div v-else class="space-y-4">
            <div>
              <label class="label-title-secondary">Display Name</label>
              <input 
                v-model="editedProfile.displayName"
                type="text"
                class="select-dropdown"
              />
            </div>
            <div>
              <label class="label-title-secondary">Bio</label>
              <textarea
                v-model="editedProfile.bio"
                rows="3"
                class="select-dropdown"
                placeholder="Tell us about yourself..."
              />
            </div>
            <div>
              <label class="label-title-secondary">Location</label>
              <input
                v-model="editedProfile.location"
                type="text"
                class="select-dropdown"
                placeholder="City, Country"
              />
            </div>
            <div class="flex gap-3">
              <button
                @click="saveProfile"
                class="btn-blue"
              >
                Save Changes
              </button>
              <button
                @click="cancelEditingProfile"
                class="btn-gray"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Settings Tab -->
      <div v-if="activeTab === 'settings'" class="space-y-6">
        <!-- Account Settings -->
        <div class="card">
          <h3 class="card-heading mb-4">Account</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <div class="">
                <p class="label-title">Email</p>
                <p class="text-sm text-gray-500">{{ userData.email }}</p>
              </div>
              <button
                @click="changeEmail"
                class="btn-gray"
              >
                Change
              </button>
            </div>
            <div class="flex justify-between items-center">
              <div>
                <p class="label-title">Password</p>
                <p class="text-sm text-gray-500">Last changed 30 days ago</p>
              </div>
              <button
                @click="changePassword"
                class="btn-gray"
              >
                Change
              </button>
            </div>
          </div>
        </div>

        <!-- Experience Settings -->
        <div class="card">
          <h3 class="card-heading mb-4">Experience</h3>
          <div class="space-y-4">
            <div>
              <label class="label-title-secondary">Currency</label>
              <select
                v-model="userData.currency"
                class="select-dropdown"
              >
                <option v-for="currency in currencies" :key="currency" :value="currency">
                  {{ currency }}
                </option>
              </select>
            </div>
            <div>
              <label class="label-title-secondary">Language</label>
              <select
                v-model="userData.language"
                class="select-dropdown"
              >
                <option v-for="lang in languages" :key="lang.value" :value="lang.value">
                  {{ lang.label }}
                </option>
              </select>
            </div>
            <div>
              <label class="label-title-secondary">Time Format</label>
              <div class="flex gap-4">
                <label class="flex items-center">
                  <input
                    v-model="userData.timeFormat"
                    type="radio"
                    value="12h"
                    class="mr-2"
                  />
                  <span class="text-gray-700">12-hour</span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="userData.timeFormat"
                    type="radio"
                    value="24h"
                    class="mr-2"
                  />
                  <span class="text-gray-700">24-hour</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Privacy Settings -->
        <div class="card">
          <h3 class="card-heading mb-4">Privacy</h3>
          <div class="space-y-4">
            <div>
              <label class="label-title-secondary">Profile Visibility</label>
              <select
                v-model="userData.profileVisibility"
                class="select-dropdown"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div>
              <label class="label-title-secondary">Collection Visibility</label>
              <select
                v-model="userData.collectionVisibility"
                class="select-dropdown"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div class="flex justify-between items-center">
              <div>
                <p class="label-title">Activity Visibility</p>
                <p class="text-sm text-gray-500">Show your recent activity to others</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="userData.activityVisibility"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="selector-checkbox"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="card">
          <h3 class="card-heading mb-4">Notifications</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <div>
                <p class="label-title">Email Notifications</p>
                <p class="text-sm text-gray-500">Receive updates via email</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="userData.emailNotifications"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="selector-checkbox"></div>
              </label>
            </div>
            <div class="flex justify-between items-center">
              <div>
                <p class="label-title">In-App Notifications</p>
                <p class="text-sm text-gray-500">Show notifications in the app</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="userData.inAppNotifications"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="selector-checkbox"></div>
              </label>
            </div>
            <div class="flex justify-between items-center">
              <div>
                <p class="label-title">Friend Activity</p>
                <p class="text-sm text-gray-500">Updates when friends play games</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="userData.friendActivity"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="selector-checkbox"></div>
              </label>
            </div>
            <div class="flex justify-between items-center">
              <div>
                <p class="label-title">Wishlist Alerts</p>
                <p class="text-sm text-gray-500">Notify when wishlist games are on sale</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="userData.wishlistAlerts"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="selector-checkbox"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Sign Out -->
        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="card-heading">Sign Out</h3>
              <p class="text-sm text-gray-500 mt-1">Sign out of your account and return to the login page</p>
            </div>
            <button
              @click="handleSignOut"
              class="btn-red"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
