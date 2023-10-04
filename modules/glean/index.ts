import { addPlugin, createResolver, defineNuxtModule, useNuxt } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'glean',
  },
  setup() {
    const nuxt = useNuxt()
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.pwa.disable = true
    nuxt.options.sourcemap.client = false

    addPlugin(resolve('./runtime/glean-plugin.client'))
  },
})
