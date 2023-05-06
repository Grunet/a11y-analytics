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

function App({ codeBlock }) {
  return (
    <main>
      <h1>Analytics for Accessibility</h1>
      <p>
        How your users experience your websites matters. That's why you use
        analytics to better understand their behaviors and improve their
        experiences.
      </p>
      <p>
        Traditionally, your disabled users have been excluded from this feedback
        loop, primarily due to privacy concerns.
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
        these segments. However, you can use a small snippet of code to change
        this.
      </p>
      <p>
        For Google Analytics 4, add the following snippet to your site right
        after the Google Analytics scripts (you can find{" "}
        <a href="https://github.com/Grunet/a11y-analytics/blob/main/src/analytics.js">
          an unminified version of the snippet on Github
        </a>)
      </p>
      <button id="copyButton">
        Copy the Google Analytics Code Snippet to the Clipboard
      </button>
      <a id="before-code-snippet" href="#after-code-snippet">
        Skip to after the code snippet
      </a>
      <pre>
            <code id="codeSnippet" tabindex="0" role="region" aria-label="Code Snippet" aria-description="for the Google Analytics Integration">
              {codeBlock}
            </code>
      </pre>
      <a id="after-code-snippet" href="#before-code-snippet">
        Skip to before the code snippet
      </a>
      <p>
        Every custom event will now have the following parameters added to them
        (with nameOfCustomEvent replaced by the custom event's name)
      </p>
      <ul>
        <li>uses_keyboard [nameOfCustomEvent]</li>
        <li>
          prefers_reduced_motion [nameOfCustomEvent]
        </li>
        <li>
          prefers_color_scheme [nameOfCustomEvent]
        </li>
        <li>inverted_colors [nameOfCustomEvent]</li>
        <li>forced_colors [nameOfCustomEvent]</li>
        <li>
          prefers_contrast [nameOfCustomEvent]
        </li>
      </ul>
      <p>
        You can then use these parameters to create the aforementioned segments.
      </p>
      <p>
        From here it's up to you, but to get you started here are some ideas to
        explore
      </p>
      <ul>
        <li>
          Compare conversion rates between keyboard users and non-keyboard users
        </li>
        <li>
          For pages with significant animations, compare visit duration between
          folks who prefer reduced motion vs folks who have not expressed a
          preference
        </li>
        <li>
          Compare rage click counts between folks using forced colors vs folks
          who are not
        </li>
      </ul>
      <h2 id="contact-info">Contact Info</h2>
      <p>
        And let me know what you find afterwards! You can find me on any of the
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
      <h2>The Future</h2>
      <p>
        The aspects of disabled experience that can be currently captured are
        limited in scope to what Javascript exposes. However that doesn't
        necessarily have to be the case.
      </p>
      <p>
        <a href="/future/">
          A way to capture info on all disabled experiences in a
          privacy-conscious manner is outlined in this article.
        </a>
      </p>
      <h2>Privacy Aspects</h2>
      <p>
        Privacy is a critical part of any robust analytics solution. Here are
        some considerations when it comes to Analytics for Accessibility.
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
        This site uses client-side Google Analytics 4. I tried very hard (in an
        uphill battle) to anonymize all information sent to Google (via Google
        Tag Manager) and documented{" "}
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
        The horizontal scrolling is intentional as I didn't want to wrap the
        code snippet. Since it's not important to read it, I assumed this was
        okay.
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
  `(()=>{function p({getGlobal:t,setGlobal:l,translateArguments:u,syncItemsCallback:c,usesKeyboardCallback:d}){let n={},i=t();l(function(...r){let m=u({originalArguments:r,accessibilityEventParameters:n});i.apply(window,m)});try{o({mediaFeature:"prefers-reduced-motion",possibleValues:["no-preference","reduce"]}),o({mediaFeature:"prefers-color-scheme",possibleValues:["light","dark"]}),o({mediaFeature:"inverted-colors",possibleValues:["none","inverted"]}),o({mediaFeature:"forced-colors",possibleValues:["none","active"]}),o({mediaFeature:"prefers-contrast",possibleValues:["no-preference","more","less","custom"]}),c&&c()}catch(e){console.error(e)}(function(){try{let r=setInterval(function(){let a=document.querySelector(":focus-visible");if(!a)return;let s=a.tagName.toUpperCase();s==="INPUT"||s==="TEXTAREA"||a.contentEditable!=="true"&&(n["uses-keyboard"]=!0,clearInterval(r),d&&d())},500)}catch(r){console.error(r)}})();function o({mediaFeature:e,possibleValues:r}){f({mediaFeature:e,possibleValues:r})}function f({mediaFeature:e,possibleValues:r}){if(b({mediaFeature:e})===!1)return;let a=r.map(s=>({possibleValue:s,mediaQueryResult:window.matchMedia(\`(\${e}: \${s})\`).matches})).find(({_:s,mediaQueryResult:y})=>y===!0);if(a===void 0){console.error(\`Something went wrong. Is there a new \${e} allowed value not accounted for here?\`);return}n[e]=a.possibleValue}function b({mediaFeature:e}){return window.matchMedia(\`not all and (\${e}), (\${e})\`).matches?!0:(console.warn(\`Your browser doesn't support \${e} yet\`),!1)}}function h(){p({getGlobal:()=>window.gtag,setGlobal:t=>{window.gtag=t},translateArguments:({originalArguments:t,accessibilityEventParameters:l})=>{if(t[0]!=="event")return t;let u=t[1],c=Object.fromEntries(Object.entries(l).map(([o,f])=>[\`\${o}__\${u}]\`.replaceAll("-","_").replaceAll(" ","_"),f])),n={...t[2],...c},i=[...t];return i[2]=n,i},syncItemsCallback:globalThis.a11y_analytics_config?.ga?.callbacks?.onSyncItemsResolved,usesKeyboardCallback:globalThis.a11y_analytics_config?.ga?.callbacks?.onUsesKeyboardResolved})}h();})();`;
const codeBlock = `<script type="module">${minifiedSnippet}</script>`;

function render() {
  const app = renderSSR(<App codeBlock={codeBlock} />);
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
            ga: {
              callbacks: {
                onSyncItemsResolved() {
                  gtag('event', 'syncItems landing page');
                },
                onUsesKeyboardResolved() {
                  gtag('event', 'usesKeyboard landing page');
                },
              }
            }
          }
        </script>
        <script type="module">
          ${minifiedSnippet}
        </script>
        ${getSharedStyleTag()}
        <style>
            pre {
              margin-block-start: 2rem;
              margin-block-end: 2rem;
            }

            code {
              padding: 0.75rem;
              border-style: solid;
            }
            
            #before-code-snippet, #after-code-snippet {
              display: block;
              font-size: 0.75rem;
              margin: 2rem;
            }
        </style>
      </head>
      <body>
        ${body}
        <script type="module">
          const buttonEl = document.getElementById("copyButton");
          buttonEl.addEventListener("click", function copyButtonClickHandler() {
            const codeSnippetContainer = document.getElementById("codeSnippet");
            const codeSnippet = codeSnippetContainer.textContent;

            navigator.clipboard.writeText(codeSnippet);

            gtag('event', 'copiedToClipboard', {
              'conversion': 'true',
            });
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
