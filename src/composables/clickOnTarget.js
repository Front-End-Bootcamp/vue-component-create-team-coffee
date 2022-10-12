import { ref, onMounted, onUnmounted } from 'vue'

export function useClickOnTarget(targetRef) {
  const isClickOnTarget = ref(false)

  function clickHandler(event) {
    isClickOnTarget.value = targetRef.value.contains(event.target)
  }

  onMounted(() => window.addEventListener('click', clickHandler))
  onUnmounted(() => window.removeEventListener('click', clickHandler))

  return isClickOnTarget
}