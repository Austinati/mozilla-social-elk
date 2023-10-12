<script setup lang="ts">
const invites: string[] = await $fetch(`/api/${publicServer.value}/invites`)

const { text, copy, copied } = useClipboard()

const { t } = useI18n()

const noInvites = invites.length === 0
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
      <div v-for="code in invites" :key="code" b-t-1px>
        <div flex justify-between items-center b-b-1px p-4 m-b--1px>
          <span>{{ code }}</span>
          <div>
            <button flex justify-between items-center @click="copy(code)">
              <span v-if="copied && text === code" m-r-2 bg-primary text-base-light p-x-3 b-rd-10>{{ $t("invites.copied") }}</span>
              <div i-ri:file-copy-line />
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
