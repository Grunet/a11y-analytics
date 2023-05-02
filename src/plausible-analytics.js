import { decorateCustomEventGlobalWithAccessibilityInformation } from "./analytics.js";

function decoratePlausibleWithAccessibilityInformation() {
  decorateCustomEventGlobalWithAccessibilityInformation({
    getGlobal: () => {
      return window.plausible;
    },
    setGlobal: (value) => {
      window.plausible = value;
    },
    translateArguments: (
      { originalArguments, accessibilityEventParameters },
    ) => {
      const translatedArguments = [...originalArguments]; // TODO - replace with structuredClone for a true deep copy once it has better browser support

      const originalOptions = originalArguments[1];
      const originalProps = originalOptions?.props;

      const translatedProps = {
        ...originalProps,
        ...accessibilityEventParameters,
      };

      const translatedOptions = {
        ...originalOptions,
        ...{ props: translatedProps },
      };

      translatedArguments[1] = translatedOptions;

      return translatedArguments;
    },
    syncItemsCallback: globalThis.a11y_analytics_config?.plausible?.callbacks
      ?.onSyncItemsResolved,
    usesKeyboardCallback: globalThis.a11y_analytics_config?.plausible?.callbacks
      ?.onUsesKeyboardResolved,
  });
}

decoratePlausibleWithAccessibilityInformation();
