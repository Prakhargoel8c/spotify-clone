# Launch Instructions

### `Install Concurrently`

npm install -g concurrently

In the server directory, you can run:

### `yarn setup (Requires Concurrently)`

Install node modules

### `yarn start (Requires Concurrently)`

Run Api on port 3001 and ui on port 3000

# Design Philosophy for Client

## Directory Tree

    src
    |
    +---api
    |
    +---assets
    |
    +---components
    |
    +---constants
    |
    +---containers
    |   |   App.tsx
    |   |
    |   +---HomePage
    |   |   |   index.tsx
    |   |   |
    |   |   \---state
    |   |           index.ts
    |   |
    |
    +---hocs
    |       index.tsx
    |
    +---hooks
    |       index.tsx
    |
    +---store
    |   |   hooks.ts
    |   |   store.ts
    |   |
    |   \---globalReducers
    |
    \---types

### `src/api`

Define all external REST/GraphQL calls along with thier Adapters

### `src/assets`

Define all svg and other small assests which can potenially be inlinded using svg-inline-loader or loaded url raw,url loaders

### `src/components`

Define Pure Components that are generic in nature and can be used in multiple places

### `src/constants`

Define any in-app constants that are not required in env file and are generally static in nature such as regexs

### `src/containers`

Define Pages and containers,along with any components that are non-generic in nature

### `src/containers/*/state`

Define Page specific Actions,Reducers and State

### `src/hocs`

Define Higer Order Components that are genric in nature

### `src/hooks`

Define Custom Hooks that are genric in nature

### `src/store`

Define Global Redux Store and Store Hooks

### `src/store/globalReducers`

Define Reducers used across muliple components

### `src/types`

Define Global types

## `Styling`

CSS in JS using styled-components
