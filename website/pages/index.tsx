/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import {
  h,
  Helmet,
  renderSSR,
} from "https://deno.land/x/nano_jsx@v0.0.36/mod.ts";

import { getCommonHeadChildren } from "./../common/head.ts";
import { getSharedStyleTag } from "./../common/styles.ts";

function App() {
  return (
    <main>
      <h1>Analytics for Accessibility</h1>
      <p>
        How your users experience your websites matters. That's why you use
        analytics to better understand their behaviors and improve their
        experiences.
      </p>
      <p>
        Traditionally, your disabled users have not been a part of this feedback
        loop, primarily due to privacy concerns (see{" "}
        <a href="https://karlgroves.com/can-we-track-how-many-users-with-disabilities-access-our-site/">
          Karl Groves's article on this topic of privacy
        </a>{" "}
        for more details).
      </p>
      <p>
        However, there are several coarse segments you can still use, including
      </p>
      <ul>
        <li>Whether or not they're a keyboard-dominant user</li>
        <li>Whether or not they prefer reduced motion in animations</li>
        <li>
          Whether or not they're using Windows High Contrast Mode to increase
          color contrast
        </li>
      </ul>
      <p>
        None of these segments uniquely identifies disabled users. But an
        experience failure for any of these segments will strongly imply an
        experience failure for disabled users.
      </p>

      <h2>Enhance Your Analytics</h2>
      <p>
        By default your analytics tool probably won't give you information on
        these segments. However, you can use a few small snippets of code to
        change this.
      </p>
      <p>
        For detailed instructions on how to set that up, visit{" "}
        <a id="docs-link" href="/docs/">the docs page</a>.
      </p>
      <p>
        Once that's complete, you'll be able to get answers to questions like
      </p>
      <ul>
        <li>
          Are our keyboard users finishing our checkout flow at noticeably lower
          rates than our non-keyboard users?
        </li>
        <li>
          Are our potential customers who prefer reduced motion signing up for
          our new product at lower rates than everyone else?
        </li>
        <li>
          Did our latest release cause our users relying on Windows High
          Contrast mode to stop being able to use our app?
        </li>
      </ul>
      <p>
        Positive answers to questions like these should highly correlate with
        poor experiences for your disabled users.
      </p>

      <h2>Privacy Considerations</h2>
      <p>
        Privacy considerations have to go hand-in-hand with any change to
        analytics. Here are some of the most important aspects to consider in
        this case.
      </p>

      <h3>Only Use Aggregated Data</h3>
      <p>
        There are tools out there (e.g. session replay tools) that can record in
        detail what each individual user is doing on your site.
      </p>
      <p>
        This approach should not be paired with such tools (or any other
        high-cardinality solutions) as it would chip away at the privacy of
        individual disabled users.
      </p>
      <p>
        Instead, the data from this approach should only ever be viewed and
        analyzed in the aggregate of many users' experiences to protect each
        individual's privacy.
      </p>

      <h3>Consent Collection</h3>
      <p>
        This approach likely won't change how you integrate your analytics
        provider with your consent processes on a technical level.
      </p>

      <p>
        However, depending on your situation you may need to let your users know
        that you're collecting these new pieces of information (and it's
        certainly a good idea to do in any case).
      </p>

      <p>
        For details on{" "}
        <a href="/docs/#all-possible-parameters-and-values-to-analyze">
          all the new information that the enhanced analytics could gather,
          visit this docs section
        </a>.
      </p>

      <h2 id="contact-info">Contact Info</h2>
      <p>
        For questions, comments, or feedback, you can find me on any of the
        following platforms:
      </p>
      <ul>
        <li>
          <a href="https://github.com/Grunet/a11y-analytics/issues">
            Github Issues
          </a>
        </li>
        <li>
          <a href="https://twitter.com/__grunet">My Twitter Profile</a>
        </li>
        <li>
          <a href="https://www.reddit.com/user/__grunet">My Reddit Profile</a>
        </li>
      </ul>
      <h2>Prior and Related Art</h2>
      <p>
        I was originally inspired by{" "}
        <a href="https://blogs.intuit.com/2021/05/06/proving-accessibility-is-worth-it-with-analytics/">
          this case study from Intuit called "Proving accessibility is worth it
          with analytics"
        </a>. It takes a similar mindset, though the implementation is very
        different.
      </p>
      <p>
        For more on inclusive user research more generally, check out the{" "}
        <a href="https://github.com/Grunet/awesome-inclusive-user-research">
          awesome-inclusive-user-research Github repository
        </a>.
      </p>
      <h2>The Future</h2>
      <p>
        This approach is currently limited in scope to what can be inferred via
        Javascript alone. However that doesn't necessarily have to be the case.
      </p>
      <p>
        <a href="/future/">
          A way to capture info on all disabled experiences in a
          privacy-conscious manner is outlined in this article.
        </a>
      </p>
      <h2>Other Privacy Aspects</h2>
      <p>
        Beyond the tool itself, there are some other aspects of privacy to
        consider.
      </p>

      <h3>Privacy Aspects of this Site</h3>
      <p>
        This site is hosted on{" "}
        <a href="https://deno.com/deploy">Deno Deploy</a>, so they (and their
        subprocessors) most likely have access to your IP address, what browser
        you're using, its version, and what your operating system is. I don't
        know yet of any way to control that but{" "}
        <a href="https://www.reddit.com/r/Deno/comments/11id32r/deno_deploy_and_privacy_deep_dive/">
          I asked on Reddit about Deno Deploy's privacy posture
        </a>.
      </p>
      <p>
        The app code running on it is completely ignoring those pieces of PII.
      </p>

      <p>
        This site uses client-side Google Analytics 4. I tried very hard to
        anonymize all information sent to Google (via Google Tag Manager) and
        documented{" "}
        <a href="https://dev.to/grunet/how-to-maximize-user-privacy-when-using-google-analytics-4-4cd7">
          how I configured Google Analytics to be maximally privacy preserving
          in an article
        </a>.
      </p>
      <p>
        The short version is that by default Google Analytics should not be
        persisting any data (though data may be sent to it). To change that
        activate the following button (there's no need to do this outside of my
        own testing)
      </p>

      <button id="enable-ga">Enable Google Analytics to Persist Data</button>

      <h3>Notes on Fingerprinting and Accessibility</h3>
      <p>
        Device and user fingerprinting is a technique unscrupulous websites and
        tools use to track you and your activity across the internet, without
        requiring 3rd party cookies or any form of traditional tracking.
      </p>
      <p>
        It works by using standard web APIs to measure a large number of
        characteristics about your device and your settings. Each individual
        characteristic on its own doesn't identify you, but narrows you down a
        little amongst all other users. The problem being when all of the
        characteristics are considered together, they end up narrowing down all
        the way to you specifically amongst all users (follow{" "}
        <a href="https://coveryourtracks.eff.org/">
          this link for more details on fingerprinting
        </a>).
      </p>

      <p>
        The web APIs in use by Analytics for Accessibility are also susceptible
        to being abused as fingerprinting characteristics. This is not a
        hypothetical,{" "}
        <a href="https://github.com/fingerprintjs/fingerprintjs/tree/master/src/sources">
          there are solutions available today that fingerprint based off of
          accessibility characteristics
        </a>.
      </p>
      <p>
        Sadly, there is no direct defense to fingerprinting that I'm aware of.
        The best that can be done is to find the offenders and block them (e.g.
        like{" "}
        <a href="https://disconnect.me/disconnect">
          the tracker blocking company Disconnect
        </a>{" "}
        attempts to do)
      </p>

      <h2>Accessibility Statement</h2>
      <p>
        This site is intentionally minimalistic to avoid accidentally
        introducing issues.
      </p>
      <p>
        If you notice anything else off{" "}
        <a href="#contact-info">let me know via one of the above channels</a>
        {" "}
        and I will aim to fix it.
      </p>
    </main>
  );
}

