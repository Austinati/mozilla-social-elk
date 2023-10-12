import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'glean',
  },
  setup() {
    const { resolve } = createResolver(import.meta.url)

    addPlugin(resolve('./runtime/glean-plugin.client'))
  },
})
