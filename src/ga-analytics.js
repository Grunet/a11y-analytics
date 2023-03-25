import { decorateCustomEventGlobalWithAccessibilityInformation } from "./analytics.js"

function decorateGtagWithAccessibilityInformation() {
  decorateCustomEventGlobalWithAccessibilityInformation({
    getGlobal: () => {  return window.gtag; }, 
    setGlobal: (value) => { window.gtag = value; },
    onResolutionCallback: ({ name, data: { resolvedValue }}) => {
      window.gtag('event', 'resolvedAccessibilityData', {
        nameOfData: name,
        resolvedValue,
      });
    }
  });
}

decorateGtagWithAccessibilityInformation();