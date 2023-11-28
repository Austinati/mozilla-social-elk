<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(false)

function show() {
  isVisible.value = true

  setTimeout(() => {
    hide()
  }, 5000)
}

function hide() {
  isVisible.value = false
}

defineExpose({
  show,
  hide,
})
</script>

<template>
  <div
    :class="{ active: isVisible }"
    class="snackbar-wrapper"
  >
    <div class="snackbar">
      Your post was published
    </div>
  </div>
</template>

<style scoped>
  .snackbar-wrapper {
    bottom: -100px;
    display: flex;
    justify-content: center;
    position: sticky;
    transition: bottom 500ms ease-in-out;
    width: 100%;
    z-index: 1000;
  }
  .snackbar-wrapper.active {
    bottom: 50px;
  }
  .snackbar {
    background: var(--c-primary);
    border-radius: 8px;
    border: 1px solid var(--c-primary-light);
    color: var(--c-text-base-light);
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    min-width: 280px;
    opacity: 0;
    padding: 8px 16px;
    text-align: center;
    transition: opacity 800ms ease-in-out;
  }
  .snackbar-wrapper.active .snackbar {
    opacity: 1;
  }
</style>
