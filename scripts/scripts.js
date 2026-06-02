import {
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
} from './aem.js';

/**
 * Moves all the attributes from a given elmenet to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveAttributes(from, to, attributes) {
  if (!attributes) {
    // eslint-disable-next-line no-param-reassign
    attributes = [...from.attributes].map(({ nodeName }) => nodeName);
  }
  attributes.forEach((attr) => {
    const value = from.getAttribute(attr);
    if (value) {
      to?.setAttribute(attr, value);
      from.removeAttribute(attr);
    }
  });
}

/**
 * Move instrumentation attributes from a given element to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveInstrumentation(from, to) {
  moveAttributes(
    from,
    to,
    [...from.attributes]
      .map(({ nodeName }) => nodeName)
      .filter((attr) => attr.startsWith('data-aue-') || attr.startsWith('data-richtext-')),
  );
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks() {
  try {
    // TODO: add auto block, if needed
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  if (window.location.pathname === '/' && main === document.querySelector('main')) {
    // The user requested to remove all content except the navbar.
    // This clears all sections, blocks, and text that came from the document.
    main.innerHTML = '';

    // Add the requested custom sustainability section directly into main
    const sustainabilitySection = document.createElement('div');
    sustainabilitySection.className = 'sustainability-section';
    sustainabilitySection.innerHTML = `
      <div style="background-color: #f8f6f9; padding: 80px 5%; font-family: 'Inter', sans-serif; max-width: 1200px; margin: 0 auto;">
        <h2 style="font-size: 42px; font-weight: 300; color: #2c2c2c; margin-bottom: 24px; line-height: 1.2;">Our commitment to people and our planet</h2>
        <p style="font-size: 16px; color: #555; margin-bottom: 32px; line-height: 1.5; max-width: 800px;">
          Creating a more sustainable future requires we care for the planet and for its inhabitants. Learn more in GE HealthCare's 2023 Sustainability Report.
        </p>
        <a href="#" style="color: #6a1b9a; text-decoration: none; font-weight: 700; font-size: 14px; display: inline-flex; align-items: center; gap: 8px;">
          Download the report 
          <span style="font-size: 16px; font-weight: 300;">&gt;</span>
        </a>
      </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.className = 'sustainability-section-wrapper';
    wrapper.style.backgroundColor = '#f8f6f9';
    wrapper.style.margin = '0'; // Overrides main > div margin
    wrapper.style.width = '100%';
    wrapper.style.padding = '0';
    wrapper.append(sustainabilitySection);

    // Add the 4-column statistics section
    const statsSection = document.createElement('div');
    statsSection.className = 'stats-section';
    statsSection.innerHTML = `
      <div style="background-color: #ffffff; padding: 60px 5% 80px; font-family: 'Inter', sans-serif; max-width: 1200px; margin: 0 auto;">
        <div style="display: flex; gap: 40px; justify-content: space-between; flex-wrap: wrap;">
          <div style="display: flex; flex-direction: column; flex: 1 1 200px; min-width: 200px;">
            <div style="font-size: clamp(40px, 8vw, 64px); font-weight: 100; color: #2c2c2c; margin-bottom: 12px; line-height: 1;">$1B</div>
            <div style="font-size: 14px; color: #555; margin-bottom: 24px; flex-grow: 1; max-width: 90%;">Invested in R&D annually</div>
            <div style="height: 3px; background-color: #f47c5f; width: 100%;"></div>
          </div>
          <div style="display: flex; flex-direction: column; flex: 1 1 200px; min-width: 200px;">
            <div style="font-size: clamp(40px, 8vw, 64px); font-weight: 100; color: #2c2c2c; margin-bottom: 12px; line-height: 1;">259K</div>
            <div style="font-size: 14px; color: #555; margin-bottom: 24px; flex-grow: 1; max-width: 90%;">Patients supported daily using GE HealthCare imaging technology</div>
            <div style="height: 3px; background-color: #555555; width: 100%;"></div>
          </div>
          <div style="display: flex; flex-direction: column; flex: 1 1 200px; min-width: 200px;">
            <div style="font-size: clamp(40px, 8vw, 64px); font-weight: 100; color: #2c2c2c; margin-bottom: 12px; line-height: 1;">4M</div>
            <div style="font-size: 14px; color: #555; margin-bottom: 24px; flex-grow: 1; max-width: 90%;">Imaging, mobile, diagnostic and monitoring devices worldwide</div>
            <div style="height: 3px; background-color: #27ae60; width: 100%;"></div>
          </div>
          <div style="display: flex; flex-direction: column; flex: 1 1 200px; min-width: 200px;">
            <div style="font-size: clamp(40px, 8vw, 64px); font-weight: 100; color: #2c2c2c; margin-bottom: 12px; line-height: 1;">2B+</div>
            <div style="font-size: 14px; color: #555; margin-bottom: 24px; flex-grow: 1; max-width: 90%;">Patient scans managed by GE HealthCare technology annually</div>
            <div style="height: 3px; background-color: #3bb2c4; width: 100%;"></div>
          </div>
        </div>
      </div>
    `;
    const statsWrapper = document.createElement('div');
    statsWrapper.className = 'stats-section-wrapper';
    statsWrapper.style.backgroundColor = '#ffffff';
    statsWrapper.style.margin = '0'; // Overrides main > div margin
    statsWrapper.style.width = '100%';
    statsWrapper.style.padding = '0';
    statsWrapper.append(statsSection);

    // Run AEM decorations first
    decorateButtons(main);
    decorateIcons(main);
    buildAutoBlocks(main);
    decorateSections(main);
    decorateBlocks(main);

    // Add the "Choose a topic" section
    const topicSection = document.createElement('div');
    topicSection.className = 'topic-section';
    const topics = [
      'Artificial Intelligence', 'Efficiency', 'Innovation', 'Access', 'Burnout',
      'Cyber Security', 'Newest Products', 'Patient outcomes', 'Cost Savings',
      'COVID-19', 'Diversity', 'Patient Experience',
    ];
    const topicButtons = topics.map((t) => `<button style="background: white; border: 1px solid #ddd; border-radius: 24px; padding: 12px 24px; font-size: 15px; color: #333; cursor: pointer; transition: all 0.2s;">${t}</button>`).join('');

    topicSection.innerHTML = `
      <div style="background-color: #f8f6f9; padding: 80px 5%; font-family: 'Inter', sans-serif; text-align: center;">
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 24px;">
          <div style="width: 32px; height: 32px; border: 1px solid #8e44ad; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #8e44ad; font-size: 14px; margin-bottom: 16px;">1</div>
          <div style="font-size: 13px; font-weight: 700; color: #333; letter-spacing: 1px; text-transform: uppercase;">CHOOSE A TOPIC</div>
        </div>
        <h2 style="font-size: 48px; font-weight: 300; color: #2c2c2c; margin-bottom: 48px;">I'd like to learn more about</h2>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; max-width: 1000px; margin: 0 auto;">
          ${topicButtons}
        </div>
      </div>
    `;
    const topicWrapper = document.createElement('div');
    topicWrapper.className = 'topic-section-wrapper';
    topicWrapper.style.backgroundColor = '#f8f6f9';
    topicWrapper.style.margin = '0';
    topicWrapper.style.width = '100%';
    topicWrapper.style.padding = '0';
    topicWrapper.append(topicSection);

    // Add the "Our Products by Category" section
    const productsSection = document.createElement('div');
    productsSection.className = 'products-section';

    const products = [
      { title: 'Imaging', img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=300&fit=crop' },
      { title: 'Ultrasound', img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop' },
      { title: 'Healthcare IT', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop' },
      { title: 'Contrast Media', img: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400&h=300&fit=crop' },
      { title: 'Patient Monitoring', img: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&h=300&fit=crop' },
      { title: 'Diagnostic Cardiology', img: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=300&fit=crop' },
      { title: 'Maternal Infant Care', img: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=300&fit=crop' },
      { title: 'Bone Health', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop' },
    ];

    const productCards = products.map((p) => `
      <div style="flex: 0 0 clamp(250px, 75vw, 280px); background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06); display: flex; flex-direction: column;">
        <div style="height: 220px; width: 100%; background: #fff; display: flex; align-items: center; justify-content: center;">
          <img src="${p.img}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <div style="padding: 20px; flex-grow: 1;">
          <h3 style="font-size: 18px; font-weight: 400; color: #222; margin: 0;">${p.title}</h3>
        </div>
      </div>
    `).join('');

    productsSection.innerHTML = `
      <div style="background-color: #fcfcfc; padding: 80px 5%; font-family: 'Inter', sans-serif; max-width: 1200px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
          <h2 style="font-size: 36px; font-weight: 300; color: #1a2b49; margin: 0;">Our Products by Category</h2>
          <div style="display: flex; gap: 12px;">
            <button id="prev-product" style="width: 40px; height: 40px; border-radius: 50%; border: none; background-color: #f0f0f0; color: #999; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 18px;">&lt;</button>
            <button id="next-product" style="width: 40px; height: 40px; border-radius: 50%; border: none; background-color: #6a1b9a; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 18px;">&gt;</button>
          </div>
        </div>
        <div id="product-carousel" style="display: flex; gap: 24px; overflow-x: hidden; scroll-behavior: smooth;">
          ${productCards}
        </div>
      </div>
    `;

    // Attach click events for the carousel arrows
    setTimeout(() => {
      const carousel = productsSection.querySelector('#product-carousel');
      const prevBtn = productsSection.querySelector('#prev-product');
      const nextBtn = productsSection.querySelector('#next-product');
      if (carousel && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
          carousel.scrollBy({ left: -(carousel.clientWidth + 24), behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
          carousel.scrollBy({ left: carousel.clientWidth + 24, behavior: 'smooth' });
        });
      }
    }, 0);

    const productsWrapper = document.createElement('div');
    productsWrapper.className = 'products-section-wrapper';
    productsWrapper.style.backgroundColor = '#fcfcfc';
    productsWrapper.style.margin = '0';
    productsWrapper.style.width = '100%';
    productsWrapper.style.padding = '0';
    productsWrapper.append(productsSection);

    // Add the "What's new" section
    const whatsNewSection = document.createElement('div');
    whatsNewSection.className = 'whats-new-section';

    const newsItems = [
      {
        title: '5 reasons single sign-on (SSO) matters for handheld ultrasound programs',
        img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop',
        date: 'May 05, 2026',
        category: 'Healthcare Technology Management',
      },
      {
        title: 'How virtual ultrasound collaboration can strengthen confidence and consistency',
        img: 'https://images.unsplash.com/photo-1551076805-e1869043e560?w=400&h=250&fit=crop',
        date: 'May 04, 2026',
        category: 'Radiology',
      },
      {
        title: 'Why MSK Physicians Choose L4-20t-RS for High-Performance Ultrasound',
        img: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&h=250&fit=crop',
        date: 'April 29, 2026',
        category: '',
      },
      {
        title: 'Top Features to Look for in a Shared Services Ultrasound System',
        img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop',
        date: 'April 29, 2026',
        category: '',
      },
    ];

    const newsCards = newsItems.map((n) => `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="height: 180px; width: 100%; overflow: hidden;">
          <img src="${n.img}" alt="${n.title}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <div>
          <h3 style="font-size: 16px; font-weight: 400; color: #222; margin: 0 0 16px 0; line-height: 1.4;">${n.title}</h3>
          <div style="font-size: 12px; color: #666; margin: 0; display: flex; gap: 8px;">
            <span>${n.date}</span>
            ${n.category ? `<span>&bull;</span><span style="max-width: 120px;">${n.category}</span>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    whatsNewSection.innerHTML = `
      <div style="background-color: #f8f6f9; padding: 60px 5%; font-family: 'Inter', sans-serif; max-width: 1200px; margin: 0 auto;">
        <h2 style="font-size: 20px; font-weight: 700; color: #2c2c2c; margin-bottom: 32px;">What's new</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-bottom: 48px;">
          ${newsCards}
        </div>
        <a href="#" style="color: #6a1b9a; text-decoration: none; font-size: 15px;">More Insights from GE HealthCare</a>
      </div>
    `;

    const whatsNewWrapper = document.createElement('div');
    whatsNewWrapper.className = 'whats-new-section-wrapper';
    whatsNewWrapper.style.backgroundColor = '#f8f6f9';
    whatsNewWrapper.style.margin = '0';
    whatsNewWrapper.style.width = '100%';
    whatsNewWrapper.style.padding = '0';
    whatsNewWrapper.append(whatsNewSection);

    // Append our custom sections AFTER AEM is done so it doesn't mess with our DOM
    main.append(wrapper);
    main.append(statsWrapper);
    main.append(topicWrapper);
    main.append(productsWrapper);
    main.append(whatsNewWrapper);
  } else {
    // We are NOT on the homepage. Just run standard AEM block decorations for other pages.
    decorateButtons(main);
    decorateIcons(main);
    buildAutoBlocks(main);
    decorateSections(main);
    decorateBlocks(main);
  }
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    // We wrapped this in a try-catch or if block since we cleared main
    const firstSection = main.querySelector('.section');
    if (firstSection) {
      await loadSection(firstSection, waitForFirstImage);
    }
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
