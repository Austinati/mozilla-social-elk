import Glean from '@mozilla/glean/web'
import * as log from 'tauri-plugin-log-api'

import { load } from '../../../telemetry/generated/page'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    log.info('Glean: App mounted, start initing glean')

    const GLEAN_APP_ID = 'mozilla-social-web'
    const devMode = useAppConfig().env === ('dev' || 'canary' || 'preview')
    const uploadEnabled = devMode // this will eventually be a setting that the user can toggle

    Glean.initialize(GLEAN_APP_ID, uploadEnabled, { })

    // Debugging
    if (devMode) {
      Glean.setLogPings(true) // logs to the console
      Glean.setDebugViewTag('moso-elk-dev') // logs to https://debug-ping-preview.firebaseapp.com
    }
  })

  nuxtApp.hook('page:finish', () => {
    const route = useRoute()

    load.record({ path: route.path })
  })
})
