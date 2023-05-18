import { setupAccessibilityInformationDetector } from "./detector/index.js";

function decorateCustomEventGlobalWithAccessibilityInformation(
  {
    getGlobal,
    setGlobal,
    translateArguments,
    syncItemsCallback,
    usesKeyboardCallback,
    usesPinchZoomCallback,
  },
) {
  try {
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

    setupAccessibilityInformationDetector({
      onResolutionCallback({ eventType, source, data }) {
        if (eventType === "data") {
          Object.assign(accessibilityEventParameters, data);
        }

        if (eventType === "completionNotification") {
          switch (source) {
            case "syncItems":
              if (syncItemsCallback) {
                syncItemsCallback();
              }
              break;
            case "usesKeyboard":
              if (usesKeyboardCallback) {
                usesKeyboardCallback();
              }
              break;
            case "usesPinchZoom":
              if (usesPinchZoomCallback) {
                usesPinchZoomCallback();
              }
              break;
            default:
              throw new Error(`Source ${source} unknown`);
          }
        }
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export { decorateCustomEventGlobalWithAccessibilityInformation };
