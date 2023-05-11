import { getCommonHeadChildren } from "../../common/head.ts";
import { getSharedStyleTag } from "../../common/styles.ts";

const bodyContents =
  `<h1 id="setting-up-analytics-for-accessibility">Setting up Analytics for Accessibility</h1>
  <p>The first step is to pick an analytics provider to integrate with. The following
  options are available</p>
  <ul>
  <li>Google Analytics 4 (not used beyond testing)</li>
  <li>Plausible (not yet fully tested)</li>
  </ul>
  <p>If you are using a consent framework to conditionally enable your analytics, follow the instructions below and afterwards follow <a href="/docs/consent/">the guidance in this doc about taking into account consent</a>.</p>
  <h2 id="setting-up-with-google-analytics-4">Setting Up With Google Analytics 4</h2>
  <p>The 2 main steps for getting setup will be</p>
  <ol>
  <li>Adding the Analytics for Accessibility code snippet to all pages using Google
  Analytics 4</li>
  <li>Configuring the code snippet on specific pages to emit additional information</li>
  </ol>
  <h3 id="confirm-google-analytics-4-setup">Confirm Google Analytics 4 Setup</h3>
  <p>But first, we need to confirm Google Analytics 4 itself is setup.</p>
  <p>On any of the pages where it should be active, confirm a code snippet similar to
  the following one is present somewhere in the HTML (likely in the head element)</p>
  <pre><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">async</span>=<span class="hljs-string">""</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://www.googletagmanager.com/gtag/js?id=G-AAAAAAAAAA"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">window</span>.dataLayer = <span class="hljs-built_in">window</span>.dataLayer || [];
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">gtag</span>(<span class="hljs-params"></span>)</span>{dataLayer.push(<span class="hljs-built_in">arguments</span>);}
  
    gtag(<span class="hljs-string">'js'</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>());
  
    gtag(<span class="hljs-string">'config'</span>, <span class="hljs-string">'G-AAAAAAAAAA'</span>);
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  </code></pre>
  <p>If you can’t find it, you’ll need to first
  <a href="https://support.google.com/analytics/answer/9304153">setup and install Google Analytics 4</a>.</p>
  <p>If it is present, continue on.</p>
  <h3 id="restrictions-on-custom-event-names">Restrictions on Custom Event Names</h3>
  <p>At several points in this setup you’ll be asked to choose custom event names, so
  take a moment to familiarize yourself with what names are allowed.</p>
  <ul>
  <li>Allowed characters<ul>
  <li>Letters</li>
  <li>Numbers</li>
  <li>Underscores</li>
  <li>Dashes</li>
  <li>Spaces</li>
  </ul>
  </li>
  <li>Maximum length of 35 characters</li>
  </ul>
  <p>These restrictions come from combining
  <a href="https://support.google.com/analytics/answer/9267744">Google Analytics’ restrictions on custom event names</a>
  with how custom event names are specially used by the Analytics for
  Accessibility code (specifically how they get incorporated into parameters).</p>
  <h3 id="add-in-the-analytics-for-accessibility-code-snippet-for-google-analytics-4">Add in the Analytics for Accessibility Code Snippet for Google Analytics 4</h3>
  <p>On every page with the Google Analytics 4 code snippet, you’ll need to add the
  Analytics for Accessibility code snippet just beneath it as follows</p>
  <ol>
  <li>Go to the latest release’s page at
  <a href="https://github.com/Grunet/a11y-analytics/releases/latest">https://github.com/Grunet/a11y-analytics/releases/latest</a></li>
  <li>Download the ga-analytics.min.js file, and copy its contents to your
  clipboard</li>
  <li>In a text editor, create a script tag as follows, replacing <code>snippetContents</code>
  with what’s on your clipboard</li>
  </ol>
  <pre><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"module"</span>&gt;</span><span class="undefined">snippetContents</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  </code></pre>
  <ol>
  <li><p>In the site’s source code, add the new script tag just beneath the Google
  Analytics 4’s script tags.</p>
  <p>It should end up looking something like this</p>
  <pre><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">async</span>=<span class="hljs-string">""</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://www.googletagmanager.com/gtag/js?id=G-AAAAAAAAAA"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">window</span>.dataLayer = <span class="hljs-built_in">window</span>.dataLayer || [];
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">gtag</span>(<span class="hljs-params"></span>)</span>{dataLayer.push(<span class="hljs-built_in">arguments</span>);}
  
    gtag(<span class="hljs-string">'js'</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>());
  
    gtag(<span class="hljs-string">'config'</span>, <span class="hljs-string">'G-AAAAAAAAAA'</span>);
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"module"</span>&gt;</span><span class="actionscript">(...the Analytics <span class="hljs-keyword">for</span> Accessibility snippet<span class="hljs-string">'s contents...)</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  </code></pre>
  </li>
  </ol>
  <p>With that in place, the following will now automatically happen</p>
  <ul>
  <li>Any Google Analytics custom event (with a valid name per the above
  restrictions) will have multiple parameters added to it containing
  accessibility-specific information about the user (see below for more details
  on that information)</li>
  </ul>
  <h3 id="add-in-accessibility-page-load-custom-events">Add in “Accessibility Page Load” Custom Events</h3>
  <p>If the event you want to record and annotate with accessibility data is a page
  load (i.e. corresponds to no other user action), you’ll need to add an extra
  piece of code to enable this as follows</p>
  <ol>
  <li>On each page you want to record the events, add the following script tag
  right before the Analytics for Accessibility script tag you added previously</li>
  </ol>
  <pre><code class="lang-html">&lt;script type=<span class="hljs-string">"module"</span>&gt;
    globalThis.a11y_analytics_config = {
      providers: {
        ga: {
          callbacks: {
            onSyncItemsResolved() {
              gtag(<span class="hljs-string">'event'</span>, <span class="hljs-string">'syncItems page-name'</span>);
            },
            onUsesKeyboardResolved() {
              gtag(<span class="hljs-string">'event'</span>, <span class="hljs-string">'usesKeyboard page-name'</span>);
            },
          }
        }
      }
    }
  &lt;/script&gt;
  </code></pre>
  <p>You should end up with something like this</p>
  <pre><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">async</span>=<span class="hljs-string">""</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://www.googletagmanager.com/gtag/js?id=G-AAAAAAAAAA"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">window</span>.dataLayer = <span class="hljs-built_in">window</span>.dataLayer || [];
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">gtag</span>(<span class="hljs-params"></span>)</span>{dataLayer.push(<span class="hljs-built_in">arguments</span>);}
  
    gtag(<span class="hljs-string">'js'</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>());
  
    gtag(<span class="hljs-string">'config'</span>, <span class="hljs-string">'G-AAAAAAAAAA'</span>);
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"module"</span>&gt;</span><span class="actionscript">
    globalThis.a11y_analytics_config = {
      ga: {
        callbacks: {
          onSyncItemsResolved() {
            gtag(<span class="hljs-string">'event'</span>, <span class="hljs-string">'syncItems page-name'</span>);
          },
          onUsesKeyboardResolved() {
            gtag(<span class="hljs-string">'event'</span>, <span class="hljs-string">'usesKeyboard page-name'</span>);
          },
        }
      }
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"module"</span>&gt;</span><span class="actionscript">(...the Analytics <span class="hljs-keyword">for</span> Accessibility snippet...)</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  </code></pre>
  <ol>
  <li><p>For each page, rename <code>page-name</code> to a globally unique identifier for the
  page (e.g. <code>landing-page</code>).</p>
  <p>Note that this is part of 2 custom event names (’syncItems page-name’ and
  ‘usesKeyboard page-name’) so the above restrictions on custom event names
  apply.</p>
  </li>
  </ol>
  <p>With that in place, the following will now automatically happen</p>
  <ul>
  <li>When one of these page loads, a Google Analytics custom event will be recorded
  containing information on the user’s preferences captured via media features
  (e.g. prefers-reduced-motion)</li>
  <li>After a page load, if the user starts to use the keyboard for navigation a
  Google Analytics custom event will be recorded indicating that the user is
  using the keyboard</li>
  </ul>
  <h2 id="viewing-data-in-the-google-analytics-console">Viewing Data in the Google Analytics Console</h2>
  <p>Now that data should be getting reported to Google Analytics, the next step is
  to view the data.</p>
  <p>But before that, we need to know what data to expect there to be.</p>
  <h3 id="all-possible-parameters-and-values-to-analyze">All Possible Parameters and Values to Analyze</h3>
  <p>The key data are the parameters of the custom events.</p>
  <p>Their names take the following preprocessed form</p>
  <pre><code>accessibilityAttributeAbbreviation__customEventName
  </code></pre><p>With 2 additional transformations</p>
  <ul>
  <li>All dashes (-) are converted to underscores (_)</li>
  <li>All spaces ( ) are converted to underscores (_)</li>
  </ul>
  <p>For example if the inputs were as follows</p>
  <ul>
  <li><code>accessibilityAttributeAbbreviation</code> was <code>prm</code> (for prefers-reduced-motion)</li>
  <li><code>customEventName</code> was <code>syncItems landing-page</code></li>
  </ul>
  <p>then the parameter would be named as follows</p>
  <pre><code>prm__syncItems_landing_page
  </code></pre><p><code>customEventName</code> will always be the name of a custom event.</p>
  <p><code>accessibilityAttributeAbbreviation</code> will take on one of the following
  possibilities</p>
  <dl>
      <dt>fc</dt>
      <dd>(short for <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors">forced-colors</a>)</dd>
      <dt>ic</dt>
      <dd>(short for <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/inverted-colors">inverted-colors</a>)</dd>
      <dt>pcs</dt>
      <dd>(short for <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme">prefers-color-scheme</a>)</dd>
      <dt>pc</dt>
      <dd>(short for <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast">prefers-contrast</a>)</dd>
      <dt>prm</dt>
      <dd>(short for <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion">prefers-reduced-motion</a>)</dd>
      <dt>uk</dt>
      <dd>(short for uses-keyboard)</dd>
  </dl>
  
  <p>These parameters can then take on different values, depending on the
  <code>accessibilityAttributeAbbreviation</code>. All of the possibilities are covered below</p>
  <dl>
      <dt>fc</dt>
      <dd>(short for <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors">forced-colors</a>)</dd>
      <dd>
          <span>Possible Values:</span>
          <ul>
              <li>active</li>
              <li>none</li>
          </ul>
      </dd>
      <dt>ic</dt>
      <dd>(short for <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/inverted-colors">inverted-colors</a>)</dd>
      <dd>
          <span>Possible Values:</span>
          <ul>
              <li>none</li>
              <li>inverted</li>
          </ul>
      </dd>
      <dt>pcs</dt>
      <dd>(short for <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme">prefers-color-scheme</a>)</dd>
      <dd>
          <span>Possible Values:</span>
          <ul>
              <li>dark</li>
              <li>light</li>
          </ul>
      </dd>
      <dt>pc</dt>
      <dd>(short for <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast">prefers-contrast</a>)</dd>
      <dd>
          <span>Possible Values:</span>
          <ul>
              <li>custom</li>
              <li>less</li>
              <li>more</li>
              <li>no-preference</li>
          </ul>
      </dd>
      <dt>prm</dt>
      <dd>(short for <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion">prefers-reduced-motion</a>)</dd>
      <dd>
          <span>Possible Values:</span>
          <ul>
              <li>no-preference</li>
              <li>reduce</li>
          </ul>
      </dd>
      <dt>uk</dt>
      <dd>(short for uses-keyboard)</dd>
      <dd>
          <span>Possible Values:</span>
          <ul>
              <li>true</li>
          </ul>
      </dd>
  </dl>
  
  <h3 id="viewing-annotated-custom-event-data-or-accessibility-page-load-custom-event-data-in-the-google-analytics-console">Viewing Annotated Custom Event Data or “Accessibility Page Load” Custom Event Data in the Google Analytics Console</h3>
  <p>Follow these steps for each custom event and accessibility attribute you’re
  interested in</p>
  <ol>
  <li>Pick a custom event name and an accessibility attribute of interest.</li>
  <li>Determine the parameter name they correspond to (see above section).</li>
  <li><a href="https://support.google.com/analytics/answer/10075209#new-custom-dimension">Create a custom dimension</a>
  based on the parameter name</li>
  <li>Wait 24 to 48 hours for Google Analytics to populate the custom dimension
  with data</li>
  </ol>
  <p>TODO - discuss how to see data from there (what’s the simplest way to see counts
  for each value for the custom dimension in a certain time range? A blank
  exploration?)</p>
  <h2 id="setting-up-with-plausible">Setting Up With Plausible</h2>
  <p>TODO</p>
  `;

function render() {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${
    getCommonHeadChildren({
      title: "Docs",
      description:
        "Documentation for how to setup Analytics for Accessibility with Google Analytics and other providers",
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
