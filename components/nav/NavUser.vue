<script setup>
const { busy, oauth, singleInstanceServer } = useSignIn()
</script>

<template>
  <VDropdown v-if="isHydrated && currentUser" sm:hidden>
    <div style="-webkit-touch-callout: none;">
      <AccountAvatar
        :account="currentUser.account"
        h-8
        w-8
        :draggable="false"
        square
      />
    </div>

    <template #popper="{ hide }">
      <UserSwitcher @click="hide()" />
    </template>
  </VDropdown>
  <template v-else>
    <div
      v-if="singleInstanceServer"
      flex="~ row"
      gap-x-1 items-center justify-center pl-16px xl:pl-28px sm:pr-2 xl:hidden
    >
      <button
        flex="~ row"
        gap-x-1 items-center justify-center text-sm p-x-10px p-y-10px xl:hidden text-center font-600
        sm:mr-8px sm:btn-solid sm:btn-outline sm:b-rd-8px
        :disabled="busy"
        @click="oauth('signup')"
      >
        {{ $t('action.create_account') }}
      </button>
      <button
        flex="~ row"
        mr-8px
        gap-x-1 items-center justify-center text-sm font-600 p-x-11px p-y-11px xl:hidden
        sm:border-1 sm:border-primary sm:btn-outline sm:b-rd-8px
        :disabled="busy"
        @click="oauth()"
      >
        {{ $t('action.sign_in') }}
      </button>
    </div>
    <button v-else btn-solid text-sm font-600 p-x-10px p-y-10px text-center xl:hidden @click="openSigninDialog()">
      {{ $t('action.sign_in') }}
    </button>
  </template>
</template>
