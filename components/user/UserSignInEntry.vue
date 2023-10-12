<script setup lang="ts">
const { busy, oauth, singleInstanceServer } = useSignIn()
</script>

<template>
  <div p8 lg:flex="~ col gap2" hidden>
    <h4 v-if="isHydrated" text-lg font-500>
      {{ $t('user.sign_in_notice_title') }}
    </h4>
    <p text-base mb-4>
      {{ $t('user.sign_in_desc') }}
    </p>
    <button
      v-if="singleInstanceServer"
      flex="~ row" gap-x-2 items-center justify-center btn-solid text-center rounded-3 font-500
      :disabled="busy"
      @click="oauth('signup')"
    >
      {{ $t('action.create_account') }}
    </button>
    <button
      v-if="singleInstanceServer"
      flex="~ row" gap-x-2 items-center justify-center btn-outline text-center rounded-3 font-500
      :disabled="busy"
      @click="oauth()"
    >
      {{ $t('action.sign_in') }}
    </button>
    <button v-else btn-solid rounded-3 text-center mt-2 select-none @click="openSigninDialog()">
      {{ $t('action.sign_in') }}
    </button>
  </div>
</template>
