import Glean from '@mozilla/glean/web'
import * as log from 'tauri-plugin-log-api'

import { linkClick, pageUrl, pageView, referrerUrl } from '../../../telemetry/generated/web'
import { userAgent } from '../../../telemetry/generated/identifiers'
import { engagement } from '../../../telemetry/generated/ui'
import { engagementDetails } from '../../../telemetry/engagementDetails'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    log.info('Glean: App mounted, start initing glean')

    const GLEAN_APP_ID = 'moso-mastodon-web'
    const env = useAppConfig().env
    const devMode = env === ('dev' || 'canary' || 'preview')
    const userSettings = useUserSettings()
    const allowGlean = getPreferences(userSettings.value, 'allowGlean')
    const uploadEnabled = devMode && allowGlean

    Glean.initialize(GLEAN_APP_ID, uploadEnabled, { channel: env })
    userAgent.set(navigator.userAgent)

    // Debugging
    if (devMode) {
      Glean.setLogPings(true) // logs to the console
      Glean.setDebugViewTag('moso-elk-dev') // logs to https://debug-ping-preview.firebaseapp.com
    }

    const eventListener = (event: MouseEvent) => {
      if (event.type === 'click') {
        handleButtonClick(event)
        handleLinkClick(event)
      }
    }

    function recordEngagement(element: Element) {
      if (!element)
        return

      if (!element.hasAttribute('data-glean'))
        return

      const data = element.getAttribute('data-glean') || ''
      const value = element.getAttribute('data-glean-value') || ''
      engagement.record({ ui_identifier: data, engagement_value: value, ...engagementDetails[data] })
    }

    function handleButtonClick(ev: MouseEvent) {
      const eventTarget = ev?.target as Element
      const closestButton = eventTarget.closest('button')

      if (!closestButton)
        return

      if (closestButton?.hasAttribute('href'))
        linkClick.record({ target_url: closestButton.getAttribute('href') || '' })

      recordEngagement(eventTarget)
    }

    function handleLinkClick(ev: MouseEvent) {
      const eventTarget = ev?.target as Element
      const closestLink = eventTarget.closest('a')

      if (!closestLink)
        return

      linkClick.record({ target_url: closestLink.getAttribute('href') || '' })

      recordEngagement(closestLink)
    }

    window.addEventListener('click', eventListener)
  })

  nuxtApp.hook('page:finish', () => {
    pageUrl.set(window.location.href)

    if (document.referrer !== '')
      referrerUrl.set(window.location.href)
    else
      referrerUrl.set('')

    pageView.record()
  })
})
