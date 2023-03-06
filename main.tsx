/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { h, renderSSR, Helmet } from "https://deno.land/x/nano_jsx@v0.0.36/mod.ts";

function App({codeBlock}) {
  return (
        <main>
          <h1>A11y Analytics</h1>
          <p>How your users experience your websites matters. That's why you use analytics to better understand their behaviors and improve that experience.</p>
          <p>Your disabled users traditionally have been excluded from this feedback loop, primarily due to privacy concerns.</p>
          <p>However, there are a few coarse segments you can gain information about to help improve disabled user experiences, such as</p>
          <ul>
            <li>Whether or not they're a keyboard-dominant user</li>
            <li>Whether or not they prefer motion animation to be reduced</li>
            <li>Whether or not they're using Windows High Contrast Mode to increase color contrast</li>
          </ul>
          <p>None of these distinguishes disabled users specifically, but an experience failure for any of these segments implies an experience failure for disabled users.</p>

          <h2>Enhance Your Analytics</h2>
          <p>By default your analytics tool probably won't give you information on these segments. However, you can use a small snippet of code to change this.</p>
          <p>For Google Analytics 4, add the following snippet to your sites right after the Google Analytics scripts</p>
          <button id="copyButton" style="height: 4rem;">Copy Google Analytics Code Snippet to Clipboard</button>
          <pre>
            <code id="codeSnippet" tabindex="0" role="region" aria-label="Code Snippet" aria-description="for the Google Analytics Integration">
              {codeBlock}
            </code>
          </pre>
          <p>This will start annotating user events in Google Analytics with attributes you can use to create the aforementioned segments.</p>
          <p>From there it's up to you, but to get you started here are some ideas</p>
          <ul>
            <li>Compare conversion rates between keyboard users and non-keyboard users </li>
            <li>Compare visit duration for pages with large animations or movement between folks who prefer reduced motion vs folks who have not expressed a preference</li>
            <li>Compare rage click counts between folks using forced colors vs folks who are not</li>
          </ul>
          <p>And let me know what you find afterwards! You can find me on any of the following platforms:</p>
          <ul>
            <li><a href="https://github.com/Grunet/a11yanalytics/issues">Github Issues</a></li>
            <li><a href="https://twitter.com/__grunet">My Twitter Profile</a></li>
            <li><a href="https://www.reddit.com/user/__grunet">My Reddit Profile</a></li>
          </ul>
          <h2>Privacy Aspects of this Site</h2>
          <p>This site is hosted on <a href="https://deno.com/deploy">Deno Deploy</a>, so they (and their subprocessors) most likely have access to your IP address, what browser you're using, its version, and what your operating system is. I don't know yet of any way to control that but <a href="https://www.reddit.com/r/Deno/comments/11id32r/deno_deploy_and_privacy_deep_dive/">I asked on Reddit about Deno Deploy's privacy posture</a>.</p>
          <p>The app code running on it is completely ignoring those pieces of PII.</p>

          <p>This site uses client-side Google Analytics 4. I tried very hard (in an uphill battle) to anonymize all information sent to Google (via Google Tag Manager) and documented <a href="https://dev.to/grunet/how-to-maximize-user-privacy-when-using-google-analytics-4-4cd7">how I configured Google Analytics to be maximally privacy preserving in this article</a>.</p>
          <p>The short version is that all of Google's cross-site and cross-device user tracking mechanisms should be disabled, leaving only page views and anonymous custom events (that I specified) emitted from client-side Javascript as a data source for Google Analytics.</p>

          <p>I believe this is enough to not need a cookie notice. But if not, let me know via one of the above channels and I will work to add one.</p>

          <h2>Accessibility Statement</h2>
          <p>This site (which is just this 1 page) is intentionally minimalistic to avoid accidentally introducing issues.</p>
          <p>If you notice anything off let me know via one of the above channels and I will aim to fix it.</p>

        </main>
  );
}