const minifiedSnippet =
  `(()=>{function u({onResolutionCallback:t}){try{s({mediaFeature:"prefers-reduced-motion",abbreviation:"prm",possibleValues:["no-preference","reduce"]}),s({mediaFeature:"prefers-color-scheme",abbreviation:"pcs",possibleValues:["light","dark"]}),s({mediaFeature:"inverted-colors",abbreviation:"ic",possibleValues:["none","inverted"]}),s({mediaFeature:"forced-colors",abbreviation:"fc",possibleValues:["none","active"]}),s({mediaFeature:"prefers-contrast",abbreviation:"pc",possibleValues:["no-preference","more","less","custom"]});let e=window.getComputedStyle(document.body).getPropertyValue("font-size");t({eventType:"data",source:"syncItems",data:{fs:e}}),t({eventType:"completionNotification",source:"syncItems"})}catch(e){console.error(e)}(function(){try{let r=setInterval(function(){let o=document.querySelector(":focus-visible");if(!o)return;let a=o.tagName.toUpperCase();a==="INPUT"||a==="TEXTAREA"||a==="SELECT"||o.contentEditable!=="true"&&(t({eventType:"data",source:"usesKeyboard",data:{uk:!0}}),clearInterval(r),t({eventType:"completionNotification",source:"usesKeyboard"}))},500)}catch(r){console.error(r)}})(),function(){try{let r=window.visualViewport.scale,n=setInterval(function(){window.visualViewport.scale!==r&&(t({eventType:"data",source:"usesPinchZoom",data:{upz:!0}}),clearInterval(n),t({eventType:"completionNotification",source:"usesPinchZoom"}))},500)}catch(r){console.error(r)}}();function s({mediaFeature:e,abbreviation:r,possibleValues:n}){if(l({mediaFeature:e})===!1)return;let a=n.map(i=>({possibleValue:i,mediaQueryResult:window.matchMedia(\`(\${e}: \${i})\`).matches})).find(({_:i,mediaQueryResult:c})=>c===!0);if(a===void 0){console.error(\`Something went wrong. Is there a new \${e} allowed value not accounted for here?\`);return}t({eventType:"data",source:"syncItems",data:{[r]:a.possibleValue}})}function l({mediaFeature:e}){return window.matchMedia(\`not all and (\${e}), (\${e})\`).matches?!0:(console.warn(\`Your browser doesn't support \${e} yet\`),!1)}}function f({getGlobal:t,setGlobal:s,translateArguments:l,syncItemsCallback:e,usesKeyboardCallback:r,usesPinchZoomCallback:n}){try{let o={},a=t();s(function(...c){let d=l({originalArguments:c,accessibilityEventParameters:o});a.apply(window,d)}),u({onResolutionCallback({eventType:i,source:c,data:d}){if(i==="data"&&Object.assign(o,d),i==="completionNotification")switch(c){case"syncItems":e&&e();break;case"usesKeyboard":r&&r();break;case"usesPinchZoom":n&&n();break;default:throw new Error(\`Source \${c} unknown\`)}}})}catch(o){console.error(o)}}function p(){f({getGlobal:()=>window.gtag,setGlobal:t=>{window.gtag=t},translateArguments:({originalArguments:t,accessibilityEventParameters:s})=>{if(t[0]!=="event")return t;let l=t[1],e=Object.fromEntries(Object.entries(s).map(([a,i])=>[\`\${a}__\${l}\`.replaceAll("-","_").replaceAll(" ","_"),i])),n={...t[2],...e},o=[...t];return o[2]=n,o},syncItemsCallback:globalThis.a11y_analytics_config?.providers?.ga?.callbacks?.onSyncItemsResolved,usesKeyboardCallback:globalThis.a11y_analytics_config?.providers?.ga?.callbacks?.onUsesKeyboardResolved,usesPinchZoomCallback:globalThis.a11y_analytics_config?.providers?.ga?.callbacks?.onUsesPinchZoomResolved})}p();})();`;

