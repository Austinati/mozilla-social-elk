<script setup lang="ts">
const invites: string[] = await $fetch(`/api/${publicServer.value}/invites`)
</script>

<template>
  <h1 text-2xl p-2>
    Invites
  </h1>
  <main>
    <div v-for="code in invites" :key="code">
      {{ code }}
    </div>
  </main>
</template>
