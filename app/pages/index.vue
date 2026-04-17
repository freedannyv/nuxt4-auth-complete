<script setup>
// Apply middleware for authentication and profile completion
definePageMeta({
  middleware: ['auth', 'profile-complete']
})

// import GameSection from '~/components/game/GameSection.vue'
// import CollectionSnapshot from '~/components/collection/CollectionSnapshot.vue'


// Import hot games store
// import { useHotGamesStore } from '~/stores/useHotGamesStore'
// const hotGamesStore = useHotGamesStore()

// Use hot games from store
// const hotGames = computed(() => hotGamesStore.getHotGames)
// const hotGamesLoading = computed(() => hotGamesStore.getIsLoading)
// const popularGames = computed(() => placeholderGamesStore.getPlaceholderGames)

const categories = [
  { name: 'Strategy', icon: 'mdi:chess-knight', slug: 'strategy' },
  { name: 'Party', icon: 'mdi:party-popper', slug: 'party' },
  { name: 'Family', icon: 'mdi:account-group', slug: 'family' },
  { name: 'Cooperative', icon: 'mdi:handshake', slug: 'cooperative' },
  { name: 'Deck Building', icon: 'mdi:cards', slug: 'deck-building' },
  { name: 'Abstract', icon: 'mdi:shape', slug: 'abstract' },
]

// Fetch hot games on page load (only if not already loaded)
// onMounted(async () => {
//   if (!hotGamesStore.getIsLoaded) {
//     await hotGamesStore.fetchHotGames()
//   }
// })

// Handle fetch button click with BGG API call
// const handleGameFetch = async () => {
//   try {
//     const { searchItems } = useBggApi()

//     const response = await searchItems({
//       query: 'obsession',
//       type: 'boardgame'
//     })

//     console.log('BGG API Response:', response)
//   } catch (error) {
//     console.error('BGG API Error:', error)
//     toast.show('Failed to fetch games', 'error')
//   }
// }
</script>
