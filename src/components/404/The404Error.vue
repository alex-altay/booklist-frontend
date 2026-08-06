<template>
  <div class="min-h-screen px-4 flex flex-col items-center justify-center text-center">
    <p class="mb-12 text-sm tracking-wider font-semibold uppercase text-muted-foreground">404 Error</p>
    <MorphAnimation class="mb-8" />
    <h1 class="mb-6 text-xl font-bold">Page Not Found</h1>
    <p class="max-w-sm text-muted-foreground text-sm leading-relaxed">
      Forgive me, but I don't believe you,” Woland replied.
    </p>
    <p class="mb-8 max-w-xs text-muted-foreground text-sm leading-relaxed">“That cannot be. Manuscripts don't burn"</p>
    <Button
      size="sm"
      class="gap-2 sm:min-w-28 min-w-12 hover:opacity-90 transition-opacity cursor-pointer"
      @click="$router.push({ name: 'books' })"
    >
      <Home class="w-4 h-4" />
      To the main page
    </Button>
  </div>
</template>

<script setup lang="ts">
import MorphAnimation from '@/components/404/MorphAnimation.vue'
import { Button } from '@/components/ui/button'
import { Home } from '@lucide/vue'
</script>
