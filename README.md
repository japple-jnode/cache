# JustNode

Simple cache system for Node.js.

```shell
npm install @jnode/cache
```

## Basic Usage

### Import JustCache
```js
const Cacher = require('@jnode/cache');
```

### Create a Cacher
```js
const cache = new Cacher();
```

## Class: `Cacher`

The main class for managing the cache.

### Constructor
```js
new Cacher(data = new Map(), timeout = 600000)
```
- `data`: An optional `Map` object to initialize the cache with existing data. Default is a new `Map()`.
- `timeout`: An optional number representing the default timeout (in milliseconds) for cached items. Default is `600000` (10 minutes).

### Methods

- `set(id, value)`: Sets or creates a new cache entry.
    - `id`: The ID of the cache entry.
    - `value`: The value to be cached.
    - **Returns**: The `value` that was just set.
    - **Example**:
    ```js
    cache.set('user123', { name: 'Alice', age: 30 });
    ```
- `edit(id, value)`: Edits an existing cache entry if the entry exists.
    - `id`: The ID of the cache entry.
    - `value`: The new value to be cached.
    - **Returns**: The `value` that was just set, or `undefined` if the entry does not exist.
    - **Example**:
    ```js
    cache.edit('user123', { name: 'Alice', age: 31 });
    ```
- `check(id)`: Checks if a cache entry exists.
    - `id`: The ID of the cache entry.
    - **Returns**: `true` if the entry exists, `false` otherwise.
    - **Example**:
    ```js
    if (cache.check('user123')) {
        console.log('User data is cached!');
    }
    ```
- `async get(id, ifNone)`: Gets a cache entry, or fetches it if it does not exist.
    - `id`: The ID of the cache entry.
    - `ifNone`: An async function that will be called with the `id` if the entry does not exist. The return value of this function will be set as the cached value.
    - **Returns**: A Promise that resolves to the cached value.
    - **Example**:
    ```js
    async function fetchUserData(userId) {
        // Simulating fetching user data
        return new Promise(resolve => {
            setTimeout(() => {
              resolve({ name: 'Bob', age: 25 });
            }, 1000);
        });
    }

    cache.get('user456', fetchUserData).then(userData => {
        console.log('User data:', userData);
    });
    ```
- `setTimeout(id)`: Sets or resets the timeout for a cache entry. You usually don't need to call this manually, as set, edit and get will auto call it.
    - `id`: The ID of the cache entry.
- `clearTimeout(id)`: Clears the timeout for a cache entry, preventing it from being automatically deleted.
    - `id`: The ID of the cache entry.
    - **Example**:
    ```js
    cache.clearTimeout('user123');
    ```