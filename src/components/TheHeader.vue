<template>
  <header class="border-b fixed w-full top-0 z-10 bg-background/80 backdrop-blur-md">
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
        <button
          class="min-w-12 text-right text-sm font-medium cursor-pointer"
          :class="{
            'text-muted-foreground': $route.name != 'books',
            'hover:text-foreground': $route.name != 'books',
            'transition-colors': $route.name != 'books',
            'pointer-none': $route.name == 'books',
          }"
          @click="$router.push({ name: 'books' })"
        >
          Books
        </button>
        <div class="bg-primary p-2 rounded-lg text-primary-foreground">
          <BookOpen class="w-5 h-5" />
        </div>
        <button
          class="min-w-12 text-left text-sm font-medium cursor-pointer"
          :class="{
            'text-muted-foreground': $route.name != 'stats',
            'hover:text-foreground': $route.name != 'stats',
            'transition-colors': $route.name != 'stats',
            'pointer-none': $route.name == 'stats',
          }"
          @click="$router.push({ name: 'stats' })"
        >
          Stats
        </button>
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
import { userStore } from '@/stores/user'
import { router } from '@/router/router'

function signOut() {
  userStore().signOut()
  router.push({ name: 'root' })
}
</script>
