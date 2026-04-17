export const useGlobalToastStore = defineStore('globalToast', () => {
  const visible = ref(false)
  const message = ref('')
  const type = ref('success')
  
  function show(msg, toastType = 'success') {
      message.value = msg
      type.value = toastType
      visible.value = true
      setTimeout(() => {
          visible.value = false
          message.value = ''
          type.value = 'success'
    }, 1500)
  }
  
  return {
    visible,
    message,
    type,
    show
  }
})