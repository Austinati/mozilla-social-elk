<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { t } = useI18n()

useHydratedHead({
  title: () => t('nav.invites'),
})
</script>

<template>
  <MainContent>
    <template #title>
      <NuxtLink to="/invites" timeline-title-style flex items-center gap-2 @click="$scrollToTop">
        <div i-iconamoon:ticket />
        <span>{{ $t('nav.invites') }}</span>
      </NuxtLink>
    </template>
    <SettingsInviteCodes v-if="isHydrated" />
  </MainContent>
</template>
