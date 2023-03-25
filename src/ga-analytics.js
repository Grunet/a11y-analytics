import { decorateCustomEventGlobalWithAccessibilityInformation } from "./analytics.js"

function decorateGtagWithAccessibilityInformation() {
  decorateCustomEventGlobalWithAccessibilityInformation({
    getGlobal: () => {  return window.gtag; }, 
    setGlobal: (value) => { window.gtag = value; },
    translateArguments: ({ originalArguments, accessibilityEventParameters}) => { 
        const translatedArguments = [...originalArguments]; // TODO - replace with structuredClone for a true deep copy once it has better browser support

        if (originalArguments.length >= 3) {
          const originalParameters = originalArguments[2];
          
          const translatedParameters = {...originalParameters, ...accessibilityEventParameters};

          translatedArguments[2] = translatedParameters;
        }

        return translatedArguments;
    },
    onResolutionCallback: ({ name, data: { resolvedValue }}) => {
      window.gtag('event', 'resolvedAccessibilityData', {
        nameOfData: name,
        resolvedValue,
      });
    }
  });
}

decorateGtagWithAccessibilityInformation();