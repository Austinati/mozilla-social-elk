<script setup lang="ts">
const { t } = useI18n()

const userSettings = useUserSettings()
const colorMode = useColorMode()

function toggleDark() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <footer p4 text-sm text-secondary-light flex="~ col">
    <div bg-primary text-base-light font-500 p-10px mb-15px w-212px b-rd-8px>
      <i18n-t keypath="footer.beta.description">
        <b>{{ $t('footer.beta.desc_1') }}</b>
        <NuxtLink href="https://survey.alchemer.com/s3/7470063/mozilla-social-feedback-form" target="_blank" external>
          <u>{{ $t('footer.beta.link') }}</u>
        </NuxtLink>
      </i18n-t>
    </div>
    <div flex="~ gap2" items-center mb4>
      <CommonTooltip :content="$t('nav.toggle_theme')">
        <button flex i-ri:sun-line dark-i-ri:moon-line text-lg :aria-label="$t('nav.toggle_theme')" @click="toggleDark()" />
      </CommonTooltip>
      <CommonTooltip :content="$t('nav.zen_mode')">
        <button
          flex
          text-lg
          :class="getPreferences(userSettings, 'zenMode') ? 'i-ri:layout-right-2-line' : 'i-ri:layout-right-line'"
          :aria-label="$t('nav.zen_mode')"
          @click="togglePreferences('zenMode')"
        />
      </CommonTooltip>
    </div>
    <div>
      <NuxtLink href="https://mozilla.social/about" target="_blank" external>
        About
      </NuxtLink>
      &middot;
      <NuxtLink href="https://mozilla.social/privacy-policy" target="_blank" external>
        Privacy Policy
      </NuxtLink>
      &middot;
      <NuxtLink href="https://mozilla.social/terms" target="_blank" external>
        Terms of Service
      </NuxtLink>
    </div>
  </footer>
</template>
