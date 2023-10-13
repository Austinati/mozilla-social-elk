<script setup lang="ts">
const user = currentUser.value

interface InviteCode {
  token: string
  assigned?: string
  assigned_at?: string
  created_at: string
}

interface Invite {
  tokens: InviteCode[]
}

const invite: Invite = await $fetch(`/api/${publicServer.value}/invites`, { headers: { authorization: `Bearer ${user?.token}` } })
const { text, copy, copied } = useClipboard()

const { t } = useI18n()

const noInvites = invite.tokens.length === 0
const heading = noInvites ? t('invites.no_codes.title') : t('invites.title')
const description = noInvites ? t('invites.no_codes.subtitle') : t('invites.subtitle')
</script>

<template>
  <div p-x-5 sm:p-0>
    <div m-b-5>
      <h1 text-2xl p-y-2>
        {{ heading }}
      </h1>
      <p>
        {{ description }}
      </p>
    </div>
    <main>
      <div v-for="code in invite.tokens" :key="code.token" b-t-1px>
        <div flex justify-between items-center b-b-1px p-4 m-b--1px>
          <span>{{ code.token }}</span>
          <div>
            <button flex justify-between items-center @click="copy(code.token)">
              <span v-if="copied && text === code.token" m-r-2 bg-primary text-base-light p-x-3 b-rd-10>{{ $t("invites.copied") }}</span>
              <div i-ri:file-copy-line />
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
