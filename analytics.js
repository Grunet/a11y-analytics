function decorateCustomEventGlobalWithAccessibilityInformation({ getGlobal, setGlobal}) {
    const accessibilityEventParameters = {};
      const oldGtagFunction = getGlobal();
  
      setGlobal(function accessibilityDecoratedGtag(event, type, parameters) {
          const adjustedParameters = {...parameters,...accessibilityEventParameters};
  
          oldGtagFunction(event, type, adjustedParameters);
      })
  
      // Media Features - code resolves synchronously
      try {
        // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
        captureMediaFeatureBasedPreference({
          mediaFeature: "prefers-reduced-motion",
          possibleValues: ["no-preference", "reduce"],
        });
  
        // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
        captureMediaFeatureBasedPreference({
            mediaFeature: "prefers-color-scheme",
            possibleValues: ["light", "dark"],
        });
  
        // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/inverted-colors - Safari only currently
        captureMediaFeatureBasedPreference({
            mediaFeature: "inverted-colors",
            possibleValues: ["none", "inverted"],
        });
  
        // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors
        captureMediaFeatureBasedPreference({
            mediaFeature: "forced-colors",
            possibleValues: ["none", "active"],
        });
      } catch (error) {
        console.error(error);
      }
      
  
      // Keyboard detection code - code resolves asynchronously
      (function captureAndEmitKeyboardData() {
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
                
                    accessibilityEventParameters["uses_keyboard"] = true;
                
                    clearInterval(intervalId);
                }, 500);
              } catch (error) {
                console.error(error);
              }
        })();
  
  
      // Helper functions
  
      function captureMediaFeatureBasedPreference({ mediaFeature, possibleValues }) {
          if (checkIfBrowserSupportsMediaFeature({ mediaFeature }) === false) {
            return;
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
            return;
          }
        
          const analyticsProviderSafeMediaFeatureName = mediaFeature.replaceAll("-","_");
          const preferredValue = mediaQueryThatResolvedToTrue.possibleValue;
  
          accessibilityEventParameters[analyticsProviderSafeMediaFeatureName] = preferredValue;
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