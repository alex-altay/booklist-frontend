<template>
  <footer class="border-t py-8 mt-12">
    <div class="container mx-auto px-4 text-center">
      <div class="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
        <RouterLink to="/privacy" class="hover:text-primary transition-colors"> Privacy Policy </RouterLink>
        <RouterLink to="/terms" class="hover:text-primary transition-colors"> Terms of Agreement </RouterLink>
        <TheExportLink />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import TheExportLink from '@/components/TheExportLink.vue'
</script>
