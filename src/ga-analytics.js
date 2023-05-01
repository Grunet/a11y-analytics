import { decorateCustomEventGlobalWithAccessibilityInformation } from "./analytics.js";

function decorateGtagWithAccessibilityInformation() {
  decorateCustomEventGlobalWithAccessibilityInformation({
    getGlobal: () => {
      return window.gtag;
    },
    setGlobal: (value) => {
      window.gtag = value;
    },
    translateArguments: (
      { originalArguments, accessibilityEventParameters },
    ) => {
      const translatedArguments = [...originalArguments]; // TODO - replace with structuredClone for a true deep copy once it has better browser support

      if (originalArguments.length >= 3) {
        const originalParameters = originalArguments[2];

        const eventName = originalArguments[1];
        const disambiguatedAccessibilityEventParameters = Object.fromEntries(
          Object.entries(accessibilityEventParameters).map(([key, value]) => {
            const newKey = `${key} [${eventName}]`.replaceAll(
              "-",
              "_",
            ); // Google Analytics requires underscores instead of dashes for its custom dimensions

            return [
              newKey,
              value,
            ];
          }),
        );

        const translatedParameters = {
          ...originalParameters,
          ...disambiguatedAccessibilityEventParameters,
        };

        translatedArguments[2] = translatedParameters;
      }

      return translatedArguments;
    },
  });
}

decorateGtagWithAccessibilityInformation();
