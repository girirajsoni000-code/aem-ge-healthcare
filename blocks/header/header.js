// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }

  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
    // collapse menu on focus lost
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // Hardcoded Nav HTML matching the redesigned EDS header
  const navHtml = '<header id="ge-header-component" class="" attr-isredesign="Redesign"><div class="ge-cdx-header-redesign-EDS" style="z-index: 1001;"><div class="ge-cdx-header-redesign__header-wrapper"><div class="ge-cdx-header-redesign__tablet-mobile-logo"><div class="ge-eds-site-logo-container ge-cdx-header-redesign-EDS"><a href="/" data-analytics-tracking-event="link_click" data-analytics-link-type="Header" data-analytics-link-name="GE Logo" aria-label="GE Logo"><img src="https://www.gehealthcare.in/cdn/res/images/logo.svg" alt="ge monogram primary white RGB"></a></div></div><div class="ge-cdx-header-redesign__desktop-logo"><div class="ge-eds-site-logo-container"><a href="/" data-analytics-tracking-event="link_click" data-analytics-link-type="Header" data-analytics-link-name="GE Logo" aria-label="GE Logo"><img src="https://www.gehealthcare.in/cdn/res/images/logo.svg" alt="ge monogram primary white RGB"></a></div></div><nav class="ge-cdx-header-redesign__menu-container"><ul class="ge-cdx-header-redesign__menu-container__nav-menu-list"><li class="ge-cdx-header-redesign__nav-menu-item" id="primary-navigation-item-0"><span class="ge-cdx-header-redesign__nav-menu-item__nav-link" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="Products" aria-label="Products" role="button" tabindex="0">Products</span></li><li class="ge-cdx-header-redesign__nav-menu-item" id="primary-navigation-item-1"><span class="ge-cdx-header-redesign__nav-menu-item__nav-link" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="Services" aria-label="Services" role="button" tabindex="0">Services</span></li><li class="ge-cdx-header-redesign__nav-menu-item" id="primary-navigation-item-2"><span class="ge-cdx-header-redesign__nav-menu-item__nav-link" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="Support" aria-label="Support" role="button" tabindex="0">Support</span></li><li class="ge-cdx-header-redesign__nav-menu-item" id="primary-navigation-item-3"><span class="ge-cdx-header-redesign__nav-menu-item__nav-link" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="Specialties" aria-label="Specialties" role="button" tabindex="0">Specialties</span></li><li class="ge-cdx-header-redesign__nav-menu-item" id="primary-navigation-item-4"><span class="ge-cdx-header-redesign__nav-menu-item__nav-link" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="Insights" aria-label="Insights" role="button" tabindex="0">Insights</span></li><li class="ge-cdx-header-redesign__nav-menu-item" id="primary-navigation-item-5"><span class="ge-cdx-header-redesign__nav-menu-item__nav-link" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="About Us" aria-label="About Us" role="button" tabindex="0">About Us</span></li></ul></nav><div class="ge-cdx-header-redesign__icons-container"><ul class="ge-cdx-header-redesign__icons-container__icons-list"><li class="ge-cdx-header-redesign__icon-menu-item"><div class="ge-cdx-header-redesign__icon-menu-item__icon-button search-icon-link" data-analytics-tracking-event="link_click" data-analytics-link-type="Header" data-analytics-link-name="Search icon" tabindex="0" aria-label="Search Icon" role="button" id="searchIcon"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g id="Search_-_16" data-name="Search - 16"><path d="M0,6a6,6,0,0,0,9.47,4.89l4.82,4.82a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L10.89,9.47A6,6,0,1,0,0,6ZM1,6a5,5,0,1,1,5,5A5,5,0,0,1,1,6Z"></path></g></svg></div></li><li class="ge-cdx-header-redesign__icon-menu-item" id="account-icon-item"><a href="/api/v1/login" class="ge-cdx-header-redesign__icon-menu-item__icon-button signin-icon-link" data-analytics-tracking-event="link_click" data-analytics-link-type="Header" data-analytics-tag="SIGN_IN_START" data-analytics-link-name="Sign-in icon" tabindex="0" role="button" aria-label="Sign in Icon"><svg id="ico-placeholderavatar-16" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M10.5,6A2.78,2.78,0,0,1,8,9,2.78,2.78,0,0,1,5.5,6,2.78,2.78,0,0,1,8,3,2.78,2.78,0,0,1,10.5,6ZM16,8A8,8,0,1,1,8,0,8,8,0,0,1,16,8ZM15,8A7,7,0,1,0,3,12.89v-.64A3.59,3.59,0,0,1,5.16,9.17,3.8,3.8,0,0,0,8,10.5a3.8,3.8,0,0,0,2.84-1.33A3.59,3.59,0,0,1,13,12.25v.64A7,7,0,0,0,15,8Z"></path></svg></a></li><li class="ge-cdx-header-redesign__icon-menu-item bookmark-desktop-icon"><a href="/my-bookmarks" class="ge-cdx-header-redesign__icon-menu-item__icon-button bookmark-icon-link" data-analytics-tracking-event="link_click" data-analytics-link-type="Header" data-analytics-link-name="My Bookmarks" aria-label="My Bookmarks" tabindex="0" role="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M11.5,1a.5.5,0,0,1,.5.5V14.59L9.56,12.15a2.2,2.2,0,0,0-3.12,0L4,14.59V1.5A.5.5,0,0,1,4.5,1h7m0-1h-7A1.5,1.5,0,0,0,3,1.5V15.29a.71.71,0,0,0,.72.71.66.66,0,0,0,.49-.21l2.93-2.93a1.21,1.21,0,0,1,1.72,0l2.93,2.93a.66.66,0,0,0,.49.21.71.71,0,0,0,.72-.71V1.5A1.5,1.5,0,0,0,11.5,0Z"></path></svg></a></li><li class="ge-cdx-header-redesign__icon-menu-item cart-icon"><span class="ge-cdx-header-redesign__icon-menu-item__icon-button cart-icon-link" data-analytics-tracking-event="link_click" data-analytics-link-type="Header" data-analytics-link-name="Cart icon" tabindex="0" aria-label="Cart Icon" role="button"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g id="Shopping_Cart_-_16" data-name="Shopping Cart - 16"><path d="M16,2.56,14.82,7.21a.47.47,0,0,1-.36.36L5.14,9.92,4.44,12H13.5a.5.5,0,0,1,0,1h-2A1.5,1.5,0,1,1,10,14.5,1.5,1.5,0,0,1,11.5,13H3.75a.45.45,0,0,1-.16,0h0l-.1-.05-.07-.05-.06-.07a.35.35,0,0,1-.05-.08l0-.09a.44.44,0,0,0,0-.1v0a.24.24,0,0,1,0-.08.25.25,0,0,1,0-.08l1-2.86L2.11,1H.5A.5.5,0,0,1,0,.5.5.5,0,0,1,.5,0h2l.09,0,.1,0L2.8.11a.46.46,0,0,1,.07.07.18.18,0,0,1,0,.07A.41.41,0,0,1,3,.34a.05.05,0,0,0,0,0L3.39,2H15.55A.45.45,0,0,1,16,2.56ZM5.5,13A1.5,1.5,0,1,0,7,14.5,1.5,1.5,0,0,0,5.5,13Z"></path></g></svg></span></li><li class="ge-cdx-header-redesign__icon-menu-item ge-cdx-hamburger-icon" tabindex="0"><div class="ge-cdx-header-redesign__icon-menu-item__hamburger-button" data-analytics-tracking-event="link_click" data-analytics-link-type="Header" data-analytics-link-name="Menu open"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g id="Hamburger_-_16" data-name="Hamburger - 16"><path d="M16,4H0V2H16Zm0,3H0V9H16Zm0,5H0v2H16Z"></path></g></svg></div></li></ul></div></div><div class="sub-menu-desktop ge-cdx-header-redesign-EDS element-not-visible" id="sub-menu-desktop"><div class="sub-menu-container" id="sub-menu-container"><div class="menu-content-wrapper" id="menu-content-wrapper" tabindex="0"><div><div class="menu-content-container"><div class="menu-content-container-center"><div class="menu-content-container-center-left"><div class="menu-content-container-items first-tier" id="second-tier-menu-list" tabindex="0"><div id="secondTierMenuLink_0" class="element-not-visible"><div class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Imaging " aria-label="Imaging" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Imaging</p><div class="menu-content-container-item-icon"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="sub-menu-caret-icon"><g id="Caret_right_-_16" data-name="Caret right - 16"><path d="M5.5,15a.47.47,0,0,1-.35-.15.48.48,0,0,1,0-.7L11.29,8,5.15,1.85a.48.48,0,0,1,0-.7.48.48,0,0,1,.7,0l6.5,6.5a.48.48,0,0,1,0,.7l-6.5,6.5A.47.47,0,0,1,5.5,15Z"></path></g></svg></div></div><div class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Ultrasound " aria-label="Ultrasound" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Ultrasound</p><div class="menu-content-container-item-icon"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="sub-menu-caret-icon"><g id="Caret_right_-_16" data-name="Caret right - 16"><path d="M5.5,15a.47.47,0,0,1-.35-.15.48.48,0,0,1,0-.7L11.29,8,5.15,1.85a.48.48,0,0,1,0-.7.48.48,0,0,1,.7,0l6.5,6.5a.48.48,0,0,1,0,.7l-6.5,6.5A.47.47,0,0,1,5.5,15Z"></path></g></svg></div></div><a href="/products/anesthesia-delivery" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Anesthesia Delivery " aria-label="Anesthesia Delivery" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Anesthesia Delivery</p></a><a href="/products/diagnostic-ecg" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Diagnostic ECG " aria-label="Diagnostic ECG" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Diagnostic ECG</p></a><a href="/products/maternal-infant-care" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Maternal &amp; Infant Care " aria-label="Maternal &amp; Infant Care" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Maternal &amp; Infant Care</p></a><a href="/products/patient-monitoring" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Patient Monitoring " aria-label="Patient Monitoring" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Patient Monitoring</p></a><a href="/products/ventilators" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Ventilators " aria-label="Ventilators" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Ventilators</p></a><div class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Pharmaceutical Imaging Agents " aria-label="Pharmaceutical Imaging Agents" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Pharmaceutical Imaging Agents</p><div class="menu-content-container-item-icon"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="sub-menu-caret-icon"><g id="Caret_right_-_16" data-name="Caret right - 16"><path d="M5.5,15a.47.47,0,0,1-.35-.15.48.48,0,0,1,0-.7L11.29,8,5.15,1.85a.48.48,0,0,1,0-.7.48.48,0,0,1,.7,0l6.5,6.5a.48.48,0,0,1,0,.7l-6.5,6.5A.47.47,0,0,1,5.5,15Z"></path></g></svg></div></div><div class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Digital Solutions " aria-label="Digital Solutions" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Digital Solutions</p><div class="menu-content-container-item-icon"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="sub-menu-caret-icon"><g id="Caret_right_-_16" data-name="Caret right - 16"><path d="M5.5,15a.47.47,0,0,1-.35-.15.48.48,0,0,1,0-.7L11.29,8,5.15,1.85a.48.48,0,0,1,0-.7.48.48,0,0,1,.7,0l6.5,6.5a.48.48,0,0,1,0,.7l-6.5,6.5A.47.47,0,0,1,5.5,15Z"></path></g></svg></div></div><a href="/products/goldseal-refurbished-systems" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Refurbished Systems " aria-label="Refurbished Systems" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Refurbished Systems</p></a></div><div id="secondTierMenuLink_1" class="element-not-visible"><a href="https://www.gehealthcare.in/services/service-enablers" target="_blank" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Comprehensive Services " aria-label="Comprehensive Services" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Comprehensive Services</p></a><a href=" https://www.gehealthcare.com/api/login" target="_blank" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| MyGEHealthcare Account " aria-label="MyGEHealthcare Account" tabindex="0" role="button"><p class="menu-content-container-item caption-text">MyGEHealthcare Account</p></a><a href="/services/healthcare-technology-management" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Healthcare Technology Management " aria-label="Healthcare Technology Management" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Healthcare Technology Management</p></a><a href="/services/clinical-network-solutions" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Clinical Network Solutions " aria-label="Clinical Network Solutions" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Clinical Network Solutions</p></a><div class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Cybersecurity " aria-label="Cybersecurity" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Cybersecurity</p><div class="menu-content-container-item-icon"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="sub-menu-caret-icon"><g id="Caret_right_-_16" data-name="Caret right - 16"><path d="M5.5,15a.47.47,0,0,1-.35-.15.48.48,0,0,1,0-.7L11.29,8,5.15,1.85a.48.48,0,0,1,0-.7.48.48,0,0,1,.7,0l6.5,6.5a.48.48,0,0,1,0,.7l-6.5,6.5A.47.47,0,0,1,5.5,15Z"></path></g></svg></div></div><a href="/products/site-planning" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Site Planning " aria-label="Site Planning" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Site Planning</p></a><a href="https://services.gehealthcare.in/gehcstorefront/" target="_blank" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Service Shop " aria-label="Service Shop" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Service Shop</p></a></div><div id="secondTierMenuLink_2" class="element-not-visible"><div class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Education " aria-label="Education" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Education</p><div class="menu-content-container-item-icon"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="sub-menu-caret-icon"><g id="Caret_right_-_16" data-name="Caret right - 16"><path d="M5.5,15a.47.47,0,0,1-.35-.15.48.48,0,0,1,0-.7L11.29,8,5.15,1.85a.48.48,0,0,1,0-.7.48.48,0,0,1,.7,0l6.5,6.5a.48.48,0,0,1,0,.7l-6.5,6.5A.47.47,0,0,1,5.5,15Z"></path></g></svg></div></div><div class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Support and Documentation " aria-label="Support and Documentation" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Support and Documentation</p><div class="menu-content-container-item-icon"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="sub-menu-caret-icon"><g id="Caret_right_-_16" data-name="Caret right - 16"><path d="M5.5,15a.47.47,0,0,1-.35-.15.48.48,0,0,1,0-.7L11.29,8,5.15,1.85a.48.48,0,0,1,0-.7.48.48,0,0,1,.7,0l6.5,6.5a.48.48,0,0,1,0,.7l-6.5,6.5A.47.47,0,0,1,5.5,15Z"></path></g></svg></div></div><a href="/about/contact-us" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Contact " aria-label="Contact" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Contact</p></a></div><div id="secondTierMenuLink_3" class="element-not-visible"><a href="/specialties/breast-health" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Breast Health " aria-label="Breast Health" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Breast Health</p></a><a href="/specialties/cardiology-solutions" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Cardiology " aria-label="Cardiology" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Cardiology</p></a><a href="/specialties/electrophysiology" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Electrophysiology " aria-label="Electrophysiology" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Electrophysiology</p></a><a href="/specialties/hybrid-or" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Hybrid OR " aria-label="Hybrid OR" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Hybrid OR</p></a><a href="/specialties/neurology" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Neurology " aria-label="Neurology" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Neurology</p></a><a href="/specialties/obstetrics-and-gynecology" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Obstetrics and gynecology " aria-label="Obstetrics and gynecology" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Obstetrics and gynecology</p></a><a href="/specialties/oncology-solutions" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Oncology " aria-label="Oncology" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Oncology</p></a><a href="/specialties/orthopedics" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Orthopedics " aria-label="Orthopedics" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Orthopedics</p></a><a href="/specialties/radiology" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Radiology " aria-label="Radiology" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Radiology</p></a><a href="/specialties/stroke-solutions" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Stroke Solutions " aria-label="Stroke Solutions" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Stroke Solutions</p></a></div><div id="secondTierMenuLink_4" class="element-not-visible"><a href="/insights" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Explore our content collection " aria-label="Explore our content collection" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Explore our content collection</p></a><a href="/insights/docuseries/on-the-frontlines" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Docuseries " aria-label="Docuseries" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Docuseries</p></a><a href="/insights/articles" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Thought Leadership " aria-label="Thought Leadership" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Thought Leadership</p></a><a href="/insights/podcasts/real-time-healthcare" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Podcasts " aria-label="Podcasts" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Podcasts</p></a><a href="/about/ge-healthcare-pulse" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Pulse Newsletter " aria-label="Pulse Newsletter" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Pulse Newsletter</p></a></div><div id="secondTierMenuLink_5" class="element-not-visible"><a href="https://careers.gehealthcare.com/global/en" target="_blank" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Careers " aria-label="Careers" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Careers</p></a><a href="/about/about-ge-healthcare-systems" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| About Us " aria-label="About Us" tabindex="0" role="button"><p class="menu-content-container-item caption-text">About Us</p></a><a href="https://www.advamed.org/member-center/resource-library/advamed-code-of-ethics-on-interactions-with-health-care-professionals-in-india/" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| AdvaMed Code Of Ethics " aria-label="AdvaMed Code Of Ethics" tabindex="0" role="button"><p class="menu-content-container-item caption-text">AdvaMed Code Of Ethics</p></a><a href="https://www.gehealthcare.in/about/sustainability" target="_blank" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Sustainability " aria-label="Sustainability" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Sustainability</p></a><a href="https://www.gehealthcare.in/about/corporate-governance" target="_blank" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Corporate Governance " aria-label="Corporate Governance" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Corporate Governance</p></a><a href="https://www.gehealthcare.in/about/corporate-governance-ge-bel" target="_blank" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Corporate Governance - GE BEL " aria-label="Corporate Governance - GE BEL" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Corporate Governance - GE BEL</p></a><a href="https://www.gehealthcare.in/about/suppliers" target="_blank" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Suppliers " aria-label="Suppliers" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Suppliers</p></a><a href="/about/newsroom" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Newsroom " aria-label="Newsroom" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Newsroom</p></a><a href="/about/contact-us" target="" class="menu-content-container-item-data  " data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined| Contact " aria-label="Contact" tabindex="0" role="button"><p class="menu-content-container-item caption-text">Contact</p></a></div></div></div><div class="menu-content-container-center-right"><div class="menu-content-container-center-right-absolute collapse"><div class="menu-content-container-center-right-absolute-left"><div class="menu-content-container-items second-tier collapse" tabindex="0"><div class="element-not-visible"><a href="/products/bone-and-metabolic-health" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Bone &amp; Metabolic Health" aria-label="Bone &amp; Metabolic Health" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Bone &amp; Metabolic Health</p></a><a href="/products/computed-tomography" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Computed Tomography" aria-label="Computed Tomography" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Computed Tomography</p></a><a href="/products/fluoroscopy-systems" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Fluoroscopy" aria-label="Fluoroscopy" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Fluoroscopy</p></a><a href="/products/image-guiding-solutions" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Image Guiding Solutions" aria-label="Image Guiding Solutions" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Image Guiding Solutions</p></a><a href="/products/magnetic-resonance-imaging" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Magnetic Resonance Imaging" aria-label="Magnetic Resonance Imaging" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Magnetic Resonance Imaging</p></a><a href="/products/mammography" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Mammography" aria-label="Mammography" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Mammography</p></a><a href="/products/molecular-imaging" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Molecular Imaging" aria-label="Molecular Imaging" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Molecular Imaging</p></a><a href="/products/radiography" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Radiography (X-ray)" aria-label="Radiography (X-ray)" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Radiography (X-ray)</p></a><a href="/products/surgical-imaging" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Surgical Imaging" aria-label="Surgical Imaging" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Surgical Imaging</p></a><a href="/products/imaging" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|All Imaging" aria-label="All Imaging" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">All Imaging</p></a></div><div class="element-not-visible"><a href="/products/ultrasound/point-of-care-ultrasound" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Point of Care" aria-label="Point of Care" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Point of Care</p></a><a href="/products/ultrasound/urology" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Urology" aria-label="Urology" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Urology</p></a><a href="https://www.gehealthcare.in/products/ultrasound/vscan-air-cl" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Vscan Handheld" aria-label="Vscan Handheld" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Vscan Handheld</p></a><a href="/products/ultrasound/vivid" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Vivid Cardiovascular" aria-label="Vivid Cardiovascular" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Vivid Cardiovascular</p></a><a href="/products/ultrasound/voluson" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Voluson Women\'s Health" aria-label="Voluson Women\'s Health" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Voluson Women\'s Health</p></a><a href="/products/ultrasound/versana" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Primary Care | Versana" aria-label="Primary Care | Versana" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Primary Care | Versana</p></a><a href="/products/ultrasound" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|All Ultrasound" aria-label="All Ultrasound" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">All Ultrasound</p></a></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"><a href="/products/contrast-media" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Contrast Media" aria-label="Contrast Media" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Contrast Media</p></a></div><div class="element-not-visible"><a href="/products/advanced-visualization" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Advanced Visualization" aria-label="Advanced Visualization" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Advanced Visualization</p></a><a href="https://www.gehccommandcenter.com/" target="_blank" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Command Centers" aria-label="Command Centers" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Command Centers</p></a><a href="/products/healthcare-it" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|All Digital Solutions" aria-label="All Digital Solutions" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">All Digital Solutions</p></a></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"><a href="/security" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Product Security Portal" aria-label="Product Security Portal" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Product Security Portal</p></a></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"><a href="/education-in/pdx-educational-center" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Educational Centre PDx" aria-label="Educational Centre PDx" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Educational Centre PDx</p></a><a href="https://hls.gehealthcare.com/" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Healthcare Learning System" aria-label="Healthcare Learning System" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Healthcare Learning System</p></a><a href="/digital-expert" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Digital Expert" aria-label="Digital Expert" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Digital Expert</p></a><a href="" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|All Education" aria-label="All Education" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">All Education</p></a></div><div class="element-not-visible"><a href="https://cleaning.gehealthcare.com/" target="_blank" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Cleaner and Disinfectant Compatibility" aria-label="Cleaner and Disinfectant Compatibility" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Cleaner and Disinfectant Compatibility</p></a><a href="https://gehealthcare.com/support/manuals" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Manuals &amp; Documentation" aria-label="Manuals &amp; Documentation" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Manuals &amp; Documentation</p></a><a href="/products/interoperability" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Interoperability" aria-label="Interoperability" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Interoperability</p></a><a href="/security" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Product Security Portal" aria-label="Product Security Portal" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Product Security Portal</p></a><a href="/products/site-planning" target="" class="menu-content-container-item-data" data-analytics-tracking-event="link_click" data-analytics-link-type="Primary Navigation" data-analytics-link-name="undefined|undefined|Site Planning" aria-label="Site Planning" tabindex="0" role="button"><p class="menu-content-container-item caption-text fade-out">Site Planning</p></a></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div><div class="element-not-visible"></div></div></div><div class="menu-content-container-center-right-absolute-right"><div class="menu-content-container-items promo-panel collapse"><div class="ge-cdx-header-redesign__promo-feature element-not-visible" id="promo-feature-0"><a class="ge-cdx-header-redesign__promo-feature-wrapper" data-analytics-tracking-event="link_click" data-analytics-link-type="promo header navigation" tabindex="0" role="button"></a></div><div class="ge-cdx-header-redesign__promo-feature element-not-visible" id="promo-feature-1"><a class="ge-cdx-header-redesign__promo-feature-wrapper" data-analytics-tracking-event="link_click" data-analytics-link-type="promo header navigation" tabindex="0" role="button"></a></div><div class="ge-cdx-header-redesign__promo-feature element-not-visible" id="promo-feature-2"><a class="ge-cdx-header-redesign__promo-feature-wrapper" data-analytics-tracking-event="link_click" data-analytics-link-type="promo header navigation" tabindex="0" role="button"></a></div><div class="ge-cdx-header-redesign__promo-feature element-not-visible" id="promo-feature-3"><a class="ge-cdx-header-redesign__promo-feature-wrapper" data-analytics-tracking-event="link_click" data-analytics-link-type="promo header navigation" tabindex="0" role="button"></a></div><div class="ge-cdx-header-redesign__promo-feature element-not-visible" id="promo-feature-4"><a class="ge-cdx-header-redesign__promo-feature-wrapper" data-analytics-tracking-event="link_click" data-analytics-link-type="promo header navigation" tabindex="0" role="button"></a></div><div class="ge-cdx-header-redesign__promo-feature element-not-visible" id="promo-feature-5"><a class="ge-cdx-header-redesign__promo-feature-wrapper" data-analytics-tracking-event="link_click" data-analytics-link-type="promo header navigation" tabindex="0" role="button"></a></div></div></div></div></div><div class="menu-content-container-center-flow collapse"></div></div></div></div></div></div></div></div></header>';
  block.innerHTML = '';
  block.innerHTML = navHtml;

  const heroImageContainer = document.createElement('div');
  heroImageContainer.className = 'header-hero-image';
  heroImageContainer.innerHTML = '<img src="https://www.gehealthcare.in/-/jssmedia/gehc/us/images/home/banner/18-06-2024/sustainability-hero---1920x760.jpg?h=760&iar=0&w=1920&rev=-1&hash=E68534D9264C09373F82A9EF911BF716" alt="Hero Image" style="width: 100%; height: auto; display: block; object-fit: cover; max-height: 760px;" />';
  block.append(heroImageContainer);

  // Navbar scrolls normally with page
  const navContainer = block.querySelector('#ge-header-component');

  // Butter bar: outdated site notice — scrolls with page
  const butterBar = document.createElement('div');
  butterBar.className = 'butter-bar-banner theme-grey-750';
  butterBar.innerHTML = '<div>You are currently viewing an outdated site experience. Please transition to our new experience at <a href="https://www.gehealthcare.com/en-in" data-analytics-tracking-event="link_click" data-analytics-link-name="https://www.gehealthcare.com/en-in" data-analytics-link-type="Butter Bar"><strong>https://www.gehealthcare.com/en-in</strong></a>.</div>';
  if (navContainer) {
    navContainer.after(butterBar);
  } else {
    block.insertBefore(butterBar, block.firstChild);
  }

  // Contact Us bar: starts in normal flow, becomes sticky on scroll
  const contactBar = document.createElement('div');
  contactBar.id = 'ge-contact-sticky';
  contactBar.className = 'ge-secondary-navigation__secondary-navigation-wrapper ge-secondary-navigation__top-border';
  contactBar.style.cssText = 'width: 100%; background: white;';
  contactBar.innerHTML = `
    <div style="max-width: 1248px; margin: 0 auto; padding: 0px 24px; display: flex; justify-content: flex-end; align-items: center; box-sizing: border-box; min-height: 44px;">
      <button id="banner-contact-btn" class="button ge-contact-us-button__contactus-action-button ge-secondary-navigation__cta-btn cta-desk-btn button--primary" name="Open Form Overlay" data-analytics-tracking-event="link_click" data-analytics-link-name="Contact Us" data-analytics-link-type="Secondary Navigation">Contact Us</button>
    </div>
  `;

  // Insert contact bar into page flow right after butter bar
  butterBar.after(contactBar);

  // Placeholder keeps space when contactBar becomes fixed (prevents layout jump)
  const contactPlaceholder = document.createElement('div');
  contactPlaceholder.style.display = 'none';
  contactBar.after(contactPlaceholder);

  // Store original position once DOM is ready
  let stickyOffset = 0;
  const initSticky = () => {
    stickyOffset = contactBar.offsetTop;
    contactPlaceholder.style.height = `${contactBar.offsetHeight}px`;
  };

  // Sticky scroll logic using scrollY vs original offsetTop
  const makeSticky = () => {
    if (stickyOffset === 0) initSticky();

    if (window.scrollY >= stickyOffset) {
      if (contactBar.style.position !== 'fixed') {
        contactPlaceholder.style.display = 'block';
        contactBar.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; z-index: 9999; background: white; border-bottom: 1px solid #e0e0e0; box-shadow: 0 2px 8px rgba(0,0,0,0.08);';
      }
    } else if (contactBar.style.position === 'fixed') {
      contactBar.style.cssText = 'width: 100%; background: white; border-bottom: 1px solid #e0e0e0;';
      contactPlaceholder.style.display = 'none';
    }
  };

  window.addEventListener('load', initSticky);
  window.addEventListener('scroll', makeSticky, { passive: true });

  // Add Contact Us Dialog
  const contactDialog = document.createElement('div');
  contactDialog.id = 'contact-us-dialog';
  contactDialog.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 9999;
    display: none;
    justify-content: center;
    align-items: center;
    font-family: var(--font-family-base, 'Inter', sans-serif);
  `;

  contactDialog.innerHTML = `
    <div class="ge-contact-us-form-wrapper" style="background: white; width: 90%; max-width: 700px; max-height: 90vh; overflow-y: auto; border-radius: 8px; position: relative; padding: 40px; box-sizing: border-box; text-align: left;">
     <div class="ge-contact-us-form-v2">
      <button id="close-contact-dialog" style="position: absolute; top: 20px; right: 20px; background: none; border: none; font-size: 28px; cursor: pointer; color: #666; line-height: 1;">&times;</button>
      
      <h2 class="title-s" style="margin-top: 0; font-weight: normal;">Contact Us</h2>
      <p class="ge-contact-us-form-wrapper__newsletter--subheading" style="font-size: 1.25rem;">
        We're ready to support you in your moments that matter. For service assistance, call us.
      </p>

      <div style="margin-bottom: 32px;">
        <p style="margin: 0 0 4px 0; color: #666; font-size: 0.95rem;">Would you prefer to speak to us on the phone?</p>
        <a href="#" style="color: #6a1b9a; text-decoration: none; font-weight: 500; font-size: 0.95rem;">Need help with an existing order or product support? +</a>
      </div>

      <div class="ge-form__section" style="margin-bottom: 32px;">
        <div class="ge-form__section-title">
          <p class="ge-p text-color" role="heading" style="font-size: 1.1rem; margin-bottom: 12px; font-weight: 500; margin-top: 0;">What can we help you with?</p>
        </div>
        <div style="display: flex; border: 1px solid #ccc; border-radius: 4px; overflow: hidden;">
          <button class="help-btn active" style="flex: 1; padding: 12px 8px; background: #6a1b9a; color: white; border: none; border-right: 1px solid #ccc; cursor: pointer; font-size: 0.85rem; font-weight: bold;">Price Quote</button>
          <button class="help-btn" style="flex: 1; padding: 12px 8px; background: white; color: #666; border: none; border-right: 1px solid #ccc; cursor: pointer; font-size: 0.85rem;">Product Demo</button>
          <button class="help-btn" style="flex: 1; padding: 12px 8px; background: white; color: #666; border: none; border-right: 1px solid #ccc; cursor: pointer; font-size: 0.85rem;">Product Info</button>
          <button class="help-btn" style="flex: 1; padding: 12px 8px; background: white; color: #666; border: none; cursor: pointer; font-size: 0.85rem;">Training/Education</button>
        </div>
      </div>

      <div style="margin-bottom: 32px;">
        <label style="display: block; font-size: 0.9rem; margin-bottom: 8px; color: #666;">Message</label>
        <textarea id="contact-message" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 4px; resize: vertical; min-height: 120px; font-family: inherit; box-sizing: border-box;" placeholder="I'd like a Price Quote on null"></textarea>
      </div>

      <div class="ge-form__section" style="margin-bottom: 32px;">
        <div class="ge-form__section-title">
          <p class="ge-p text-color" role="heading" style="font-size: 1.1rem; margin-bottom: 8px; font-weight: 500; margin-top: 0;">Who should we contact ?</p>
        </div>
        <p style="margin: 0 0 16px 0; color: #666; font-size: 0.85rem;">Your privacy matters, learn about our <a href="#" style="color: #6a1b9a;">privacy policy.</a></p>
        
        <div style="display: flex; gap: 16px; margin-bottom: 16px;">
          <div style="flex: 1;">
            <label style="display: block; font-size: 0.9rem; margin-bottom: 8px; color: #666;">Name <span style="color: red;">*</span></label>
            <input type="text" class="req-input" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; background: #fafafa;">
            <span class="val-msg" style="display: none; box-sizing: border-box; color: rgb(201, 0, 37); fill: rgb(201, 0, 37); font-family: 'Source Sans Pro', 'Source Han Sans', sans-serif; font-size: 12px; font-weight: 400;">Please fill out this field.</span>
          </div>
          <div style="flex: 1;">
            <label style="display: block; font-size: 0.9rem; margin-bottom: 8px; color: #666;">Surname <span style="color: red;">*</span></label>
            <input type="text" class="req-input" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; background: #fafafa;">
            <span class="val-msg" style="display: none; box-sizing: border-box; color: rgb(201, 0, 37); fill: rgb(201, 0, 37); font-family: 'Source Sans Pro', 'Source Han Sans', sans-serif; font-size: 12px; font-weight: 400;">Please fill out this field.</span>
          </div>
        </div>
        <div style="display: flex; gap: 16px;">
          <div style="flex: 1;">
            <label style="display: block; font-size: 0.9rem; margin-bottom: 8px; color: #666;">E mail <span style="color: red;">*</span></label>
            <input type="email" class="req-input" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; background: #fafafa;">
            <span class="val-msg" style="display: none; box-sizing: border-box; color: rgb(201, 0, 37); fill: rgb(201, 0, 37); font-family: 'Source Sans Pro', 'Source Han Sans', sans-serif; font-size: 12px; font-weight: 400;">Please fill out this field.</span>
          </div>
          <div style="flex: 1;">
            <label style="display: block; font-size: 0.9rem; margin-bottom: 8px; color: #666;">Phone Number</label>
            <input type="tel" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; background: #fafafa;">
          </div>
        </div>
      </div>

      <div class="ge-form__section" style="margin-bottom: 32px;">
        <div class="ge-form__section-title">
          <p class="ge-p text-color" role="heading" style="font-size: 1.1rem; margin-bottom: 8px; font-weight: 500; margin-top: 0;">Where do you work ?</p>
        </div>
        <p style="margin: 0 0 16px 0; color: #666; font-size: 0.85rem;">This helps direct you to the right specialist.</p>
        
        <div style="display: flex; gap: 16px;">
          <div style="flex: 1;">
            <label style="display: block; font-size: 0.9rem; margin-bottom: 8px; color: #666;">Country <span style="color: red;">*</span></label>
            <select class="req-input" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; background: white;">
              <option value="">Select a country</option>
              <option value="India">India</option>
            </select>
            <span class="val-msg" style="display: none; box-sizing: border-box; color: rgb(201, 0, 37); fill: rgb(201, 0, 37); font-family: 'Source Sans Pro', 'Source Han Sans', sans-serif; font-size: 12px; font-weight: 400;">Please fill out this field.</span>
          </div>
          <div style="flex: 1;">
            <label style="display: block; font-size: 0.9rem; margin-bottom: 8px; color: #666;">Zip/Postal Code</label>
            <input type="text" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; background: #fafafa;">
          </div>
        </div>
      </div>

      <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 32px;">
        <input type="checkbox" id="updates-checkbox" style="margin-top: 4px; width: 16px; height: 16px;">
        <label for="updates-checkbox" style="font-size: 0.85rem; color: #666; line-height: 1.4;">Please keep me updated on the latest product and services information.</label>
      </div>

      <div>
        <button type="submit" class="ge-contact-us-form__submit-button">Submit</button>
      </div>
     </div>
    </div>
  `;

  document.body.appendChild(contactDialog);

  setTimeout(() => {
    const contactBtn = document.getElementById('ai-contact-btn');
    const bannerContactBtn = document.getElementById('banner-contact-btn');
    const closeBtn = document.getElementById('close-contact-dialog');
    const helpBtns = document.querySelectorAll('.help-btn');
    const messageBox = document.getElementById('contact-message');

    const openDialog = (e) => {
      e.preventDefault();
      contactDialog.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    };

    if (contactBtn) contactBtn.addEventListener('click', openDialog);
    if (bannerContactBtn) bannerContactBtn.addEventListener('click', openDialog);

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        contactDialog.style.display = 'none';
        document.body.style.overflow = '';
      });
    }

    // Tab toggle logic
    helpBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        helpBtns.forEach((b) => {
          b.classList.remove('active');
          b.style.background = 'white';
          b.style.color = '#666';
          b.style.fontWeight = 'normal';
        });
        btn.classList.add('active');
        btn.style.background = '#6a1b9a';
        btn.style.color = 'white';
        btn.style.fontWeight = 'bold';

        // Update textarea placeholder
        messageBox.placeholder = `I'd like a ${btn.textContent} on null`;
      });
    });

    const formSubmitBtn = document.querySelector('.ge-contact-us-form__submit-button');
    if (formSubmitBtn) {
      formSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const reqInputs = document.querySelectorAll('.req-input');
        const valMsgs = document.querySelectorAll('.val-msg');
        let isValid = true;

        reqInputs.forEach((input, index) => {
          if (!input.value.trim()) {
            valMsgs[index].style.display = 'inline';
            input.style.borderColor = 'rgb(201, 0, 37)';
            isValid = false;
          } else {
            valMsgs[index].style.display = 'none';
            input.style.borderColor = '#ccc';
          }
        });

        if (isValid) {
          // Form is valid, handle successful submission here
        }
      });
    }
  }, 500);
}
