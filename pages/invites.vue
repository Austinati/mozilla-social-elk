<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { t } = useI18n()

useHydratedHead({
  title: () => t('nav.invitation_tokens'),
})

const loggedInUsers = useUsers()
const data = await fetch(`https://${loggedInUsers.value.server}/api/invitation/v1/status`, {
  headers: { authorization: `Bearer ${loggedInUsers.value.token}` },
})
</script>

<template>
  <MainContent>
    <template #title>
      <NuxtLink to="/invitations" timeline-title-style flex items-center gap-2 @click="$scrollToTop">
        <span>{{ JSON.stringify(data, null, 3) }}</span>
      </NuxtLink>
    </template>
  </MainContent>
</template>
