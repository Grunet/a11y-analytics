# A11y Analytics

See https://a11y-analytics.deno.dev/ for more information

## Status of Semantic Versioning

I don't yet feel confident I understand what the API surface of this should be in all cases, so it seems misleading to publish a 1.0 and semantically version it.

Given that, this won't be semantically versioned until I reach that level of confidence.

However, I will attempt to make sure breaking changes are called out in CHANGELOG.md from this point forward.

## Supported Analytics Providers

These are the analytics providers the snippet can work with at the moment

- Google Analytics
- Plausible

The snippet should always be inserted as follows

- After all of the scripts of the analytics provider
- As an inline script tag with `type` set to `module` so its execution is
  deferred until the analytics provider scripts finish executing

## Performance Considerations

The initial synchronous work done by the snippet takes approximately 10 plus or
minus 3 milliseconds, roughly.

The snippet itself currently weighs in at approximately 2.4 kilobytes
(approximately 1.1 kilobytes when compressed with gzip)

## Build Pipeline

To minify the source file and create a snippet to include on the website, go
through the following steps

1. Start a Github Codespace from a new branch
2. Run the following command at the root of the repo

```bash
deno task build
```

3. When it asks you for run access, double check that the binary it's pointing
   to looks correct. The path to it should be
   "/home/vscode/.cache/esbuild/bin/@esbuild-linux-x64@X.Y.Z" where "X.Y.Z" is
   the version of esbuild in use.
4. Accept through run access

You should see the minified snippet out in the console, as well as showing up as
a file under the `dist/` folder.

## Release Pipeline

This applies to the creation of the Github Releases that contain the published
Javascript snippets.

To publish updated snippets the process goes as follows

1. Update CHANGELOG.md with what the new changes include
2. Update the version in version.json according to semantic versioning
3. Create a PR with those changes and merge it into main
4. Run the Release Github Workflow via workflow dispatch against the main branch

A new Git tag and Github Release should be created containing the updated
snippets.

## Deployment Pipeline

This applies to the "marketing" website where the ideas behind this project are
discussed.

This repository is hooked up to a (manually created) Deno Deploy project. So
every merge to main will cause a redeploy of `main.tsx` and the
https://a11y-analytics.deno.dev/ site.

## Supply Chain Security Considerations

### Pinning of Versions

#### Local Development

The version of all dependencies are pinned down to a patch version.

The version of Deno used locally for building and processing source code into
the final snippets is pinned down to a patch version.

The version of Debian used as the base image for the dev container used in
Github Codespaces is not pinned, to allow easy uptake of security patches. It's
also in the stable release channel (buster) for Debian.

The version of the Deno VS Code extension is not pinned. This is a source of
risk for slipping in subtle changes into code I wouldn't otherwise notice.

#### Release Workflow

All 3rd party Github Actions are pinned to a commit.

Common libraries provided by the Github Actions runtime (e.g. jq) are not
pinned.

#### Production

Deno Deploy's version is not pinned as it's a Software-as-a-Service platform.

All application level dependencies in the code deployed to it have their
versions pinned down to a patch version.

### Signing of Commits

Github Codespaces automatically signs commits for you when you use it, if you've
configured that in your account settings. This along with the branch protection
rule on `main` to require signed commits should prevent anyone masquerading as
me and trying to slip in changes unnoticed.

### Tamperment Detection

Currently Github doesn't seem to sign their dev container images, so it's not
possible to detect if it's been tampered with (before or after starting a
session).
[I asked about this lack of container signing on Twitter](https://twitter.com/__grunet/status/1632395784942395393?s=20).

### Surface Area for Vulnerabilities

#### Local Development

Debian images generally include many more Linux kernel packages than other
slimmer alternatives (e.g. alpine or Chainguard ones), meaning they have a much
larger surface area for vulnerabilities. Github Codespaces only seemed to offer
it as an option, and it's unclear to me how to make a custom alternative that
still functions with Codespaces.

[Deno dependencies are not yet tracked by Dependabot](https://github.com/dependabot/dependabot-core/issues/2417)
meaning it's unlikely I'll get a notification if there's a security issue with
them that requires an update. The workaround is on my Github account I have a
watch setup for security alerts for each the Github repositories of the dev
dependencies

- [Deno](https://github.com/denoland/deno/security)
- [esbuild](https://github.com/evanw/esbuild/security)
- [compress](https://github.com/deno-library/compress/security)

#### Release Workflow

3rd party Github Actions are another vulnerability source. Dependabot should be
notifying me of any reported security vulnerabilities with the ones in use, as
well as helping keep them on the latest major version (to make it easier to take
security patches).

### Automation and Clean Machines

#### Local Development

Creation of the snippet and its inclusion into the website are currently manual
processes, vulnerable to modification by other malicious things running on the
same system.

The primary mitigation for this is to perform the processes on a clean machine,
in this case a Github Codespace. It also helps that I'm the only contributor
currently, as the mitigation is useless otherwise.

#### Release Workflow

The publishing of the Github Releases is done via Github Actions and their
clean, ephemeral runners.

### Human Things

I currently am the only owner of this repository, and I have MFA enabled on my
account.
