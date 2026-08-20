<template>
  <div class="flex min-w-svw min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
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
              <form class="h-full" @submit.prevent="register">
                <Field>
                  <FieldLabel :for="id.email" class="mb-0"> Email </FieldLabel>
                  <Input :id="id.email" v-model="email" type="email" placeholder="example@mail.com" />
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
                <RouterLink class="underline underline-offset-4 cursor-pointer" to="signin"> Sign in </RouterLink>
              </div>
            </div>
          </CardContent>
        </Card>
        <div
          class="select-none text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary"
        >
          By clicking create account, you agree to our <RouterLink to="terms">Terms of Service</RouterLink> and
          <RouterLink class="cursor-pointer" to="privacy">Privacy Policy</RouterLink>.
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
import { useApi } from '@/composables/useApi'
import { useGlobalSpinner } from '@/composables/useGlobalSpinner'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useIds } from '@/composables/useIds'

const id = useIds('email')
const email = ref<string>('')
const router = useRouter()
const { signUp } = useUserStore()
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
useGlobalSpinner().bindTo(isLoading)
</script>
