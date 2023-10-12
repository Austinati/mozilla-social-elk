<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { t } = useI18n()

useHydratedHead({
  title: () => `${t('settings.profile.label')} | ${t('nav.settings')}`,
})
</script>

<template>
  <MainContent back-on-small-screen no-beta-label>
    <template #title>
      <div text-lg font-bold flex items-center gap-2 @click="$scrollToTop">
        <span>{{ isHydrated ? $t('settings.profile.label') : '' }}</span>
      </div>
    </template>

    <SettingsItem
      command large
      icon="i-ri:user-settings-line"
      :text="isHydrated ? $t('settings.profile.appearance.label') : ''"
      :description="isHydrated ? $t('settings.profile.appearance.description') : ''"
      to="/settings/profile/appearance"
    />
    <SettingsItem
      v-if="isHydrated && currentUser"
      command large
      icon="i-ri:settings-3-line"
      :text="$t('settings.profile.fxa_settings.label')"
      :description="$t('settings.profile.fxa_settings.description')"
      to="https://accounts.firefox.com/settings"
      external target="_blank"
    />
    <SettingsItem
      v-if="isHydrated && currentUser"
      command large
      icon="i-ri:settings-3-line"
      :text="$t('settings.profile.moso_settings.label')"
      :description="$t('settings.profile.moso_settings.description')"
      to="https://mozilla.social/auth/edit"
      external target="_blank"
    />
  </MainContent>
</template>
