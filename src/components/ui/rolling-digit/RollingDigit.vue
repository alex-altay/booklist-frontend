<template>
  <NumberFlow 
    class="" 
    :value="rollingDigit" 
    :trend="0" 
    :format="{ style: 'decimal', trailingZeroDisplay: 'auto' }"
    locales="en-US"
    />
</template>

<script setup lang="ts">
import NumberFlow from '@number-flow/vue'
import { onMounted, ref } from 'vue'

const { digit } = defineProps<{ digit: number }>()
const rollingDigit = ref(Number('1'.padEnd(`${digit}`.length, '1')))
onMounted(() => {
  rollingDigit.value = digit
})
</script>
