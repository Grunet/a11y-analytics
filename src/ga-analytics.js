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
      if (originalArguments[0] !== "event") {
        return originalArguments;
      }

      const eventName = originalArguments[1];

      const disambiguatedAccessibilityEventParameters = Object.fromEntries(
        Object.entries(accessibilityEventParameters).map(([key, value]) => {
          const newKey = `${key}__${eventName}`.replaceAll(
            "-",
            "_",
          ).replaceAll(" ", "_"); // “The parameter must consist of letters, numbers, or underscores, and it must start with a letter” per the error message in the "New custom dimension" form

          return [
            newKey,
            value,
          ];
        }),
      );

      const originalParameters = originalArguments[2];

      const translatedParameters = {
        ...originalParameters,
        ...disambiguatedAccessibilityEventParameters,
      };

      const translatedArguments = [...originalArguments]; // TODO - replace with structuredClone for a true deep copy once it has better browser support

      translatedArguments[2] = translatedParameters;

      return translatedArguments;
    },
    syncItemsCallback: globalThis.a11y_analytics_config?.ga?.callbacks
      ?.onSyncItemsResolved,
    usesKeyboardCallback: globalThis.a11y_analytics_config?.ga?.callbacks
      ?.onUsesKeyboardResolved,
  });
}

decorateGtagWithAccessibilityInformation();
