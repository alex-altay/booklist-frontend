import { ref } from 'vue'

const isSpinning = ref<boolean>(false)

export function useGlobalSpinner() {
  function setSpinnerState(state: boolean) {
    isSpinning.value = state
  }

  return { isSpinning, setSpinnerState }
}
