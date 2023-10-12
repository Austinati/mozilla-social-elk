<script setup lang="ts">
import type { NuxtError } from '#app'

// prevent reactive update when clearing error
const { error } = defineProps<{
  error: Partial<NuxtError>
}>()

const { t } = useI18n()
// add more custom status codes messages here
const errorCodes: Record<number, string> = {
  404: t('error.message-404'),
  500: t('error.message-500'),
}

if (process.dev)
  console.error(error)

const defaultMessage = t('error.message-default')
const subtitle = t('error.message-subtitle')
const message = errorCodes[error.statusCode!] ?? error.message ?? defaultMessage
const showBack = error.statusCode === 404
</script>

<template>
  <NuxtLoadingIndicator color="repeating-linear-gradient(to right,var(--c-primary) 0%,var(--c-primary-active) 100%)" />
  <NuxtLayout>
    <MainContent>
      <template #title>
        <span timeline-title-style>Error</span>
      </template>
      <slot>
        <div p5 grid gap-y-4>
          <div text-xl font-bold>
            {{ message }}
          </div>
          <div text-secondary>
            {{ subtitle }}
          </div>
          <NuxtLink
            v-if="showBack"
            :aria-label="$t('nav.back')"
            class="btn-text inline-flex flex-items-center -ml-5"
            @click="$router.go(-1)"
          >
            <span i-ri:arrow-left-line /> {{ $t('nav.back') }}
          </NuxtLink>
        </div>
      </slot>
    </MainContent>
  </NuxtLayout>
  <AriaAnnouncer />
</template>
