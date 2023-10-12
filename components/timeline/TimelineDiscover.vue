<script setup lang="ts">
import type { Recommendation } from '../composables/recommendations'
import { getLanguageForRecs } from '../../utils/language'

const { locale: lang } = useI18n()
const locale = getLanguageForRecs(lang.value)

const recommendations: Recommendation[] = await $fetch(`/api/${publicServer.value}/recommendations?locale=${locale}`)
</script>

<template>
  <h1 text-2xl p-2>
    Today’s Top Picks
  </h1>
  <main>
    <RecommendationArticle v-for="item in recommendations" :key="item.id" :item="item" />
  </main>
</template>
