<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { t } = useI18n()
const pwaEnabled = useAppConfig().pwaEnabled

useHydratedHead({
  title: () => `${t('settings.notifications.label')} | ${t('nav.settings')}`,
})
</script>

<template>
  <MainContent back-on-small-screen no-beta-label>
    <template #title>
      <div text-lg font-bold flex items-center gap-2 @click="$scrollToTop">
        <span>{{ isHydrated ? $t('settings.notifications.label') : '' }}</span>
      </div>
    </template>

    <SettingsItem
      command
      :disabled="!pwaEnabled"
      :text="isHydrated ? $t('settings.notifications.push_notifications.label') : ''"
      :description="isHydrated ? $t('settings.notifications.push_notifications.description') : ''"
      to="/settings/notifications/push-notifications"
    />
  </MainContent>
</template>
