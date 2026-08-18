<template>
  <div class="flex min-w-svw min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
    <div class="flex w-full max-w-sm flex-col gap-6">
      <div class="flex flex-col gap-6">
        <Card class="gap-3">
          <CardHeader class="text-center mb-0">
            <CardTitle class="text-xl mb-6">
              {{ title }}
            </CardTitle>
            <CardDescription class="mb-0">
              {{ description }}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid gap-3">
              <div class="min-h-5 mb-1">
                <FieldError>{{ error }}</FieldError>
              </div>
              <div class="flex flex-col gap-4">
                <Button class="w-full cursor-pointer" @click="login">Sign In</Button>
              </div>
              <div class="text-center text-sm">
                Don't have an account?
                <RouterLink class="underline underline-offset-4 cursor-pointer" to="signup"> Sign up </RouterLink>
              </div>
            </div>
          </CardContent>
        </Card>
        <div
          class="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary"
        >
          By clicking sign in, you agree to our <RouterLink to="terms">Terms of Service</RouterLink> and
          <RouterLink to="privacy">Privacy Policy</RouterLink>.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldError } from '@/components/ui/field'
import { storeToRefs } from 'pinia'
import { useApi } from '@/composables/useApi'
import { useGlobalSpinner } from '@/composables/useGlobalSpinner'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { watch } from 'vue'

const { signIn } = useUserStore()
const { isAuthorized } = storeToRefs(useUserStore())
const { isLoading, error, request } = useApi()
const { setSpinnerState } = useGlobalSpinner()
const router = useRouter()

watch(isLoading, () => setSpinnerState(isLoading.value))

if (isAuthorized.value) {
  router.push({ name: 'books' })
}

async function login() {
  await request(signIn)
  router.push({ name: 'books' })
}

const isAfterRegistration = useRoute().query.isAfterRegistration
const title = isAfterRegistration ? 'Congratulations 🎉' : 'Welcome back'
const description = isAfterRegistration
  ? 'Registration was successful. Now you can sign in'
  : 'Enter the site using your passkey'
</script>
