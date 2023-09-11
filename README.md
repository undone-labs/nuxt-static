‼️ This repo is now deprecated in favour of [Nuxt 3 Starter](https://github.com/undone-labs/nuxt3-starter) ‼️

---

# AU Nuxt Static Boilerplate

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

![Nuxt Static banner](https://raw.githubusercontent.com/agency-undone/nuxt-static/develop/static/images/open-graph.png)

## Overview

This is the boilerplate repository for building static sites using Nuxt

- This repo represents a static site which requires compilation, but can then be served as a static resource
- This site can be hosted on any resource supporting static files, but may include some services that require a serverless node
- When running in production, this repository is primarily tested against the Netlify ecosystem, including Netlify Functions for any dynamic functionality
- The site itself is served statically, but internal navigation is virtualized in the browser: in other words, the site acts as an SPA when browsed on the client
- While a static site, this app can be extended at any time to a full application by changing the `target` in settings


## Stack

- Requires nodeJS and has been tested on node 16
- Uses a Vue framework, [nuxtJS 2](https://nuxtjs.org/), deployed in static mode
- Styles are written in SCSS, and are concatenated and tree-shaken during compile-time


## Setup

1) Follow "build" and "self-signed certificate" instructions below
2) Enable Github Pages for storybook deployment (Go to Github Repo > Settings > Pages > Branch - set both branch and folder to `docs`)
3) Add repo to [Fleek](https://docs.fleek.co/) for ci/cd setup or any other hosting provider


## Build

To build this site:
- Clone this repo
- Make sure Node.js 16 or newer is installed
  - A version 1 lockfile will not be compatible with this site, so npm 7 or higher must be used
- Configure a self-signed certificate for local HTTPS support (see next section)
- Install npm dependencies by running `npm ci`
- Then, either generate the static site, or run it in local development mode:
  - To build the static site
    - Run `npm run generate`
    - A directory `dist` is created, which contains the static site output
  - To run in local development mode, for features like hot reload:
    - Run `npm run dev`
    - The site will be available in real time via a localhost URL


## Self-signed certificate

In order to use the site in local development mode, two files must be added to the repo's root directory. The following set of commands apply to a MacOS system, however, if `mkcert` is installed by another package manager, this can be run on any flavor of *nix. 

```zsh
cd ~/.ssh
brew install mkcert ## replace with another package manager for linux distro
mkcert -install
mkcert -key-file localhost_key.pem -cert-file localhost_cert.pem localhost 127.0.0.1
cat localhost_cert.pem > localhost_fullchain.pem
cat "$(mkcert -CAROOT)/rootCA.pem" >> localhost_fullchain.pem
```

Now, navigate to your project directory, wherever the repo was cloned to, for example `cd ~/Sites/nuxt-static` and copy the `pem` files into the repo root. These keys are `.gitignored` by default.

```zsh
cp -v ~/.ssh/localhost_cert.pem ~/.ssh/localhost_key.pem .
```


## Updating dependencies

Please use `npm ci` in place of `npm i` when not explicitly upgrading dependencies. `npm ci` will only install versions of packages provided in the lockfile, leading to more stability. 

Always regression test the site if upgrading packages, as they may contain breaking changes.


## Lint

- `npm run lint` runs `eslint` on all `.js` and `.vue` files
- Linting runs automatically as a pre-commit hook


## Commit Messages

Commit messages should use the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) format. `commitlint` has been installed to validate this usage. This means that all commits should be prefixed appropriately with a tag denoting the kind of code being committed.

- `feat:` A feature, or part of a feature
- `fix:` A bug fix
- `style:` A visual or stylistic change only
- `chore:` An operational task, such as routine maintenance, version control related operations, dependencies, etc.
- `refactor:` A change to the way the code is implemented, without materially changing the feature
- `perf:` A change that is made primarily to improve performance
- `test:` Any changes required to run a specific test or try out a behavior for the purposes of testing
- `cleanup:` Markup and syntactic cleanup that doesn't affect the code output
- `docs:` Documentation-related changes
- `content:` Changes to the project's content, such as copy or media


## Storybook

To better display the components available on the site, their properties, and the states they might appear in, a Storybook app is included in this repo.

- Each component that's developed must have its own story
- Use `npm run storybook` to run Storybook locally
- Or `npm run storybook-build` to generate a static Storybook UI website
- Storybook automatically deploys to [https://agency-undone.github.io/nuxt-static](https://agency-undone.github.io/nuxt-static) using Github pages. The static build is stored in `docs` branch under `docs` folder


## Style guide

1. All file names will be in `kebab-case`
2. All component names on import will be `PascalCase`
3. The grid used is a flexbox style system called [Gridlex](https://gridlex.devlint.fr/), its documentation is also available as a [readme in this repo](packages/site/assets/scss/grid/README.md)
4. Color name variables in `SCSS` are obtained from [this resource](https://chir.ag/projects/name-that-color/)


## [Release Please](https://github.com/googleapis/release-please)

- Release Please automates CHANGELOG generation, the creation of GitHub releases, and version bumps for your projects. 
- It is currently setup as a github action in this repo
- See [documentation](https://github.com/googleapis/release-please) on how to use


## [Cypress](https://go.cypress.io/) as e2e test

- Cypress is setup as e2e test for the repo
- See [documentation](https://go.cypress.io/) on how to use
