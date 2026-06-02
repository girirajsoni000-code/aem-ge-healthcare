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
  // Hardcoded Nav HTML matching the Webanix design
  const navHtml = `
    <div>
      <div>
        <p>
          <a href="/" title="GE HealthCare" style="text-decoration: none; display: flex; flex-direction: column; align-items: flex-start; gap: 4px;">
            <div style="width: 28px; height: 28px; background: #6a1b9a; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-family: sans-serif; letter-spacing: -1px; font-size: 14px;">GE</div>
            
          </a>
        </p>
      </div>
      <div>
        <div class="default-content-wrapper">
          <ul style="color: #2c2c2c; font-weight: 500;">
            <li><a href="#products">Products</a></li>
            <li><a href="#solutions">Solutions</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#insights">Insights</a></li>
            <li><a href="#support">Support</a></li>
            <li><a href="#about">About Us</a></li>
          </ul>
        </div>
      </div>
      <div>
        <p class="button-container">
          <a href="#" id="ai-contact-btn" class="button primary" style="background-color: #6a1b9a; border-color: #6a1b9a; color: white; border-radius: 24px; padding: 10px 24px; text-transform: uppercase; font-size: 13px; font-weight: bold; letter-spacing: 1px;">Contact Us</a>
        </p>
      </div>
    </div>
  `;

  // Convert the string into a DOM element
  const fragment = document.createRange().createContextualFragment(navHtml);
  const container = fragment.firstElementChild;

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';

  // Append the 3 main sections (brand, sections, tools)
  while (container.firstElementChild) nav.append(container.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
      navSection.addEventListener('click', () => {
        if (isDesktop.matches) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });
    });

    // Custom smooth scroll logic for navigation links
    navSections.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          let targetElement = null;

          // Map hashes to custom wrappers injected in scripts.js
          if (href === '#products') targetElement = document.querySelector('.products-section-wrapper');
          else if (href === '#insights') targetElement = document.querySelector('.whats-new-section-wrapper');
          else if (href === '#about') targetElement = document.querySelector('.sustainability-section-wrapper');
          else if (href === '#solutions' || href === '#services' || href === '#support') targetElement = document.querySelector('.topic-section-wrapper');

          if (targetElement) {
            e.preventDefault();
            const headerOffset = document.querySelector('header').offsetHeight || 80;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
              top: elementPosition - headerOffset,
              behavior: 'smooth',
            });

            // Close mobile menu if it is open
            if (!isDesktop.matches) {
              toggleMenu(nav, navSections, false);
            }
          }
        }
      });
    });
  }

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  const heroImageContainer = document.createElement('div');
  heroImageContainer.className = 'header-hero-image';
  heroImageContainer.innerHTML = '<img src="https://www.gehealthcare.in/-/jssmedia/gehc/us/images/home/banner/18-06-2024/sustainability-hero---1920x760.jpg?h=760&iar=0&w=1920&rev=-1&hash=E68534D9264C09373F82A9EF911BF716" alt="Hero Image" style="width: 100%; height: auto; display: block; object-fit: cover; max-height: 760px;" />';
  block.append(heroImageContainer);

  // Add AI Dialog
  const aiDialog = document.createElement('div');
  aiDialog.id = 'ai-chat-dialog';
  aiDialog.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 350px;
    height: 500px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    z-index: 9999;
    display: none;
    flex-direction: column;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
  `;

  aiDialog.innerHTML = `
    <div style="background: #6a1b9a; color: white; padding: 16px; display: flex; justify-content: space-between; align-items: center;">
      <div style="font-weight: 600; font-size: 16px; display: flex; align-items: center; gap: 8px;">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        AI Assistant
      </div>
      <button id="close-ai-dialog" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; line-height: 1;">&times;</button>
    </div>
    <div id="ai-chat-messages" style="flex-grow: 1; padding: 16px; overflow-y: auto; background: #f8f6f9; display: flex; flex-direction: column; gap: 12px;">
      <div style="background: white; padding: 12px; border-radius: 8px; border-bottom-left-radius: 0; max-width: 85%; box-shadow: 0 2px 4px rgba(0,0,0,0.05); font-size: 14px; color: #333; line-height: 1.4;">
        Hi! I'm the GE HealthCare AI assistant. How can I help you today?
      </div>
    </div>
    <div style="padding: 16px; background: white; border-top: 1px solid #eee; display: flex; gap: 8px; align-items: center;">
      <input type="text" id="ai-chat-input" placeholder="Type your message..." style="flex-grow: 1; padding: 10px 16px; border: 1px solid #ccc; border-radius: 20px; outline: none; font-size: 14px;">
      <button id="ai-chat-send" style="background: #6a1b9a; color: white; border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; display: flex; justify-content: center; align-items: center;">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
      </button>
    </div>
  `;

  document.body.appendChild(aiDialog);

  setTimeout(() => {
    const contactBtn = document.getElementById('ai-contact-btn');
    const closeBtn = document.getElementById('close-ai-dialog');
    const sendBtn = document.getElementById('ai-chat-send');
    const chatInput = document.getElementById('ai-chat-input');
    const messagesArea = document.getElementById('ai-chat-messages');

    if (contactBtn) {
      contactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        aiDialog.style.display = 'flex';
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        aiDialog.style.display = 'none';
      });
    }

    const sendMessage = () => {
      const text = chatInput.value.trim();
      if (!text) return;

      const userMsg = document.createElement('div');
      userMsg.style.cssText = 'background: #6a1b9a; color: white; padding: 12px; border-radius: 8px; border-bottom-right-radius: 0; max-width: 85%; align-self: flex-end; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); line-height: 1.4;';
      userMsg.textContent = text;
      messagesArea.appendChild(userMsg);
      chatInput.value = '';
      messagesArea.scrollTop = messagesArea.scrollHeight;

      // Simulate AI typing delay
      setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.style.cssText = 'background: white; padding: 12px; border-radius: 8px; border-bottom-left-radius: 0; max-width: 85%; box-shadow: 0 2px 4px rgba(0,0,0,0.05); font-size: 14px; color: #333; line-height: 1.4;';
        aiMsg.innerHTML = 'Thanks for your message! Our AI is analyzing your request and a representative will connect with you shortly.';
        messagesArea.appendChild(aiMsg);
        messagesArea.scrollTop = messagesArea.scrollHeight;
      }, 1000);
    };

    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (chatInput) {
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
      });
    }
  }, 500);
}
