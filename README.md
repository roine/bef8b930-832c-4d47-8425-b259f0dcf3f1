## Development

You will need `pnpm`. Using `npm` should also be fine as lock files
aren't critical at this stage.

- `pnpm install`
- `pnpm dev`

## Dev notes

### Tech used

- tailwindcss for fast prototyping
- daisyUI for fast components
- redux toolkit for state management, see below why not just redux
- prettier for opinionated code formatting
- pnpm for fast package install
- vite for fast development
- typescript for type safety

### Redux toolkit

Using Redux toolkit for state management as it is the recommended way by the Redux team, also
consuming redux directly is marked as deprecated in latest versions of Redux.

The main difference is that instead of creating action types, action creators, and reducers, we can define all of them
in a single file.

### Where are the tests?

To keep it under 4 hours no tests have been added.

### Area for improvements

- add tests
- display the thumbnails while the images load to avoid layout shifts
- when changing page, keep the current view until the next is loaded
- allow for current page initialisation using URL params (eg: ?page=99)
- more accurate API typing
- caching? Define a caching policy
- prefetching
- mobile network optimisations