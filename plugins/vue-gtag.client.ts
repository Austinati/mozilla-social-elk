import VueGtag, { trackRouter } from 'vue-gtag-next'

export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: { id: 'GT-TB7PDRL' },
  })
  trackRouter(useRouter())
})
