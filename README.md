

# CryptoValues

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

## Demo

https://crypto-values-yagolopez.vercel.app/

## Install

Clone or download the repository

Go to project directory and run `npm install` to install dependencies

## Development server

Run `nx serve crypto-values` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Build

Run `nx build crypto-values` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test crypto-values` to execute the unit tests via [Jest](https://jestjs.io).

## Running end-to-end tests

Run `nx run crypto-values-e2e:e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `npm run cypress` to open Cypress UI and run tests (Server running in http://localhost:4200 is needed).

## Running the linter

Run `nx run crypto-values:lint` to execute the linter.

## Understand the monorepo workspace

This monorepo contains two projects:

- An **app** called `crypto-values` 
- A **library** used by the app called `react-query-crud`

Run `nx dep-graph` to see a diagram of the dependencies of the project.

Run `npm run` to see a list of available scripts.

## Tech Stack

- NextJS
- TypeScript
- Formatting and Static Code Analysis:
  - Prettier
  - ESLint
- [React Virtualized](https://github.com/bvaughn/react-virtualized) Component for rendering huge lists
- [Material UI](https://mui.com/) component library
- Testing
  - Jest and React Testing Library
  - E2E: Cypress
- Asynchronous Server State Management: using [React Query](https://react-query.tanstack.com/) library
  - It provides a cache system to manage **server state** (async requests)
  - It has a system to implement pseudo **real-time** requests
  - It keeps UI data updated making requests automatically when browser window recover focus
  - Failure protection: If a request fails, React Query will try three times more before throwing an error


## Architecture

- **Use of a Data Abstraction Layer** (DAL)
- **Decoupling of frontend from backend**: the purpose is to use a common interface with different implementations for real data, mock data or even Graphql. So changing the way of getting data should not affect frontend code
- The app uses some **OOP principles and patterns**
  - Domain entities are models like `ICurrency`, for example
  - Use of *Repository Pattern*
  - Use of *Singleton Pattern* to avoid creating new instances of repositories each re-render
- Abstraction layer functionality is grouped in a library I created ad hoc called `react-query-crud` (based in React Query). In this case it only reads data but usually DAL executes CRUD operations
- There are two api endpoints defined as Nextjs Servless Functions
  - [/api/crypto-currencies](https://crypto-values-yagolopez.vercel.app/api/crypto-currencies) acts as proxy to the coin360.com remote api
  - [/api/mock-crypto-currencies](https://crypto-values-yagolopez.vercel.app/api/mock-crypto-currencies) returns mock data from a JSON file

![](crypto-values.png)
