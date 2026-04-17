<script setup>
onMounted(() => {
  console.log('Confirm page - waiting for auth...')

  // Just go home — plugin will handle everything
  navigateTo('/')
})
</script>

<template>
  <div class="text-center mt-10">
    <p class="text-gray-600">Signing you in...</p>
  </div>
</template>