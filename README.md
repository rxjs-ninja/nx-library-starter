# RxJS Ninja Template Library

This project was generated using [Nx](https://nx.dev).

<p align="center">
    <img src="https://raw.githubusercontent.com/rxjs-ninja/rxjs-ninja/main/assets/logo.png" width="150">
    <img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="150">
</p>

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Library Setup

This library uses two Nwrl capabilities:

- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

## Generate a library

Run ` nx g @nrwl/node:lib example-lib --directory=rxjs --publishable --importPath=@rxjs-ninja/example-lib` to generate a library.

Libraries are publishable, see `workspace.json` and `libs/rxjs/example-lib` for further setup of the library for UMD publishing.

## Build

Run `nx build rxjs-example-lib` to build the library. 
The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `nx test rxjs-example-lib` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Generating Docs

Run `npm run docs` to generate docs using [Typedoc](https://typedoc.org) and output to the `doc` folder.

## Github Action Pipeline

To see how Github Actions can be used to publish these libraries see
the setup at [rxjs-ninja](https://github.com/rxjs-ninja/rxjs-ninja/tree/main/.github)

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
