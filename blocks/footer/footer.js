import { getMetadata } from '../../scripts/aem.js';
/**

* loads and decorates the footer
* @param {Element} block The footer block element
  */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');

  // decorate footer DOM
  block.textContent = '';

  // Contact CTA above footer
  const contactWidget = document.createElement('div');

  contactWidget.innerHTML = `
  <section
    
    id="contact"
   style="padding-bottom: 48px;"
  >
    <div
      class="mdc-layout-grid eds-grid"
      style="max-width: var(--max-content-width, 1188px); margin: 0 auto; padding: 0 24px;"
    >
      <div class="mdc-layout-grid__inner">
        <div
          class="mdc-layout-grid__cell mdc-layout-grid__cell--span-8-desktop mdc-layout-grid__cell--span-8-tablet mdc-layout-grid__cell--span-4-phone"
        >
          <div class="ge-contact-widget__wrapper">
            <h2 class="ge-contact-widget__wrapper__text title-m">
              Have a question? We would love to hear from you.
            </h2>

            <div class="ge-contact-widget__wrapper__button">
              <a
                href="https://www.gehealthcare.in/about/contact-us"
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-tracking-event="link_click"
                data-analytics-link-name="Contact us"
                data-analytics-link-type="Contact Widget"
                data-analytics-link-title="Have a question? We would love to hear from you."
                style="
                  display: inline-block;
                  background-color: #6a1b9a;
                  color: white;
                  text-decoration: none;
                  border: none;
                  padding: 8px 20px;
                  border-radius: 8px;
                  font-weight: bold;
                  cursor: pointer;
                  font-size: 14px;
                  white-space: nowrap;
                  font-family: inherit;
                  transition: background-color 0.2s ease;
                "
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div
    style="
      max-width: var(--max-content-width, 1188px);
      margin: 0 auto;
      padding: 0 24px 32px;
      color: var(--typography-secondary, #5b5b67);
      font-size: var(--font-size-sm, 0.875rem);
      font-family: var(--font-family-sans, 'Source Sans Pro', sans-serif);
    "
  >
    JB33491XX
  </div>
`;

  block.append(contactWidget);

  const footer = document.createElement('div');
  footer.className = 'redesign-footer footer-v2';
  footer.innerHTML = `
    <div class="redesign-footer-top">
      <div class="redesign-footer-top-content">
        <div class="redesign-footer-top-content-core-items">
          <div class="redesign-footer-top-content-core-items-logo">
            <img alt="GE HealthCare" class="site-logo__image" src="https://www.gehealthcare.in/cdn/res/images/logo.svg" height="32">
          </div>
          <div class="redesign-footer-top-content-core-items-utility">
            <a href="https://www.gehealthcare.in/insights/news" class="ge-link redesign-footer-top-content-core-items-utility-link">Newsroom</a>
            <a href="https://careers.gehealthcare.com/global/en" class="ge-link redesign-footer-top-content-core-items-utility-link">Careers</a>
            <a href="https://www.gehealthcare.in/about/contact-us" class="ge-link redesign-footer-top-content-core-items-utility-link">Contact Us</a>
            <a href="#" class="ge-link redesign-footer-top-content-core-items-utility-link">Adverse Event Reporting</a>
          </div>
        </div>
        <div class="redesign-footer-top-content-country-social-links">
          <div class="ge-location-selector__wrap">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C9.91419 16 11.5 12.4183 11.5 8C11.5 3.58172 9.91419 0 8 0C6.08581 0 4.5 3.58172 4.5 8C4.5 12.4183 6.08581 16 8 16ZM8 15C9.4005 15 10.5 11.866 10.5 8C10.5 4.13401 9.4005 1 8 1C6.5995 1 5.5 4.13401 5.5 8C5.5 11.866 6.5995 15 8 15Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0 8C0 7.72386 0.223858 7.5 0.5 7.5H15.5C15.7761 7.5 16 7.72386 16 8C16 8.27614 15.7761 8.5 15.5 8.5H0.5C0.223858 8.5 0 8.27614 0 8Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 4.5C2.5 4.22386 2.72386 4 3 4H13C13.2761 4 13.5 4.22386 13.5 4.5C13.5 4.77614 13.2761 5 13 5H3C2.72386 5 2.5 4.77614 2.5 4.5Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 11.5C2.5 11.2239 2.72386 11 3 11H13C13.2761 11 13.5 11.2239 13.5 11.5C13.5 11.7761 13.2761 12 13 12H3C2.72386 12 2.5 11.7761 2.5 11.5Z" fill="currentColor"/></svg>
            <span class="ge-location-selector__location-title">India</span>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9L5 5L1 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="redesign-footer-top-content-country-social-links-list">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" fill="#181818"/></svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="5" stroke="#181818" stroke-width="2"/><path d="M16 11.3701C16.1234 12.2023 15.9813 13.0523 15.5938 13.7991C15.2063 14.5459 14.5932 15.1515 13.8416 15.5297C13.0901 15.908 12.2385 16.0397 11.4078 15.906C10.5771 15.7723 9.80977 15.3801 9.21485 14.7852C8.61993 14.1903 8.22774 13.4229 8.09407 12.5923C7.9604 11.7616 8.09207 10.91 8.47033 10.1584C8.84859 9.40686 9.45419 8.79375 10.201 8.40625C10.9477 8.01875 11.7977 7.8766 12.63 8.00005C13.4789 8.12589 14.2649 8.52147 14.8717 9.12831C15.4785 9.73516 15.8741 10.5211 16 11.3701Z" stroke="#181818" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="#181818"/></svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4L9 12L4 20H6L10 13L14 20H20L15 12L20 4H18L14 11L10 4H4Z" stroke="#181818" stroke-width="1.5"/></svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="#181818" stroke-width="2"/><rect x="2" y="9" width="4" height="12" fill="#181818"/><circle cx="4" cy="4" r="2" fill="#181818"/></svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.54 6.42C22.421 5.94921 22.1648 5.52627 21.8021 5.19941C21.4393 4.87255 20.9856 4.65487 20.5 4.57C18.66 4.25 12 4.25 12 4.25C12 4.25 5.34 4.25 3.5 4.57C3.01444 4.65487 2.56066 4.87255 2.19794 5.19941C1.83522 5.52627 1.57896 5.94921 1.46 6.42C1.12 8.35 1.12 12 1.12 12C1.12 12 1.12 15.65 1.46 17.58C1.57896 18.0508 1.83522 18.4737 2.19794 18.8006C2.56066 19.1274 3.01444 19.3451 3.5 19.43C5.34 19.75 12 19.75 12 19.75C12 19.75 18.66 19.75 20.5 19.43C20.9856 19.3451 21.4393 19.1274 21.8021 18.8006C22.1648 18.4737 22.421 18.0508 22.54 17.58C22.88 15.65 22.88 12 22.88 12C22.88 12 22.88 8.35 22.54 6.42Z" fill="#181818"/><path d="M9.75 15.02L15.5 12L9.75 8.98V15.02Z" fill="white"/></svg>
          </div>
        </div>
      </div>
    </div>
    <div class="redesign-footer-bottom">
      <div class="redesign-footer-bottom-content">
        <div class="redesign-footer-bottom-content-legal-terms">
          <div class="redesign-footer-bottom-content-legal-terms-child disclaimer">
            <p class="redesign-footer-bottom-content-legal-terms-child-text caption">© 2026 GE HealthCare. GE is a trademark of General Electric Company. Used under trademark license.</p>
          </div>
          <div class="redesign-footer-bottom-content-legal-terms-child">
            <a href="#" class="redesign-footer-bottom-content-copyright-child-disclaimer-link">Cookie Preferences</a>
            <a href="#" class="redesign-footer-bottom-content-copyright-child-disclaimer-link">Privacy Policy</a>
            <a href="#" class="redesign-footer-bottom-content-copyright-child-disclaimer-link">Terms and Conditions</a>
            <a href="#" class="redesign-footer-bottom-content-copyright-child-disclaimer-link">Security</a>
          </div>
        </div>
      </div>
    </div>
  `;

  block.append(footer);
}
