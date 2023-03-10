import { decorateCustomEventGlobalWithAccessibilityInformation } from "./analytics.js"

function decorateGtagWithAccessibilityInformation() {
  decorateCustomEventGlobalWithAccessibilityInformation({
    getGlobal: () => {  return window.gtag; }, 
    setGlobal: (value) => { window.gtag = value; }
  });
}

decorateGtagWithAccessibilityInformation();