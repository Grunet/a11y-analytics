# Changelog

## 0.4.2

- Ignore select elements in keyboard detection logic as Chrome (but not Firefox)
  decides to match them with :focus-visible

## 0.4.1

- Fix the structure of the config object to wrap everything currently there in a
  level

## 0.4.0

- Include the versions of the snippets that work inside of backticks in
  Javascript code in the Github Release

## 0.3.2

- Shorten parameter prefixes so custom event names don't overflow the max length
  for Google Analytics

## 0.3.1

- Fix parameter names to adhere to custom dimension restrictions

## 0.3.0

- Allow for consumers to inject callbacks that fire once all media features have
  been resolved and another once keyboard detection has resolved

## 0.2.0

- Remove resolvedAccessibilityData page load event due to difficulties in making
  it fit inside the GA4 parameter name length limits

## 0.1.2

- Include the pathname in the resolvedAccessibilityData parameter so it's
  possible to count the starts of a journey per page

## 0.1.1

- Inline the event name into the parameters for Google Analytics to unblock
  reporting

## 0.1.0

- Initial release
- Initial work on release automation
