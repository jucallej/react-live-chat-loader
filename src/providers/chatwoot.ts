import { State } from 'types'

const domain = 'https://app.chatwoot.com'

declare global {
  interface Window {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    chatwootSettings: any
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    $chatwoot: any
    chatwootSDK: {
      run: (options: {
        websiteToken: string
        baseUrl: string
        locale?: string
        type?: 'standard' | 'expanded_bubble'
        position?: 'left' | 'right'
      }) => void
    }
  }
}

/* eslint-disable */
const loadScript = (onload: () => void, baseUrl: string): void => {
  if (window.$chatwoot) return
  ;(function(d, t) {
    var script: HTMLScriptElement = d.createElement('script')
    var fisrtScript = d.getElementsByTagName('script')[0]
    script.src = baseUrl + '/packs/js/sdk.js'
    fisrtScript.parentNode?.insertBefore(script, fisrtScript)
    script.onload = onload
  })(document)
}
/* eslint-enable */

const load = ({
  providerKey,
  locale = 'en',
  setState,
  baseUrl = domain
}: {
  providerKey: string
  locale?: string
  setState: (state: State) => void
  baseUrl?: string
}): void => {
  loadScript(function() {
    setTimeout(() => setState('complete'), 1000)
    window.chatwootSDK.run({
      websiteToken: providerKey,
      baseUrl,
      locale
    })
  }, baseUrl)
}

const open = (): void => {
  window.addEventListener('chatwoot:ready', function() {
    window.$chatwoot.toggle()
  })
}

export default {
  domain,
  load,
  open
}
