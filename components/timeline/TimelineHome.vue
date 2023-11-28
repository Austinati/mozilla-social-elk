<script setup lang="ts">
import type { mastodon } from 'masto'
import { ref } from 'vue'

const paginator = useMastoClient().v1.timelines.listHome({ limit: 30 })
const stream = $(useStreaming(client => client.v1.stream.streamUser()))
const homePaginator = ref(null)
const publishSnackbar = ref(null)

function reorderAndFilter(items: mastodon.v1.Status[]) {
  return reorderedTimeline(items, 'home')
}

function onPublish(status) {
  homePaginator.value.percolateStatus(status)
  publishSnackbar.value.show()
}
</script>

<template>
  <div relative>
    <PublishWidget draft-key="home" border="b base" feed-name="home" @published="onPublish" />
    <TimelinePaginator ref="homePaginator" v-bind="{ paginator, stream }" :preprocess="reorderAndFilter" context="home" feed-name="home.feed" />
    <PublishSnackbar ref="publishSnackbar" />
  </div>
</template>
