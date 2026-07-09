<template>
  <header class="border-b fixed w-full top-0 z-10 bg-background/80 backdrop-blur-md">
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center">
        <Button size="sm" class="gap-2 min-w-25 hover:opacity-90 transition-opacity cursor-pointer">
          <Plus class="w-4 h-4" />
          <span class="hidden sm:inline">Add Book</span>
          <!-- TODO Active link detection -->
        </Button>
      </div>

      <nav className="flex items-center gap-6">
        <button class="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Books</button>
        <div class="bg-primary p-2 rounded-lg text-primary-foreground">
          <BookOpen class="w-5 h-5" />
        </div>
        <button class="text-sm text-muted-foreground font-medium hover:text-primary transition-colors cursor-pointer">
          Stats
        </button>
      </nav>

      <div class="flex items-center">
        <Button size="sm" variant="outline" class="gap-2 min-w-25 cursor-pointer" @click="signOut">
          <LogOut class="w-4 h-4" />
          <span class="hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { BookOpen, LogOut, Plus } from 'lucide-vue-next'
import { userStore } from '@/stores/user'
import { router } from '@/router/router'

function signOut() {
  userStore().signOut()
  router.push({ name: 'root' })
}
</script>
