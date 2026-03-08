;(function () {
  var CONSENT_KEY = 'cookie_consent'

  function getConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY)
    } catch (e) {
      return null
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value)
      document.documentElement.dataset.cookieConsent = value
    } catch (e) {}
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-consent')
    if (banner) banner.hidden = true
  }

  function showBanner() {
    var banner = document.getElementById('cookie-consent')
    if (banner) banner.hidden = false
  }

  function updateConsent(status) {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        'analytics_storage': status === 'accepted' ? 'granted' : 'denied'
      });
    }
  }

  function init() {
    var banner = document.getElementById('cookie-consent')
    if (!banner) return

    var consent = getConsent()

    if (consent === 'accepted') {
      hideBanner()
      updateConsent('accepted')
    } else if (consent === 'rejected') {
      hideBanner()
      updateConsent('rejected')
    } else {
      showBanner()
    }

    banner.querySelector('[data-consent="accept"]').addEventListener('click', function () {
      setConsent('accepted')
      hideBanner()
      updateConsent('accepted')
    })

    banner.querySelector('[data-consent="reject"]').addEventListener('click', function () {
      setConsent('rejected')
      hideBanner()
      updateConsent('rejected')
    })
  }

  document.addEventListener('DOMContentLoaded', init)
})()