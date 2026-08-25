<template>
  <header class="sticky top-0 w-full z-20 border-b bg-background">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex items-center">
        <Button
          size="sm"
          class="gap-2 sm:min-w-28 min-w-12 hover:opacity-90 transition-opacity cursor-pointer"
          @click="$router.push({ name: 'add' })"
        >
          <Plus class="w-4 h-4" />
          <span class="hidden sm:inline">Add Book</span>
        </Button>
      </div>

      <nav class="flex items-center gap-6">
        <RouterLink
          class="min-w-12 text-right text-muted-foreground hover:text-foreground select-none text-sm font-medium cursor-pointer"
          :to="{ name: 'books' }"
          >Books</RouterLink
        >
        <div class="bg-primary p-2 rounded-lg text-primary-foreground">
          <BookOpen class="w-5 h-5" />
        </div>
        <RouterLink
          class="min-w-12 text-left text-muted-foreground hover:text-foreground select-none text-sm font-medium cursor-pointer"
          :to="{ name: 'stats' }"
          >Stats</RouterLink
        >
      </nav>

      <div class="flex items-center">
        <Button size="sm" variant="outline" class="gap-2 sm:min-w-28 min-w-12 cursor-pointer" @click="signOut">
          <LogOut class="w-4 h-4" />
          <span class="hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { BookOpen, LogOut, Plus } from '@lucide/vue'
import { useUserStore } from '@/stores/user'
import { router } from '@/router/router'

function signOut() {
  useUserStore().signOut()
  router.push({ name: 'root' })
}
</script>

<style scoped>
@reference "#style.css";

.router-link-exact-active {
  @apply text-foreground hover:text-muted-foreground transition-colors pointer-events-none;
}
</style>
