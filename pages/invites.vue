<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { t } = useI18n()

useHydratedHead({
  title: () => t('nav.invitation_tokens'),
})
</script>

<template>
  <MainContent>
    <template #title>
      <NuxtLink to="/invites" timeline-title-style flex items-center gap-2 @click="$scrollToTop" />
    </template>
    <SettingsInviteCodes v-if="isHydrated" />
  </MainContent>
</template>