const minifiedSnippet = 'function decorateGtagWithAccessibilityInformation(){const a={},c=window.gtag;window.gtag=function(t,s,r){const o={...r,...a};c(t,s,o)},n({mediaFeature:"prefers-reduced-motion",possibleValues:["no-preference","reduce"]}),n({mediaFeature:"prefers-color-scheme",possibleValues:["light","dark"]}),n({mediaFeature:"inverted-colors",possibleValues:["none","inverted"]}),n({mediaFeature:"forced-colors",possibleValues:["none","active"]}),function(){const t=setInterval(function(){const r=document.querySelector(":focus-visible");if(!r)return;const o=r.tagName.toUpperCase();o==="INPUT"||o==="TEXTAREA"||r.contentEditable!=="true"&&(a["uses-keyboard"]=!0,clearInterval(t))},500)}();function n({mediaFeature:e,possibleValues:t}){if(u({mediaFeature:e})===!1)return;const r=t.map(i=>({possibleValue:i,mediaQueryResult:window.matchMedia(`(${e}: ${i})`).matches})).find(({_:i,mediaQueryResult:d})=>d===!0);if(r===void 0){console.error(`Something went wrong. Is there a new ${e} allowed value not accounted for here?`);return}const o=r.possibleValue;a[e]=o}function u({mediaFeature:e}){return window.matchMedia(`not all and (${e}), (${e})`).matches?!0:(console.warning(`Your browser doesn\'t support ${e} yet`),!1)}}decorateGtagWithAccessibilityInformation();';
const codeBlock = `<script>${minifiedSnippet}</script>`;

function handler(req) {

  const app = renderSSR(<App codeBlock={codeBlock}/>);
  const { body } = Helmet.SSR(app)

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1TB5S4JW40"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          gtag('consent', 'default', {
            'analytics_storage': 'denied'
          });

          gtag('js', new Date());

          gtag('config', 'G-1TB5S4JW40');
        </script>
        <script>
        function decorateGtagWithAccessibilityInformation(){const a={},c=window.gtag;window.gtag=function(t,s,r){const o={...r,...a};c(t,s,o)},n({mediaFeature:"prefers-reduced-motion",possibleValues:["no-preference","reduce"]}),n({mediaFeature:"prefers-color-scheme",possibleValues:["light","dark"]}),n({mediaFeature:"inverted-colors",possibleValues:["none","inverted"]}),n({mediaFeature:"forced-colors",possibleValues:["none","active"]}),function(){const t=setInterval(function(){const r=document.querySelector(":focus-visible");if(!r)return;const o=r.tagName.toUpperCase();o==="INPUT"||o==="TEXTAREA"||r.contentEditable!=="true"&&(a["uses-keyboard"]=!0,clearInterval(t))},500)}();function n({mediaFeature:e,possibleValues:t}){if(u({mediaFeature:e})===!1)return;const r=t.map(i=>({possibleValue:i,mediaQueryResult:window.matchMedia(\`(\${e}: \${i})\`).matches})).find(({_:i,mediaQueryResult:d})=>d===!0);if(r===void 0){console.error(\`Something went wrong. Is there a new \${e} allowed value not accounted for here?\`);return}const o=r.possibleValue;a[e]=o}function u({mediaFeature:e}){return window.matchMedia(\`not all and (\${e}), (\${e})\`).matches?!0:(console.warning(\`Your browser doesn't support \${e} yet\`),!1)}}decorateGtagWithAccessibilityInformation();
        </script>
        <title>A11y Analytics</title>
        <meta name="description" content="An introduction to using analytics to improve on a website or web app's accessibility" >
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                background-color: rebeccapurple;
                color: #f0e8e8;
                font-family: Verdana;
            }

            :focus {
              border-style: dashed;
              border-width: 0.25rem;
            }

            button:focus {
              border-color: black;
            }

            a {
              color: yellow
            }

            a:visited {
              color: white
            }

            pre {
              margin-block-start: 2rem;
              margin-block-end: 2rem;
            }

            code {
              padding: 0.75rem;
              border-style: solid;
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
              'param1': 'true',
            });
          });
        </script>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      "content-type": "text/html",
    },
  });
}

serve(handler);
