# Util-Easy

A comprehensive and user-friendly utility package, `util-easy`, is designed to handle local storage, session storage, and memoization in JavaScript or TypeScript projects. As this package is in a very early stage of development, many exciting features are yet to come.

## Installation

```bash
npm install util-easy
```

## Usage

### Local Storage

```javascript
import { handleLocalStorage } from 'util-easy';

const localStorageHandler = handleLocalStorage();

// Set property
localStorageHandler.setProperty({
  key: 'exampleKey',
  item: 'exampleValue',
});

// Get property
const retrievedValue = localStorageHandler.getProperty({
  key: 'exampleKey',
});

// Clear all
localStorageHandler.clearAll();
```

### Session Storage

```javascript
import { handleSessionStorage } from 'util-easy';

const sessionStorageHandler = handleSessionStorage();

// Set property
sessionStorageHandler.setProperty({
  key: 'exampleKey',
  item: 'exampleValue',
});

// Get property
const retrievedValue = sessionStorageHandler.getProperty({
  key: 'exampleKey',
});

// Clear all
sessionStorageHandler.clearAll();
```

### Memoization

```javascript
import { memoize, memoizeAsync } from 'util-easy';

const expensiveFunction = (param1, param2) => {
  // Expensive computation here
  return result;
};

// Synchronous Memoization
const memoizedFunction = memoize({
  callback: expensiveFunction,
  optimistic: true, // Set to false for pessimistic memoization
});

// Asynchronous Memoization
const memoizedAsyncFunction = memoizeAsync({
  callback: asyncFunction,
  optimistic: true, // Set to false for pessimistic memoization
  maxRetry: 3, // Maximum number of retries for async memoization
});

// Now use memoizedFunction and memoizedAsyncFunction for optimized performance
```

### Low Priority Task Scheduling

```javascript
import { lowPriority, lowPriorityWithTimeout } from 'util-easy';

// Execute low-priority task
lowPriority(() => {
  // Your low-priority task
});

// Execute low-priority task with timeout
lowPriorityWithTimeout({
  callback: () => {
    // Your low-priority task
  },
  timeout: 1000, // Timeout in milliseconds
});
```

## API

### `handleLocalStorage(id?: string)`

Returns an object with the following methods:

- `setProperty<T>({ key, item }: handleStorage_setPropertyParams<T>): void`: Sets a property in local storage.
- `getProperty<ReturnType_1>({ key }: handleStorage_getPropertyParams): ReturnType_1 | null`: Retrieves a property from local storage.
- `clearAll(): void`: Clears all properties from local storage.

### `handleSessionStorage(id?: string)`

Returns an object with the following methods:

- `setProperty<T>({ key, item }: handleStorage_setPropertyParams<T>): void`: Sets a property in session storage.
- `getProperty<ReturnType_1>({ key }: handleStorage_getPropertyParams): ReturnType_1 | null`: Retrieves a property from session storage.
- `clearAll(): void`: Clears all properties from session storage.

### `memoize<T extends Function>({ callback, optimistic }: MemoizeParams<T>)`

Returns a memoized version of the provided synchronous function.

- `callback`: The synchronous function to be memoized.
- `optimistic`: Set to `true` for optimistic memoization and `false` for pessimistic memoization.

### `memoizeAsync<T extends Function>({ callback, optimistic, maxRetry }: MemoizedAsyncParams<T>)`

Returns a memoized version of the provided asynchronous function.

- `callback`: The asynchronous function to be memoized.
- `optimistic`: Set to `true` for optimistic memoization and `false` for pessimistic memoization.
- `maxRetry`: Maximum number of retries for async memoization.

### `lowPriority(callback: IdleRequestCallback)`

Executes a low-priority task using either `requestIdleCallback` or `queueMicrotask`, depending on browser support.

### `lowPriorityWithTimeout({ callback, timeout }: LowPriorityWithTimeoutParams)`

Executes a low-priority task with a specified timeout using either `requestIdleCallback` or `queueMicrotask`, depending on browser support.

## Note: Early Development Stage

This package is currently in a very early stage of development. More features are planned, and your contributions and feedback are welcome! Session storage and local storage create a copy in cache for even faster access. The memoize function will run tasks in the background without blocking to update the cache if the optimistic parameter is set to true.

Feel free to contribute to the project on [GitHub](https://github.com/sanjaiyan-dev/easy-util) or reach out on [Instagram](https://www.instagram.com/sanjaiyan_dev/) for any inquiries or collaborations.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.