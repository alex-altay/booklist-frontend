<template>
  {{ tweened.number.toFixed(decimalCount) }}
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import gsap from 'gsap'

const { digit } = defineProps<{ digit: number }>()
const tweened = reactive({ number: 0 })
const diff = `${digit}`.length - digit.toFixed(0).length
const decimalCount = diff == 0 ? diff : diff - 1

onMounted(() => {
  gsap.to(tweened, { duration: 0.5, number: Number(digit) || 0 })
})
</script>
