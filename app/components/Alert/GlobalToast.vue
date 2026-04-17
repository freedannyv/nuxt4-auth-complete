<script setup>
import { useGlobalToastStore } from '@/stores/globalToast.js'
const globalToast = useGlobalToastStore()

</script>

<template>
    <button @click="globalToast.show('Test message', 'fail')">Show Toast (GlobalToast.vue)</button>
  <transition name="fade">
    <div
      v-if="globalToast.visible"
      :class="[
        'fixed z-50 left-1/2 -translate-x-1/2 top-6 min-w-[220px] max-w-xs px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 text-white text-sm font-medium',
        globalToast.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
      ]"
      role="alert"
    >
      <Icon :name="globalToast.type === 'success' ? 'mdi:check-circle' : 'mdi:alert-circle'" class="w-5 h-5" />
      <span>{{ globalToast.message }}</span>
    </div>
  </transition>
</template>


<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
