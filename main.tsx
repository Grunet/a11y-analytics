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
          <h1>Analytics for Accessibility</h1>
          <p>How your users experience your websites matters. That's why you use analytics to better understand their behaviors and improve their experiences.</p>
          <p>Traditionally, your disabled users have been excluded from this feedback loop, primarily due to privacy concerns.</p>
          <p>However, there are several coarse segments you can still use, including</p>
          <ul>
            <li>Whether or not they're a keyboard-dominant user</li>
            <li>Whether or not they prefer reduced motion in animations</li>
            <li>Whether or not they're using Windows High Contrast Mode to increase color contrast</li>
          </ul>
          <p>None of these segments uniquely identifies disabled users. But an experience failure for any of these segments will strongly imply an experience failure for disabled users.</p>

          <h2>Enhance Your Analytics</h2>
          <p>By default your analytics tool probably won't give you information on these segments. However, you can use a small snippet of code to change this.</p>
          <p>For Google Analytics 4, add the following snippet to your site right after the Google Analytics scripts (you can find <a href="https://github.com/Grunet/a11y-analytics/blob/main/analytics.js">an unminified version of the snippet on Github</a>)</p>
          <button id="copyButton" style="height: 4rem;">Copy the Google Analytics Code Snippet to the Clipboard</button>
          <a id="before-code-snippet" href="#after-code-snippet">Skip to after the code snippet</a>
          <pre>
            <code id="codeSnippet" tabindex="0" role="region" aria-label="Code Snippet" aria-description="for the Google Analytics Integration">
              {codeBlock}
            </code>
          </pre>
          <a id="after-code-snippet" href="#before-code-snippet">Skip to before the code snippet</a>
          <p>This will start annotating events in Google Analytics with accessibility-specific parameters. You can then use them to create the aforementioned segments.</p>
          <p>From there it's up to you, but to get you started here are some ideas</p>
          <ul>
            <li>Compare conversion rates between keyboard users and non-keyboard users</li>
            <li>For pages with significant animations, compare visit duration between folks who prefer reduced motion vs folks who have not expressed a preference</li>
            <li>Compare rage click counts between folks using forced colors vs folks who are not</li>
          </ul>
          <h2 id="contact-info">Contact Info</h2>
          <p>And let me know what you find afterwards! You can find me on any of the following platforms:</p>
          <ul>
            <li><a href="https://github.com/Grunet/a11y-analytics/issues">Github Issues</a></li>
            <li><a href="https://twitter.com/__grunet">My Twitter Profile</a></li>
            <li><a href="https://www.reddit.com/user/__grunet">My Reddit Profile</a></li>
          </ul>
          <h2>Privacy Aspects</h2>
          <h3>Notes on Fingerprinting</h3>
          <p>Device and user fingerprinting is a technique unscrupulous websites and tools use to track you and your activity across the internet, without requiring 3rd party cookies or any form of traditional tracking.</p>
          <p>It works by using standard web APIs to measure a large number of characteristics about your device and your settings. Each individual characteristic on its own doesn't identify you, but narrows you down a little amongst all other users. The problem being when all of the characteristics are considered together, they end up narrowing down all the way to you specifically amongst all users (follow <a href="https://coveryourtracks.eff.org/">this link for more details on fingerprinting</a>).</p>

          <p>The web APIs in use by Analytics for Accessibility are also susceptible to being abused as fingerprinting characteristics. And what's more concerning is someone having their disability fingerprinted as a result.</p>
          <p>Sadly, there is no direct defense to fingerprinting that I'm aware of. The best that can be done is to track the offenders, so I started <a href="https://github.com/Grunet/a11y-fingerprinting">a repository for tracking these privacy abusing websites specifically</a>.</p>

          <h3>Privacy Aspects of this Site</h3>
          <p>This site is hosted on <a href="https://deno.com/deploy">Deno Deploy</a>, so they (and their subprocessors) most likely have access to your IP address, what browser you're using, its version, and what your operating system is. I don't know yet of any way to control that but <a href="https://www.reddit.com/r/Deno/comments/11id32r/deno_deploy_and_privacy_deep_dive/">I asked on Reddit about Deno Deploy's privacy posture</a>.</p>
          <p>The app code running on it is completely ignoring those pieces of PII.</p>

          <p>This site uses client-side Google Analytics 4. I tried very hard (in an uphill battle) to anonymize all information sent to Google (via Google Tag Manager) and documented <a href="https://dev.to/grunet/how-to-maximize-user-privacy-when-using-google-analytics-4-4cd7">how I configured Google Analytics to be maximally privacy preserving in an article</a>.</p>
          <p>The short version is that all of Google's cross-site and cross-device user tracking mechanisms should be disabled, leaving only page views and anonymous custom events (that I specified) emitted from client-side Javascript as a data source for Google Analytics.</p>

          <p>I believe this is enough to not need a cookie notice. But if not, <a href="#contact-info">let me know via one of the above channels</a> and I will work to add one.</p>

          <h2>Accessibility Statement</h2>
          <p>This site (which is just this 1 page) is intentionally minimalistic to avoid accidentally introducing issues.</p>
          <p>The horizontal scrolling is intentional as I didn't want to wrap the code snippet. Since it's not important to read it, I assumed this was okay.</p>
          <p>If you notice anything else off <a href="#contact-info">let me know via one of the above channels</a> and I will aim to fix it.</p>

        </main>
  );
}

const minifiedSnippet = `(()=>{function u({getGlobal:n,setGlobal:l}){let s={},d=n();l(function(r,i,t){let o={...t,...s};d(r,i,o)});try{a({mediaFeature:"prefers-reduced-motion",possibleValues:["no-preference","reduce"]}),a({mediaFeature:"prefers-color-scheme",possibleValues:["light","dark"]}),a({mediaFeature:"inverted-colors",possibleValues:["none","inverted"]}),a({mediaFeature:"forced-colors",possibleValues:["none","active"]})}catch(e){console.error(e)}(function(){try{let r=setInterval(function(){let t=document.querySelector(":focus-visible");if(!t)return;let o=t.tagName.toUpperCase();o==="INPUT"||o==="TEXTAREA"||t.contentEditable!=="true"&&(s.uses_keyboard=!0,clearInterval(r))},500)}catch(r){console.error(r)}})();function a({mediaFeature:e,possibleValues:r}){if(f({mediaFeature:e})===!1)return;let t=r.map(c=>({possibleValue:c,mediaQueryResult:window.matchMedia(\`(\${e}: \${c})\`).matches})).find(({_:c,mediaQueryResult:m})=>m===!0);if(t===void 0){console.error(\`Something went wrong. Is there a new \${e} allowed value not accounted for here?\`);return}let o=e.replaceAll("-","_"),p=t.possibleValue;s[o]=p}function f({mediaFeature:e}){return window.matchMedia(\`not all and (\${e}), (\${e})\`).matches?!0:(console.warn(\`Your browser doesn't support \${e} yet\`),!1)}}function b(){u({getGlobal:()=>window.gtag,setGlobal:n=>{window.gtag=n}})}b();})();`;
const codeBlock = `<script>${minifiedSnippet}</script>`;

function handler(req) {

  const app = renderSSR(<App codeBlock={codeBlock}/>);
  const { body } = Helmet.SSR(app)

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Analytics for Accessibility</title>
        <meta name="description" content="An introduction to using analytics to improve on a website or web app's accessibility" >
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
          ${minifiedSnippet}
        </script>
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
