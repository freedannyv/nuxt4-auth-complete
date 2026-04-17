<template>
        <nav class="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 sm:hidden">
      <div class="flex items-center justify-between py-2 sm:justify-around sm:max-w-xl mx-auto">
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.to"
          class="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors"
          :class="$route.path === item.to 
            ? 'text-indigo-600' 
            : 'text-gray-500 hover:text-gray-700'"
        >
          <Icon :name="item.icon" class="h-6 w-6" />
          <span class="text-xs font-medium">{{ item.name }}</span>
        </NuxtLink>
      </div>
    </nav>
</template>

<script setup>
import navigation from '~/constants/navigation'
</script>