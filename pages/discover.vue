<script setup lang="ts">
const { t } = useI18n()

useHydratedHead({
  title: () => t('nav.discover'),
})
</script>

<template>
  <MainContent>
    <template #title>
      <NuxtLink to="/discover" timeline-title-style flex items-center gap-2 @click="$scrollToTop">
        <div i-ri:earth-line />
        <span>{{ t('nav.discover') }}</span>
      </NuxtLink>
    </template>

    <TimelineDiscover v-if="isHydrated" />
  </MainContent>
</template>
