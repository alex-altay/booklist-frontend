<template>
  <div
    class="flex min-w-svw min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10"
  >
    <div class="flex w-full max-w-sm flex-col gap-6">
      <div class="flex flex-col gap-6">
        <Card>
          <CardHeader class="text-center">
            <CardTitle class="text-xl mb-3 select-none"> Registration </CardTitle>
            <CardDescription class="mb-3 select-none">
              We’ll create a new passkey for you to access your new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid gap-6">
              <form @submit.prevent="register" class="h-full">
                <Field>
                  <FieldLabel for="email" class="mb-0">Email</FieldLabel>
                  <Input v-model="email" id="email" type="email" placeholder="example@mail.com" />
                  <div class="min-h-5 mb-4">
                    <FieldError>{{ error }}</FieldError>
                  </div>
                </Field>
                <div class="flex flex-col gap-4">
                  <Button type="submit" class="w-full cursor-pointer" :disabled="error?.length">
                    Create a passkey and an account
                  </Button>
                </div>
              </form>
              <div class="text-center text-sm select-none">
                Already have an account?
                <a
                  class="underline underline-offset-4 cursor-pointer"
                  @click="$router.push({ name: 'signin' })"
                >
                  Sign in
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
        <div
          class="select-none text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary"
        >
          By clicking create account, you agree to our <a href="#">Terms of Service</a> and
          <a class="cursor-pointer">Privacy Policy</a>.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { authRequest } from '@/schemas/auth'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useApi } from '@/composables/useApi'
import { useGlobalSpinner } from '@/composables/useGlobalSpinner'
import { useRouter } from 'vue-router'
import { userStore } from '@/stores/user'

const router = useRouter()
const { signUp } = userStore()
const { isAuthorized } = storeToRefs(userStore())
const { setSpinnerState } = useGlobalSpinner()

if (isAuthorized.value) {
  router.push({ name: 'books' })
}

watch(isAuthorized, () => {
  if (isAuthorized.value) {
    router.push({ name: 'books' })
  }
})

const email = ref<string>('')
const { isLoading, error, request } = useApi()

async function register() {
  if (!isValidEmail()) {
    return
  }
  const result = await request(() => signUp(email.value))
  if (result && result.verified) {
    router.push({ name: 'signin', query: { isAfterRegistration: 1 } })
  }
}

function isValidEmail(): boolean {
  const result = authRequest.safeParse({ email: email.value })
  if (result.success) {
    error.value = ''
    return true
  }
  error.value = 'Invalid email address'
  return false
}

watch(email, isValidEmail)
watch(isLoading, () => {
  setSpinnerState(isLoading.value)
})
</script>
