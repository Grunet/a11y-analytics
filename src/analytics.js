function decorateCustomEventGlobalWithAccessibilityInformation({ getGlobal, setGlobal, translateArguments, onResolutionCallback }) {
      const accessibilityEventParameters = {};
      const oldAnalyticsGlobal = getGlobal();
  
      setGlobal(function accessibilityDecoratedAnalyticsGlobal(...originalArguments) {
          const translatedArguments = translateArguments({ originalArguments, accessibilityEventParameters});
  
          oldAnalyticsGlobal.apply(window, translatedArguments);
      })
  
      // Media Features - code resolves synchronously
      try {
        // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
        resolveMediaFeatureBasedPreference({
          mediaFeature: "prefers-reduced-motion",
          possibleValues: ["no-preference", "reduce"],
          onResolutionCallback,
        });
  
        // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
        resolveMediaFeatureBasedPreference({
            mediaFeature: "prefers-color-scheme",
            possibleValues: ["light", "dark"],
            onResolutionCallback,
        });
  
        // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/inverted-colors - Safari only currently
        resolveMediaFeatureBasedPreference({
            mediaFeature: "inverted-colors",
            possibleValues: ["none", "inverted"],
            onResolutionCallback,
        });
  
        // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors
        resolveMediaFeatureBasedPreference({
            mediaFeature: "forced-colors",
            possibleValues: ["none", "active"],
            onResolutionCallback,
        });

        // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast
        resolveMediaFeatureBasedPreference({
            mediaFeature: "prefers-contrast",
            possibleValues: ["no-preference", "more", "less", "custom"],
            onResolutionCallback,
        });
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
                    if (tagNameUpperCased === "INPUT" || tagNameUpperCased === "TEXTAREA") {
                        return;
                    }
                
                    if (focusedElement.contentEditable === "true") {
                        return;
                    }
                
                    const adjustedFeatureName = "uses_keyboard"; // Google Analytics requires underscores instead of dashes for its custom dimensions
                    const resolvedValue = true;

                    accessibilityEventParameters[adjustedFeatureName] = resolvedValue;

                    if (onResolutionCallback) {
                      onResolutionCallback({
                        name: adjustedFeatureName,
                        data: {
                          resolvedValue,
                        }
                      });
                    }
                
                    clearInterval(intervalId);
                }, 500);
              } catch (error) {
                console.error(error);
              }
        })();
  
  
      // Helper functions
      function resolveMediaFeatureBasedPreference({ mediaFeature, possibleValues, onResolutionCallback }) {
        const { adjustedFeatureName, value, error} = captureMediaFeatureBasedPreference({ mediaFeature, possibleValues });

        if (error) {
          return;
        }

        if (onResolutionCallback) {
          onResolutionCallback({
            name: adjustedFeatureName,
            data: {
              resolvedValue: value,
            }
          });
        }
      }
  
      function captureMediaFeatureBasedPreference({ mediaFeature, possibleValues }) {
          if (checkIfBrowserSupportsMediaFeature({ mediaFeature }) === false) {
            return {
              error: new Error(`Unsupported media feature ${mediaFeature}`),
            };
          }
        
          const resolvedMediaQueries = possibleValues.map((possibleValue) => {
            return {
              possibleValue,
              mediaQueryResult: window.matchMedia(`(${mediaFeature}: ${possibleValue})`)
                .matches,
            };
          });
        
          const mediaQueryThatResolvedToTrue = resolvedMediaQueries.find(
            ({ _, mediaQueryResult }) => mediaQueryResult === true
          );
        
          if (mediaQueryThatResolvedToTrue === undefined) {
            console.error(
              `Something went wrong. Is there a new ${mediaFeature} allowed value not accounted for here?`
            );

            return {
              error: new Error(`No media query resolved to true for ${mediaFeature}`),
            };
          }
        
          const analyticsProviderSafeMediaFeatureName = mediaFeature.replaceAll("-","_"); // Google Analytics requires underscores instead of dashes for its custom dimensions
          const preferredValue = mediaQueryThatResolvedToTrue.possibleValue;
  
          accessibilityEventParameters[analyticsProviderSafeMediaFeatureName] = preferredValue;

          return {
            adjustedFeatureName: analyticsProviderSafeMediaFeatureName,
            value: preferredValue
          }
        }
        
        function checkIfBrowserSupportsMediaFeature({ mediaFeature }) {
          const isMediaFeatureSupportedByTheBrowser = window.matchMedia(
            `not all and (${mediaFeature}), (${mediaFeature})`
          ).matches;
        
          if (!isMediaFeatureSupportedByTheBrowser) {
            console.warn(`Your browser doesn't support ${mediaFeature} yet`);
        
            return false;
          }
        
          return true;
        }
  }

  export { decorateCustomEventGlobalWithAccessibilityInformation };