# A11y Analytics

See https://a11yanalytics.deno.dev/ for more information

## Technical Notes

This repository is hooked up to a (manually created) Deno Deploy project. So every merge to main will cause a redeploy of `main.tsx` and the https://a11yanalytics.deno.dev/ site

## Supply Chain Security Considerations

### Pinning of Versions

#### Local Development

The version of all dependencies are pinned down to a patch version.

The version of Deno used locally for building and processing source code into the final snippets is pinned down to a patch version.

The version of Debian used as the base image for the dev container used in Github Codespaces is not pinned, to allow easy uptake of security patches. It's also in the stable release channel (buster) for Debian.

The version of the Deno VS Code extension is not pinned. This is a source of risk for slipping in subtle changes into code I wouldn't otherwise notice.

#### Production

Deno Deploy's version is not pinned as it's a Software-as-a-Service platform.

All application level dependencies in the code deployed to it have their versions pinned down to a patch version.

### Signing of Commits

Github Codespaces automatically signs commits for you when you use it, if you've configured that in your account settings. This along with the branch protection rule on `main` to require signed commits should prevent anyone masquerading as me and trying to slip in changes unnoticed.

### Tamperment Detection

Currently Github doesn't seem to sign their dev container images, so it's not possible to detect if it's been tampered with (before or after starting a session). [I asked about this lack of container signing on Twitter](https://twitter.com/__grunet/status/1632395784942395393?s=20).

### Surface Area for Vulnerabilities

Debian images generally include many more Linux kernel packages than other slimmer alternatives (e.g. alpine or Chainguard ones), meaning they have a much larger surface area for vulnerabilities. Github Codespaces only seemed to offer it as an option, and it's unclear to me how to make a custom alternative that still functions with Codespaces.

### Automation and Clean Machines

Creation of the snippet and its inclusion into the website are currently manual processes, vulnerable to modification by other malicious things running on the same system.

The primary mitigation for this is to perform the processes on a clean machine, in this case a Github Codespace. It also helps that I'm the only contributor currently, as the mitigation is useless otherwise.
