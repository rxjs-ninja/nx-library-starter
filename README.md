# RxJS Ninja Template Library

<p align="center">
    <img src="https://raw.githubusercontent.com/rxjs-ninja/rxjs-ninja/main/assets/logo.png" width="150">
    <img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="150">
</p>

This repository is a Github Template for generating Typescript libraries for the web with UMD and ESM compilation.

It's build using the [Nx](https://nx.dev) monorepo approach and is set up to allow for libraries to be developed with their own public API and compiled for use in any ECMAScript environment including node, framework or VanillaJS approaches.

## Library Setup

Included in this repo is the [Example Library](https://github.com/rxjs-ninja/nx-library-starter/tree/main/libs/rxjs/example-lib) - a small RxJS library that exports a `fizzbuzz` operator and an Observable `fromFizzbuzz` sequence generator.

To set this up I used `@nrwl/node` to generate the library:

```
> nx g @nrwl/node:lib example-lib --directory=rxjs --publishable --importPath=@rxjs-ninja/example-lib
```

By default this sets up a node-compatible library using CommonJS, but this can cause issues with modern frameworks for the web.

Here the builder options in the project are replaced in `workspace.json` to use the `@nrwl/web` builder with Babel and Rollup, and add support for the readme and changelog:

```json
"build": {
  "builder": "@nrwl/web:package",
  "options": {
    "outputPath": "dist/libs/rxjs/example-lib",
    "tsConfig": "libs/rxjs/example-lib/tsconfig.lib.json",
    "project": "libs/rxjs/example-lib/package.json",
    "entryFile": "libs/rxjs/example-lib/src/index.ts",
    "external": ["rxjs"],
    "babelConfig": "@nrwl/web/babel",
    "assets": [
      {
        "glob": "README.md",
        "input": "libs/rxjs/example-lib/.",
        "output": "."
      },
      {
        "glob": "CHANGELOG.md",
        "input": "libs/rxjs/example-lib/.",
        "output": "."
      }
    ]
  }
}
```

This also needs the `babel.config.json` and `.babelrc` files.  

In the library `tsconfig.lib.json` the `module` property needs to be changed from `commonjs` to `es2015`.

See the example folder for full details of the setup.

Now when running `nx build rxjs-example-lib` a version of the library is built that can be used in any environment including the web.

## Running unit tests

The unit tests in the library use [marble diagrams](https://rxmarbles.com/) to provide the data to the operators. Jest is integrated using [rxjs-marbles](https://www.npmjs.com/package/rxjs-marbles) and provides full code coverage too.

Run `nx test rxjs-example-lib --codeCoverage` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Generating Docs

Run `npm run docs` to generate docs using [Typedoc](https://typedoc.org) and output to the `doc` folder.

This also uses [typedoc-plugin-external-module-name](https://www.npmjs.com/package/typedoc-plugin-external-module-name) to provide better support for a module layout in documentation

## Github Action Pipeline

In the `.github` folder there are some YAML and Bash scripts provided that I have developed for working with NX Monorepos and publishing libraries with changelogs and documentation.

> This is provided as is, I use this actively in [rxjs-ninja](https://github.com/rxjs-ninja/rxjs-ninja) where it can be seen in action

## Using the UMD Library

When the library is published it can be used as a UMD library using [unpkg](https://unpkg.com) - here is an example of `RxJS` (the shim is [Issue #1](https://github.com/rxjs-ninja/nx-library-starter/issues/1)) with one of the RxJS Ninja libraries on a basic HTML page.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Testing</title>
    </head>

    <body></body>

    <script src="https://unpkg.com/rxjs/bundles/rxjs.umd.min.js"></script>
    <script>
        window.operators = rxjs.operators;
    </script>
    <script src="https://unpkg.com/@rxjs-ninja/rxjs-random@1.1.1/rxjs-random.umd.js"></script>

    <script module>
        const { tap } = rxjs.operators;
        const { fromRandom } = RxjsRandom;
        fromRandom(0, 1, 1000).pipe(tap(console.log)).subscribe()
    </script>
</html>
```

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
