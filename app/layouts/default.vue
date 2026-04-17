<script setup>
import AlertGlobalToast from '~/components/Alert/GlobalToast.vue'
// import { useBggApi } from '~/composables/useBggApi'
// import { parseBggSearchResponse } from '~/utils/bggParser'

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()

// const searchQuery = ref('')
// const searchResults = ref([])
// const searchLoading = ref(false)
// const isFilterOpen = ref(false)
// const filters = ref({
//   playerCount: null,
//   playTime: null,
//   minRating: 0
// })

// function openFilters() {
//   isFilterOpen.value = true
// }

// function closeFilters() {
//   isFilterOpen.value = false
// }

// Real search using BGG API - always dropdown behavior
// async function handleSearch(query) {
//   // Always fetch dropdown results, regardless of current page
//   if (!query.trim()) {
//     searchResults.value = []
//     return
//   }
  
//   searchLoading.value = true
  
//   try {
//     const { searchItems } = useBggApi()
//     const response = await searchItems({
//       query: query.trim(),
//       type: 'boardgame'
//     })
    
//     // Parse XML response and transform to SearchResult format
//     const transformedResults = parseBggSearchResponse(response.data || response)
//     // console.log('Parsed BGG results:', transformedResults)
    
//     searchResults.value = transformedResults
//   } catch (error) {
//     console.error('Search error:', error)
//     searchResults.value = []
//   } finally {
//     searchLoading.value = false
//   }
// }

// function handleSelectGame(result) {
//   // Navigate to game detail page (or handle as needed)
//   navigateTo(`/game/${result.id}`)
//   searchQuery.value = ''
//   searchResults.value = []
// }

// function handleViewAllResults() {
//   // Navigate to search page with current query
//   navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`)
// }

// function handleApplyFilters(newFilters) {
//   filters.value = newFilters
// }
</script>

<template>
  <div class="min-h-screen bg-gray-50 pb-16 md:pb-0 max-w-7xl mx-auto">
    <!-- Sticky Header -->
    <header class="sticky top-0 z-40 bg-white shadow-sm">
      <!-- Top bar -->
      <div class="flex items-center justify-between px-4 py-3">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <Icon name="mdi:dice-multiple" class="h-8 w-8 text-indigo-600" />
          <span class="text-xl font-bold text-gray-900 hidden sm:block">BoardGame Tracker</span>
        </NuxtLink>

        <!-- Profile icon -->

   

        <NuxtLink to="/profile" class="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <div   v-if="authStore.user?.user_metadata?.avatar_url"  class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <img 
              :src="authStore.user?.user_metadata?.avatar_url" 
              :alt="authStore.user?.user_metadata?.full_name"
              class="w-full h-full object-cover"
            />
          </div>
          <Icon 
            v-else 
            name="mdi:account" 
            class="w-7 h-7 text-gray-600"
          />
        </NuxtLink>
      </div>

      <!-- Search bar -->
      <!-- <div class="px-4 pb-3">
        <div class="flex gap-2">
          <SearchBar 
            v-model="searchQuery" 
            class="flex-1"
            :results="searchResults"
            :loading="searchLoading"
            :show-results="true"
            @search="handleSearch"
            @select="handleSelectGame"
            @view-all="handleViewAllResults"
          />
          <button
            type="button"
            class="flex items-center gap-1 px-3 py-2.5 bg-gray-100 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            @click="openFilters"
          >
            <Icon name="mdi:filter-variant" class="h-5 w-5" />
            <span class="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div> -->

      <!-- Active Session Banner -->
      <!-- <ActiveSessionBanner /> -->
    </header>


    <!-- Desktop/Tablet Navbar -->
 <HeaderFooterNavBar />

    <!-- Main content -->
    <main class="min-h-[calc(100vh-180px)]">
      <slot />
    </main>

    <!-- Bottom Mobile Navigation -->
    <HeaderFooterBottomNavBar />

    
    <!-- <FilterDrawer 
      :is-open="isFilterOpen" 
      @close="closeFilters"
      @apply-filters="handleApplyFilters"
    /> -->

    <!-- Global Session Modal (for resuming sessions from banner) -->
    <!-- <GlobalSessionModal /> -->

    <!-- Global Toast Notification -->
    <AlertGlobalToast />
  </div>
</template>
