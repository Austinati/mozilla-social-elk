<script setup lang="ts">
import type { Recommendation } from '../composables/recommendations'

const {
  item,
} = defineProps<{
  item: Recommendation
}>()

const target = ref<HTMLDivElement>()
const { isActive } = useIntersectionObserver(target, checkIntersection, { threshold: 0.5 })

function checkIntersection([{ isIntersecting }]: [{ isIntersecting: boolean }]): void {
  if (isIntersecting && isActive.value) {
    // fire analytics event here: item.id || item.title || item.url
    isActive.value = false
  }
}

const clipboard = useClipboard()
async function copyLink(url: string, event: Event): void {
  event.preventDefault()
  if (url)
    await clipboard.copy(url)
}
</script>

<template>
  <NuxtLink ref="target" :to="item.url" target="_blank" external p-y-16px p-x-8px flex border="b base">
    <div class="content" w-full pr>
      <h4 text-sm text-secondary>
        {{ item.publisher }}
      </h4>
      <h3 text-lg line-height-tight font-500 m-y-4px>
        {{ item.title }}
      </h3>
      <p>
        {{ item.excerpt }}
      </p>
    </div>
    <div class="media" relative overflow-hidden max-w-120px min-w-120px>
      <img :src="item.image.sizes?.[0]?.url" rounded-lg overflow-hidden w-full ha>
      <div m-y-4px flex flex-justify-end>
        <button p-12px text-xl @click="copyLink(item.url, $event)">
          <div i-ri:share-line />
        </button>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
a:hover h3 {
  text-decoration: underline;
}
p {
  line-height: 1.6em;
  max-height: 4.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: anywhere;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
