# Util-Easy

Welcome to Util-Easy! This package provides easy-to-use utilities for managing browser storage and optimizing function performance. It's currently in the early stages of development, with many more features planned in the pipeline.

## Installation

You can install Util-Easy via npm:

```bash
npm install util-easy
```

## Features

### Browser Storage Management

Util-Easy offers simple interfaces to handle browser storage efficiently. It provides functions for setting, getting, and clearing properties in both local and session storage.

#### Local Storage

```typescript
import { handleLocalStorage } from 'util-easy';

// Initialize local storage handler
const localStorageHandler = handleLocalStorage();

// Set an item in local storage
localStorageHandler.setProperty({ key: 'user', item: { name: 'John' } });

// Get an item from local storage
const user = localStorageHandler.getProperty<{ name: string }>({ key: 'user' });
console.log(user); // { name: 'John' }

// Clear an item from local storage
const result = localStorageHandler.clearProperty<{ name: string }>({ key: 'user' });
console.log(result.success); // true
```

#### Session Storage

```typescript
import { handleSessionStorage } from 'util-easy';

// Initialize session storage handler
const sessionStorageHandler = handleSessionStorage();

// Set an item in session storage
sessionStorageHandler.setProperty({ key: 'token', item: 'abc123' });

// Get an item from session storage
const token = sessionStorageHandler.getProperty<string>({ key: 'token' });
console.log(token); // abc123

// Clear an item from session storage
const result = sessionStorageHandler.clearProperty<string>({ key: 'token' });
console.log(result.success); // true
```

### Function Memoization

Util-Easy includes memoization utilities to optimize function performance, particularly for asynchronous tasks.

```typescript
import { memoize, memoizeAsync } from 'util-easy';

// Synchronous function memoization
const add = (a: number, b: number) => a + b;
const memoizedAdd = memoize({ callback: add });

console.log(memoizedAdd(2, 3)); // Output: 5 (function called)
console.log(memoizedAdd(2, 3)); // Output: 5 (cached result)

// Asynchronous function memoization
const asyncTask = async (value: number) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return value * 2;
};
const memoizedAsyncTask = memoizeAsync({ callback: asyncTask });

memoizedAsyncTask(5).then(result => console.log(result)); // Output: 10 (function called)
memoizedAsyncTask(5).then(result => console.log(result)); // Output: 10 (cached result)
```

### Cache Optimization

```typescript
import { unstable_cacheFunctionBrowser } from 'util-easy';

// Cache function results in local storage
const cachedFunction = unstable_cacheFunctionBrowser({
    callback: (a: number, b: number) => a + b,
    cacheType: 'localStorage'
});

console.log(cachedFunction?.(2, 3)); // Output: 5 (function called)
console.log(cachedFunction?.(2, 3)); // Output: 5 (cached result)
```

### Low Priority Execution

```typescript
import { lowPriority, lowPriorityWithTimeout } from 'util-easy';

// Execute a task at low priority
lowPriority(() => console.log('Executing at low priority'));

// Execute a task at low priority with a timeout
lowPriorityWithTimeout({ 
    callback: () => console.log('Executing at low priority with timeout'),
    timeout: 1000
});
```

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests on [GitHub](https://github.com/yourusername/util-easy).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
