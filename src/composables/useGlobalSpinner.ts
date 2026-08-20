import { computed, ref, watch, type Ref } from 'vue'

const _counter = ref(0)
const isSpinning = computed(() => _counter.value > 0)

export function useGlobalSpinner() {
  function setSpinnerState(state: boolean) {
    _counter.value = state ? _counter.value + 1 : Math.max(0, _counter.value - 1)
  }

  function bindTo(isLoading: Ref<boolean>): void {
    watch(isLoading, () => setSpinnerState(isLoading.value))
  }

  return { isSpinning, setSpinnerState, bindTo }
}
