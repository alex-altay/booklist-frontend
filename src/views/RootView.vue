<template>
  <div>
    <div class="text-2xl mb-3">Under Construction</div>
    <Button class="cursor-pointer" @click="$router.push({ name: 'signup' })">
      Registration Form
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>
