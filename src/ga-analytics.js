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
