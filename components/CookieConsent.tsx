import Link from "@/components/SafeLink";

const ANALYTICS_ID = "G-FSDET4HG4L";
const COOKIE_NAME = "cookieConsent";
const CONSENT_DURATION_DAYS = 365;
const POLICY_VERSION = "1";

const bootstrap = `
  document.addEventListener("DOMContentLoaded", function () {
    if (typeof window.cookieStart === "function") {
      window.cookieStart(
        ${JSON.stringify(ANALYTICS_ID)},
        ${JSON.stringify(COOKIE_NAME)},
        ${CONSENT_DURATION_DAYS},
        ${JSON.stringify(POLICY_VERSION)}
      );
    }
  }, { once: true });
`;

export function CookieConsent() {
  return <>
    <section
      className="gdpr-cookie"
      id="gdpr-cookie"
      role="region"
      aria-labelledby="gdpr-cookie-title"
      aria-describedby="gdpr-cookie-description"
      aria-hidden="true"
      hidden
    >
      <div className="gdpr-cookie__panel">
        <div className="gdpr-cookie__copy">
          <p className="gdpr-cookie__eyebrow">Your privacy, your choice</p>
          <h2 className="gdpr-cookie__title" id="gdpr-cookie-title">Analytics cookies</h2>
          <p className="gdpr-cookie__description" id="gdpr-cookie-description">
            1812: The Whole Story uses optional Google Analytics cookies to understand how readers use the narrative, evidence, maps, and teaching tools. Google Analytics will not load unless you accept. Rejecting analytics will not affect the site.
          </p>
          <p className="gdpr-cookie__more">
            You can change your choice at any time in Cookie settings. <Link href="/privacy">Read the privacy and cookie notice</Link>.
          </p>
        </div>
        <div className="gdpr-cookie__actions" role="group" aria-label="Analytics cookie choices">
          <button className="gdpr-cookie__button gdpr-cookie__button--reject" type="button" data-cookie-reject>
            Reject analytics
          </button>
          <button className="gdpr-cookie__button gdpr-cookie__button--accept" type="button" data-cookie-accept>
            Accept analytics
          </button>
        </div>
      </div>
    </section>
    <script src="/gdpr-cookie.js" defer />
    <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
  </>;
}
