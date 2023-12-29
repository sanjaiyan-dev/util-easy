# Util-Easy

A versatile and easy-to-use utility package for handling local storage, session storage, and memoization in your JavaScript or TypeScript projects.

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
import { memoize } from 'util-easy';

const expensiveFunction = (param1, param2) => {
  // Expensive computation here
  return result;
};

// Memoize the function
const memoizedFunction = memoize({
  callback: expensiveFunction,
  optimistic: true, // Set to false for pessimistic memoization
});

// Now use memoizedFunction instead of expensiveFunction for optimized performance
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

Returns a memoized version of the provided function.

- `callback`: The function to be memoized.
- `optimistic`: Set to `true` for optimistic memoization and `false` for pessimistic memoization.

## Note: Early Development Stage

This package is currently in a very early stage of development. Contributions and feedback are welcome! Feel free to contribute to the project on [GitHub](https://github.com/sanjaiyan-dev/easy-util) or reach out on [Instagram](https://www.instagram.com/sanjaiyan_dev/) for any inquiries or collaborations.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
