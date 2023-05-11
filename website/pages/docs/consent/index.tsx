import { getCommonHeadChildren } from "../../common/head.ts";
import { getSharedStyleTag } from "../../common/styles.ts";

const bodyContents = `
    <h1>Adjusting Analytics for Accessibility to Work with Consent Frameworks</h1>
    <p>Consent frameworks help your site or app obtain, manage, and refer to a user's consent for certain behaviors, such as using analytics.</p>
    <p>From a user perspective, this commonly takes the form of "cookie" notices and dialogs.</p>
    <p>For Analytics for Accessibility to integrate correctly into a consent framework, 1 specific part needs to be adjusted.</p>
    <h2>Delaying "Accessibility Page Load" Events Until Consent Has Been Obtained</h2>
    <p>By default, the main doc for Analytics for Accessibility recommends capturing "accessibility page load" events as soon as they resolve.</p>
    <p>However, if the user hasn't consented to the use of analytics yet this information may be discarded and lost by the analytics provider.</p>
    <p>Instead, the events need to be queued up until after consent has been obtained.</p>
    <p>Here is some pseudocode of what the adjustments to the Analytics for Accessibility configuration would need to look like</p>
    <pre><code>
    globalThis.a11y_analytics_config = {
      providers: {
        ga: {
          callbacks: {
            onSyncItemsResolved() {
              // gtag('event', 'syncItems page-name'); // Old code

              if (checkIfUserHasAlreadyGivenConsent()) {
                gtag('event', 'syncItems page-name');

                return;
              }

              storeKeyValueInConsentInMemoryStorage("a11y_analytics_onSyncItemsResolved", true)
            },
            onUsesKeyboardResolved() {
              // gtag('event', 'usesKeyboard page-name'); // Old code 

              if (checkIfUserHasAlreadyGivenConsent()) {
                gtag('event', 'usesKeyboard page-name');

                return;
              }

              storeKeyValueInConsentInMemoryStorage("a11y_analytics_onUsesKeyboardResolved", true)
            },
          }
        }
      }
    }
  </code></pre>
    <p>And here is some pseudocode of what the adjustments to the consent framework would need to look like</p>
    TODO - add in the code
    <p>Those 2 sets of changes should be all that's needed to ensure all Analytics for Accessibility events are recorded in your analytics provider when a user provides their consent.</p>
`;

function render() {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${
    getCommonHeadChildren({
      title: "Consent",
      description:
        "Documentation for how to adjust Analytics for Accessibility to work with a consent framework",
    })
  }
        ${getSharedStyleTag()}
      <body>
        <main>
            ${bodyContents}
        </main>
      </body>
    </html>
  `;

  return {
    html,
  };
}

export { render };
