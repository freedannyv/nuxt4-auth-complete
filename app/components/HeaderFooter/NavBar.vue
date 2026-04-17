<template>
       <nav class="hidden sm:block bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto flex items-center gap-2 px-6">
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.to"
          class="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors"
          :class="$route.path === item.to 
            ? 'text-indigo-600 bg-indigo-50' 
            : 'text-gray-600 hover:text-indigo-700 hover:bg-gray-50'"
        >
          <Icon :name="item.icon" class="h-5 w-5" />
          <span>{{ item.name }}</span>
        </NuxtLink>
      </div>
    </nav>
</template>

<script setup>
import navigation from '~/constants/navigation'
</script>