# A11y Analytics

See https://a11yanalytics.deno.dev/ for more information

## Technical Notes

This repository is hooked up to a (manually created) Deno Deploy project. So every merge to main will cause a redeploy of `main.tsx` and the https://a11yanalytics.deno.dev/ site

## Supply Chain Security Considerations

### Pinning of Versions

#### Local Development

The version of Deno used locally for building and processing source code into the final snippets is pinned.

The version of Debian used as the base image for the dev container used in Github Codespaces is not pinned, to allow easy uptake of security patches. It's also in the stable release channel (buster) for Debian.

The version of the Deno VS Code extension is not pinned. This is a source of risk for slipping in subtle changes into code I wouldn't otherwise notice.

#### Production

Deno Deploy's version is not pinned as it's a Software-as-a-Service platform.

All application level dependencies in the code deployed to it have their versions pinned down to a patch version.

### Signing of Commits

Github Codespaces automatically signs commits for you when you use it. This along with the branch protection rule on `main` to require signed commits should prevent anyone masquerading as me and trying to slip in changes unnoticed.

