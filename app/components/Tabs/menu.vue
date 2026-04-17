<template>
    <div class="border-b border-gray-200 mb-6">
    <nav class="flex space-x-8">
    <button v-for="tab in props.tabs" :key="tab" 
        :class="[
        'tab',
        activeTab === tab
            ? 'tab-active'
            : 'tab-inactive'
        ]"
        @click="handleClick(tab)"
    >
        {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
    </button>
    </nav>
</div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    default: () => []
  }
})

const activeTab = ref(props.tabs[0])

const emit = defineEmits(['tab-change'])

function handleClick(tab) {
  activeTab.value = tab
  emit('tab-change', tab)
}
</script>