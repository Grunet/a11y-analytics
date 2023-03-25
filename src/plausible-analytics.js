import { decorateCustomEventGlobalWithAccessibilityInformation } from "./analytics.js"

function decoratePlausibleWithAccessibilityInformation() {
  decorateCustomEventGlobalWithAccessibilityInformation({
    getGlobal: () => {  return window.plausible; }, 
    setGlobal: (value) => { window.plausible = value; },
    translateArguments: ({ originalArguments, accessibilityEventParameters}) => { 
        const translatedArguments = [...originalArguments]; // TODO - replace with structuredClone for a true deep copy once it has better browser support

        if (originalArguments.length >= 2) {
          const originalOptions = originalArguments[1];
          const originalProps = originalOptions?.props;
          
          const newProps = {...originalProps, ...accessibilityEventParameters}; 
          const newOptions = {...originalOptions, ...{props: newProps}};

          translatedArguments[1] = newOptions;
        }

        return translatedArguments;
    },
    onResolutionCallback: ({ name, data: { resolvedValue }}) => {
      window.plausible('resolvedAccessibilityData', {
        props: {
          nameOfData: name,
          resolvedValue,
        }
      });
    }
  });
}

decoratePlausibleWithAccessibilityInformation();