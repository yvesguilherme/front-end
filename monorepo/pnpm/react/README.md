# Using Nx to speed up a PNPM workspace monorepo

[![package-based monorepo](https://img.shields.io/static/v1?label=Nx%20setup&message=package-based%20monorepo&color=orange)](https://nx.dev/concepts/integrated-vs-package-based#package-based-repos)

This example shows how to add Nx to an existing PNPM workspace for the purpose of providing an improved developer experience and obviously speed via caching and incremental task execution.

## What's inside?

PNPM workspace repository structured as `apps` and `packages` folder. It contains

- a [Remix](https://remix.run) application in the `apps/my-remix-app` folder
- a React library compiled with TypeScript in the `packages/shared-ui` folder.
- Remix app imports the `shared-ui` library

Nx is used for orchestration of the tasks and has according caching and task dependencies defined in `nx.json`.

## How to run it

Make sure you are in the example folder.

Install all packages via

```bash
> pnpm install
```

Serve the Remix application by running it's `dev` npm script defined in the `apps/my-remix-app/package.json`. We can do that with Nx using

```bash
> pnpx nx dev my-remix-app
```

Run the builds for all projects with

```bash
> pnpx nx run-many --target=build
```

Run the build of just a single package like the `shared-ui` with

```bash
> pnpx nx build shared-ui
```

## Learn more

- [📹 Setup a monorepo with PNPM workspaces and add Nx for speed](https://youtu.be/ngdoUQBvAjo)

## Reference
- https://dev.to/nx/setup-a-monorepo-with-pnpm-workspaces-and-speed-it-up-with-nx-1eem