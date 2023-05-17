function decorateCustomEventGlobalWithAccessibilityInformation(
  {
    getGlobal,
    setGlobal,
    translateArguments,
    syncItemsCallback,
    usesKeyboardCallback,
    usesPinchZoomCallback,
    usesPageZoomCallback,
  },
) {
  const accessibilityEventParameters = {};
  const oldAnalyticsGlobal = getGlobal();

  setGlobal(
    function accessibilityDecoratedAnalyticsGlobal(...originalArguments) {
      const translatedArguments = translateArguments({
        originalArguments,
        accessibilityEventParameters,
      });

      oldAnalyticsGlobal.apply(window, translatedArguments);
    },
  );

  // Media Features - code resolves synchronously
  try {
    // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
    resolveMediaFeatureBasedPreference({
      mediaFeature: "prefers-reduced-motion",
      abbreviation: "prm",
      possibleValues: ["no-preference", "reduce"],
    });

    // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
    resolveMediaFeatureBasedPreference({
      mediaFeature: "prefers-color-scheme",
      abbreviation: "pcs",
      possibleValues: ["light", "dark"],
    });

    // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/inverted-colors - Safari only currently
    resolveMediaFeatureBasedPreference({
      mediaFeature: "inverted-colors",
      abbreviation: "ic",
      possibleValues: ["none", "inverted"],
    });

    // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors
    resolveMediaFeatureBasedPreference({
      mediaFeature: "forced-colors",
      abbreviation: "fc",
      possibleValues: ["none", "active"],
    });

    // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast
    resolveMediaFeatureBasedPreference({
      mediaFeature: "prefers-contrast",
      abbreviation: "pc",
      possibleValues: ["no-preference", "more", "less", "custom"],
    });

    if (syncItemsCallback) {
      syncItemsCallback();
    }
  } catch (error) {
    console.error(error);
  }

  // Keyboard detection code - code resolves asynchronously
  (function resolveKeyboardData() {
    try {
      const intervalId = setInterval(function checkForKeyboardUsage() {
        const focusedElement = document.querySelector(":focus-visible");

        if (!focusedElement) {
          return;
        }

        // Ignore common false positives for click/touch users
        const tagNameUpperCased = focusedElement.tagName.toUpperCase();
        if (
          tagNameUpperCased === "INPUT" || tagNameUpperCased === "TEXTAREA" ||
          tagNameUpperCased === "SELECT"
        ) {
          return;
        }

        if (focusedElement.contentEditable === "true") {
          return;
        }

        accessibilityEventParameters["uk"] = true; // uses-keyboard

        clearInterval(intervalId);

        if (usesKeyboardCallback) {
          usesKeyboardCallback();
        }
      }, 500);
    } catch (error) {
      console.error(error);
    }
  })();

  // Pinch zoom detetion code - code resolves asynchronously
  (function resolvePinchZoomData() {
    try {
      const initialScale = window.visualViewport.scale;

      const intervalId = setInterval(function checkForPinchZoomUsage() {
        if (window.visualViewport.scale !== initialScale) {
          accessibilityEventParameters["upiz"] = true; // uses-pinch-zoom

          clearInterval(intervalId);

          if (usesPinchZoomCallback) {
            usesPinchZoomCallback();
          }
        }
      }, 500);
    } catch (error) {
      console.error(error);
    }
  })();

  // Page zoom detetion code - code resolves asynchronously
  (function resolvePageZoomData() {
    try {
      const initialDevicePixelRatio = window.devicePixelRatio;

      const intervalId = setInterval(function checkForPageZoomUsage() {
        if (window.devicePixelRatio !== initialDevicePixelRatio) {
          accessibilityEventParameters["upaz"] = true; // uses-pinch-zoom

          clearInterval(intervalId);

          if (usesPageZoomCallback) {
            usesPageZoomCallback();
          }
        }
      }, 500);
    } catch (error) {
      console.error(error);
    }
  })();

  // Helper functions
  function resolveMediaFeatureBasedPreference(
    { mediaFeature, abbreviation, possibleValues },
  ) {
    if (checkIfBrowserSupportsMediaFeature({ mediaFeature }) === false) {
      return;
    }

    const resolvedMediaQueries = possibleValues.map((possibleValue) => {
      return {
        possibleValue,
        mediaQueryResult:
          window.matchMedia(`(${mediaFeature}: ${possibleValue})`)
            .matches,
      };
    });

    const mediaQueryThatResolvedToTrue = resolvedMediaQueries.find(
      ({ _, mediaQueryResult }) => mediaQueryResult === true,
    );

    if (mediaQueryThatResolvedToTrue === undefined) {
      console.error(
        `Something went wrong. Is there a new ${mediaFeature} allowed value not accounted for here?`,
      );

      return;
    }

    accessibilityEventParameters[abbreviation] = // Using abbreviations to free up space in the 40 character limit on parameter names for Google Analytics
      mediaQueryThatResolvedToTrue.possibleValue;
  }

  function checkIfBrowserSupportsMediaFeature({ mediaFeature }) {
    const isMediaFeatureSupportedByTheBrowser = window.matchMedia(
      `not all and (${mediaFeature}), (${mediaFeature})`,
    ).matches;

    if (!isMediaFeatureSupportedByTheBrowser) {
      console.warn(`Your browser doesn't support ${mediaFeature} yet`);

      return false;
    }

    return true;
  }
}

export { decorateCustomEventGlobalWithAccessibilityInformation };