function render() {
  const app = renderSSR(<App />);
  const { body } = Helmet.SSR(app);

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${
    getCommonHeadChildren({
      title: "Analytics for Accessibility",
      description:
        "An introduction to using analytics to improve on a website or web app's accessibility",
    })
  }
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q5R7J81KZZ"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          gtag('consent', 'default', {
            'analytics_storage': 'denied'
          });

          gtag('js', new Date());

          gtag('config', 'G-Q5R7J81KZZ');
        </script>
        <script type="module">
          globalThis.a11y_analytics_config = {
            providers: {
              ga: {
                callbacks: {
                  onSyncItemsResolved() {
                    gtag('event', 'syncItems landing page');
                  },
                  onUsesKeyboardResolved() {
                    gtag('event', 'usesKeyboard landing page');
                  },
                  onUsesPinchZoomResolved() {
                    gtag('event', 'usesPinchZoom landing page');
                  }
                }
              }
            }
          }
        </script>
        <script type="module">
          ${minifiedSnippet}
        </script>
        ${getSharedStyleTag()}
      </head>
      <body>
        ${body}
        <script type="module">
          const anchorEl = document.getElementById("docs-link");
          anchorEl.addEventListener("click", function docsLinkClickHandler(event) {
            event.preventDefault();

            gtag('event', 'docsLinkClicked', {
              'conversion': 'true',
            });

            window.location.href = anchorEl.href;
          });
        </script>
        <script type="module">
          const buttonEl = document.getElementById("enable-ga");
          buttonEl.addEventListener("click", function enableGaButtonClickHandler() {
            gtag('consent', 'update', {
              'analytics_storage': 'granted'
            });
          });
        </script>
      </body>
    </html>
  `;

  return {
    html,
  };
}

export { render };
