;(function () {
  var toggle = document.getElementById('menu-toggle')
  var nav = document.getElementById('mobile-nav')

  function toggleMenu() {
    if (!toggle || !nav) return
    var isOpen = nav.classList.toggle('active')
    toggle.classList.toggle('active')
    toggle.setAttribute('aria-expanded', isOpen)
    nav.setAttribute('aria-hidden', !isOpen)
  }

  toggle && toggle.addEventListener('click', toggleMenu)

  // Zamknięcie po Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav && nav.classList.contains('active')) toggleMenu()
  })

  // Zamknięcie po kliknięciu w link (nawigacja)
  nav && nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (nav.classList.contains('active')) toggleMenu()
    })
  })
  // GA4 – helper do zdarzeń (działa tylko po akceptacji cookies)
  function trackGA4Event (name, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params || {})
    }
  }

  // GA4: główne CTA na stronie głównej
  var homeMainCta = document.querySelector('[data-ga4-cta="home-main"]')
  if (homeMainCta) {
    homeMainCta.addEventListener('click', function () {
      trackGA4Event('cta_main_click', {
        page_location: window.location.pathname,
        link_url: homeMainCta.getAttribute('href') || '',
        link_text: homeMainCta.textContent.trim()
      })
    })
  }

  // GA4: wybór pakietu na stronie oferty
  var packageLinks = document.querySelectorAll('[data-ga4-package]')
  packageLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      var pkg = link.getAttribute('data-ga4-package')
      trackGA4Event('select_pricing_package', {
        package_name: pkg,
        page_location: window.location.pathname,
        link_url: link.getAttribute('href') || ''
      })
    })
  })

  // GA4: kliknięcie w mail na stronie kontaktu
  var contactEmail = document.querySelector('[data-ga4-email="contact-main"]')
  if (contactEmail) {
    contactEmail.addEventListener('click', function () {
      trackGA4Event('contact_email_click', {
        page_location: window.location.pathname,
        link_url: contactEmail.getAttribute('href') || '',
        link_text: contactEmail.textContent.trim()
      })
    })
  }

  // GA4: wysłanie formularza kontaktowego
  var contactForm = document.querySelector('[data-ga4-form="contact-main"]')
  if (contactForm) {
    contactForm.addEventListener('submit', function () {
      trackGA4Event('contact_form_submit', {
        page_location: window.location.pathname,
        form_id: contactForm.getAttribute('id') || 'contact-form'
      })
    })
  }
})()

